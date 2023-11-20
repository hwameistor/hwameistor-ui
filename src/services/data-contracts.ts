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

export interface ApiAuthInfoRspBody {
  enabled?: boolean;
}

export interface ApiAuthLogoutRspBody {
  success?: boolean;
}

export interface ApiAuthReqBody {
  accessId?: string;
  secretKey?: string;
}

export interface ApiAuthRspBody {
  expireAt?: number;
  token?: string;
}

export interface ApiDiskReqBody {
  reserve?: boolean;
}

export interface ApiDrbdEnableSetting {
  enable?: boolean;
  state?: ApiState;
  version?: string;
}

export interface ApiDrbdEnableSettingReqBody {
  enable?: boolean;
}

export interface ApiDrbdEnableSettingRspBody {
  data?: ApiDrbdEnableSetting;
}

export interface ApiEvent {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1EventSpec;
  status?: V1Alpha1EventStatus;
}

export interface ApiEventAction {
  eventRecord?: V1Alpha1EventRecord;
  resourceName?: string;
  resourceType?: string;
}

export interface ApiEventActionList {
  items?: ApiEventAction[];
  /** page 信息 */
  pagination?: ApiPagination;
}

export interface ApiLocalDiskInfo {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /** AvailableCapacityBytes 可用容量 */
  availableCapacityBytes?: number;
  /** diskPathShort 磁盘路径简写 */
  diskPathShort?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  /** LocalStoragePooLName 存储池名称 */
  localStoragePooLName?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalDiskSpec;
  status?: V1Alpha1LocalDiskStatus;
  /** TotalCapacityBytes 总容量 */
  totalCapacityBytes?: number;
}

export interface ApiLocalDiskList {
  /** LocalDisks 集群磁盘列表 */
  items?: V1Alpha1LocalDisk[];
}

export interface ApiLocalDiskListByNode {
  /** diskPathShort 磁盘路径简写 */
  diskPathShort?: string;
  /** localDisks 节点磁盘列表 */
  items?: ApiLocalDiskInfo[];
  /** nodeName 节点名称 */
  nodeName?: string;
  /** page 信息 */
  pagination?: ApiPagination;
}

export interface ApiLocalDiskNodeList {
  /** LocalDiskNodes 集群磁盘组列表 */
  items?: V1Alpha1LocalDiskNode[];
}

export interface ApiLocalDisksItemsList {
  /** localDisks 节点磁盘列表 */
  items?: ApiLocalDiskInfo[];
}

export interface ApiModuleState {
  /** 组件名称 */
  name?: string;
  /** 组件状态 运行中 未就绪 */
  state?: ApiState;
}

export interface ApiModuleStatus {
  componentStatus?: V1Alpha1ComponentStatus;
  diskReserveState?: string;
  drbdAdapterCreated?: boolean;
  drbdAdapterCreatedJobNum?: number;
  installedCRDS?: boolean;
  modulesStatus?: ApiModuleState[];
  phase?: string;
}

export interface ApiNodeDiskListByPool {
  /** localDisks 节点磁盘列表 */
  items?: ApiLocalDiskInfo[];
  /** nodeName 节点名称 */
  nodeName?: string;
  /** page 信息 */
  pagination?: ApiPagination;
  /** PoolName 存储池名称 */
  poolName?: string;
}

export interface ApiNodeUpdateReqBody {
  enable?: boolean;
}

export interface ApiNodeUpdateRspBody {
  success?: boolean;
}

export interface ApiOperation {
  /** 详细描述 */
  description?: string;
  /** 结束时间 */
  endTime?: string;
  /** 事件名称 */
  eventName?: string;
  /** 事件类型 */
  eventType?: string;
  /** 操作对象 */
  localVolumeName?: string;
  /** 开始时间 */
  startTime?: string;
  /** 状态 */
  status?: ApiState;
}

export interface ApiOperationMetric {
  items?: ApiOperation[];
  /** page 信息 */
  pagination?: ApiPagination;
}

export interface ApiPagination {
  /** 当前页索引，从 1 开始，为 0 时，会自动重置为默认值 constants.DefaultPage */
  page?: number;
  /**
   * 每页数据量，为 -1 时表示查询全部，为 0 时会重置为默认值
   * constants.DefaultPageSize
   */
  pageSize?: number;
  /** 总页数 */
  pages?: number;
  /** 总共有多少条目，请求时可以不用传递 */
  total?: number;
}

export interface ApiRspFailBody {
  description?: string;
  errcode?: number;
}

export interface ApiSnapshot {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeSnapshotSpec;
  status?: V1Alpha1LocalVolumeSnapshotStatus;
}

export interface ApiSnapshotList {
  items?: ApiSnapshot[];
  /** page 信息 */
  pagination?: ApiPagination;
}

export enum ApiState {
  OperationStateSubmitted = "Submitted",
  OperationStateMigrateAddReplica = "AddReplica",
  OperationStateMigrateSyncReplica = "SyncReplica",
  OperationStateMigratePruneReplica = "PruneReplica",
  OperationStateInProgress = "InProgress",
  OperationStateCompleted = "Completed",
  OperationStateToBeAborted = "ToBeAborted",
  OperationStateAborting = "Cancelled",
  OperationStateAborted = "Aborted",
  OperationStateFailed = "Failed",
  VolumeStateToBeUnmount = "ToBeMounted",
  VolumeStateEmpty = "",
  VolumeStateCreated = "Created",
  VolumeStateCreating = "Creating",
  VolumeStateReady = "Ready",
  VolumeStateNotReady = "NotReady",
  VolumeStateToBeDeleted = "ToBeDeleted",
  VolumeStateDeleted = "Deleted",
  VolumeStateUnknown = "Unknown",
  VolumeReplicaStateInvalid = "Invalid",
  VolumeReplicaStateCreating = "Creating",
  VolumeReplicaStateReady = "Ready",
  VolumeReplicaStateNotReady = "NotReady",
  VolumeReplicaStateToBeDeleted = "ToBeDeleted",
  VolumeReplicaStateDeleted = "Deleted",
  NodeStateReady = "Ready",
  NodeStateMaintain = "Maintain",
  NodeStateOffline = "Offline",
  NodeStateEmpty = "",
  NodeStateUnknown = "Unknown",
  NodeStateReadyAndNotReady = "ReadyAndNotReady",
  NodeStateHealthy = "Healthy",
  NodeStateNotReady = "NotReady",
  DriverStateEmpty = "",
  DriverStateReady = "Ready",
  DriverStateMaintain = "Maintain",
  DriverStateOffline = "Offline",
  DriverStateUnknown = "Unknown",
  LocalDiskUnclaimed = "Unclaimed",
  LocalDiskReleased = "Released",
  LocalDiskClaimed = "Claimed",
  LocalDiskInUse = "Inuse",
  LocalDiskReserved = "Reserved",
  LocalDiskReleaseReserved = "ReleaseReserved",
  LocalDiskEmpty = "",
  LocalDiskClaimedAndUnclaimed = "ClaimedAndUnclaimed",
  LocalDiskPending = "Pending",
  LocalDiskBound = "Bound",
  LocalDiskAvailable = "Available",
  LocalDiskActive = "Active",
  LocalDiskInactive = "Inactive",
  LocalDiskUnknown = "Unknown",
  ModuleStatusRunning = "Running",
  ModuleStatusNotReady = "NotReady",
  DrbdModuleStatusEnabled = "Enabled",
  DrbdModuleStatusDisabled = "Disabled",
  ReservedSucceedState = "Succeed",
  ReservedFailedState = "Failed",
}

export interface ApiStorageNode {
  K8sNode?: V1Node;
  k8SNodeState?: ApiState;
  localDiskNode?: V1Alpha1LocalDiskNode;
  localStorageNode?: V1Alpha1LocalStorageNode;
}

export interface ApiStorageNodeList {
  /** StorageNodes */
  items?: ApiStorageNode[];
  /** page 信息 */
  pagination?: ApiPagination;
}

export interface ApiStorageNodeListByPool {
  /** StorageNodes */
  items?: ApiStorageNode[];
  /** page 信息 */
  pagination?: ApiPagination;
  /** StoragePoolName 存储池名称 */
  storagePoolName?: string;
}

