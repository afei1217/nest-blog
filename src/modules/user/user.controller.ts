/*
 * @Author: afei
 * @Date: 2020-05-09 13:54:02
 * @Description: 用户接口控制器
 */

import { Controller, Get, Query, Post, Body, } from "@nestjs/common";
import { UserService } from "./user.service";
import {
    UserLoginDto,
    UserRegisterDto
} from './user.dto'

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    /**
     * 获取用户信息
     * @param params
     */
    @Get('detail')
    getUserInfoById(@Query() params): Promise<any> {
        const userId = params.id;
        return this.userService.getUserInfoById(userId);
    }

    /**
     * 更新用户信息
     * @param params
     */
    @Post('update')
    userUpdate(@Body() body): Promise<any> {
        return this.userService.userUpdate(body);
    }


    /**
     * 用户登陆
     * @param params
     */
    @Post('login')
    userLogin(@Body() body: UserLoginDto): Promise<any> {
        return this.userService.userLogin(body);
    }

    /**
     * 账号注册
     * @param params
     */
    @Post('register')
    userRegister(@Body() body: UserRegisterDto): Promise<any> {
        return this.userService.userRegister(body);
    }
}