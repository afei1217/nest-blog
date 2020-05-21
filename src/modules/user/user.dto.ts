/*
 * @Author: afei
 * @Date: 2020-05-09 13:55:42
 * @Description: 用户相关接口校验
 */

import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber
} from 'class-validator';

export class UserLoginDto {

    @IsPhoneNumber('CH', { message: '手机号格式不符合规范' })
    @IsNotEmpty({ message: '手机号不能为空' })
    readonly phone: string;

    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;

}

export class UserRegisterDto {

    @IsPhoneNumber('CH', { message: '手机号格式不符合规范' })
    @IsNotEmpty({ message: '手机号不能为空' })
    readonly phone: string;

    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;

    nickname: string;

}