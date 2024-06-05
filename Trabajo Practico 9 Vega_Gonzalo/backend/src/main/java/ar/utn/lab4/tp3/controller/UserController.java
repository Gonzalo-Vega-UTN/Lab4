package ar.utn.lab4.tp3.controller;

import ar.utn.lab4.tp3.model.MyUser;
import ar.utn.lab4.tp3.service.IUserService;
import ar.utn.lab4.tp3.service.impl.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class UserController {

    private final IUserService userServiceImpl;

    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser myUser){
        return new ResponseEntity<>(userServiceImpl.login(myUser),HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody MyUser myUser){
        return new ResponseEntity<>(userServiceImpl.save(myUser), HttpStatus.OK );
    }

    @PostMapping("/admin/{email}")
    public ResponseEntity<?> modifyRole(@RequestBody MyUser admin, @PathVariable("email") String email){
        return new ResponseEntity<>(  userServiceImpl.updateRole(admin, email), HttpStatus.OK );
    }
}
