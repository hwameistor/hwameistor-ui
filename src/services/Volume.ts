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
  ApiEventActionList,
  ApiRspFailBody,
  ApiSnapshotList,
  ApiVolume,
  ApiVolumeConvertOperation,
  ApiVolumeConvertReqBody,
  ApiVolumeConvertRspBody,
  ApiVolumeExpandOperation,
  ApiVolumeExpandReqBody,
  ApiVolumeExpandRspBody,
  ApiVolumeList,
  ApiVolumeMigrateOperation,
  ApiVolumeMigrateReqBody,
  ApiVolumeMigrateRspBody,
  ApiVolumeOperationByVolume,
  ApiVolumeReplicaList,
  VolumesEventsDetailParams,
  VolumesListParams,
  VolumesOperationsDetailParams,
  VolumesReplicasDetailParams,
  VolumesSnapshotDetailParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Volume<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description list Volume
   *
   * @tags Volume
   * @name VolumesList
   * @summary 摘要 获取数据卷列表信息 数据卷状态枚举 （ToBeMounted、Created、Creating、Ready、NotReady、ToBeDeleted、Deleted）
   * @request GET:/cluster/volumes
   */
  volumesList = (query: VolumesListParams, params: RequestParams = {}) =>
    this.request<ApiVolumeList, any>({
      path: `/cluster/volumes`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get Volume angel1
   *
   * @tags Volume
   * @name VolumesDetail
   * @summary 摘要 获取指定数据卷基本信息
   * @request GET:/cluster/volumes/{volumeName}
   */
  volumesDetail = (volumeName: string, params: RequestParams = {}) =>
    this.request<ApiVolume, any>({
      path: `/cluster/volumes/${volumeName}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get GetVolumeConvertOperation 状态枚举 （Submitted、InProgress、Completed、ToBeAborted、Aborted）
   *
   * @tags Volume
   * @name VolumesConvertDetail
   * @summary 摘要 获取指定数据卷转换操作
   * @request GET:/cluster/volumes/{volumeName}/convert
   */
  volumesConvertDetail = (volumeName: string, params: RequestParams = {}) =>
    this.request<ApiVolumeConvertOperation, ApiRspFailBody>({
      path: `/cluster/volumes/${volumeName}/convert`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description post VolumeConvertOperation
   *
   * @tags Volume
   * @name VolumesConvertCreate
   * @summary 摘要 指定数据卷转换操作
   * @request POST:/cluster/volumes/{volumeName}/convert
   */
  volumesConvertCreate = (volumeName: string, body: ApiVolumeConvertReqBody, params: RequestParams = {}) =>
    this.request<ApiVolumeConvertRspBody, ApiRspFailBody>({
      path: `/cluster/volumes/${volumeName}/convert`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get VolumeOperation
   *
   * @tags Volume
   * @name VolumesEventsDetail
   * @summary 摘要 获取指定数据卷审计日志  sort=time ,先不做按操作查询
   * @request GET:/cluster/volumes/{volumeName}/events
   */
  volumesEventsDetail = ({ volumeName, ...query }: VolumesEventsDetailParams, params: RequestParams = {}) =>
    this.request<ApiEventActionList, any>({
      path: `/cluster/volumes/${volumeName}/events`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get GetVolumeExpandOperation 状态枚举 （Submitted、InProgress、Completed、ToBeAborted、Aborted）
   *
   * @tags Volume
   * @name VolumesExpandDetail
   * @summary 摘要 获取指定数据卷扩容操作
   * @request GET:/cluster/volumes/{volumeName}/expand
   */
  volumesExpandDetail = (volumeName: string, params: RequestParams = {}) =>
    this.request<ApiVolumeExpandOperation, ApiRspFailBody>({
      path: `/cluster/volumes/${volumeName}/expand`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description post VolumeExpandOperation
   *
   * @tags Volume
   * @name VolumesExpandCreate
   * @summary 摘要 指定数据卷扩容操作
   * @request POST:/cluster/volumes/{volumeName}/expand
   */
  volumesExpandCreate = (volumeName: string, body: ApiVolumeExpandReqBody, params: RequestParams = {}) =>
    this.request<ApiVolumeExpandRspBody, ApiRspFailBody>({
      path: `/cluster/volumes/${volumeName}/expand`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get GetVolumeMigrateOperation 状态枚举 （Submitted、AddReplica、SyncReplica、PruneReplica、InProgress、Completed、ToBeAborted、Cancelled、Aborted、Failed）
   *
   * @tags Volume
   * @name VolumesMigrateDetail
   * @summary 摘要 获取指定数据卷迁移操作
   * @request GET:/cluster/volumes/{volumeName}/migrate
   */
  volumesMigrateDetail = (volumeName: string, params: RequestParams = {}) =>
    this.request<ApiVolumeMigrateOperation, ApiRspFailBody>({
      path: `/cluster/volumes/${volumeName}/migrate`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description post VolumeMigrateOperation body i.g. body { SrcNode string ,SelectedNode string}
   *
   * @tags Volume
   * @name VolumesMigrateCreate
   * @summary 摘要 指定数据卷迁移操作
   * @request POST:/cluster/volumes/{volumeName}/migrate
   */
  volumesMigrateCreate = (volumeName: string, body: ApiVolumeMigrateReqBody, params: RequestParams = {}) =>
    this.request<ApiVolumeMigrateRspBody, ApiRspFailBody>({
      path: `/cluster/volumes/${volumeName}/migrate`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get VolumeOperation
   *
   * @tags Volume
   * @name VolumesOperationsDetail
   * @summary 摘要 获取指定数据卷操作记录信息 状态枚举 (Submitted、AddReplica、SyncReplica、PruneReplica、InProgress、Completed、ToBeAborted、Cancelled、Aborted、Failed)
   * @request GET:/cluster/volumes/{volumeName}/operations
   */
  volumesOperationsDetail = ({ volumeName, ...query }: VolumesOperationsDetailParams, params: RequestParams = {}) =>
    this.request<ApiVolumeOperationByVolume, any>({
      path: `/cluster/volumes/${volumeName}/operations`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description list volumes
   *
   * @tags Volume
   * @name VolumesReplicasDetail
   * @summary 摘要 获取指定数据卷的副本列表信息
   * @request GET:/cluster/volumes/{volumeName}/replicas
   */
  volumesReplicasDetail = ({ volumeName, ...query }: VolumesReplicasDetailParams, params: RequestParams = {}) =>
    this.request<ApiVolumeReplicaList, any>({
      path: `/cluster/volumes/${volumeName}/replicas`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get VolumeSnapshotList
   *
   * @tags Volume
   * @name VolumesSnapshotDetail
   * @summary 摘要 获取指定数据卷快照操作 快照状态枚举 (Creating, Ready, NotReady, ToBeDeleted, Deleted）
   * @request GET:/cluster/volumes/{volumeName}/snapshot
   */
  volumesSnapshotDetail = ({ volumeName, ...query }: VolumesSnapshotDetailParams, params: RequestParams = {}) =>
    this.request<ApiSnapshotList, ApiRspFailBody>({
      path: `/cluster/volumes/${volumeName}/snapshot`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
