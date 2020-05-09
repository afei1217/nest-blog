/*
 * @Author: afei
 * @Date: 2020-05-09 13:55:32
 * @Description: 用户业务服务
 */

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(){
        console.log('UserService');
    }

    public getUserInfoById(userId: number): Promise<any> {
        return new Promise((resolve) => {
            resolve(userId);
        })
    }
}