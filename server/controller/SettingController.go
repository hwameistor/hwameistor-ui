package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/hwameistor/hwameistor-ui/server/manager"
	"net/http"
)

type ISettingController interface {
	//RestController
	EnableDRBDSetting(ctx *gin.Context)
	DRBDSettingGet(ctx *gin.Context)
}

// SettingController
type SettingController struct {
	m *manager.ServerManager
}

func NewSettingController(m *manager.ServerManager) ISettingController {
	return &SettingController{m}
}

// EnableDRBDSetting godoc
// @Summary 摘要 高可用设置
// @Description post EnableDRBDSetting
// @Tags        Setting
// @Param       enabledrbd path string true "enabledrbd"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.DrbdEnableSetting
// @Router      /settings/highavailabilitysetting/{enabledrbd} [post]
func (n *SettingController) EnableDRBDSetting(ctx *gin.Context) {
	// 获取path中的name
	enabledrbd := ctx.Param("enabledrbd")

	if enabledrbd == "" {
		ctx.JSON(http.StatusNonAuthoritativeInfo, nil)
		return
	}

	setting, err := n.m.SettingController().EnableHighAvailability()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, setting)
}

// DRBDSettingGet godoc
// @Summary 摘要 获取高可用设置
// @Description get DRBDSettingGet
// @Tags        Setting
// @Param       enabledrbd path string false "enabledrbd"
// @Accept      json
// @Produce     json
// @Success     200 {object}  api.DrbdEnableSetting
// @Router      /settings/highavailabilitysetting [get]
func (n *SettingController) DRBDSettingGet(ctx *gin.Context) {

	setting, err := n.m.SettingController().GetDRBDSetting()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	ctx.JSON(http.StatusOK, setting)
}
