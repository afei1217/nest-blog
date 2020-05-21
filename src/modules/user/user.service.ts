/*
 * @Author: afei
 * @Date: 2020-05-09 13:55:32
 * @Description: 用户业务服务
 */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiError } from '@app/errors/api.error'
import { UserModel } from '@app/modules/user/user.model'
import { UserRegisterDto, UserLoginDto } from "./user.dto";

const REGISTER_SQL = 'INSERT INTO users(nickname, password, mobile_number)';
const LOGIN_SQL = 'SELECT id, nickname, email, mobile_number, avatar, notify_type FROM users WHERE '

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserModel)
        private readonly userRepo: Repository<UserModel>,
    ){}

    public getUserInfoById(userId: number): Promise<any> {
        return new Promise((resolve) => {
            resolve(userId);
        })
    }
    public async userRegister(user: UserRegisterDto): Promise<any> {
        // 先查找 手机号是否已注册
        const findPhoneSql = `select id from users where mobile_number='${user.phone}'`;
        const registerUsers = await this.userRepo.query(findPhoneSql);
        if (registerUsers) throw new ApiError(20101);

        user.nickname = 'af' + new Date().getTime();
        const inserSql = REGISTER_SQL + ` VALUES('${user.nickname}', '${user.password}', '${user.phone}')`;
        const result = await this.userRepo.query(inserSql);
        return Promise.resolve({ id: result.insertId });
    }
    public async userLogin(user: UserLoginDto): Promise<any> {
        const loginSql = LOGIN_SQL + `mobile_number='${user.phone}' AND password='${user.password}'`;
        const result  = await this.userRepo.query(loginSql);

        if (!result.length) throw new ApiError(20102);

        return Promise.resolve(result[0]);
    }
}