export interface ApiStorageNodePool {
  /**
   * Supported class: HDD, SSD, NVMe
   * +kubebuilder:validation:Enum:=HDD;SSD;NVMe
   */
  class?: string;
  disks?: V1Alpha1LocalDevice[];
  freeCapacityBytes?: number;
  freeVolumeCount?: number;
  /** Supported pool name: HDD_POOL, SSD_POOL, NVMe_POOL */
  name?: string;
  /** NodesName Pool所在节点 */
  nodeName?: string;
  /** VG path */
  path?: string;
  totalCapacityBytes?: number;
  totalVolumeCount?: number;
  /**
   * Supported type: REGULAR
   * +kubebuilder:validation:Enum:=REGULAR
   * +kubebuilder:default:=REGULAR
   */
  type?: string;
  usedCapacityBytes?: number;
  usedVolumeCount?: number;
  volumeCapacityBytesLimit?: number;
  volumes?: string[];
}

export interface ApiStoragePool {
  /** AllocatedCapacityBytes 存储池已经分配存储容量 */
  allocatedCapacityBytes?: number;
  /** createTime 创建时间 */
  createTime?: string;
  items?: ApiStorageNodePool[];
  /** NodesNames Pool所在节点列表 */
  nodeNames?: string[];
  /** Supported pool name: HDD_POOL, SSD_POOL, NVMe_POOL 存储池名称 */
  poolName?: string;
  /** TotalCapacityBytes 存储池对应存储总容量 */
  totalCapacityBytes?: number;
}

export interface ApiStoragePoolExpansionReqBody {
  /** HDD/SSD/NVME */
  diskType?: string;
  nodeName?: string;
  /** local-storage/local-disk-manager */
  owner?: string;
}

export interface ApiStoragePoolExpansionRspBody {
  success?: boolean;
}

export interface ApiStoragePoolList {
  /** storagePools */
  items?: ApiStoragePool[];
  /** page 信息 */
  pagination?: ApiPagination;
}

export interface ApiVolume {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeSpec;
  status?: V1Alpha1LocalVolumeStatus;
}

export interface ApiVolumeConvertInfo {
  replicaNum?: number;
  volumeName?: string;
}

export interface ApiVolumeConvertOperation {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeConvertSpec;
  status?: V1Alpha1LocalVolumeConvertStatus;
}

export interface ApiVolumeConvertReqBody {
  abort?: boolean;
}

export interface ApiVolumeConvertRspBody {
  data?: ApiVolumeConvertInfo;
}

export interface ApiVolumeExpandInfo {
  targetCapacityBytes?: number;
  volumeName?: string;
}

export interface ApiVolumeExpandOperation {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeExpandSpec;
  status?: V1Alpha1LocalVolumeExpandStatus;
}

export interface ApiVolumeExpandReqBody {
  abort?: boolean;
  /** VolumeName     string `json:"volumeName,omitempty"` */
  targetCapacity?: string;
}

export interface ApiVolumeExpandRspBody {
  data?: ApiVolumeExpandInfo;
}

export interface ApiVolumeGroup {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /** Volumes */
  items?: V1Alpha1LocalVolume[];
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeGroupSpec;
  status?: V1Alpha1LocalVolumeGroupStatus;
}

export interface ApiVolumeGroupList {
  /** VolumeGroups */
  items?: ApiVolumeGroup[];
}

export interface ApiVolumeList {
  items?: ApiVolume[];
  /** page 信息 */
  pagination?: ApiPagination;
}

export interface ApiVolumeMigrateInfo {
  selectedNode?: string;
  srcNode?: string;
  volumeName?: string;
}

export interface ApiVolumeMigrateOperation {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeMigrateSpec;
  status?: V1Alpha1LocalVolumeMigrateStatus;
}

export interface ApiVolumeMigrateReqBody {
  abort?: boolean;
  selectedNode?: string;
  srcNode?: string;
}

export interface ApiVolumeMigrateRspBody {
  data?: ApiVolumeMigrateInfo;
}

export interface ApiVolumeOperationByVolume {
  /** VolumeConvertOperations */
  VolumeConvertOperations?: ApiVolumeConvertOperation[];
  /** VolumeExpandOperations */
  VolumeExpandOperations?: ApiVolumeExpandOperation[];
  /**
   * // OperationList
   * OperationList []Operation `json:"items"`
   * VolumeMigrateOperations
   */
  volumeMigrateOperations?: ApiVolumeMigrateOperation[];
  /** VolumeName */
  volumeName?: string;
}

export interface ApiVolumeOperationListByNode {
  /** VolumeOperations */
  items?: ApiVolumeMigrateOperation[];
  /** node name */
  nodeName?: string;
  /** page 信息 */
  pagination?: ApiPagination;
}

export interface ApiVolumeReplica {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeReplicaSpec;
  status?: V1Alpha1LocalVolumeReplicaStatus;
}

export interface ApiVolumeReplicaList {
  /** volume name */
  volumeName?: string;
  /** VolumeReplicas */
  volumeReplicas?: ApiVolumeReplica[];
}

export enum GithubComHwameistorHwameistorPkgApisHwameistorV1Alpha1ConditionStatus {
  ConditionTrue = "True",
  ConditionFalse = "False",
  ConditionUnknown = "Unknown",
}

export enum K8SIoApiCoreV1ConditionStatus {
  ConditionTrue = "True",
  ConditionFalse = "False",
  ConditionUnknown = "Unknown",
}

export interface ResourceQuantity {
  Format?: string;
}

export interface V1AttachedVolume {
  /** DevicePath represents the device path where the volume should be available */
  devicePath?: string;
  /** Name of the attached volume */
  name?: string;
}

export interface V1ConfigMapNodeConfigSource {
  /**
   * KubeletConfigKey declares which key of the referenced ConfigMap corresponds to the KubeletConfiguration structure
   * This field is required in all cases.
   */
  kubeletConfigKey?: string;
  /**
   * Name is the metadata.name of the referenced ConfigMap.
   * This field is required in all cases.
   */
  name?: string;
  /**
   * Namespace is the metadata.namespace of the referenced ConfigMap.
   * This field is required in all cases.
   */
  namespace?: string;
  /**
   * ResourceVersion is the metadata.ResourceVersion of the referenced ConfigMap.
   * This field is forbidden in Node.Spec, and required in Node.Status.
   * +optional
   */
  resourceVersion?: string;
  /**
   * UID is the metadata.UID of the referenced ConfigMap.
   * This field is forbidden in Node.Spec, and required in Node.Status.
   * +optional
   */
  uid?: string;
}

export interface V1ContainerImage {
  /**
   * Names by which this image is known.
   * e.g. ["k8s.gcr.io/hyperkube:v1.0.7", "dockerhub.io/google_containers/hyperkube:v1.0.7"]
   * +optional
   */
  names?: string[];
  /**
   * The size of the image in bytes.
   * +optional
   */
  sizeBytes?: number;
}

export interface V1DaemonEndpoint {
  /** Port number of the given endpoint. */
  Port?: number;
}

export type V1FieldsV1 = object;

export interface V1ManagedFieldsEntry {
  /**
   * APIVersion defines the version of this resource that this field set
   * applies to. The format is "group/version" just like the top-level
   * APIVersion field. It is necessary to track the version of a field
   * set because it cannot be automatically converted.
   */
  apiVersion?: string;
  /**
   * FieldsType is the discriminator for the different fields format and version.
   * There is currently only one possible value: "FieldsV1"
   */
  fieldsType?: string;
  /**
   * FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.
   * +optional
   */
  fieldsV1?: V1FieldsV1;
  /** Manager is an identifier of the workflow managing these fields. */
  manager?: string;
  /**
   * Operation is the type of operation which lead to this ManagedFieldsEntry being created.
   * The only valid values for this field are 'Apply' and 'Update'.
   */
  operation?: V1ManagedFieldsOperationType;
  /**
   * Subresource is the name of the subresource used to update that object, or
   * empty string if the object was updated through the main resource. The
   * value of this field is used to distinguish between managers, even if they
   * share the same name. For example, a status update will be distinct from a
   * regular update using the same manager name.
   * Note that the APIVersion field is not related to the Subresource field and
   * it always corresponds to the version of the main resource.
   */
  subresource?: string;
  /**
   * Time is the timestamp of when the ManagedFields entry was added. The
   * timestamp will also be updated if a field is added, the manager
   * changes any of the owned fields value or removes a field. The
   * timestamp does not update when a field is removed from the entry
   * because another manager took it over.
   * +optional
   */
  time?: string;
}

