/*
 * @Author: afei
 * @Date: 2020-05-09 13:55:42
 * @Description: 用户相关接口校验
 */

import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {

    @IsString({ message: '用户名必须为字符类型' })
    @IsNotEmpty({ message: '姓名不能为空' })
    readonly username: string;

    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;

}