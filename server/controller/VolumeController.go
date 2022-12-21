package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
	hwameistorapi "github.com/hwameistor/hwameistor-ui/server/api"
	"github.com/hwameistor/hwameistor-ui/server/manager"
	"net/http"
	"strconv"
)

type IVolumeController interface {
	//RestController
	VolumeGet(ctx *gin.Context)
	VolumeList(ctx *gin.Context)
	VolumeYamlGet(ctx *gin.Context)
	VolumeReplicasGet(ctx *gin.Context)
	VolumeReplicaYamlGet(ctx *gin.Context)
	VolumeOperationGet(ctx *gin.Context)
	VolumeMigrateOperation(ctx *gin.Context)
	VolumeConvertOperation(ctx *gin.Context)
	VolumeOperationYamlGet(ctx *gin.Context)
	GetTargetNodesByManualTargetNodeType(ctx *gin.Context)
	VolumeListWithSameVolumeGroup(ctx *gin.Context)
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
// @Param       page query int32 true "page"
// @Param       pageSize query int32 true "pageSize"
// @Param       volumeName query string false "volumeName"
// @Param       state query string false "state"
// @Param       namespace query string false "namespace"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.VolumeList   "成功"
// @Router      /volumes/volumes [get]
func (v *VolumeController) VolumeList(ctx *gin.Context) {

	// 获取path中的page
	page := ctx.Query("page")
	// 获取path中的pageSize
	pageSize := ctx.Query("pageSize")
	// 获取path中的volumeName
	volumeName := ctx.Query("volumeName")
	fmt.Println("VolumeList volumeName = %v", volumeName)
	// 获取path中的state
	state := ctx.Query("state")
	// 获取path中的namespace
	namespace := ctx.Query("namespace")

	p, _ := strconv.ParseInt(page, 10, 32)
	ps, _ := strconv.ParseInt(pageSize, 10, 32)

	var queryPage hwameistorapi.QueryPage
	queryPage.Page = int32(p)
	queryPage.PageSize = int32(ps)
	queryPage.VolumeName = volumeName
	queryPage.VolumeState = hwameistorapi.VolumeStatefuzzyConvert(state)
	queryPage.NameSpace = namespace

	lvs, err := v.m.VolumeController().ListLocalVolume(queryPage)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, lvs)
}

// VolumeYamlGet godoc
// @Summary 摘要 获取数据卷yaml信息
// @Description get VolumeYamlGet
// @Tags        Volume
// @Param       name path string true "name"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.YamlData  "成功"
// @Router      /volumes/volume/{name}/yaml [get]
func (v *VolumeController) VolumeYamlGet(ctx *gin.Context) {

	// 获取path中的name
	name := ctx.Param("name")

	if name == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	resourceYamlStr, err := v.m.VolumeController().GetLocalVolumeYamlStr(name)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, resourceYamlStr)
}

// VolumeReplicasGet godoc
// @Summary 摘要 获取指定数据卷的副本列表信息
// @Description list volumes
// @Tags        Volume
// @Param       volumeName path string true "volumeName"
// @Param       volumeReplicaName query string false "volumeReplicaName"
// @Param       state query string false "state"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.VolumeReplicaList  "成功"
// @Router      /volumes/volumereplicas/{volumeName} [get]
func (v *VolumeController) VolumeReplicasGet(ctx *gin.Context) {
	// 获取path中的name
	volumeName := ctx.Param("volumeName")

	// 获取path中的volumeReplicaName
	volumeReplicaName := ctx.Query("volumeReplicaName")
	// 获取path中的state
	state := ctx.Query("state")

	if volumeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}

	var queryPage hwameistorapi.QueryPage
	queryPage.VolumeReplicaName = volumeReplicaName
	queryPage.VolumeState = hwameistorapi.VolumeStatefuzzyConvert(state)
	queryPage.VolumeName = volumeName

	lvs, err := v.m.VolumeController().GetVolumeReplicas(queryPage)
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
// @Param       volumeMigrateName query string false "volumeMigrateName"
// @Param       state query string false "state"
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

	// 获取path中的volumeMigrateName
	volumeMigrateName := ctx.Query("volumeMigrateName")
	// 获取path中的state
	state := ctx.Query("state")

	var queryPage hwameistorapi.QueryPage
	queryPage.VolumeMigrateName = volumeMigrateName
	queryPage.VolumeState = hwameistorapi.VolumeStatefuzzyConvert(state)
	queryPage.VolumeName = volumeName

	volumeOperation, err := v.m.VolumeController().GetVolumeOperation(queryPage)
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