export enum V1ManagedFieldsOperationType {
  ManagedFieldsOperationApply = "Apply",
  ManagedFieldsOperationUpdate = "Update",
}

export interface V1Node {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  /**
   * Standard object's metadata.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   * +optional
   */
  metadata?: V1ObjectMeta;
  /**
   * Spec defines the behavior of a node.
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   * +optional
   */
  spec?: V1NodeSpec;
  /**
   * Most recently observed status of the node.
   * Populated by the system.
   * Read-only.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   * +optional
   */
  status?: V1NodeStatus;
}

export interface V1NodeAddress {
  /** The node address. */
  address?: string;
  /** Node address type, one of Hostname, ExternalIP or InternalIP. */
  type?: V1NodeAddressType;
}

export enum V1NodeAddressType {
  NodeHostName = "Hostname",
  NodeInternalIP = "InternalIP",
  NodeExternalIP = "ExternalIP",
  NodeInternalDNS = "InternalDNS",
  NodeExternalDNS = "ExternalDNS",
}

export interface V1NodeCondition {
  /**
   * Last time we got an update on a given condition.
   * +optional
   */
  lastHeartbeatTime?: string;
  /**
   * Last time the condition transit from one status to another.
   * +optional
   */
  lastTransitionTime?: string;
  /**
   * Human readable message indicating details about last transition.
   * +optional
   */
  message?: string;
  /**
   * (brief) reason for the condition's last transition.
   * +optional
   */
  reason?: string;
  /** Status of the condition, one of True, False, Unknown. */
  status?: K8SIoApiCoreV1ConditionStatus;
  /** Type of node condition. */
  type?: V1NodeConditionType;
}

export enum V1NodeConditionType {
  NodeReady = "Ready",
  NodeMemoryPressure = "MemoryPressure",
  NodeDiskPressure = "DiskPressure",
  NodePIDPressure = "PIDPressure",
  NodeNetworkUnavailable = "NetworkUnavailable",
}

export interface V1NodeConfigSource {
  /** ConfigMap is a reference to a Node's ConfigMap */
  configMap?: V1ConfigMapNodeConfigSource;
}

export interface V1NodeConfigStatus {
  /**
   * Active reports the checkpointed config the node is actively using.
   * Active will represent either the current version of the Assigned config,
   * or the current LastKnownGood config, depending on whether attempting to use the
   * Assigned config results in an error.
   * +optional
   */
  active?: V1NodeConfigSource;
  /**
   * Assigned reports the checkpointed config the node will try to use.
   * When Node.Spec.ConfigSource is updated, the node checkpoints the associated
   * config payload to local disk, along with a record indicating intended
   * config. The node refers to this record to choose its config checkpoint, and
   * reports this record in Assigned. Assigned only updates in the status after
   * the record has been checkpointed to disk. When the Kubelet is restarted,
   * it tries to make the Assigned config the Active config by loading and
   * validating the checkpointed payload identified by Assigned.
   * +optional
   */
  assigned?: V1NodeConfigSource;
  /**
   * Error describes any problems reconciling the Spec.ConfigSource to the Active config.
   * Errors may occur, for example, attempting to checkpoint Spec.ConfigSource to the local Assigned
   * record, attempting to checkpoint the payload associated with Spec.ConfigSource, attempting
   * to load or validate the Assigned config, etc.
   * Errors may occur at different points while syncing config. Earlier errors (e.g. download or
   * checkpointing errors) will not result in a rollback to LastKnownGood, and may resolve across
   * Kubelet retries. Later errors (e.g. loading or validating a checkpointed config) will result in
   * a rollback to LastKnownGood. In the latter case, it is usually possible to resolve the error
   * by fixing the config assigned in Spec.ConfigSource.
   * You can find additional information for debugging by searching the error message in the Kubelet log.
   * Error is a human-readable description of the error state; machines can check whether or not Error
   * is empty, but should not rely on the stability of the Error text across Kubelet versions.
   * +optional
   */
  error?: string;
  /**
   * LastKnownGood reports the checkpointed config the node will fall back to
   * when it encounters an error attempting to use the Assigned config.
   * The Assigned config becomes the LastKnownGood config when the node determines
   * that the Assigned config is stable and correct.
   * This is currently implemented as a 10-minute soak period starting when the local
   * record of Assigned config is updated. If the Assigned config is Active at the end
   * of this period, it becomes the LastKnownGood. Note that if Spec.ConfigSource is
   * reset to nil (use local defaults), the LastKnownGood is also immediately reset to nil,
   * because the local default config is always assumed good.
   * You should not make assumptions about the node's method of determining config stability
   * and correctness, as this may change or become configurable in the future.
   * +optional
   */
  lastKnownGood?: V1NodeConfigSource;
}

export interface V1NodeDaemonEndpoints {
  /**
   * Endpoint on which Kubelet is listening.
   * +optional
   */
  kubeletEndpoint?: V1DaemonEndpoint;
}

export enum V1NodePhase {
  NodePending = "Pending",
  NodeRunning = "Running",
  NodeTerminated = "Terminated",
}

export interface V1NodeSpec {
  /**
   * Deprecated: Previously used to specify the source of the node's configuration for the DynamicKubeletConfig feature. This feature is removed from Kubelets as of 1.24 and will be fully removed in 1.26.
   * +optional
   */
  configSource?: V1NodeConfigSource;
  /**
   * Deprecated. Not all kubelets will set this field. Remove field after 1.13.
   * see: https://issues.k8s.io/61966
   * +optional
   */
  externalID?: string;
  /**
   * PodCIDR represents the pod IP range assigned to the node.
   * +optional
   */
  podCIDR?: string;
  /**
   * podCIDRs represents the IP ranges assigned to the node for usage by Pods on that node. If this
   * field is specified, the 0th entry must match the podCIDR field. It may contain at most 1 value for
   * each of IPv4 and IPv6.
   * +optional
   * +patchStrategy=merge
   */
  podCIDRs?: string[];
  /**
   * ID of the node assigned by the cloud provider in the format: <ProviderName>://<ProviderSpecificNodeID>
   * +optional
   */
  providerID?: string;
  /**
   * If specified, the node's taints.
   * +optional
   */
  taints?: V1Taint[];
  /**
   * Unschedulable controls node schedulability of new pods. By default, node is schedulable.
   * More info: https://kubernetes.io/docs/concepts/nodes/node/#manual-node-administration
   * +optional
   */
  unschedulable?: boolean;
}

export interface V1NodeStatus {
  /**
   * List of addresses reachable to the node.
   * Queried from cloud provider, if available.
   * More info: https://kubernetes.io/docs/concepts/nodes/node/#addresses
   * Note: This field is declared as mergeable, but the merge key is not sufficiently
   * unique, which can cause data corruption when it is merged. Callers should instead
   * use a full-replacement patch. See http://pr.k8s.io/79391 for an example.
   * +optional
   * +patchMergeKey=type
   * +patchStrategy=merge
   */
  addresses?: V1NodeAddress[];
  /**
   * Allocatable represents the resources of a node that are available for scheduling.
   * Defaults to Capacity.
   * +optional
   */
  allocatable?: V1ResourceList;
  /**
   * Capacity represents the total resources of a node.
   * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
   * +optional
   */
  capacity?: V1ResourceList;
  /**
   * Conditions is an array of current observed node conditions.
   * More info: https://kubernetes.io/docs/concepts/nodes/node/#condition
   * +optional
   * +patchMergeKey=type
   * +patchStrategy=merge
   */
  conditions?: V1NodeCondition[];
  /**
   * Status of the config assigned to the node via the dynamic Kubelet config feature.
   * +optional
   */
  config?: V1NodeConfigStatus;
  /**
   * Endpoints of daemons running on the Node.
   * +optional
   */
  daemonEndpoints?: V1NodeDaemonEndpoints;
  /**
   * List of container images on this node
   * +optional
   */
  images?: V1ContainerImage[];
  /**
   * Set of ids/uuids to uniquely identify the node.
   * More info: https://kubernetes.io/docs/concepts/nodes/node/#info
   * +optional
   */
  nodeInfo?: V1NodeSystemInfo;
  /**
   * NodePhase is the recently observed lifecycle phase of the node.
   * More info: https://kubernetes.io/docs/concepts/nodes/node/#phase
   * The field is never populated, and now is deprecated.
   * +optional
   */
  phase?: V1NodePhase;
  /**
   * List of volumes that are attached to the node.
   * +optional
   */
  volumesAttached?: V1AttachedVolume[];
  /**
   * List of attachable volumes in use (mounted) by the node.
   * +optional
   */
  volumesInUse?: string[];
}

