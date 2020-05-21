/*
 * @Author: afei
 * @Date: 2020-05-09 16:53:12
 * @Description: 接口验证异常
 */

import * as TEXT from '@app/constants/text.constant';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @class ValidationError
 * @classdesc 400 -> 请求有问题，这个错误经常发生在错误内层，所以 code 没有意义
 * @example new ValidationError('错误信息')
 * @example new ValidationError(new Error())
 */
export class ApiError extends HttpException {
    constructor(error?: any) {
        super(error || TEXT.VALIDATION_ERROR_DEFAULT, HttpStatus.BAD_REQUEST);
    }
}