// VolumeMigrateOperation godoc
// @Summary 摘要 指定数据卷迁移操作
// @Description post VolumeMigrateOperation body i.g. body { SrcNode string ,SelectedNode string}
// @Tags        Volume
// @Param       volumeName path string true "volumeName"
// @Param       body body api.VolumeMigrateReqBody true "reqBody"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.VolumeMigrateRspBody      "成功"
// @Failure     500 {object}  api.RspFailBody "失败"
// @Router      /volumes/volumeoperation/{volumeName}/migrate [post]
func (v *VolumeController) VolumeMigrateOperation(ctx *gin.Context) {

	// 获取path中的name
	name := ctx.Param("volumeName")
	fmt.Println("VolumeMigrateOperation name = %v", name)

	if name == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}

	var vmrb hwameistorapi.VolumeMigrateReqBody
	err := ctx.ShouldBind(&vmrb)
	if err != nil {
		fmt.Errorf("Unmarshal err = %v", err)
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}

	sourceNodeName := vmrb.SrcNode
	targetNodeName := vmrb.SelectedNode

	fmt.Println("VolumeMigrateOperation sourceNodeName = %v, targetNodeName = %v", sourceNodeName, targetNodeName)

	volumeMigrate, err := v.m.VolumeController().CreateVolumeMigrate(name, sourceNodeName, targetNodeName)
	if err != nil {
		var failRsp hwameistorapi.RspFailBody
		failRsp.ErrCode = 500
		failRsp.Desc = "VolumeMigrateOperation Failed: " + err.Error()
		ctx.JSON(http.StatusInternalServerError, failRsp)
		return
	}
	ctx.JSON(http.StatusOK, volumeMigrate)
}

// VolumeConvertOperation godoc
// @Summary 摘要 指定数据卷转换操作
// @Description post VolumeConvertOperation
// @Tags        Volume
// @Param       body body api.VolumeConvertReqBody true "volumeName"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.VolumeConvertRspBody      "成功"
// @Failure     500 {object}  api.RspFailBody "失败"
// @Router      /volumes/volumeoperation/{volumeName}/convert [post]
func (v *VolumeController) VolumeConvertOperation(ctx *gin.Context) {

	//// 获取path中的name
	//name := ctx.Param("volumeName")

	var vcrb hwameistorapi.VolumeConvertReqBody
	err := ctx.ShouldBind(&vcrb)
	if err != nil {
		fmt.Errorf("Unmarshal err = %v", err)
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	volumeName := vcrb.VolumeName

	fmt.Println("VolumeConvertOperation volumeName = %v", volumeName)
	if volumeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}

	volumeConvert, err := v.m.VolumeController().CreateVolumeConvert(volumeName)
	if err != nil {
		var failRsp hwameistorapi.RspFailBody
		failRsp.ErrCode = 500
		failRsp.Desc = "VolumeConvertOperation Failed: " + err.Error()
		ctx.JSON(http.StatusInternalServerError, failRsp)
		return
	}

	ctx.JSON(http.StatusOK, volumeConvert)
}

// GetTargetNodesByManualTargetNodeType godoc
// @Summary 摘要 获取手动目标节点类型节点列表
// @Description get GetTargetNodesByManualTargetNodeType  targetNodeType default "ManualSelect"
// @Tags        Volume
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.TargetNodeList      "成功"
// @Router      /volumes/volumemigrateoperation/targetnodes [get]
func (v *VolumeController) GetTargetNodesByManualTargetNodeType(ctx *gin.Context) {

	targetNodeList, err := v.m.VolumeController().GetTargetNodesByManualTargetNodeType()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, targetNodeList)
}

// VolumeListWithSameVolumeGroup godoc
// @Summary     摘要 获取同一数据卷组中包含数据卷名称列表信息
// @Description get VolumeListWithSameVolumeGroup
// @Tags        Volume
// @Param       volumeName path string true "volumeName"
// @Accept      application/json
// @Produce     application/json
// @Success     200 {object} api.MigrateVolumeGroupVolumeInfos
// @Router      /volumes/volumemigrateoperation/{volumeName}/volumelist [get]
func (v *VolumeController) VolumeListWithSameVolumeGroup(ctx *gin.Context) {
	// 获取path中的name
	volumeName := ctx.Param("volumeName")

	if volumeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	volumeinfos, err := v.m.VolumeController().VolumeListWithSameVolumeGroup(volumeName)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, volumeinfos)
}
