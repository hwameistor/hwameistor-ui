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

import { ApiSnapshotList, SnapshotsListParams } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Snapshot<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description list Snapshot
   *
   * @tags Snapshot
   * @name SnapshotsList
   * @summary 摘要 全局快照列表展式
   * @request GET:/cluster/snapshots
   */
  snapshotsList = (query: SnapshotsListParams, params: RequestParams = {}) =>
    this.request<ApiSnapshotList, any>({
      path: `/cluster/snapshots`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
