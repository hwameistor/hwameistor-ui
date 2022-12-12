package hwameistor

import (
	"bytes"
	"context"
	"fmt"
	hwameistorapi "github.com/hwameistor/hwameistor-ui/server/api"
	utils "github.com/hwameistor/hwameistor-ui/server/util"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/cli-runtime/pkg/printers"
	"k8s.io/client-go/kubernetes"
	"math"

	apisv1alpha1 "github.com/hwameistor/hwameistor/pkg/apis/hwameistor/v1alpha1"
	log "github.com/sirupsen/logrus"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// LocalStorageNodeController
type LocalStorageNodeController struct {
	client.Client
	record.EventRecorder

	clientset *kubernetes.Clientset
}

// NewLocalStorageNodeController
func NewLocalStorageNodeController(client client.Client, clientset *kubernetes.Clientset, recorder record.EventRecorder) *LocalStorageNodeController {
	return &LocalStorageNodeController{
		Client:        client,
		EventRecorder: recorder,
		clientset:     clientset,
	}
}

// GetLocalStorageNode
func (lsnController *LocalStorageNodeController) GetLocalStorageNode(key client.ObjectKey) (*apisv1alpha1.LocalStorageNode, error) {
	lsn := &apisv1alpha1.LocalStorageNode{}
	if err := lsnController.Client.Get(context.TODO(), key, lsn); err != nil {
		if !errors.IsNotFound(err) {
			log.WithError(err).Error("Failed to query lsn")
		} else {
			log.Printf("GetLocalStorageNode: not found lsn")
			log.WithError(err)
		}
		return nil, err
	}
	return lsn, nil
}

// StorageNodeList
func (lsnController *LocalStorageNodeController) StorageNodeList(page, pageSize int32) (*hwameistorapi.StorageNodeList, error) {

	var storageNodeList = &hwameistorapi.StorageNodeList{}
	sns, err := lsnController.ListLocalStorageNode()
	if err != nil {
		log.WithError(err).Error("Failed to list ListLocalStorageNode")
		return nil, err
	}

	if len(sns) == 0 {
		return storageNodeList, nil
	}

	storageNodeList.StorageNodes = utils.DataPatination(sns, page, pageSize)

	var pagination = &hwameistorapi.Pagination{}
	pagination.Page = page
	pagination.PageSize = pageSize
	pagination.Total = uint32(len(sns))
	if len(sns) == 0 {
		pagination.Pages = 0
	} else {
		pagination.Pages = int32(math.Ceil(float64(len(sns)) / float64(pageSize)))
	}

	storageNodeList.Page = pagination

	return storageNodeList, nil
}

// ListLocalStorageNode
func (lsnController *LocalStorageNodeController) ListLocalStorageNode() ([]*hwameistorapi.StorageNode, error) {

	lsnList := &apisv1alpha1.LocalStorageNodeList{}
	if err := lsnController.Client.List(context.TODO(), lsnList); err != nil {
		log.WithError(err).Error("Failed to list LocalStorageNodes")
		return nil, err
	}

	var sns []*hwameistorapi.StorageNode
	for i := range lsnList.Items {
		claimedLocaldisks, err := lsnController.listClaimedLocalDiskByNode(lsnList.Items[i].Name)
		if err != nil {
			log.WithError(err).Error("Failed to list listClaimedLocalDiskByNode")
			return nil, err
		}
		localdisks, err := lsnController.ListStorageNodeDisks(lsnList.Items[i].Name)
		if err != nil {
			log.WithError(err).Error("Failed to ListStorageNodeDisks")
			return nil, err
		}
		sn := lsnController.convertStorageNode(lsnList.Items[i])
		sn.TotalDiskCount = int64(len(localdisks))
		sn.UsedDiskCount = int64(len(claimedLocaldisks))
		sn.NodeState = lsnController.getK8SNodeStatus(lsnList.Items[i].Name)
		sns = append(sns, sn)
	}

	return sns, nil
}

// getK8SNodeStatus
func (lsnController *LocalStorageNodeController) getK8SNodeStatus(nodeName string) hwameistorapi.State {
	// list K8S nodes
	nodes, err := lsnController.clientset.CoreV1().Nodes().List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		log.WithError(err).Error("Failed to list k8s nodes")
		return hwameistorapi.NodeStateNotReady
	}
	for _, node := range nodes.Items {
		if node.Name == nodeName {
			return hwameistorapi.State(node.Status.Conditions[len(node.Status.Conditions)-1].Type)
		}
	}
	return ""
}

