/*
 * @Author: afei
 * @Date: 2020-05-08 11:12:06
 * @Description: 程序配置文件
 */

import path = require('path');

// 系统基本配置
export const APP = {
    PORT: 3000,
    ROOT_PATH: __dirname,
}

export const FILE = {
    UPLOAD_ROOT: path.join(__dirname, '../fileUpload'),
    API_PREFIX: '/static'
}

// mysql配置
export const MYSQLDB = {
    DB_NAME: 'afblog',
    HOST: 'localhost',
    PORT: 3306,
    USER: 'root',
    PASSWORD: 'root'
}