export interface V1NodeSystemInfo {
  /** The Architecture reported by the node */
  architecture?: string;
  /** Boot ID reported by the node. */
  bootID?: string;
  /** ContainerRuntime Version reported by the node through runtime remote API (e.g. containerd://1.4.2). */
  containerRuntimeVersion?: string;
  /** Kernel Version reported by the node from 'uname -r' (e.g. 3.16.0-0.bpo.4-amd64). */
  kernelVersion?: string;
  /** KubeProxy Version reported by the node. */
  kubeProxyVersion?: string;
  /** Kubelet Version reported by the node. */
  kubeletVersion?: string;
  /**
   * MachineID reported by the node. For unique machine identification
   * in the cluster this field is preferred. Learn more from man(5)
   * machine-id: http://man7.org/linux/man-pages/man5/machine-id.5.html
   */
  machineID?: string;
  /** The Operating System reported by the node */
  operatingSystem?: string;
  /** OS Image reported by the node from /etc/os-release (e.g. Debian GNU/Linux 7 (wheezy)). */
  osImage?: string;
  /**
   * SystemUUID reported by the node. For unique machine identification
   * MachineID is preferred. This field is specific to Red Hat hosts
   * https://access.redhat.com/documentation/en-us/red_hat_subscription_management/1/html/rhsm/uuid
   */
  systemUUID?: string;
}

export interface V1ObjectMeta {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be
   * set by external tools to store and retrieve arbitrary metadata. They are not
   * queryable and should be preserved when modifying objects.
   * More info: http://kubernetes.io/docs/user-guide/annotations
   * +optional
   */
  annotations?: Record<string, string>;
  /**
   * Deprecated: ClusterName is a legacy field that was always cleared by
   * the system and never used; it will be removed completely in 1.25.
   *
   * The name in the go struct is changed to help clients detect
   * accidental use.
   *
   * +optional
   */
  clusterName?: string;
  /**
   * CreationTimestamp is a timestamp representing the server time when this object was
   * created. It is not guaranteed to be set in happens-before order across separate operations.
   * Clients may not set this value. It is represented in RFC3339 form and is in UTC.
   *
   * Populated by the system.
   * Read-only.
   * Null for lists.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   * +optional
   */
  creationTimestamp?: string;
  /**
   * Number of seconds allowed for this object to gracefully terminate before
   * it will be removed from the system. Only set when deletionTimestamp is also set.
   * May only be shortened.
   * Read-only.
   * +optional
   */
  deletionGracePeriodSeconds?: number;
  /**
   * DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This
   * field is set by the server when a graceful deletion is requested by the user, and is not
   * directly settable by a client. The resource is expected to be deleted (no longer visible
   * from resource lists, and not reachable by name) after the time in this field, once the
   * finalizers list is empty. As long as the finalizers list contains items, deletion is blocked.
   * Once the deletionTimestamp is set, this value may not be unset or be set further into the
   * future, although it may be shortened or the resource may be deleted prior to this time.
   * For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react
   * by sending a graceful termination signal to the containers in the pod. After that 30 seconds,
   * the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup,
   * remove the pod from the API. In the presence of network partitions, this object may still
   * exist after this timestamp, until an administrator or automated process can determine the
   * resource is fully terminated.
   * If not set, graceful deletion of the object has not been requested.
   *
   * Populated by the system when a graceful deletion is requested.
   * Read-only.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   * +optional
   */
  deletionTimestamp?: string;
  /**
   * Must be empty before the object is deleted from the registry. Each entry
   * is an identifier for the responsible component that will remove the entry
   * from the list. If the deletionTimestamp of the object is non-nil, entries
   * in this list can only be removed.
   * Finalizers may be processed and removed in any order.  Order is NOT enforced
   * because it introduces significant risk of stuck finalizers.
   * finalizers is a shared field, any actor with permission can reorder it.
   * If the finalizer list is processed in order, then this can lead to a situation
   * in which the component responsible for the first finalizer in the list is
   * waiting for a signal (field value, external system, or other) produced by a
   * component responsible for a finalizer later in the list, resulting in a deadlock.
   * Without enforced ordering finalizers are free to order amongst themselves and
   * are not vulnerable to ordering changes in the list.
   * +optional
   * +patchStrategy=merge
   */
  finalizers?: string[];
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique
   * name ONLY IF the Name field has not been provided.
   * If this field is used, the name returned to the client will be different
   * than the name passed. This value will also be combined with a unique suffix.
   * The provided value has the same validation rules as the Name field,
   * and may be truncated by the length of the suffix required to make the value
   * unique on the server.
   *
   * If this field is specified and the generated name exists, the server will return a 409.
   *
   * Applied only if Name is not specified.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   * +optional
   */
  generateName?: string;
  /**
   * A sequence number representing a specific generation of the desired state.
   * Populated by the system. Read-only.
   * +optional
   */
  generation?: number;
  /**
   * Map of string keys and values that can be used to organize and categorize
   * (scope and select) objects. May match selectors of replication controllers
   * and services.
   * More info: http://kubernetes.io/docs/user-guide/labels
   * +optional
   */
  labels?: Record<string, string>;
  /**
   * ManagedFields maps workflow-id and version to the set of fields
   * that are managed by that workflow. This is mostly for internal
   * housekeeping, and users typically shouldn't need to set or
   * understand this field. A workflow can be the user's name, a
   * controller's name, or the name of a specific apply path like
   * "ci-cd". The set of fields is always in the version that the
   * workflow used when modifying the object.
   *
   * +optional
   */
  managedFields?: V1ManagedFieldsEntry[];
  /**
   * Name must be unique within a namespace. Is required when creating resources, although
   * some resources may allow a client to request the generation of an appropriate name
   * automatically. Name is primarily intended for creation idempotence and configuration
   * definition.
   * Cannot be updated.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#names
   * +optional
   */
  name?: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is
   * equivalent to the "default" namespace, but "default" is the canonical representation.
   * Not all objects are required to be scoped to a namespace - the value of this field for
   * those objects will be empty.
   *
   * Must be a DNS_LABEL.
   * Cannot be updated.
   * More info: http://kubernetes.io/docs/user-guide/namespaces
   * +optional
   */
  namespace?: string;
  /**
   * List of objects depended by this object. If ALL objects in the list have
   * been deleted, this object will be garbage collected. If this object is managed by a controller,
   * then an entry in this list will point to this controller, with the controller field set to true.
   * There cannot be more than one managing controller.
   * +optional
   * +patchMergeKey=uid
   * +patchStrategy=merge
   */
  ownerReferences?: V1OwnerReference[];
  /**
   * An opaque value that represents the internal version of this object that can
   * be used by clients to determine when objects have changed. May be used for optimistic
   * concurrency, change detection, and the watch operation on a resource or set of resources.
   * Clients must treat these values as opaque and passed unmodified back to the server.
   * They may only be valid for a particular resource or set of resources.
   *
   * Populated by the system.
   * Read-only.
   * Value must be treated as opaque by clients and .
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   * +optional
   */
  resourceVersion?: string;
  /**
   * Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.
   * +optional
   */
  selfLink?: string;
  /**
   * UID is the unique in time and space value for this object. It is typically generated by
   * the server on successful creation of a resource and is not allowed to change on PUT
   * operations.
   *
   * Populated by the system.
   * Read-only.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   * +optional
   */
  uid?: string;
}