// convertStorageNode
func (lsnController *LocalStorageNodeController) convertStorageNode(lsn apisv1alpha1.LocalStorageNode) *hwameistorapi.StorageNode {
	sn := &hwameistorapi.StorageNode{}
	sn.Name = lsn.Name
	sn.IP = lsn.Spec.StorageIP
	sn.DriverStatus = lsnController.convertDriverStatus(lsn.Status.State)

	if lsn.Status.State == apisv1alpha1.NodeStateReady {
		for _, pool := range lsn.Status.Pools {
			if pool.Class == hwameistorapi.DiskClassNameHDD {
				sn.TotalHDDCapacityBytes = pool.TotalCapacityBytes
				sn.AllocatedHDDCapacityBytes = pool.UsedCapacityBytes
				//sn.FreeCapacityBytes += pool.FreeCapacityBytes
			} else if pool.Class == hwameistorapi.DiskClassNameSSD {
				sn.TotalSSDCapacityBytes = pool.TotalCapacityBytes
				sn.AllocatedSSDCapacityBytes = pool.UsedCapacityBytes
				//sn.FreeCapacityBytes += pool.FreeCapacityBytes
			}
		}
	}

	return sn
}

// GetStorageNode
func (lsnController *LocalStorageNodeController) GetStorageNode(nodeName string) (*hwameistorapi.StorageNode, error) {
	sns, err := lsnController.ListLocalStorageNode()
	if err != nil {
		log.WithError(err).Error("Failed to ListLocalStorageNode")
		return nil, err
	}

	for _, sn := range sns {
		if sn.Name == nodeName {
			return sn, nil
		}
	}

	return nil, nil
}

func (lsnController *LocalStorageNodeController) GetStorageNodeMigrate(nodeName string, page, pageSize int32) (*hwameistorapi.VolumeOperationListByNode, error) {
	var volumeOperationListByNode = &hwameistorapi.VolumeOperationListByNode{}

	volumeMigrateOperations, err := lsnController.getStorageNodeMigrateOperations(nodeName)
	if err != nil {
		log.WithError(err).Error("Failed to getStorageNodeMigrateOperations")
		return nil, err
	}

	if len(volumeMigrateOperations) == 0 {
		return volumeOperationListByNode, nil
	}

	volumeOperationListByNode.VolumeMigrateOperations = utils.DataPatination(volumeMigrateOperations, page, pageSize)
	volumeOperationListByNode.NodeName = nodeName

	var pagination = &hwameistorapi.Pagination{}
	pagination.Page = page
	pagination.PageSize = pageSize
	if len(volumeMigrateOperations) == 0 {
		pagination.Pages = 0
	} else {
		pagination.Pages = int32(math.Ceil(float64(len(volumeMigrateOperations)) / float64(pageSize)))
	}
	pagination.Total = uint32(len(volumeMigrateOperations))
	volumeOperationListByNode.Page = pagination

	return volumeOperationListByNode, nil
}

// GetStorageNodeMigrate
func (lsnController *LocalStorageNodeController) getStorageNodeMigrateOperations(nodeName string) ([]*hwameistorapi.VolumeMigrateOperation, error) {
	lvmList := apisv1alpha1.LocalVolumeMigrateList{}
	if err := lsnController.Client.List(context.Background(), &lvmList, &client.ListOptions{}); err != nil {
		return nil, err
	}

	fmt.Println("getStorageNodeMigrateOperations lvmList = %v", lvmList)
	var vmos []*hwameistorapi.VolumeMigrateOperation
	for _, lvm := range lvmList.Items {
		//if len(lvm.Spec.TargetNodesSuggested) != 0 {
		//if lvm.Spec.TargetNodesSuggested[0] == nodeName || lvm.Spec.SourceNode == nodeName {
		var vmo = &hwameistorapi.VolumeMigrateOperation{}
		vmo.Name = lvm.Name
		vmo.SourceNode = lvm.Spec.SourceNode
		//vmo.TargetNode = lvm.Spec.TargetNodesSuggested[0]
		vmo.VolumeName = lvm.Spec.VolumeName
		vmo.StartTime = lvm.CreationTimestamp.Time
		vmo.State = hwameistorapi.StateConvert(lvm.Status.State)
		vmos = append(vmos, vmo)
		//}
		//}
	}

	return vmos, nil
}

