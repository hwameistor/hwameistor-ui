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
  ApiEvent,
  ApiEventActionList,
  ApiModuleStatus,
  ApiOperation,
  ApiOperationMetric,
  EventsListParams,
  OperationsListParams,
  OperationsOperationNameListParams,
  StatusListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Metric<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description EventList 排序  resourceType枚举（Cluster;StorageNode;DiskNode;Pool;Volume;DiskVolume;Disk）  sort枚举 （time、name、type）
   *
   * @tags Metric
   * @name EventsList
   * @summary 摘要 获取审计日志
   * @request GET:/cluster/events
   */
  eventsList = (query: EventsListParams, params: RequestParams = {}) =>
    this.request<ApiEventActionList, any>({
      path: `/cluster/events`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description EventGet
   *
   * @tags Metric
   * @name EventsEventNameList
   * @summary 摘要 获取指定事件
   * @request GET:/cluster/events/:eventName
   */
  eventsEventNameList = (eventName: string, params: RequestParams = {}) =>
    this.request<ApiEvent, any>({
      path: `/cluster/events/${eventName}`,
      method: "GET",
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
   * @description OperationGet eventType枚举 (Migrate、Expand、Convert)
   *
   * @tags Metric
   * @name OperationsOperationNameList
   * @summary 摘要 获取指定操作记录
   * @request GET:/cluster/operations/:operationName
   */
  operationsOperationNameList = (
    { operationName, ...query }: OperationsOperationNameListParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiOperation, any>({
      path: `/cluster/operations/${operationName}`,
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
