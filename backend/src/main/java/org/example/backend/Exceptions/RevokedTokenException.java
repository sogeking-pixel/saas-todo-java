package org.example.backend.Exceptions;

public class RevokedTokenException extends Exception {
    public RevokedTokenException(String message) { super(message); }
}
