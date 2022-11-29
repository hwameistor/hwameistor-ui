import * as fm from './fetch';
import type { Pagination } from './common';

export type QueryPoolsRequest = {
  name?: string;
  page?: number;
  pageSize?: number;
}
export type NodeListItem = {
  allocatedCapacityBytes: number;
  class: string;
  createTime: string;
  name: string;
  nodesNum: number;
  totalCapacityBytes: number;
}
export type QueryPoolsResult = {
  storagePools: NodeListItem[];
  page: Pagination;
}

export type GetPoolRequest = {
  name: string;
}
export type GetPoolResult = {
  allocatedCapacityBytes: number;
  class: string;
  createTime: string;
  name: string;
  nodesNum: number;
  totalCapacityBytes: number;
}

export type QueryPoolNodesRequest = {
  storagePoolName: string;
  page: number;
  pageSize: number;
}
export type PoolNodeItem = {
  allocatedHDDCapacityBytes: number;
  allocatedSSDCapacityBytes: number;
  driverStatus: string;
  ip: string;
  isRaid: boolean;
  name: string;
  nodeState: string;
  totalDiskCount: number;
  totalHDDCapacityBytes: number;
  totalSSDCapacityBytes: number;
  usedDiskCount: number;
}
export type QueryPoolNodesResult = {
  page: Pagination;
  storagePoolName: string;
  storageNodes: PoolNodeItem[];
};

export type QueryPoolNodeDisksRequest = {
  nodeName: string;
  storagePoolName: string;
  page: number;
  pageSize: number;
}
export type PoolNodeDiskItem = {
  availableCapacityBytes: number;
  devPath: string;
  hasRaid: boolean;
  localStoragePooLName: string;
  state: string;
  totalCapacityBytes: number;
  type: string;
}
export type QueryPoolNodeDisksResult = {
  page: Pagination;
  nodeName: string;
  storagePoolName: string;
  localDisks: PoolNodeDiskItem[];
}

export class Pool {
  static QueryPools(req: QueryPoolsRequest, initReq?: fm.InitReq): Promise<QueryPoolsResult> {
    return fm.fetchReq<QueryPoolsRequest, QueryPoolsResult>(
      `/apis/hwameistor.io/v1alpha1/pools/storagepools?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static GetPool(req: GetPoolRequest, initReq?: fm.InitReq): Promise<GetPoolResult> {
    return fm.fetchReq<GetPoolRequest, GetPoolResult>(
      `/apis/hwameistor.io/v1alpha1/pools/storagepools/${req.name}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryPoolNodes(req: QueryPoolNodesRequest, initReq?: fm.InitReq): Promise<QueryPoolNodesResult> {
    return fm.fetchReq<QueryPoolNodesRequest, QueryPoolNodesResult>(
      `/apis/hwameistor.io/v1alpha1/pools/storagepool/${req.storagePoolName}/nodes?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryPoolNodeDisks(req: QueryPoolNodeDisksRequest, initReq?: fm.InitReq): Promise<QueryPoolNodeDisksResult> {
    return fm.fetchReq<QueryPoolNodeDisksRequest, QueryPoolNodeDisksResult>(
      `/apis/hwameistor.io/v1alpha1/pools/storagepool/${req.storagePoolName}/nodes/${req.nodeName}/disks?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }
}
