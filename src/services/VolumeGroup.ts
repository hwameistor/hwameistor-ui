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

import { ApiVolumeGroup, ApiVolumeGroupList, VolumegroupsListParams } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class VolumeGroup<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description get VolumeGroupList
   *
   * @tags VolumeGroup
   * @name VolumegroupsList
   * @summary 摘要 获取数据卷组列表
   * @request GET:/cluster/volumegroups
   */
  volumegroupsList = (query: VolumegroupsListParams, params: RequestParams = {}) =>
    this.request<ApiVolumeGroupList, any>({
      path: `/cluster/volumegroups`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get VolumeGroupGet
   *
   * @tags VolumeGroup
   * @name VolumegroupsDetail
   * @summary 摘要 查看数据卷组
   * @request GET:/cluster/volumegroups/{vgName}
   */
  volumegroupsDetail = (vgName?: string, params: RequestParams = {}) =>
    this.request<ApiVolumeGroup, any>({
      path: `/cluster/volumegroups/${vgName}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