export interface V1ObjectReference {
  /**
   * API version of the referent.
   * +optional
   */
  apiVersion?: string;
  /**
   * If referring to a piece of an object instead of an entire object, this string
   * should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2].
   * For example, if the object reference is to a container within a pod, this would take on a value like:
   * "spec.containers{name}" (where "name" refers to the name of the container that triggered
   * the event) or if no container name is specified "spec.containers[2]" (container with
   * index 2 in this pod). This syntax is chosen only to have some well-defined way of
   * referencing a part of an object.
   * TODO: this design is not final and this field is subject to change in the future.
   * +optional
   */
  fieldPath?: string;
  /**
   * Kind of the referent.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  /**
   * Name of the referent.
   * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   * +optional
   */
  name?: string;
  /**
   * Namespace of the referent.
   * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
   * +optional
   */
  namespace?: string;
  /**
   * Specific resourceVersion to which this reference is made, if any.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   * +optional
   */
  resourceVersion?: string;
  /**
   * UID of the referent.
   * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
   * +optional
   */
  uid?: string;
}

export interface V1OwnerReference {
  /** API version of the referent. */
  apiVersion?: string;
  /**
   * If true, AND if the owner has the "foregroundDeletion" finalizer, then
   * the owner cannot be deleted from the key-value store until this
   * reference is removed.
   * See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion
   * for how the garbage collector interacts with this field and enforces the foreground deletion.
   * Defaults to false.
   * To set this field, a user needs "delete" permission of the owner,
   * otherwise 422 (Unprocessable Entity) will be returned.
   * +optional
   */
  blockOwnerDeletion?: boolean;
  /**
   * If true, this reference points to the managing controller.
   * +optional
   */
  controller?: boolean;
  /**
   * Kind of the referent.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string;
  /**
   * Name of the referent.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#names
   */
  name?: string;
  /**
   * UID of the referent.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   */
  uid?: string;
}

export type V1ResourceList = Record<string, ResourceQuantity>;

export interface V1Taint {
  /**
   * Required. The effect of the taint on pods
   * that do not tolerate the taint.
   * Valid effects are NoSchedule, PreferNoSchedule and NoExecute.
   */
  effect?: V1TaintEffect;
  /** Required. The taint key to be applied to a node. */
  key?: string;
  /**
   * TimeAdded represents the time at which the taint was added.
   * It is only written for NoExecute taints.
   * +optional
   */
  timeAdded?: string;
  /**
   * The taint value corresponding to the taint key.
   * +optional
   */
  value?: string;
}

export enum V1TaintEffect {
  TaintEffectNoSchedule = "NoSchedule",
  TaintEffectPreferNoSchedule = "PreferNoSchedule",
  TaintEffectNoExecute = "NoExecute",
}

export interface V1Alpha1AccessibilityTopology {
  /** Nodes is the collection of storage nodes the volume replicas must locate at */
  nodes?: string[];
  /**
   * regions where the volume replicas should be distributed across, it's Optional
   * +kubebuilder:default:={default}
   */
  regions?: string[];
  /**
   * zones where the volume replicas should be distributed across, it's Optional
   * +kubebuilder:default:={default}
   */
  zones?: string[];
}

export interface V1Alpha1AdmissionControllerStatus {
  health?: string;
  instances?: V1Alpha1DeployStatus;
}

export interface V1Alpha1ApiServerStatus {
  health?: string;
  instances?: V1Alpha1DeployStatus;
}

export interface V1Alpha1ComponentStatus {
  admissionController?: V1Alpha1AdmissionControllerStatus;
  apiServer?: V1Alpha1ApiServerStatus;
  evictor?: V1Alpha1EvictorStatus;
  exporter?: V1Alpha1ExporterStatus;
  localDiskManager?: V1Alpha1LocalDiskManagerStatus;
  localStorage?: V1Alpha1LocalStorageStatus;
  scheduler?: V1Alpha1SchedulerStatus;
}

export interface V1Alpha1DeployStatus {
  availablePodCount?: number;
  desiredPodCount?: number;
  pods?: V1Alpha1PodStatus[];
  workloadName?: string;
  workloadType?: string;
}

export interface V1Alpha1DiskAttributes {
  /**
   * DeviceType represents the type of device like
   * sparse, disk, partition, lvm, crypt
   */
  devType?: string;
  /** FormFactor is the disk size, like 2.5 inches */
  formFactor?: string;
  /** ModelName is the name of disk model */
  modelName?: string;
  /** PCIVendorID is the ID of the PCI vendor, for NVMe disk only */
  pciVendorID?: string;
  /** Product is a class of disks the vendor produces */
  product?: string;
  /** Protocol is for data transport, such as ATA, SCSI, NVMe */
  protocol?: string;
  /** RotationRate is the rate of the disk rotation */
  rotationRate?: number;
  /** SerialNumber is a unique number assigned to a disk */
  serialNumber?: string;
  /** Type is the disk type, such as ata, scsi, nvme, megaraid,N, ... */
  type?: string;
  /** Vendor is who provides the disk */
  vendor?: string;
}

export interface V1Alpha1DiskClaimDescription {
  /** Capacity of the disk in bytes */
  capacity?: number;
  /**
   * Match the device path of Localdisk
   * DevicePaths match all disks if DevicePaths are empty
   */
  devicePaths?: string[];
  /**
   * DiskType represents the type of drive like SSD, HDD etc.,
   * +optional
   */
  diskType?: string;
  /**
   * Match the name of Localdisk
   * LocalDiskNames match all disks if LocalDiskNames are empty
   */
  localDiskNames?: string[];
}

export interface V1Alpha1EventRecord {
  /** The action is the operation on the resource, such as Migrate a LocalVolume */
  action?: string;
  /** The content of the action which is a JSON string */
  actionContent?: string;
  /** id is unique */
  id?: string;
  /** The state of the action */
  state?: string;
  /** The content of the action state which is a JSON string */
  stateContent?: string;
  /** The time when does the action happen */
  time?: string;
}

export interface V1Alpha1EventSpec {
  records?: V1Alpha1EventRecord[];
  /** Name of the resource */
  resourceName?: string;
  /**
   * HwameiStor resource type: Cluster, LocalStorageNode, LocalDiskNode, Pool,  LocalVolume, LocalDiskVolume, LocalDisk,
   * +kubebuilder:validation:Enum:=Cluster;StorageNode;DiskNode;Pool;Volume;DiskVolume;Disk
   */
  resourceType?: string;
}

export type V1Alpha1EventStatus = object;

export interface V1Alpha1EvictorStatus {
  health?: string;
  instances?: V1Alpha1DeployStatus;
}

export interface V1Alpha1ExporterStatus {
  health?: string;
  instances?: V1Alpha1DeployStatus;
}

export interface V1Alpha1FileSystemInfo {
  /**
   * Type represents the FileSystem type of the disk
   * +optional
   */
  fsType?: string;
  /**
   * MountPoint represents the mountpoint of the disk
   * +optional
   */
  mountPoint?: string;
}

export interface V1Alpha1HAState {
  /** Reason is why this state happened */
  reason?: string;
  /** Consistent, Inconsistent, replica is ready only when consistent */
  state?: V1Alpha1State;
}

export interface V1Alpha1LocalDevice {
  /** disk capacity */
  capacityBytes?: number;
  /** e.g. /dev/sdb */
  devPath?: string;
  /** Possible state: Available, Inuse, Offline */
  state?: V1Alpha1State;
  /** Supported: HDD, SSD, NVMe, RAM */
  type?: string;
}

export interface V1Alpha1LocalDisk {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalDiskSpec;
  status?: V1Alpha1LocalDiskStatus;
}

export interface V1Alpha1LocalDiskClaimSpec {
  /**
   * Description of the disk to be claimed
   * +optional
   */
  description?: V1Alpha1DiskClaimDescription;
  /**
   * DiskRefs represents which disks are assigned to the LocalDiskClaim
   * +optional
   */
  diskRefs?: V1ObjectReference[];
  /**
   * +kubebuilder:validation:Required
   * NodeName represents where disk has to be claimed.
   */
  nodeName?: string;
  /**
   * Owner represents which system owns this claim(e.g. local-storage, local-disk-manager)
   * +kubebuilder:validation:Required
   */
  owner?: string;
}

export interface V1Alpha1LocalDiskManagerStatus {
  csi?: V1Alpha1DeployStatus;
  health?: string;
  instances?: V1Alpha1DeployStatus;
}

