package org.example.backend.Exceptions;

public class InvalidUserTokenException extends RuntimeException{
    public InvalidUserTokenException(String message) { super(message); }

}
