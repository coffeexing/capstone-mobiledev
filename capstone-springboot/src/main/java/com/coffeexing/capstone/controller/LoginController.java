package com.coffeexing.capstone.controller;

import com.coffeexing.capstone.domain.LoginDTO;
import com.coffeexing.capstone.domain.UserInfoVO;
import com.coffeexing.capstone.domain.UserVO;
import com.coffeexing.capstone.utils.Result;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/login")
    public Result<UserVO> login(@RequestBody LoginDTO loginDTO) {
        return Result.success(new UserVO("token", new UserInfoVO(), true));
    }

}
