/*
 * @Author: afei
 * @Date: 2020-05-09 13:52:57
 * @Description: 用户模块
 */

import { Module } from "@nestjs/common";
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}