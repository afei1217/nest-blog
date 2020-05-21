/*
 * @Author: afei
 * @Date: 2020-05-21 15:24:12
 * @Description: apiCode常量
 */

/**
 * 错误码说明
 * 200501
 * 2                        05                     01
 * 服务级错误(1系统级错误)      服务模块代码            具体错误代码
 */
const ErrorCode = {

    // 00 拦截层
    20001: '参数校验失败',

    // 01 用户模块
    20101: '该手机号已被使用',
    20102: '账号或密码错误'

}

export default ErrorCode;