package org.example.backend.Exceptions;

public class InvalidTokenTypeException extends RuntimeException{
    public InvalidTokenTypeException(String message) { super(message); }
}
