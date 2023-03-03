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
  ApiNodeDiskListByPool,
  ApiStorageNodeListByPool,
  ApiStoragePool,
  ApiStoragePoolList,
  PoolsListParams,
  PoolsNodesDetailParams,
  PoolsNodesDisksDetailParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Pool<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description list StoragePools
   *
   * @tags Pool
   * @name PoolsList
   * @summary 摘要 获取存储池列表信息
   * @request GET:/cluster/pools
   */
  poolsList = (query: PoolsListParams, params: RequestParams = {}) =>
    this.request<ApiStoragePoolList, any>({
      path: `/cluster/pools`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get Pool angel
   *
   * @tags Pool
   * @name PoolsDetail
   * @summary 摘要 获取指定存储池基本信息
   * @request GET:/cluster/pools/{poolName}
   */
  poolsDetail = (poolName: string, params: RequestParams = {}) =>
    this.request<ApiStoragePool, any>({
      path: `/cluster/pools/${poolName}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNodesGetByPoolName
   *
   * @tags Pool
   * @name PoolsNodesDetail
   * @summary 摘要 获取指定存储池存储节点列表信息
   * @request GET:/cluster/pools/{poolName}/nodes
   */
  poolsNodesDetail = ({ poolName, ...query }: PoolsNodesDetailParams, params: RequestParams = {}) =>
    this.request<ApiStorageNodeListByPool, any>({
      path: `/cluster/pools/${poolName}/nodes`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNodeDisksGetByPoolName
   *
   * @tags Pool
   * @name PoolsNodesDisksDetail
   * @summary 摘要 获取指定存储池指定存储节点磁盘列表信息
   * @request GET:/cluster/pools/{poolName}/nodes/{nodeName}/disks
   */
  poolsNodesDisksDetail = ({ nodeName, poolName, ...query }: PoolsNodesDisksDetailParams, params: RequestParams = {}) =>
    this.request<ApiNodeDiskListByPool, any>({
      path: `/cluster/pools/${poolName}/nodes/${nodeName}/disks`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
