/*
 * @Author: afei
 * @Date: 2020-05-09 17:20:44
 * @Description: 全局异常拦截
 */

import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { TExceptionOption, TMessage, THttpErrorResponse } from "@app/interfaces/http.interface";
import * as afType from '@app/utils/dataType.js';
import { isDevMode } from "@app/app.environment";
import ErrorCode from '@app/constants/apiCode.constant'


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const request = host.switchToHttp().getRequest();
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
        const isNumber = (value): value is TMessage => afType.isNumber(value);

        const errorMessage = isNumber(errorOption) ? null : errorOption.errorMessage;
        const errorCode = isNumber(errorOption) ? errorOption : errorOption.code || 10001;
        const message = ErrorCode[errorCode];

        console.error('errorFilter', exception, host)

        const data: THttpErrorResponse = {
            code: errorCode,
            message: message,
            error: errorMessage,
            debug: isDevMode ? exception.stack : null
        }
        if (status === HttpStatus.NOT_FOUND) {
            data.error = '资源不存在';
            data.message = `接口 ${request.method} -> ${request.url} 无效`;
        }
        return response.status(HttpStatus.OK).jsonp(data);
    }
}