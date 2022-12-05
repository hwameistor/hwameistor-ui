package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/hwameistor/hwameistor-ui/server/manager"
)

type IVolumeController interface {
	//RestController
	VolumeGet(ctx *gin.Context)
	VolumeList(ctx *gin.Context)
	VolumeReplicasGet(ctx *gin.Context)
	VolumeReplicaYamlGet(ctx *gin.Context)
	VolumeOperationGet(ctx *gin.Context)
	VolumeOperationYamlGet(ctx *gin.Context)
}

// VolumeController
type VolumeController struct {
	m *manager.ServerManager
}

func NewVolumeController(m *manager.ServerManager) IVolumeController {
	fmt.Println("NewVolumeController start")

	return &VolumeController{m}
}

// VolumeGet godoc
// @Summary     摘要 获取指定数据卷基本信息
// @Description get Volume
// @Tags        Volume
// @Param       name path string true "name"
// @Accept      application/json
// @Produce     application/json
// @Success     200 {object} api.Volume
// @Router      /volumes/volumes/{name} [get]
func (v *VolumeController) VolumeGet(ctx *gin.Context) {
	// 获取path中的name
	volumeName := ctx.Param("name")

	if volumeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	lv, err := v.m.VolumeController().GetLocalVolume(volumeName)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, lv)
}

// VolumeList godoc
// @Summary 摘要 获取数据卷列表信息
// @Description list Volume
// @Tags        Volume
// @Param       name query string false "name"
// @Param       page query int32 true "page"
// @Param       pageSize query int32 true "pageSize"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.VolumeList   "成功"
// @Router      /volumes/volumes [get]
func (v *VolumeController) VolumeList(ctx *gin.Context) {

	// 获取path中的page
	page := ctx.Query("page")
	// 获取path中的pageSize
	pageSize := ctx.Query("pageSize")

	p, _ := strconv.ParseInt(page, 10, 32)
	ps, _ := strconv.ParseInt(pageSize, 10, 32)

	lvs, err := v.m.VolumeController().ListLocalVolume(int32(p), int32(ps))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, lvs)
}

// VolumeReplicasGet godoc
// @Summary 摘要 获取指定数据卷的副本列表信息
// @Description list volumes
// @Tags        Volume
// @Param       volumeName path string true "volumeName"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.VolumeReplicaList  "成功"
// @Router      /volumes/volumereplicas/{volumeName} [get]
func (v *VolumeController) VolumeReplicasGet(ctx *gin.Context) {
	// 获取path中的name
	volumeName := ctx.Param("volumeName")

	if volumeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	lvs, err := v.m.VolumeController().GetVolumeReplicas(volumeName)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, lvs)
}

// VolumeReplicaYamlGet godoc
// @Summary 摘要 查看指定数据卷副本yaml信息
// @Description get VolumeReplicaYaml
// @Tags        Volume
// @Param       volumeReplicaName path string true "volumeReplicaName"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.YamlData  "成功"
// @Router      /volumes/volumereplica/{volumeReplicaName}/yaml [get]
func (v *VolumeController) VolumeReplicaYamlGet(ctx *gin.Context) {

	// 获取path中的name
	name := ctx.Param("volumeReplicaName")

	if name == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	resourceYamlStr, err := v.m.VolumeController().GetLocalVolumeReplicaYamlStr(name)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, resourceYamlStr)
}

// VolumeOperationGet godoc
// @Summary 摘要 获取指定数据卷操作记录信息（目前仅包含迁移运维操作）
// @Description get VolumeOperation
// @Tags        Volume
// @Param       volumeName path string true "volumeName"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.VolumeOperationByVolume      "成功"
// @Router      /volumes/volumeoperations/{volumeName} [get]
func (v *VolumeController) VolumeOperationGet(ctx *gin.Context) {

	// 获取path中的name
	volumeName := ctx.Param("volumeName")

	if volumeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	volumeOperation, err := v.m.VolumeController().GetVolumeOperation(volumeName)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, volumeOperation)
}

// VolumeOperationYamlGet godoc
// @Summary 摘要 获取数据卷操作记录yaml信息
// @Description get VolumeOperationYamlGet
// @Tags        Volume
// @Param       volumeOperationName path string true "volumeOperationName"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.YamlData  "成功"
// @Router      /volumes/volumeoperation/{volumeOperationName}/yaml [get]
func (v *VolumeController) VolumeOperationYamlGet(ctx *gin.Context) {

	// 获取path中的name
	name := ctx.Param("volumeOperationName")

	if name == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	resourceYamlStr, err := v.m.VolumeController().GetLocalVolumeMigrateYamlStr(name)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, resourceYamlStr)
}