export interface V1Alpha1LocalDiskNode {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalDiskNodeSpec;
  status?: V1Alpha1LocalDiskNodeStatus;
}

export interface V1Alpha1LocalDiskNodeSpec {
  /** NodeName represent where disk is attached */
  nodeName?: string;
}

export interface V1Alpha1LocalDiskNodeStatus {
  /**
   * Represents the latest available observations of a localstoragenode's current state.
   * +optional
   */
  conditions?: V1Alpha1StorageNodeCondition[];
  /** FreeCapacity indicates the free capacity of all the disks */
  freeCapacity?: number;
  /** FreeDisk */
  freeDisk?: number;
  /**
   * PoolExtendRecords record why disks are joined in the pool
   * +optional
   */
  poolExtendRecords?: Record<string, V1Alpha1LocalDiskClaimSpec[]>;
  /**
   * There may have multiple storage pools in a node.
   * e.g. HDD_POOL, SSD_POOL, NVMe_POOL
   * Pools: poolName -> LocalPool
   */
  pools?: Record<string, V1Alpha1LocalPool>;
  /** State of the Local Storage Node/Member: New, Active, Inactive, Failed */
  state?: V1Alpha1State;
  /** TotalCapacity indicates the capacity of all the disks */
  totalCapacity?: number;
  /** TotalDisk */
  totalDisk?: number;
}

export interface V1Alpha1LocalDiskSpec {
  /** Capacity of the disk in bytes */
  capacity?: number;
  /**
   * ClaimRef is the reference to the LDC which has claimed this LD
   * +optional
   */
  claimRef?: V1ObjectReference;
  /** DevLinks are symbol links for this device */
  devLinks?: string[];
  /** DevicePath is the disk path in the OS */
  devicePath?: string;
  /** DiskAttributes has hardware/static attributes of the disk */
  diskAttributes?: V1Alpha1DiskAttributes;
  /** HasRAID identifies if the disk is a raid disk or not */
  isRaid?: boolean;
  /**
   * Major represents drive used by the device
   * +optional
   */
  major?: string;
  /**
   * Minor is used to distinguish different devices
   * +optional
   */
  minor?: string;
  /**
   * NodeName represents the node where the disk is attached
   * +kubebuilder:validation:Required
   */
  nodeName?: string;
  /**
   * Owner represents which system owns this claim(e.g. local-storage, local-disk-manager)
   * +optional
   */
  owner?: string;
  /**
   * PartitionInfo contains partition information
   * +optional
   */
  partitionInfo?: V1Alpha1PartitionInfo[];
  /** HasPartition represents if the disk has partitions or not */
  partitioned?: boolean;
  /** PreDevicePath represents the last device path in the OS */
  preDevicePath?: string;
  /** PreNodeName represents the node where the disk was attached */
  preNodeName?: string;
  /**
   * RAIDInfo contains RAID information
   * +optional
   */
  raidInfo?: V1Alpha1RAIDInfo;
  /**
   * Reserved represents the disk won't be used in hwameistor later, until it becomes unreserved
   * +optional
   */
  reserved?: boolean;
  /**
   * SmartInfo contains infos collected by smartctl
   * +optional
   */
  smartInfo?: V1Alpha1SmartInfo;
  /**
   * State is the current state of the disk (Active/Inactive/Unknown)
   * +kubebuilder:validation:Enum:=Active;Inactive;Unknown
   */
  state?: V1Alpha1LocalDiskState;
  /** HasSmartInfo identified if the disk supports SMART or not */
  supportSmart?: boolean;
  /** UUID global unique identifier of the disk */
  uuid?: string;
}

export enum V1Alpha1LocalDiskState {
  LocalDiskActive = "Active",
  LocalDiskInactive = "Inactive",
  LocalDiskUnknown = "Unknown",
  LocalDiskEmpty = "",
  LocalDiskPending = "Pending",
  LocalDiskAvailable = "Available",
  LocalDiskBound = "Bound",
}

export interface V1Alpha1LocalDiskStatus {
  /**
   * State represents the claim state of the disk
   * +kubebuilder:validation:Enum:=Bound;Reserved;Available;Pending
   */
  claimState?: V1Alpha1LocalDiskState;
}

export interface V1Alpha1LocalPool {
  /**
   * Supported class: HDD, SSD, NVMe
   * +kubebuilder:validation:Enum:=HDD;SSD;NVMe
   */
  class?: string;
  disks?: V1Alpha1LocalDevice[];
  freeCapacityBytes?: number;
  freeVolumeCount?: number;
  /** Supported pool name: HDD_POOL, SSD_POOL, NVMe_POOL */
  name?: string;
  /** VG path */
  path?: string;
  totalCapacityBytes?: number;
  totalVolumeCount?: number;
  /**
   * Supported type: REGULAR
   * +kubebuilder:validation:Enum:=REGULAR
   * +kubebuilder:default:=REGULAR
   */
  type?: string;
  usedCapacityBytes?: number;
  usedVolumeCount?: number;
  volumeCapacityBytesLimit?: number;
  volumes?: string[];
}

export interface V1Alpha1LocalStorageNode {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalStorageNodeSpec;
  status?: V1Alpha1LocalStorageNodeStatus;
}

export interface V1Alpha1LocalStorageNodeSpec {
  hostname?: string;
  /** IPv4 address is for HA replication traffic */
  storageIP?: string;
  topogoly?: V1Alpha1Topology;
}

export interface V1Alpha1LocalStorageNodeStatus {
  /**
   * Represents the latest available observations of a localstoragenode's current state.
   * +optional
   */
  conditions?: V1Alpha1StorageNodeCondition[];
  /**
   * PoolExtendRecords record why disks are joined in the pool
   * +optional
   */
  poolExtendRecords?: Record<string, V1Alpha1LocalDiskClaimSpec[]>;
  /**
   * There may have multiple storage pools in a node.
   * e.g. HDD_POOL, SSD_POOL, NVMe_POOL
   * Pools: poolName -> LocalPool
   */
  pools?: Record<string, V1Alpha1LocalPool>;
  /** State of the Local Storage Node/Member: New, Active, Inactive, Failed */
  state?: V1Alpha1State;
}

export interface V1Alpha1LocalStorageStatus {
  csi?: V1Alpha1DeployStatus;
  health?: string;
  instances?: V1Alpha1DeployStatus;
}

export interface V1Alpha1LocalVolume {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1Alpha1LocalVolumeSpec;
  status?: V1Alpha1LocalVolumeStatus;
}

export interface V1Alpha1LocalVolumeConvertSpec {
  /** +kubebuilder:default:=false */
  abort?: boolean;
  /**
   * ReplicaNumber is the number of replicas which the volume will be converted to
   * currently, only support the case of converting a non-HA volume to HA
   * +kubebuilder:validation:Minimum:=2
   * +kubebuilder:validation:Maximum:=2
   */
  replicaNumber?: number;
  volumeName?: string;
}

export interface V1Alpha1LocalVolumeConvertStatus {
  message?: string;
  state?: V1Alpha1State;
}

export interface V1Alpha1LocalVolumeExpandSpec {
  /** +kubebuilder:default:=false */
  abort?: boolean;
  /** +kubebuilder:validation:Minimum:=4194304 */
  requiredCapacityBytes?: number;
  volumeName?: string;
}

export interface V1Alpha1LocalVolumeExpandStatus {
  allocatedCapacityBytes?: number;
  message?: string;
  state?: V1Alpha1State;
  /** sub resources at different node. */
  subs?: string[];
}

export interface V1Alpha1LocalVolumeGroupSpec {
  /** Accessibility is the topology requirement of the volume. It describes how to locate and distribute the volume replicas */
  accessibility?: V1Alpha1AccessibilityTopology;
  namespace?: string;
  pods?: string[];
  /** Volumes is the collection of the volumes in the group */
  volumes?: V1Alpha1VolumeInfo[];
}

export type V1Alpha1LocalVolumeGroupStatus = object;

export interface V1Alpha1LocalVolumeMigrateSpec {
  /** +kubebuilder:default:=false */
  abort?: boolean;
  /** +kubebuilder:default:=true */
  migrateAllVols?: boolean;
  /** source NodeNames */
  sourceNode?: string;
  /** suggested target NodeNames */
  targetNodesSuggested?: string[];
  volumeName?: string;
}

