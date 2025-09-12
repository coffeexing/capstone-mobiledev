package com.coffeexing.capstone.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("sys_login")
public class LoginForm {
    @TableId(type = IdType.AUTO)
    private Integer id;

    private String phone;

    private String password;

    @TableId("user_id")
    private Integer userId;
}
