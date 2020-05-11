/*
 * @Author: afei
 * @Date: 2020-05-09 17:47:09
 * @Description: HTTP相关
 */

// 响应状态
export enum EHttpStatus{
    ERROR = 'error',
    SUCCESS = 'success'
}

export type TMessage = string;
export type TExceptionOption = TMessage | {
    message: TMessage,
    error?: any
}

// HTTP 状态返回
export interface IHttpResponseBase {
    status: EHttpStatus;
    message: TMessage;
}

// HTTP error
export type THttpErrorResponse = IHttpResponseBase & {
    error: any;
    debug?: string
}

// HTTP success 返回
export type THttpSuccessResponse<T> = IHttpResponseBase & {
    result: T;
};

// HTTP Response
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;