export interface V1Alpha1LocalVolumeMigrateStatus {
  /** error message to describe some states */
  message?: string;
  /** record the volume's replica number, it will be set internally */
  originalReplicaNumber?: number;
  /** State of the operation, e.g. submitted, started, completed, abort, ... */
  state?: V1Alpha1State;
  /** record the node where the specified replica is migrated to */
  targetNode?: string;
  /** record all the volumes to be migrated */
  volumes?: string[];
}

export interface V1Alpha1LocalVolumeReplicaSpec {
  /**
   * Delete is to indicate where the replica should be deleted or not.
   * It's different from the regular resource delete interface in Kubernetes.
   * The purpose is to protect it from any mistakes
   * +kubebuilder:default:=false
   */
  delete?: boolean;
  /** NodeName is the assigned node where the volume replica is located */
  nodeName?: string;
  /** PoolName is the name of the storage pool, e.g. LocalStorage_PoolHDD, LocalStorage_PoolSSD, etc.. */
  poolName?: string;
  /** +kubebuilder:validation:Minimum:=4194304 */
  requiredCapacityBytes?: number;
  /** VolumeName is the name of the volume, e.g. pvc-fbf3ffc3-66db-4dae-9032-bda3c61b8f85 */
  volumeName?: string;
  /** VolumeQoS is the QoS of the volume */
  volumeQoS?: V1Alpha1VolumeQoS;
}

export interface V1Alpha1LocalVolumeReplicaStatus {
  /** AllocatedCapacityBytes is the real allocated capacity in bytes */
  allocatedCapacityBytes?: number;
  /**
   * DevicePath is a link path of the StoragePath of the volume replica,
   * e.g. /dev/LocalStorage_PoolHDD/pvc-fbf3ffc3-66db-4dae-9032-bda3c61b8f85
   */
  devPath?: string;
  /** Disks is a list of physical disks where the volume replica is spread cross, especially for striped LVM volume replica */
  disks?: string[];
  /** HAState is state for ha replica, replica.Status.State == Ready only when HAState is Consistent of nil */
  haState?: V1Alpha1HAState;
  /**
   * InUse is one of volume replica's states, which indicates the replica is used by a Pod or not
   * +kubebuilder:default:=false
   */
  inuse?: boolean;
  /** State is the phase of volume replica, e.g. Creating, Ready, NotReady, ToBeDeleted, Deleted */
  state?: V1Alpha1State;
  /** StoragePath is a real path of the volume replica, like /dev/sdg. */
  storagePath?: string;
  /**
   * Synced is the sync state of the volume replica, which is important in HA volume
   * +kubebuilder:default:=false
   */
  synced?: boolean;
}

export interface V1Alpha1LocalVolumeSnapshotSpec {
  /**
   * NOTE: We only take snapshots on the volume replica exist at the moment!
   * Accessibility is the topology requirement of the volume snapshot. It describes how to locate and distribute the volume replicas snapshot.
   */
  accessibility?: V1Alpha1AccessibilityTopology;
  /** +kubebuilder:default:=false */
  delete?: boolean;
  /**
   * RequiredCapacityBytes specifies the space reserved for the snapshot
   * +kubebuilder:validation:Required
   * +kubebuilder:validation:Minimum:=4194304
   */
  requiredCapacityBytes?: number;
  /**
   * SourceVolume specifies the source volume of the snapshot
   * +kubebuilder:validation:Required
   */
  sourceVolume?: string;
}

export interface V1Alpha1LocalVolumeSnapshotStatus {
  /**
   * AllocatedCapacityBytes is the real allocated capacity in bytes
   * In case of HA volume with multiple replicas, the value is equal to the one of a replica's snapshot size
   */
  allocatedCapacityBytes?: number;
  /** Attribute indicates attr on snapshot */
  attr?: V1Alpha1VolumeSnapshotAttr;
  /**
   * CreationTime is the host real snapshot creation time
   * In case of HA volume with multiple replicas, the value is equal to the one of a replica's snapshot creation time
   */
  creationTime?: string;
  /** Message error message to describe some states */
  message?: string;
  /** ReplicaSnapshots represents the actual snapshots of replica */
  replicaSnapshots?: string[];
  /** State is the phase of volume replica, e.g. Creating, Ready, NotReady, ToBeDeleted, Deleted */
  state?: V1Alpha1State;
}

export interface V1Alpha1LocalVolumeSpec {
  /** Accessibility is the topology requirement of the volume. It describes how to locate and distribute the volume replicas */
  accessibility?: V1Alpha1AccessibilityTopology;
  /**
   * Config is the configration for the volume replicas
   * It will be managed by the controller, and watched by all the nodes
   * Important: node will manage volume replica according this config
   */
  config?: V1Alpha1VolumeConfig;
  /**
   * Convertible is to indicate if the non-HA volume can be transitted to HA volume or not
   * +kubebuilder:default:=false
   */
  convertible?: boolean;
  /**
   * Delete is to indicate where the replica should be deleted or not.
   * It's different from the regular resource delete interface in Kubernetes.
   * The purpose is to protect it from any mistakes
   * +kubebuilder:default:=false
   */
  delete?: boolean;
  /** PoolName is the name of the storage pool, e.g. LocalStorage_PoolHDD, LocalStorage_PoolSSD, etc.. */
  poolName?: string;
  /** PersistentVolumeClaimName is the name of the associated PVC */
  pvcName?: string;
  /** PersistentVolumeClaimNamespace is the namespace of the associated PVC */
  pvcNamespace?: string;
  /**
   * replica number: 1 - non-HA, 2 - HA, 4 - migration (temp)
   * +kubebuilder:validation:Minimum:=1
   * +kubebuilder:validation:Maximum:=4
   */
  replicaNumber?: number;
  /** +kubebuilder:validation:Minimum:=4194304 */
  requiredCapacityBytes?: number;
  /** VolumeQoS is the QoS of the volume */
  volumeQoS?: V1Alpha1VolumeQoS;
  /** VolumeGroup is the group name of the local volumes. It is designed for the scheduling and allocating. */
  volumegroup?: string;
}

export interface V1Alpha1LocalVolumeStatus {
  /**
   * AllocatedCapacityBytes is the real allocated capacity in bytes of the volume replicas.
   * In case of HA volume with multiple replicas, the value is equal to the one of a replica's size
   */
  allocatedCapacityBytes?: number;
  /** PublishedFSType is the fstype on this volume */
  fsType?: string;
  /** PublishedNodeName is the node where the volume is published and used by pod */
  publishedNode?: string;
  /**
   * PublishedRawBlock is for raw block
   * +kubebuilder:default:=false
   */
  rawblock?: boolean;
  /** Volume is a logical concept and composed by one or many replicas which will be located at different node. */
  replicas?: string[];
  /** State is the phase of volume replica, e.g. Creating, Ready, NotReady, ToBeDeleted, Deleted */
  state?: V1Alpha1State;
  /** TotalINodes is the total inodes of the volume's filesystem */
  totalInode?: number;
  /** UsedCapacityBytes is the used capacity in bytes of the volume, which is available only for filesystem */
  usedCapacityBytes?: number;
  /** UsedInode is the used inodes of the volume's filesystem */
  usedInode?: number;
}

export interface V1Alpha1PartitionInfo {
  /**
   * FileSystem contains mount point and filesystem type
   * +optional
   */
  filesystem?: V1Alpha1FileSystemInfo;
  /** HasFileSystem represents whether the filesystem is included */
  hasFileSystem?: boolean;
  /** Path represents the partition path in the OS */
  path?: string;
}

export interface V1Alpha1PodStatus {
  name?: string;
  node?: string;
  status?: string;
}

export interface V1Alpha1RAIDInfo {
  /** RAIDMaster is the master of the RAID disk, it works for only RAID slave disk, e.g. /dev/bus/0 */
  raidMaster?: string;
}

export interface V1Alpha1SchedulerStatus {
  health?: string;
  instances?: V1Alpha1DeployStatus;
}

export enum V1Alpha1SmartAssessResult {
  AssessPassed = "Passed",
  AssessFailed = "Failed",
}

