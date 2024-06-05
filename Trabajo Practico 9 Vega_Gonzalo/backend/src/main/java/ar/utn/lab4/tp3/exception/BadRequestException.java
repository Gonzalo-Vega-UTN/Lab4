package ar.utn.lab4.tp3.exception;

public class BadRequestException extends RuntimeException {

    public BadRequestException(String message){
        super(message);
    }
}
