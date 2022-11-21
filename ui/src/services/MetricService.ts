import * as fm from './fetch';
import type { empty, Pagination } from './common';

export type GetBaseMetricRequest = empty

export type GetBaseMetricResult = {
  allocatedCapacityBytes: number;
  boundedDiskNum: number;
  claimedNodeNum: number;
  freeCapacityBytes: number;
  healthyDiskNum: number;
  highAvailableVolumeNum: number;
  localVolumeNum: number;
  nonHighAvailableVolumeNum: number;
  reservedCapacityBytes: number;
  totalCapacityBytes: number;
  totalDiskNum: number;
  totalNodeNum: number;
  unHealthyDiskNum: number;
}

export type QueryPoolUsageRequest = empty;
export type UsageItem = {
  name: string;
  totalCapacityBytes: number;
  allocatedCapacityBytes: number;
}
export type QueryPoolUsageResult = {
  storagePoolsUse: UsageItem[];
}

export type QueryTop5NodeUsageRequest = {
  storagePoolClass: string;
}
export type NodeUsageItem = {
  name: string;
}
export type QueryTop5NodeUsageResult = {
  nodeStoragesUse: UsageItem[];
  storagePoolClass: 'HDD' | 'SSD';
}

export type GetComponentStatusRequest = empty
export type ComponentStatusItem = {
  name: string;
  state: 'NotReady' | 'Running';
}
export type GetComponentStatusResult = {
  modulesStatus: ComponentStatusItem[];
}

export type QueryOptionsRequest = {
  name?: string;
  page: number;
  pageSize: number;
}
export type OperationItem = {
  description: string;
  endTime: string;
  eventName: string;
  eventType: string;
  startTime: string;
  status: string;
}
export type QueryOptionsResult = {
  items: OperationItem[];
  pagination: Pagination;
}

export class Metric {
  static GetBaseMetric(req: GetBaseMetricRequest, initReq?: fm.InitReq): Promise<GetBaseMetricResult> {
    return fm.fetchReq<GetBaseMetricRequest, GetBaseMetricResult>(
      '/apis/hwameistor.io/v1alpha1/metrics/basemetric',
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryPoolUsage(req: QueryPoolUsageRequest, initReq?: fm.InitReq): Promise<QueryPoolUsageResult> {
    return fm.fetchReq<QueryPoolUsageRequest, QueryPoolUsageResult>(
      '/apis/hwameistor.io/v1alpha1/metrics/storagepoolusemetric',
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryTop5NodeUsage(req: QueryTop5NodeUsageRequest, initReq?: fm.InitReq): Promise<QueryTop5NodeUsageResult> {
    return fm.fetchReq<QueryTop5NodeUsageRequest, QueryTop5NodeUsageResult>(
      `/apis/hwameistor.io/v1alpha1/metrics/nodestorageusemetric/${req.storagePoolClass}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static GetComponentStatus(req: GetComponentStatusRequest, initReq?: fm.InitReq): Promise<GetComponentStatusResult> {
    return fm.fetchReq<GetComponentStatusRequest, GetComponentStatusResult>(
      '/apis/hwameistor.io/v1alpha1/metrics/modulestatusmetric',
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryOptions(req: QueryOptionsRequest, initReq?: fm.InitReq): Promise<QueryOptionsResult> {
    return fm.fetchReq<QueryOptionsRequest, QueryOptionsResult>(
      `/apis/hwameistor.io/v1alpha1/metrics/operations?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }
}
