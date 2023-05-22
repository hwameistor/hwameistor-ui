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

import { ApiLocalDiskList } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LocalDisk<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description get LocalDiskList 状态枚举 (Active、Inactive、Unknown、Pending、Available、Bound)
   *
   * @tags LocalDisk
   * @name LocaldisksList
   * @summary 摘要 获取本地磁盘列表
   * @request GET:/cluster/localdisks
   */
  localdisksList = (params: RequestParams = {}) =>
    this.request<ApiLocalDiskList, any>({
      path: `/cluster/localdisks`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
