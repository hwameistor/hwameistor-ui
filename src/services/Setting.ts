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

import {
  ApiDrbdEnableSetting,
  ApiDrbdEnableSettingReqBody,
  ApiDrbdEnableSettingRspBody,
  ApiRspFailBody,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Setting<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description get DRBDSettingGet
   *
   * @tags Setting
   * @name DrbdList
   * @summary 摘要 获取高可用设置
   * @request GET:/cluster/drbd
   */
  drbdList = (params: RequestParams = {}) =>
    this.request<ApiDrbdEnableSetting, any>({
      path: `/cluster/drbd`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description post EnableDRBDSetting
   *
   * @tags Setting
   * @name DrbdCreate
   * @summary 摘要 高可用设置
   * @request POST:/cluster/drbd
   */
  drbdCreate = (body: ApiDrbdEnableSettingReqBody, params: RequestParams = {}) =>
    this.request<ApiDrbdEnableSettingRspBody, ApiRspFailBody>({
      path: `/cluster/drbd`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
