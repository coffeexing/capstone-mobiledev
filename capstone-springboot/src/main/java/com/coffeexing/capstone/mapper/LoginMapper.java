package com.coffeexing.capstone.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.coffeexing.capstone.entity.LoginForm;

@TableName("sys_login")
public interface LoginMapper extends BaseMapper<LoginForm> {
}
