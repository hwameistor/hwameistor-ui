import * as fm from './fetch';
import type { Pagination } from './common';

export enum NodeStatus {
  Ready = 'Ready',
  NotReady = 'NotReady',
  Unknown = 'Unknown',
}
export enum DriverStatus {
  Ready = 'Ready',
  Maintain = 'Maintain',
  Offline = 'Offline',
}

export type QueryNodesRequest = {
  name?: string;
  page?: number;
  pageSize?: number;
}
export type NodeListItem = {
  driverStatus: DriverStatus;
  freeCapacityBytes: number;
  ip: string;
  isRaid: true;
  name: string;
  nodeState: NodeStatus;
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

export type GetNodeRequest = {
  name: string;
}
export type GetNodeResult = {
  allocatedHDDCapacityBytes: number;
  allocatedSSDCapacityBytes: number;
  driverStatus: DriverStatus;
  ip: string;
  isRaid: boolean;
  name: string;
  nodeState: NodeStatus;
  totalDiskCount: number;
  totalHDDCapacityBytes: number;
  totalSSDCapacityBytes: number;
  usedDiskCount: number;
}

export type QueryNodeDisksRequest = {
  nodeName: string;
  page: number;
  pageSize: number;
}
export enum DiskState {
  Claimed = 'Claimed',
  UnClaimed = 'UnClaimed',
  Inuse = 'Inuse',
  Released = 'Released',
  Reserved = 'Reserved',
}
export enum DiskType {
  HDD = 'HDD',
  SSD = 'SSD',
  NVMe = 'NVMe',
  RAM = 'RAM',
}
export type NodeDiskItem = {
  availableCapacityBytes: number;
  devPath: string;
  hasRaid: boolean;
  localStoragePooLName: string;
  state: DiskState;
  totalCapacityBytes: number;
  type: DiskType;
}
export type QueryNodeDisksResult = {
  items: NodeDiskItem[];
  nodeName: string;
  pagination: Pagination
}

export type QueryNodeMigratesRequest = {
  nodeName: string;
  page: number;
  pageSize: number;
}
export type NodeMigrateItem = {
  endTime: string;
  name: string;
  sourceNode: string;
  startTime: string;
  state: string;
  targetNode: string;
  volumeName: string;
}
export type QueryNodeMigratesResult = {
  items: NodeMigrateItem[];
  nodeName: string;
  pagination: Pagination
}

export type GetMigrateYamlRequest = {
  migrateOperationName: string;
}
export type GetMigrateYamlResult = {
  data: string;
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

  static GetNode(req: GetNodeRequest, initReq?: fm.InitReq): Promise<GetNodeResult> {
    return fm.fetchReq<GetNodeRequest, GetNodeResult>(
      `/apis/hwameistor.io/v1alpha1/nodes/storagenodes/${req.name}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryNodeDisks(req: QueryNodeDisksRequest, initReq?: fm.InitReq): Promise<QueryNodeDisksResult> {
    return fm.fetchReq<QueryNodeDisksRequest, QueryNodeDisksResult>(
      `/apis/hwameistor.io/v1alpha1/nodes/storagenode/${req.nodeName}/disks?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryNodeMigrates(req: QueryNodeMigratesRequest, initReq?: fm.InitReq): Promise<QueryNodeMigratesResult> {
    return fm.fetchReq<QueryNodeMigratesRequest, QueryNodeMigratesResult>(
      `/apis/hwameistor.io/v1alpha1/nodes/storagenode/${req.nodeName}/migrates?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static GetMigrateYaml(req: GetMigrateYamlRequest, initReq?: fm.InitReq): Promise<GetMigrateYamlResult> {
    return fm.fetchReq<GetMigrateYamlRequest, GetMigrateYamlResult>(
      `/apis/hwameistor.io/v1alpha1/nodes/storagenodeoperations/${req.migrateOperationName}/yaml`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }
}
