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
  ApiEventList,
  ApiModuleStatus,
  ApiOperationMetric,
  EventsListParams,
  OperationsListParams,
  StatusListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Metric<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description EventList 状态枚举 （Submitted、AddReplica、SyncReplica、PruneReplica、InProgress、Completed、ToBeAborted、Cancelled、Aborted、Failed）
   *
   * @tags Metric
   * @name EventsList
   * @summary 摘要 获取事件列表
   * @request GET:/cluster/events
   */
  eventsList = (query: EventsListParams, params: RequestParams = {}) =>
    this.request<ApiEventList, any>({
      path: `/cluster/events`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description OperationList 状态枚举 （Submitted、AddReplica、SyncReplica、PruneReplica、InProgress、Completed、ToBeAborted、Cancelled、Aborted、Failed）
   *
   * @tags Metric
   * @name OperationsList
   * @summary 摘要 获取操作记录列表
   * @request GET:/cluster/operations
   */
  operationsList = (query: OperationsListParams, params: RequestParams = {}) =>
    this.request<ApiOperationMetric, any>({
      path: `/cluster/operations`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get ModuleStatus
   *
   * @tags Metric
   * @name StatusList
   * @summary 摘要 获取基础监控指标
   * @request GET:/cluster/status
   */
  statusList = (query: StatusListParams, params: RequestParams = {}) =>
    this.request<ApiModuleStatus, any>({
      path: `/cluster/status`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