export interface V1Alpha1SmartInfo {
  /** OverallHealth identifies if the disk is healthy or not */
  overallHealth?: V1Alpha1SmartAssessResult;
}

export enum V1Alpha1State {
  MountPointStateEmpty = "",
  MountPointToBeMounted = "ToBeMounted",
  MountPointToBeUnMount = "ToBeUnMount",
  MountPointMounted = "Mounted",
  MountPointNotReady = "NotReady",
  NodeStateReady = "Ready",
  NodeStateMaintain = "Maintain",
  NodeStateOffline = "Offline",
  VolumeStateToBeUnmount = "ToBeMounted",
  VolumeStateEmpty = "",
  VolumeStateCreated = "Created",
  VolumeStateCreating = "Creating",
  VolumeStateReady = "Ready",
  VolumeStateNotReady = "NotReady",
  VolumeStateToBeDeleted = "ToBeDeleted",
  VolumeStateDeleted = "Deleted",
  VolumeReplicaStateInvalid = "Invalid",
  VolumeReplicaStateCreating = "Creating",
  VolumeReplicaStateReady = "Ready",
  VolumeReplicaStateNotReady = "NotReady",
  VolumeReplicaStateToBeDeleted = "ToBeDeleted",
  VolumeReplicaStateDeleted = "Deleted",
  HAVolumeReplicaStateConsistent = "Consistent",
  HAVolumeReplicaStateInconsistent = "Inconsistent",
  HAVolumeReplicaStateUp = "Up",
  HAVolumeReplicaStateDown = "Down",
  OperationStateSubmitted = "Submitted",
  OperationStateMigrateAddReplica = "AddReplica",
  OperationStateMigrateSyncReplica = "SyncReplica",
  OperationStateMigratePruneReplica = "PruneReplica",
  OperationStateInProgress = "InProgress",
  OperationStateCompleted = "Completed",
  OperationStateToBeAborted = "ToBeAborted",
  OperationStateAborting = "Cancelled",
  OperationStateAborted = "Aborted",
  OperationStateFailed = "Failed",
  DiskStateAvailable = "Available",
  DiskStateInUse = "InUse",
  DiskStateOffline = "Offline",
}

export interface V1Alpha1StorageNodeCondition {
  /** Last time the condition transitioned from one status to another. */
  lastTransitionTime?: string;
  /** The last time this condition was updated. */
  lastUpdateTime?: string;
  /** A human-readable message indicating details about the transition. */
  message?: string;
  /** The reason for the condition's last transition. */
  reason?: string;
  /** Status of the condition, one of True, False, Unknown. */
  status?: GithubComHwameistorHwameistorPkgApisHwameistorV1Alpha1ConditionStatus;
  /** Type of localstoragenode condition. */
  type?: V1Alpha1StorageNodeConditionType;
}

export enum V1Alpha1StorageNodeConditionType {
  StorageAvailable = "Available",
  StorageUnAvailable = "UnAvailable",
  StorageProgressing = "Progressing",
  StorageExpandFailure = "ExpandFailure",
  StorageExpandSuccess = "ExpandSuccess",
}

export interface V1Alpha1Topology {
  /**
   * Region is a collection of Zones
   * +kubebuilder:default:=default
   */
  region?: string;
  /**
   * Zone is a collection of Local Storage Nodes
   * +kubebuilder:default:=default
   */
  zone?: string;
}

export interface V1Alpha1VolumeConfig {
  /** Convertible is to indicate if the non-HA volume can be transitted to HA volume or not */
  convertible?: boolean;
  initialized?: boolean;
  readyToInitialize?: boolean;
  replicas?: V1Alpha1VolumeReplica[];
  requiredCapacityBytes?: number;
  /** ResourceID is for HA volume, set to '-1' for non-HA volume */
  resourceID?: number;
  /** Version of config, start from 0, plus 1 every time config update */
  version?: number;
  volumeName?: string;
}

export interface V1Alpha1VolumeInfo {
  /** LocalVolumeName is the name of the LocalVolume */
  localvolume?: string;
  /** PersistentVolumeClaimName is the name of the associated PVC */
  pvc?: string;
}

export interface V1Alpha1VolumeQoS {
  /** IOPS defines the IOPS of the volume */
  iops?: string;
  /** Throughput defines the throughput of the volume */
  throughput?: string;
}

export interface V1Alpha1VolumeReplica {
  hostname?: string;
  id?: number;
  ip?: string;
  primary?: boolean;
}

export interface V1Alpha1VolumeSnapshotAttr {
  /** Invalid set true if snapshot is expiration */
  invalid?: boolean;
  /** Merging set true if snapshot is merging now */
  merging?: boolean;
}

export interface EventsListParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** resourceName */
  resourceName?: string;
  /** resourceType */
  resourceType?: string;
  /** sort */
  sort?: string;
}

export interface NodesListParams {
  /** name */
  name?: string;
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** nodeState */
  nodeState?: string;
  /** driverState */
  driverState?: string;
  /** fuzzy */
  fuzzy?: boolean;
  /** sort */
  sort?: boolean;
}

export interface NodesDisksDetailParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** state */
  state?: string;
  /** fuzzy */
  fuzzy?: boolean;
  /** sort */
  sort?: boolean;
  /** nodeName */
  nodeName: string;
}

export interface NodesDisksDetail2Params {
  /** fuzzy */
  fuzzy?: boolean;
  /** sort */
  sort?: boolean;
  /** nodeName */
  nodeName: string;
  /** diskName */
  diskName: string;
}

export interface NodesMigratesDetailParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** migrateOperationName */
  migrateOperationName?: string;
  /** volumeName */
  volumeName?: string;
  /** state */
  state?: string;
  /** nodeName */
  nodeName: string;
}

export interface NodesPoolsDetailParams {
  /** fuzzy */
  fuzzy?: boolean;
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** nodeName */
  nodeName: string;
}

export interface NodesPoolsDisksDetailParams {
  /** fuzzy */
  fuzzy?: boolean;
  /** nodeName */
  nodeName: string;
  /** poolName */
  poolName: string;
}

export interface OperationsListParams {
  /** name */
  name?: string;
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
}

export interface OperationsOperationNameListParams {
  /** eventType */
  eventType: string;
  /** operationName */
  operationName: string;
}

export interface PoolsListParams {
  /** name */
  name?: string;
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** fuzzy */
  fuzzy?: boolean;
  /** sort */
  sort?: boolean;
}

export interface PoolsNodesDetailParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** nodeName */
  nodeName?: string;
  /** state */
  state?: string;
  /** fuzzy */
  fuzzy?: boolean;
  /** sort */
  sort?: boolean;
  /** poolName */
  poolName: string;
}

export interface PoolsNodesDisksDetailParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** fuzzy */
  fuzzy?: boolean;
  /** nodeName */
  nodeName: string;
  /** poolName */
  poolName: string;
}

export interface SnapshotsListParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** snapshotName */
  snapshotName?: string;
  /** state */
  state?: string;
  /** volumeName */
  volumeName?: string;
}

export interface StatusListParams {
  /** name */
  name?: string;
}

export interface VolumegroupsListParams {
  /** name */
  name?: string;
  /** fuzzy */
  fuzzy?: boolean;
  /** sort */
  sort?: boolean;
}

export interface VolumesListParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** volumeName */
  volumeName?: string;
  /** state */
  state?: string;
  /** fuzzy */
  fuzzy?: boolean;
  /** sort */
  sort?: boolean;
}

export interface VolumesEventsDetailParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** action */
  action?: string;
  /** sort */
  sort?: string;
  /** volumeName */
  volumeName: string;
}

export interface VolumesOperationsDetailParams {
  /** volumeEventName */
  volumeEventName?: string;
  /** state */
  state?: string;
  /** volumeName */
  volumeName: string;
}

export interface VolumesReplicasDetailParams {
  /** volumeReplicaName */
  volumeReplicaName?: string;
  /** state */
  state?: string;
  /** volumeName */
  volumeName: string;
}

export interface VolumesSnapshotDetailParams {
  /** page */
  page: number;
  /** pageSize */
  pageSize: number;
  /** state */
  state?: string;
  /** snapshotName */
  snapshotName?: string;
  /** volumeName */
  volumeName: string;
}
