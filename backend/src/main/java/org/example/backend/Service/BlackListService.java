package org.example.backend.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BlackListService {
    private final StringRedisTemplate redisTemplate;

    public void blacklistToken(String jti, long timeInSeconds) {
        redisTemplate.opsForValue().set("blacklist:jti:"+jti, "revoked", timeInSeconds, TimeUnit.SECONDS);
    }

    public boolean isBlacklisted(String jti) {
        return redisTemplate.hasKey("blacklist:jti:"+jti);
    }
}
