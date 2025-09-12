package com.coffeexing.capstone.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVO {
    private String token;
    private UserInfoVO userInfo;
    private Boolean success;
}
