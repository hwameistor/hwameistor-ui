package hwameistor

import (
	"context"
	"fmt"
	hwameistorapi "github.com/hwameistor/hwameistor-ui/server/api"
	apisv1alpha1 "github.com/hwameistor/hwameistor/pkg/apis/hwameistor/v1alpha1"
	log "github.com/sirupsen/logrus"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// VolumeGroupController
type VolumeGroupController struct {
	client.Client
	record.EventRecorder

	clientset *kubernetes.Clientset
}

// NewVolumeGroupController
func NewVolumeGroupController(client client.Client, clientset *kubernetes.Clientset, recorder record.EventRecorder) *VolumeGroupController {
	return &VolumeGroupController{
		Client:        client,
		EventRecorder: recorder,
		clientset:     clientset,
	}
}

// ListVolumesByVolumeGroup
func (lvController *VolumeGroupController) ListVolumesByVolumeGroup(vgName string) (*hwameistorapi.VolumeGroup, error) {
	var vg = &hwameistorapi.VolumeGroup{}
	lvg := &apisv1alpha1.LocalVolumeGroup{}
	if err := lvController.Client.Get(context.TODO(), client.ObjectKey{Name: vgName}, lvg); err != nil {
		if !errors.IsNotFound(err) {
			log.WithError(err).Error("Failed to query LocalVolumeGroup")
		} else {
			log.Info("Not found the LocalVolumeGroup")
		}
		return nil, err
	}

	fmt.Println("ListVolumesByVolumeGroup lvg.Name = %v, lvg.Spec.Volumes = %v", lvg.Name, lvg.Spec.Volumes)
	vg.Name = lvg.Name

	var volumeName string
	for _, volumeinfo := range lvg.Spec.Volumes {
		vg.VolumeNames = append(vg.VolumeNames, volumeinfo.LocalVolumeName)

		if volumeName == "" {
			volumeName = volumeinfo.LocalVolumeName
		}
	}

	fmt.Println("ListVolumesByVolumeGroup volumeName = %v", volumeName)
	lv := &apisv1alpha1.LocalVolume{}
	if err := lvController.Client.Get(context.TODO(), client.ObjectKey{Name: volumeName}, lv); err != nil {
		if !errors.IsNotFound(err) {
			log.WithError(err).Error("Failed to query localvolume")
		} else {
			log.Info("Not found the localvolume")
		}
		return nil, err
	}
	for _, replicas := range lv.Spec.Config.Replicas {
		vg.NodeNames = append(vg.NodeNames, replicas.Hostname)
	}

	return vg, nil
}
