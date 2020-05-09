/*
 * @Author: afei
 * @Date: 2020-05-09 13:54:02
 * @Description: 用户接口控制器
 */

import { Controller, Get, Query, Post, Body, HttpCode, HttpStatus, } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLoginDto } from './user.dto'

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {
        console.log('aa');
    }

    /**
     * 获取用户信息
     * @param params
     */
    @Get('detail')
    @HttpCode(HttpStatus.OK)
    getUserInfoById(@Query() params): Promise<any> {
        const userId = params.id;
        return this.userService.getUserInfoById(userId);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    userLogin(@Body() body: UserLoginDto): Promise<any> {
        console.log('body', body);
        return Promise.resolve('login success!');
    }
}