// listClaimedLocalDiskByNode
func (lsnController *LocalStorageNodeController) listClaimedLocalDiskByNode(nodeName string) ([]apisv1alpha1.LocalDisk, error) {
	diskList := &apisv1alpha1.LocalDiskList{}
	if err := lsnController.Client.List(context.TODO(), diskList); err != nil {
		log.WithError(err).Error("Failed to list LocalDisks")
		return nil, err
	}

	var claimedLocalDisks []apisv1alpha1.LocalDisk
	for i := range diskList.Items {
		if diskList.Items[i].Spec.NodeName == nodeName {
			if diskList.Items[i].Status.State == apisv1alpha1.LocalDiskClaimed {
				claimedLocalDisks = append(claimedLocalDisks, diskList.Items[i])
			}
		}
	}

	return claimedLocalDisks, nil
}

// getAvailableDiskCapacity
func (lsnController *LocalStorageNodeController) getAvailableDiskCapacity(nodeName, devPath, diskClass string) int64 {
	var availableDiskCapacity int64

	nodeKey := client.ObjectKey{
		Name: nodeName,
	}
	if lsn, err := lsnController.GetLocalStorageNode(nodeKey); err != nil {
		for _, pool := range lsn.Status.Pools {
			if pool.Class == diskClass {
				for _, disk := range pool.Disks {
					if disk.DevPath == devPath {
						availableDiskCapacity = disk.CapacityBytes
						break
					}
				}
			}
		}
	}

	return availableDiskCapacity
}

func (lsnController *LocalStorageNodeController) LocalDiskListByNode(nodeName string, page, pageSize int32) (*hwameistorapi.LocalDiskListByNode, error) {

	var localDiskList = &hwameistorapi.LocalDiskListByNode{}

	disks, err := lsnController.ListStorageNodeDisks(nodeName)
	if err != nil {
		log.WithError(err).Error("Failed to ListStorageNodeDisks")
		return nil, err
	}

	var pagination = &hwameistorapi.Pagination{}
	pagination.Page = page
	pagination.PageSize = pageSize
	pagination.Total = uint32(len(disks))

	if len(disks) == 0 {
		return localDiskList, nil
	} else {
		pagination.Pages = int32(math.Ceil(float64(len(disks)) / float64(pageSize)))
	}

	localDiskList.Page = pagination
	localDiskList.LocalDisks = utils.DataPatination(disks, page, pageSize)
	localDiskList.NodeName = nodeName

	return localDiskList, nil
}

// ListStorageNodeDisks
func (lsnController *LocalStorageNodeController) ListStorageNodeDisks(nodeName string) ([]*hwameistorapi.LocalDisk, error) {

	diskList := &apisv1alpha1.LocalDiskList{}
	if err := lsnController.Client.List(context.TODO(), diskList); err != nil {
		log.WithError(err).Error("Failed to list LocalDisks")
		return nil, err
	}

	var disks []*hwameistorapi.LocalDisk
	for i := range diskList.Items {
		if diskList.Items[i].Spec.NodeName == nodeName {
			var disk = &hwameistorapi.LocalDisk{}
			disk.DevPath = diskList.Items[i].Spec.DevicePath
			disk.State = lsnController.convertLocalDiskState(diskList.Items[i].Status.State)
			if diskList.Items[i].Spec.DiskAttributes.Type == hwameistorapi.DiskClassNameHDD {
				disk.LocalStoragePooLName = hwameistorapi.PoolNameForHDD
			} else if diskList.Items[i].Spec.DiskAttributes.Type == hwameistorapi.DiskClassNameSSD {
				disk.LocalStoragePooLName = hwameistorapi.PoolNameForSSD
			}
			disk.Class = diskList.Items[i].Spec.DiskAttributes.Type
			disk.HasRAID = diskList.Items[i].Spec.HasRAID
			disk.TotalCapacityBytes = diskList.Items[i].Spec.Capacity
			availableCapacityBytes := lsnController.getAvailableDiskCapacity(nodeName, diskList.Items[i].Spec.DevicePath, diskList.Items[i].Spec.DiskAttributes.Type)
			disk.AvailableCapacityBytes = availableCapacityBytes
			disks = append(disks, disk)
		}
	}

	return disks, nil
}

