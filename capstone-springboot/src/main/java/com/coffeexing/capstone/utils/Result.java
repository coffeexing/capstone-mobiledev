package com.coffeexing.capstone.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * 通用API响应结果封装类
 * @param <T> 响应数据的类型
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class Result<T> {

    /**
     * 响应状态码
     */
    private Integer code;

    /**
     * 响应消息
     */
    private String message;

    /**
     * 响应数据
     */
    private T data;

    /**
     * 时间戳
     */
    private Long timestamp;

    // 私有构造器，用于内部创建实例
    private Result(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }

    // 成功响应 - 无数据
    public static <T> Result<T> success() {
        return new Result<>(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), null);
    }

    // 成功响应 - 带数据
    public static <T> Result<T> success(T data) {
        return new Result<>(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), data);
    }

    // 成功响应 - 自定义消息和数据
    public static <T> Result<T> success(String message, T data) {
        return new Result<>(HttpStatus.OK.value(), message, data);
    }

    // 失败响应 - 默认错误
    public static <T> Result<T> error() {
        return new Result<>(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.getReasonPhrase(), null);
    }

    // 失败响应 - 自定义错误消息
    public static <T> Result<T> error(String message) {
        return new Result<>(HttpStatus.BAD_REQUEST.value(), message, null);
    }

    // 失败响应 - 自定义错误码和消息
    public static <T> Result<T> error(Integer code, String message) {
        return new Result<>(code, message, null);
    }

    // 失败响应 - 自定义错误码、消息和数据
    public static <T> Result<T> error(Integer code, String message, T data) {
        return new Result<>(code, message, data);
    }

    // 判断是否成功
    public boolean isSuccess() {
        return this.code != null && this.code == 200;
    }

    // 判断是否失败
    public boolean isError() {
        return !isSuccess();
    }
}

