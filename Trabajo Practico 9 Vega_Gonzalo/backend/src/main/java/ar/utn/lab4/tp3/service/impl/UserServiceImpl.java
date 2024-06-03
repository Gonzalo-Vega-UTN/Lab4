package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.model.MyUser;
import ar.utn.lab4.tp3.model.Role;
import ar.utn.lab4.tp3.repository.IUserRepository;
import ar.utn.lab4.tp3.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepository;

    public UserServiceImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public MyUser login(MyUser myUser) {
        MyUser user = this.userRepository.findByEmail(myUser.getEmail()).orElse(null);
        System.out.println(user);
       return user;
    }

    public MyUser save(MyUser myUser) {
        MyUser existing = this.userRepository.findByEmail(myUser.getEmail()).orElse(null);
        if(existing == null){
           return this.userRepository.save(myUser);
        }
        return existing;
    }

    @Override
    public MyUser updateRole(MyUser admin, String email) {
        MyUser existingAdmin = this.userRepository.findByEmail(admin.getEmail()).orElse(null);
        if(existingAdmin == null) return null;

        if(admin.getRole() == Role.ADMIN){
            MyUser user = this.userRepository.findByEmail(email).orElse(null);
            if(user != null){
                if(user.getRole() == Role.ADMIN){
                    user.setRole(Role.USER);
                }else{
                    user.setRole(Role.ADMIN);
                }
            }
        }
        return null;
    }

    public void saveAll(List<MyUser> dataList) {
        dataList.forEach(this.userRepository::save);
    }
}
