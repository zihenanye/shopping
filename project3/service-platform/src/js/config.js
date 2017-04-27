angular.module("app")
    //配置路由状态  配stateProvider服务的视图控制
    .config(function ($stateProvider, $urlRouterProvider) {
        //重定向
        $urlRouterProvider.otherwise('/grouppage/checkpage');
        //活动管理默认活动介绍
        $urlRouterProvider.when('/grouppage','/grouppage/checkpage');
        $stateProvider
            .state({
                name: "index",
                url: "/indexpage",
                title: "首页",
                templateUrl: "./pages/index.html"
            })
            .state({
                name: "group",
                url: "/grouppage",
                title: "社区团体活动服务",
                templateUrl: "./pages/group.html"
            })
            .state({
                name: "organize",
                url: "/organizepage",
                title: "党组织活动服务",
                templateUrl: "./pages/organize.html"
            })
            .state({
                name: "autonomy",
                url: "/autonomypage",
                title: "居民自治活动服务",
                templateUrl: "./pages/autonomy.html"
            })
            .state({
                name: "group.introduce",
                url: "/introducepage",
                title: "活动介绍",
                templateUrl: "./pages/introduce.html",
                controller:function($scope){
                    //点击发送，追加评论
                    $scope.send=function(){
                        var txt=$("#txt").val();
                        if(txt==""){
                            alert("请输入回复内容")
                        }else{
                            var today=new Date(),
                                year=today.getFullYear(),
                                month=today.getMonth()+1,
                                day=today.getDate(),
                                hour=today.getHours(),
                                minutes=today.getMinutes();
                            $(".comment ul").append("<li>" +
                                "<div class='col-md-8'>"+txt+"</div>" +
                                "<div class='col-md-4'><time>"+year+"-"+month+"-"+day+" "+hour+":"+minutes+"</time> <a>回复</a>" +
                                "</div>" +
                                "</li>");
                        }
                    };
                    //点击回复
                    var reply=$(".reply");
                    console.log(reply)
                    $(".comment .col-md-4").on("click",reply,function(){
                        var user=$(this).prev().find($(".user")).text()
                        //console.log(user)
                        //文本框获取焦点
                        $("#txt").focus().val("回复"+user+ ":" );

                    })
                }
            })
            .state({
                name: "group.check",
                url: "/checkpage",
                title: "查看活动",
                templateUrl: "./pages/check.html"
            })
            .state({
                name: "group.sum",
                url: "/sumpage",
                title: "活动总结",
                templateUrl: "./pages/sum.html"
            })
            .state({
                name: "group.details",
                url: "/detailspage",
                title: "活动详情",
                templateUrl: "./pages/details.html"
            })

    })

    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParam, prev, prevParam) {
            $rootScope.title = next.title
        });

    })
    .directive("inputFile", function () {
        return {
            template: ' <div class="input-file">' +
            '<label for="{{inputId}}"></label>' +
            '<input type="file" id="{{inputId}}">' +
            '</div>',
            restrict: 'E',
            scope: {},
            controller: function ($scope) {
                $scope.inputId = 'inputFile' + $scope.$id;
            },
            link: function (scope, ele) {
                var inputFile = ele.find("div");
                var input = $(inputFile).find('input');
                input.on("change", function () {
                    var reader = new FileReader();
                    reader.readAsDataURL(this.files[0]);
                    reader.onload = function () {
                        //console.log(reader.result);
                        console.log( $(inputFile).find("label")[0])
                       $(inputFile).find("label")[0].style.background='url('+this.result+') no-repeat center center'
                    }
                })
            }
        }
    })