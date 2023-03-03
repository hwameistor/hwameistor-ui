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

import { ApiLocalDiskNodeList } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LocalDiskNode<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description get LocalDiskNodeList
   *
   * @tags LocalDiskNode
   * @name LocaldisknodesList
   * @summary 摘要 获取集群磁盘组列表
   * @request GET:/cluster/localdisknodes
   */
  localdisknodesList = (params: RequestParams = {}) =>
    this.request<ApiLocalDiskNodeList, any>({
      path: `/cluster/localdisknodes`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
