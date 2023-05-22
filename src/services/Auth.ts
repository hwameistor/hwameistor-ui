/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ApiAuthInfoRspBody, ApiAuthLogoutRspBody, ApiAuthReqBody, ApiAuthRspBody } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Authorize user, return a token and expireAt if success
   *
   * @tags Auth
   * @name AuthAuthCreate
   * @summary Authorization
   * @request POST:/cluster/auth/auth
   */
  authAuthCreate = (body: ApiAuthReqBody, params: RequestParams = {}) =>
    this.request<ApiAuthRspBody, any>({
      path: `/cluster/auth/auth`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get the status if enable authorization
   *
   * @tags Auth
   * @name AuthInfoList
   * @summary Auth info
   * @request GET:/cluster/auth/info
   */
  authInfoList = (params: RequestParams = {}) =>
    this.request<ApiAuthInfoRspBody, any>({
      path: `/cluster/auth/info`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Logout the token, if verify token success, delete this token and return success
   *
   * @tags Auth
   * @name AuthLogoutCreate
   * @summary Logout the token
   * @request POST:/cluster/auth/logout
   */
  authLogoutCreate = (params: RequestParams = {}) =>
    this.request<ApiAuthLogoutRspBody, any>({
      path: `/cluster/auth/logout`,
      method: "POST",
      format: "json",
      ...params,
    });
}
