/*
 * @Author: afei
 * @Date: 2020-05-09 13:55:42
 * @Description: 用户相关接口校验
 */

import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsEmail,
    MaxLength,
    IsOptional
} from 'class-validator';
import { BaseDto } from '../base/base.dto';

// 登陆
export class UserLoginDto extends BaseDto{

    @IsPhoneNumber('CH', { message: '手机号格式不符合规范' })
    @IsNotEmpty({ message: '手机号不能为空' })
    readonly phone: string;

    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;

}

// 注册
export class UserRegisterDto extends BaseDto{

    @IsPhoneNumber('CH', { message: '手机号格式不符合规范' })
    @IsNotEmpty({ message: '手机号不能为空' })
    readonly phone: string;

    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;

    nickname: string;

}

// 用户信息更新
const metadata: string[] = ['id', 'email', 'avatar', 'notify_type', 'status', 'nickname'];
export class UserUpdateDto extends BaseDto{

    constructor(model: {}) {
        super(metadata, model);
    }

    @IsNotEmpty({ message: 'id不能为空' })
    readonly id: number;

    @IsOptional()
    @IsEmail({}, { message: '邮箱格式不合法' })
    @MaxLength(50, { message: '邮箱最大长度为50' })
    readonly email: string;

    readonly avatar: string;

    readonly notify_type: string;

    readonly status: number;

    readonly nickname: string;

}