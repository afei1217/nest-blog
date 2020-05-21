/*
 * @Author: afei
 * @Date: 2020-05-11 23:05:52
 * @Description: api返回成功数据 拦截做格式统一处理
 */

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { THttpSuccessResponse, TMessage } from "@app/interfaces/http.interface";
import * as META from '@app/constants/meta.constant';
import * as TEXT from '@app/constants/text.constant';

@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor<T, THttpSuccessResponse<T>> {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<THttpSuccessResponse<T>> {
        const call$ = next.handle();
        const target = context.getHandler();
        // const request = context.switchToHttp().getRequest();
        const message = this.reflector.get<TMessage>(META.HTTP_SUCCESS_MESSAGE, target) || TEXT.HTTP_DEFAULT_SUCCESS_TEXT;
        // const usePainate = this.reflector.get<boolean>(META.HTTP_RES_TRANSFORM_PAGINATE, target);
        return call$.pipe(map((data: any) => {
            const result = data;
            return {
                code: 200,
                message,
                result
            }
        }))
    }
}