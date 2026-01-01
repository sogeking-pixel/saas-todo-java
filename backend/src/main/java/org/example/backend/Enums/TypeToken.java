package org.example.backend.Enums;

public enum TypeToken {
    ACCESS_TOKEN("access"),
    REFRESH_TOKEN("refresh");

    private final String name;

    TypeToken(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

}