// convertLocalDiskState
func (lsnController *LocalStorageNodeController) convertLocalDiskState(state apisv1alpha1.LocalDiskClaimState) hwameistorapi.State {
	switch state {
	case apisv1alpha1.LocalDiskClaimed:
		return hwameistorapi.LocalDiskClaimed

	case apisv1alpha1.LocalDiskReserved:
		return hwameistorapi.LocalDiskReserved

	case apisv1alpha1.LocalDiskUnclaimed:
		return hwameistorapi.LocalDiskUnclaimed

	case apisv1alpha1.LocalDiskInUse:
		return hwameistorapi.LocalDiskInUse

	case apisv1alpha1.LocalDiskReleased:
		return hwameistorapi.LocalDiskReleased
	}

	return ""
}

// convertDriverStatus
func (lsnController *LocalStorageNodeController) convertDriverStatus(state apisv1alpha1.State) hwameistorapi.State {

	switch state {
	case apisv1alpha1.NodeStateReady:
		return hwameistorapi.NodeStateReady

	case apisv1alpha1.NodeStateMaintain:
		return hwameistorapi.NodeStateMaintain

	case apisv1alpha1.NodeStateOffline:
		return hwameistorapi.NodeStateOffline
	}

	return ""
}

// GetLocalVolumeMigrateYamlStr
func (lsnController *LocalStorageNodeController) GetStorageNodeVolumeMigrateYamlStr(resourceName string) (*hwameistorapi.YamlData, error) {
	//lvm := &apisv1alpha1.LocalVolumeMigrate{}
	//if err := lsnController.Client.Get(context.TODO(), client.ObjectKey{Name: resourceName}, lvm); err != nil {
	//	if !errors.IsNotFound(err) {
	//		log.WithError(err).Error("Failed to query localvolumemigrate")
	//	} else {
	//		log.Info("Not found the localvolumemigrate")
	//	}
	//	return "", err
	//}

	lvmList := apisv1alpha1.LocalVolumeMigrateList{}
	if err := lsnController.Client.List(context.Background(), &lvmList, &client.ListOptions{}); err != nil {
		return nil, err
	}
	fmt.Println("GetStorageNodeVolumeMigrateYamlStr lvmList = %v", lvmList)
	var resourceYamlStr string
	var err error
	for _, item := range lvmList.Items {
		if item.Name == resourceName {
			resourceYamlStr, err = lsnController.getResourceYaml(&item)
			fmt.Println("GetLocalVolumeMigrateYamlStr resourceYamlStr = %v", resourceYamlStr)

			if err != nil {
				log.WithError(err).Error("Failed to getResourceYaml")
				return nil, err
			}
		}
	}

	var yamlData = &hwameistorapi.YamlData{}
	yamlData.Data = resourceYamlStr

	return yamlData, nil
}

// getResourceYaml
func (lsnController *LocalStorageNodeController) getResourceYaml(res *apisv1alpha1.LocalVolumeMigrate) (string, error) {

	buf := new(bytes.Buffer)
	fmt.Println("getResourceYaml res.(type) = %v", res)

	res.GetObjectKind().SetGroupVersionKind(schema.GroupVersionKind{
		Group:   groupName,
		Version: versionName,
		Kind:    res.Kind,
	})
	y := printers.YAMLPrinter{}
	err := y.PrintObj(res, buf)
	if err != nil {
		panic(err)
	}

	return buf.String(), nil
}
