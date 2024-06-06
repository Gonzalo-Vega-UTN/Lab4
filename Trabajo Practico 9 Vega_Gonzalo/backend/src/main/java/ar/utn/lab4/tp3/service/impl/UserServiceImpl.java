package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.exception.DuplicatedException;
import ar.utn.lab4.tp3.exception.UnauthorizedException;
import ar.utn.lab4.tp3.model.MyUser;
import ar.utn.lab4.tp3.model.Role;
import ar.utn.lab4.tp3.repository.IUserRepository;
import ar.utn.lab4.tp3.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ar.utn.lab4.tp3.exception.NotFoundException;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepository;

    public UserServiceImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public MyUser login(MyUser myUser) {
        MyUser existingUser = this.getUser(myUser.getEmail());
        String hashedClave = encriptarClaveSHA256(myUser.getPassword());
        if(existingUser.getPassword().equals(hashedClave)){
            return existingUser;
        }else{
            throw new UnauthorizedException("Password Invalida");
        }
    }

    public MyUser save(MyUser myUser) {
        if(checkExistingEmail(myUser.getEmail())){
            log.info("[INFO] Email Duplicado {}",myUser.getEmail());
           throw new DuplicatedException("El email ya ha sido registrado");
        }
        myUser.setPassword(encriptarClaveSHA256(myUser.getPassword()));
        myUser.setRole(Role.USER);
        return this.userRepository.save(myUser);
    }

    public static String encriptarClaveSHA256(String clave) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] array = md.digest(clave.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : array) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public MyUser updateRole(MyUser admin, String email) {
        MyUser existingAdmin = getUser(admin.getEmail());
        if(existingAdmin.getRole() != Role.ADMIN) {
            throw new UnauthorizedException("No tienes permisos para realizar eso");
        }
        MyUser user = getUser(email);
        if(user.getRole() == Role.ADMIN){
            user.setRole(Role.USER);
        }else{
            user.setRole(Role.ADMIN);
        }
        return user;
    }

    public void saveAll(List<MyUser> dataList) {
        dataList.forEach(this.userRepository::save);
    }

    @Override
    public MyUser getUser(Long id) {
       return this.userRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuario (email) no encontrado"));
    }

    public boolean checkExistingEmail(String email){
        return this.userRepository.existsByEmail(email);
    }
    @Override
    public MyUser getUser(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Usuario (email) no encontrado"));
    }
}
