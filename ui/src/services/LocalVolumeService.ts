import * as fm from './fetch';
import type { Pagination } from './common';

export type QueryLocalVolumesRequest = {
  name?: string;
  page?: number;
  pageSize?: number;
}
export type LocalVolumeItem = {
  convertible: boolean;
  createTime: string;
  name: string;
  pvcName: string;
  pvcNamespace: string;
  replicaNumber: number;
  requiredCapacityBytes: number;
  state: string;
  volumeGroup: string;
}
export type QueryLocalVolumesResult = {
  items: LocalVolumeItem[];
  pagination: Pagination;
}

export type GetLocalVolumeRequest = {
  name: string;
}
export type GetLocalVolumeResult = {
  convertible: boolean;
  createTime: string;
  name: string;
  pvcName: string;
  pvcNamespace: string;
  replicaNumber: number;
  requiredCapacityBytes: number;
  state: string;
  volumeGroup: string;
}

export type QueryLocalVolumeReplicasRequest = {
  volumeName: string;
}
export type VolumeReplicaItem = {
  devicePath: string;
  name: string;
  nodeName: string;
  requiredCapacityBytes: number;
  state: string;
  storagePath: string;
  synced: boolean;
}
export type QueryLocalVolumeReplicasResult = {
  volumeName: string;
  volumeReplicas: VolumeReplicaItem[];
}

export type GetLocalVolumeReplicaYamlRequest = {
  volumeReplicaName: string;
}
export type GetLocalVolumeReplicaYamlResult = {
  data: string;
}

export type QueryLocalVolumeOperationsRequest = {
  volumeName: string;
}
export type VolumeOperationItem = {
  endTime: string;
  name: string;
  sourceNode: string;
  startTime: string;
  state: string;
  targetNode: string;
  volumeName: string;
}
export type QueryLocalVolumeOperationsResult = {
  volumeName: string;
  items: VolumeOperationItem[];
}

export type GetLocalVolumeOperationYamlRequest = {
  volumeOperationName: string;
}
export type GetLocalVolumeOperationYamlResult = {
  data: string;
}

export class LocalVolume {
  static QueryLocalVolumes(req: QueryLocalVolumesRequest, initReq?: fm.InitReq): Promise<QueryLocalVolumesResult> {
    return fm.fetchReq<QueryLocalVolumesRequest, QueryLocalVolumesResult>(
      `/apis/hwameistor.io/v1alpha1/volumes/volumes?${fm.renderURLSearchParams(req, [])}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static GetLocalVolume(req: GetLocalVolumeRequest, initReq?: fm.InitReq): Promise<GetLocalVolumeResult> {
    return fm.fetchReq<GetLocalVolumeRequest, GetLocalVolumeResult>(
      `/apis/hwameistor.io/v1alpha1/volumes/volumes/${req.name}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryLocalVolumeReplicas(req: QueryLocalVolumeReplicasRequest, initReq?: fm.InitReq): Promise<QueryLocalVolumeReplicasResult> {
    return fm.fetchReq<QueryLocalVolumeReplicasRequest, QueryLocalVolumeReplicasResult>(
      `/apis/hwameistor.io/v1alpha1/volumes/volumereplicas/${req.volumeName}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static GetLocalVolumeReplicaYaml(req: GetLocalVolumeReplicaYamlRequest, initReq?: fm.InitReq): Promise<GetLocalVolumeReplicaYamlResult> {
    return fm.fetchReq<GetLocalVolumeReplicaYamlRequest, GetLocalVolumeReplicaYamlResult>(
      `/apis/hwameistor.io/v1alpha1/volumes/volumereplica/${req.volumeReplicaName}/yaml`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static QueryLocalVolumeOperations(req: QueryLocalVolumeOperationsRequest, initReq?: fm.InitReq): Promise<QueryLocalVolumeOperationsResult> {
    return fm.fetchReq<QueryLocalVolumeOperationsRequest, QueryLocalVolumeOperationsResult>(
      `/apis/hwameistor.io/v1alpha1/volumes/volumeoperations/${req.volumeName}`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }

  static GetLocalVolumeOperationYaml(req: GetLocalVolumeOperationYamlRequest, initReq?: fm.InitReq): Promise<GetLocalVolumeOperationYamlResult> {
    return fm.fetchReq<GetLocalVolumeOperationYamlRequest, GetLocalVolumeOperationYamlResult>(
      `/apis/hwameistor.io/v1alpha1/volumes/volumeoperation/${req.volumeOperationName}/yaml`,
      {
        ...initReq,
        method: 'GET',
      },
    );
  }
}
