/*
 * @Author: afei
 * @Date: 2020-05-09 17:20:44
 * @Description: 全局异常拦截
 */

import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { TExceptionOption, TMessage, THttpErrorResponse, EHttpStatus } from "@app/interfaces/http.interface";
import * as afType from '@app/utils/dataType.js';
import { isDevMode } from "@app/app.environment";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const request = host.switchToHttp().getRequest();
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
        const isString = (value): value is TMessage => afType.isString(value);
        const errorMessage = isString(errorOption) ? errorOption : errorOption.message;
        const errorInfo = isString(errorOption) ? null : errorOption.error;
        const parentErrorInfo = errorInfo ? String(errorInfo) : null;
        const isChildrenError = errorInfo && errorInfo.status && errorInfo.message;
        const resultError = isChildrenError && errorInfo.message || parentErrorInfo;
        const resultStatus = isChildrenError ? errorInfo.status : status;
        const data: THttpErrorResponse = {
            code: EHttpStatus.ERROR,
            message: errorMessage,
            error: resultError,
            debug: isDevMode ? exception.stack : null
        }
        if (status === HttpStatus.NOT_FOUND) {
            data.error = '资源不存在';
            data.message = `接口 ${request.method} -> ${request.url} 无效`;
        }
        return response.status(resultStatus).jsonp(data);
    }
}