/*
 * @Author: afei
 * @Date: 2020-05-09 13:55:32
 * @Description: 用户业务服务
 */

import { Injectable } from "@nestjs/common";
import { ApiError } from '@app/errors/api.error'
import { UserRegisterDto, UserLoginDto, UserUpdateDto } from "./user.dto";
import { BaseService } from "../base/base.service";

const REGISTER_SQL = 'INSERT INTO users(nickname, password, mobile_number)';
const LOGIN_SQL = 'SELECT id, nickname, email, mobile_number, avatar, notify_type FROM users WHERE '

@Injectable()
export class UserService extends BaseService {
    constructor(){
        super();
    }

    // 获取用户信息
    public async getUserInfoById(userId: number): Promise<any> {
        const findUserByIdSql = `SELECT id, nickname, email, mobile_number, avatar, notify_type FROM users
        WHERE id = '${userId}'`
        const users = await this.sqlManager.query(findUserByIdSql);
        if (users.length === 0) throw new ApiError(20103);
        return users[0];
    }

    public async userUpdate(user: {}): Promise<any> {
        const updateDto: UserUpdateDto = new UserUpdateDto(user);
        // 将没有值的数据从当前实例上抖动下去；
        updateDto.senderShake();
        const updateValueSql = updateDto.updateSql;
        const updateSql = `UPDATE users SET ${updateValueSql} WHERE id=${updateDto.id}`;
        await this.sqlManager.query(updateSql);
        return Promise.resolve(updateDto.id);
    }

    // 用户注册
    public async userRegister(user: UserRegisterDto): Promise<any> {
        // 先查找 手机号是否已注册
        const findPhoneSql = `SELECT id from users where mobile_number='${user.phone}'`;
        const registerUsers = await this.sqlManager.query(findPhoneSql);
        if (registerUsers) throw new ApiError(20101);

        user.nickname = 'af' + new Date().getTime();
        const inserSql = REGISTER_SQL + ` VALUES('${user.nickname}', '${user.password}', '${user.phone}')`;
        const result = await this.sqlManager.query(inserSql);
        return Promise.resolve({ id: result.insertId });
    }

    // 用户登陆
    public async userLogin(user: UserLoginDto): Promise<any> {
        const loginSql = LOGIN_SQL + `mobile_number='${user.phone}' AND password='${user.password}'`;
        const result  = await this.sqlManager.query(loginSql);

        if (!result.length) throw new ApiError(20102);

        return Promise.resolve(result[0]);
    }
}