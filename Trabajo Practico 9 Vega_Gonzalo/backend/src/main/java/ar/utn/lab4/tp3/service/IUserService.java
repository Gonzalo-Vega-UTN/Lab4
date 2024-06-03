package ar.utn.lab4.tp3.service;

import ar.utn.lab4.tp3.model.MyUser;

public interface IUserService {
    MyUser login(MyUser myUser);
    MyUser save(MyUser myUser);

    MyUser updateRole(MyUser admin, String email);
}
