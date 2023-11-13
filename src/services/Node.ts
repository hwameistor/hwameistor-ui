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
  ApiDiskReqBody,
  ApiLocalDiskInfo,
  ApiLocalDiskListByNode,
  ApiLocalDisksItemsList,
  ApiNodeUpdateReqBody,
  ApiNodeUpdateRspBody,
  ApiRspFailBody,
  ApiStorageNode,
  ApiStorageNodeList,
  ApiStoragePool,
  ApiStoragePoolList,
  ApiVolumeOperationListByNode,
  NodesDisksDetail2Params,
  NodesDisksDetailParams,
  NodesListParams,
  NodesMigratesDetailParams,
  NodesPoolsDetailParams,
  NodesPoolsDisksDetailParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Node<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description list StorageNode  驱动状态 [运行中（Ready）,维护中（Maintain）, 离线（Offline)] , 节点状态 [运行中（Ready）,未就绪（NotReady）,未知（Unknown)]
   *
   * @tags Node
   * @name NodesList
   * @summary 摘要 获取存储节点列表
   * @request GET:/cluster/nodes
   */
  nodesList = (query: NodesListParams, params: RequestParams = {}) =>
    this.request<ApiStorageNodeList, any>({
      path: `/cluster/nodes`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNode 驱动状态 [运行中（Ready）,维护中（Maintain）, 离线（Offline)] , 节点状态 [运行中（Ready）,未就绪（NotReady）,未知（Unknown)]
   *
   * @tags Node
   * @name NodesDetail
   * @summary 摘要 获取指定存储节点
   * @request GET:/cluster/nodes/{nodeName}
   */
  nodesDetail = (nodeName?: string, params: RequestParams = {}) =>
    this.request<ApiStorageNode, any>({
      path: `/cluster/nodes/${nodeName}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Node
   * @name NodesCreate
   * @summary Set node enable/disable
   * @request POST:/cluster/nodes/{nodeName}
   */
  nodesCreate = (nodeName: string, body: ApiNodeUpdateReqBody, params: RequestParams = {}) =>
    this.request<ApiNodeUpdateRspBody, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description list StorageNodeDisks 状态枚举 （Active、Inactive、Unknown、Pending、Available、Bound)
   *
   * @tags Node
   * @name NodesDisksDetail
   * @summary 摘要 获取指定存储节点磁盘列表
   * @request GET:/cluster/nodes/{nodeName}/disks
   */
  nodesDisksDetail = ({ nodeName, ...query }: NodesDisksDetailParams, params: RequestParams = {}) =>
    this.request<ApiLocalDiskListByNode, any>({
      path: `/cluster/nodes/${nodeName}/disks`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description post UpdateStorageNodeDisk devicePath i.g /dev/sdb /dev/sdc ...
   *
   * @tags Node
   * @name NodesDisksCreate
   * @summary 摘要 更新磁盘
   * @request POST:/cluster/nodes/{nodeName}/disks/{devicePath}
   */
  nodesDisksCreate = (nodeName: string, devicePath: string, body: ApiDiskReqBody, params: RequestParams = {}) =>
    this.request<ApiDiskReqBody, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}/disks/${devicePath}`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description post SetStorageNodeDiskOwner devicePath i.g /dev/sdb /dev/sdc ...
   *
   * @tags Node
   * @name NodesDisksOwnerCreate
   * @summary 摘要 更新磁盘owner
   * @request POST:/cluster/nodes/{nodeName}/disks/{devicePath}/owner
   */
  nodesDisksOwnerCreate = (nodeName: string, devicePath: string, body: ApiDiskReqBody, params: RequestParams = {}) =>
    this.request<ApiDiskReqBody, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}/disks/${devicePath}/owner`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get GetStorageNodeDisk diskname i.g sdb sdc ...
   *
   * @tags Node
   * @name NodesDisksDetail2
   * @summary 摘要 获取指定磁盘信息
   * @request GET:/cluster/nodes/{nodeName}/disks/{diskName}
   * @originalName nodesDisksDetail
   * @duplicate
   */
  nodesDisksDetail2 = ({ nodeName, diskName, ...query }: NodesDisksDetail2Params, params: RequestParams = {}) =>
    this.request<ApiLocalDiskInfo, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}/disks/${diskName}`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNodeMigrate
   *
   * @tags Node
   * @name NodesMigratesDetail
   * @summary 摘要 获取指定节点数据卷迁移任务列表
   * @request GET:/cluster/nodes/{nodeName}/migrates
   */
  nodesMigratesDetail = ({ nodeName, ...query }: NodesMigratesDetailParams, params: RequestParams = {}) =>
    this.request<ApiVolumeOperationListByNode, any>({
      path: `/cluster/nodes/${nodeName}/migrates`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNodePoolsList
   *
   * @tags Node
   * @name NodesPoolsDetail
   * @summary 摘要 获取指定节点存储池列表信息
   * @request GET:/cluster/nodes/{nodeName}/pools
   */
  nodesPoolsDetail = ({ nodeName, ...query }: NodesPoolsDetailParams, params: RequestParams = {}) =>
    this.request<ApiStoragePoolList, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}/pools`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNodePoolGet
   *
   * @tags Node
   * @name NodesPoolsDetail2
   * @summary 摘要 获取指定节点指定存储池信息
   * @request GET:/cluster/nodes/{nodeName}/pools/{poolName}
   * @originalName nodesPoolsDetail
   * @duplicate
   */
  nodesPoolsDetail2 = (nodeName: string, poolName: string, params: RequestParams = {}) =>
    this.request<ApiStoragePool, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}/pools/${poolName}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNodePoolDisksList
   *
   * @tags Node
   * @name NodesPoolsDisksDetail
   * @summary 摘要 获取指定节点指定存储池磁盘列表信息
   * @request GET:/cluster/nodes/{nodeName}/pools/{poolName}/disks
   */
  nodesPoolsDisksDetail = ({ nodeName, poolName, ...query }: NodesPoolsDisksDetailParams, params: RequestParams = {}) =>
    this.request<ApiLocalDisksItemsList, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}/pools/${poolName}/disks`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description get StorageNodePoolDiskGet
   *
   * @tags Node
   * @name NodesPoolsDisksDetail2
   * @summary 摘要 获取指定节点指定存储池指定磁盘信息
   * @request GET:/cluster/nodes/{nodeName}/pools/{poolName}/disks/{diskName}
   * @originalName nodesPoolsDisksDetail
   * @duplicate
   */
  nodesPoolsDisksDetail2 = (nodeName: string, poolName: string, diskName: string, params: RequestParams = {}) =>
    this.request<ApiLocalDiskInfo, ApiRspFailBody>({
      path: `/cluster/nodes/${nodeName}/pools/${poolName}/disks/${diskName}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
