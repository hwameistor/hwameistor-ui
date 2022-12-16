package main

import (
	"fmt"
	routers "github.com/hwameistor/hwameistor-ui/server/router"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/hwameistor/hwameistor-ui/docs"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/spf13/viper"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {

	InitConfig()

	r := gin.Default()
	r = routers.CollectRoute(r)

	docs.SwaggerInfo.Title = "Swagger Example API"
	docs.SwaggerInfo.Description = "This is a sample hwameistor server."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.BasePath = "/apis/hwameistor.io/v1alpha1"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	port := viper.GetString("server.port")
	gin.SetMode(gin.ReleaseMode)
	if port != "" {
		panic(r.Run(":" + port))
	}
	panic(r.Run()) // listen and serve on 0.0.0.0:8081
}

func InitConfig() {
	fmt.Printf("InitConfig start ... ")
	workDir, _ := os.Getwd()
	viper.SetConfigName("application")
	viper.SetConfigType("yml")
	//viper.AddConfigPath(workDir + "/server/config")
	viper.AddConfigPath(workDir)
	err := viper.ReadInConfig()
	if err != nil {
		panic("")
	}
}
