/*
 * @Author: afei
 * @Date: 2020-05-08 12:45:07
 * @Description: 用户表
 */

import {
    Column,
    Entity,
} from 'typeorm';
import { BaseModel } from '../base/baseModel'

@Entity('users')
export class UserModel extends BaseModel{
    @Column({
        comment: '用户昵称',
    })
    nickname: string;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 100,
        comment: '用户密码',
    })
    password: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 50,
        comment: '邮箱'
    })
    email: string;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 15,
        comment: '手机号'
    })
    mobile_number: string;

    @Column({
        nullable: true,
    })
    avatar: string;

    // 用户接收通知方式 no-不接收；comment评论；focus-关注；all-所有
    @Column({
        nullable: false,
        default: 'no',
        type: 'varchar',
        length: 10,
        comment: '接收通知方式'
    })
    notify_type: string;

    @Column({
        nullable: false,
        default: 1,
        type: 'tinyint',
        comment: '状态',
    })
    status: number

}