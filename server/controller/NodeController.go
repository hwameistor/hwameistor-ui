package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hwameistor/hwameistor-ui/server/manager"
	"net/http"
	"strconv"
)

type INodeController interface {
	//RestController
	StorageNodeGet(ctx *gin.Context)
	StorageNodeList(ctx *gin.Context)
	StorageNodeMigrateGet(ctx *gin.Context)
	StorageNodeDisksList(ctx *gin.Context)
	StorageNodeVolumeOperationYamlGet(ctx *gin.Context)
}

// NodeController
type NodeController struct {
	m *manager.ServerManager
}

func NewNodeController(m *manager.ServerManager) INodeController {
	return &NodeController{m}
}

// StorageNodeGet godoc
// @Summary 摘要 获取指定存储节点
// @Description get StorageNode 驱动状态 [运行中（Ready）,维护中（Maintain）, 离线（Offline)] , 节点状态 [运行中（Ready）,未就绪（NotReady）,未知（Unknown)]
// @Tags        Node
// @Param       name path string false "name"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.StorageNode
// @Router      /nodes/storagenodes/{name} [get]
func (n *NodeController) StorageNodeGet(ctx *gin.Context) {
	// 获取path中的name
	nodeName := ctx.Param("name")

	if nodeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	sn, err := n.m.StorageNodeController().GetStorageNode(nodeName)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, sn)
}

// StorageNodeList godoc
// @Summary     摘要 获取存储节点列表
// @Description list StorageNode  驱动状态 [运行中（Ready）,维护中（Maintain）, 离线（Offline)] , 节点状态 [运行中（Ready）,未就绪（NotReady）,未知（Unknown)]
// @Tags        Node
// @Param       name query string false "name"
// @Param       page query int32 true "page"
// @Param       pageSize query int32 true "pageSize"
// @Accept      json
// @Produce     json
// @Success     200 {object} api.StorageNodeList
// @Router      /nodes/storagenodes [get]
func (n *NodeController) StorageNodeList(ctx *gin.Context) {

	// 获取path中的page
	page := ctx.Query("page")
	// 获取path中的pageSize
	pageSize := ctx.Query("pageSize")

	p, _ := strconv.ParseInt(page, 10, 32)
	ps, _ := strconv.ParseInt(pageSize, 10, 32)

	sns, err := n.m.StorageNodeController().StorageNodeList(int32(p), int32(ps))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, sns)
}

// StorageNodeMigrateGet godoc
// @Summary     摘要 获取指定节点数据卷迁移任务列表
// @Description get StorageNodeMigrate
// @Tags        Node
// @Param       nodeName path string true "nodeName"
// @Param       page query int32 true "page"
// @Param       pageSize query int32 true "pageSize"
// @Accept      json
// @Produce     json
// @Success     200 {object} api.VolumeOperationListByNode
// @Router      /nodes/storagenode/{nodeName}/migrates [get]
func (n *NodeController) StorageNodeMigrateGet(ctx *gin.Context) {

	// 获取path中的name
	nodeName := ctx.Param("nodeName")
	if nodeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}

	// 获取path中的page
	page := ctx.Query("page")
	// 获取path中的pageSize
	pageSize := ctx.Query("pageSize")

	p, _ := strconv.ParseInt(page, 10, 32)
	ps, _ := strconv.ParseInt(pageSize, 10, 32)

	sns, err := n.m.StorageNodeController().GetStorageNodeMigrate(nodeName, int32(p), int32(ps))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, sns)
}

// StorageNodeDisksList godoc
// @Summary 摘要 获取指定存储节点磁盘列表
// @Description list StorageNodeDisks
// @Tags        Node
// @Param       nodeName path string true "nodeName"
// @Param       page query int32 true "page"
// @Param       pageSize query int32 true "pageSize"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.LocalDiskListByNode
// @Router      /nodes/storagenode/{nodeName}/disks [get]
func (n *NodeController) StorageNodeDisksList(ctx *gin.Context) {
	// 获取path中的name
	nodeName := ctx.Param("nodeName")
	if nodeName == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}

	// 获取path中的page
	page := ctx.Query("page")
	// 获取path中的pageSize
	pageSize := ctx.Query("pageSize")

	p, _ := strconv.ParseInt(page, 10, 32)
	ps, _ := strconv.ParseInt(pageSize, 10, 32)

	lds, err := n.m.StorageNodeController().LocalDiskListByNode(nodeName, int32(p), int32(ps))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, lds)
}

// StorageNodeVolumeOperationYamlGet godoc
// @Summary 摘要 获取节点数据卷操作记录yaml信息
// @Description get StorageNodeVolumeOperationYamlGet
// @Tags        Node
// @Param       migrateOperationName path string true "migrateOperationName"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.YamlData  "成功"
// @Router      /nodes/storagenodeoperations/{migrateOperationName}/yaml [get]
func (n *NodeController) StorageNodeVolumeOperationYamlGet(ctx *gin.Context) {

	// 获取path中的name
	name := ctx.Param("migrateOperationName")
	fmt.Println("StorageNodeVolumeOperationYamlGet name = %v", name)

	if name == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}
	resourceYamlStr, err := n.m.StorageNodeController().GetStorageNodeVolumeMigrateYamlStr(name)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, resourceYamlStr)
}
