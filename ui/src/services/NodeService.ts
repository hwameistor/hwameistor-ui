import * as fm from './fetch';
import type { Pagination } from './common';

export type QueryNodesRequest = {
  name?: string;
  page?: number;
  pageSize?: number;
}
export type NodeListItem = {
  driverStatus: string;
  freeCapacityBytes: number;
  ip: string;
  isRaid: true;
  name: string;
  nodeState: string;
  totalDiskCount: number;
  totalHDDCapacityBytes: number;
  totalSSDCapacityBytes: number;
  usedDiskCount: number;
  allocatedHDDCapacityBytes: number;
  allocatedSSDCapacityBytes: number;
}
export type QueryNodesResult = {
  items: NodeListItem[];
  pagination: Pagination;
}

export class Node {
  static QueryNodes(req: QueryNodesRequest, initReq?: fm.InitReq): Promise<QueryNodesResult> {
    return fm.fetchReq<QueryNodesRequest, QueryNodesResult>(
      `/apis/hwameistor.io/v1alpha1/nodes/storagenodes?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }
}
