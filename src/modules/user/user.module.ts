/*
 * @Author: afei
 * @Date: 2020-05-09 13:52:57
 * @Description: 用户模块
 */

import { Module } from "@nestjs/common";
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class UserModule {}