package org.example.backend.Exceptions;

public class InvalidTokenException  extends RuntimeException{
    public InvalidTokenException(String message) { super(message); }
    public InvalidTokenException() {super("Invalid Token :/");}

}
