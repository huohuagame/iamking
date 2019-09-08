
var HHSDK = HHSDK || {

	init(){
		console.log("HHSDK init");

		var app_name = "数独";
    	var app_id = "a3GPgnjzbnN1";
    	var sdk_script_url = "//newidea4-gamecenter-frontend.1sapp.com/sdk/prod/h5.v1.0.0.js?spread=required";	

    	console.log("########## 趣头条 SDK 初始化 ##########");
        
        var script_sdk = document.createElement("script");
        script_sdk.setAttribute("type", "text/javascript");
        script_sdk.src = sdk_script_url;
        document.body.appendChild(script_sdk)

        var oMeta = document.createElement('meta');
        oMeta.name = 'app_id';
        oMeta.content = app_id;
        document.getElementsByTagName('head')[0].appendChild(oMeta);

        document.title = app_name;

		return HHSDK;
	},
	
	showBanner(){
		console.log("Js Log:","showBanner");

        if (qttGame) {
            qttGame.showBanner();
			SendUnityMessage("ShowBanner")
        } else {
            console.log("Js Log:","qttGame is null");
        }

	},
	closeBanner(){
		console.log("Js Log:","closeBanner");

		if (qttGame) {
            qttGame.hideBanner();
			SendUnityMessage("CloseBanner")
        } else {
            console.log("Js Log:","qttGame is null");
        }

	},

	showInsert(){
		console.log("Js Log:","showInsert");

		 if (!qttGame) {
			console.log("Js Log:","qttGame is null");
			SendUnityMessage("ShowVideoFail")
            return;
        }

        var options = {};
        options.gametype = Math.floor(Math.random() * 3) + 1;//互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
        options.rewardtype = 1;//互动广告框，只有 1
        options.data = {};
        options.data.title = "奖励";//互动抽中奖后的道具提示文字
        //options.data.url = "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png";//互动抽中奖后的道具图标(可选)
        options.callback = (res) => {
            if (res == 1) {
				SendUnityMessage("ShowInsertSuccess")
            } else if (res == 0) {
				SendUnityMessage("ShowInsertFail")
            } else if (res == 2) {
				SendUnityMessage("ShowInsertCancel")
            }
        };	

        qttGame.showHDAD(options);
		SendUnityMessage("ShowInsert")
	},
	closeInsert(){
		console.log("Js Log:","closeInsert");
	},

	showVideo(){
		console.log("Js Log:","showVideo");

		 if (!qttGame) {
			console.log("Js Log:","qttGame is null");
			SendUnityMessage("ShowVideoFail")
            return;
        }

        var options ={};
        options.gametype = Math.floor(Math.random() * 3) + 1;//互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
        options.rewardtype = 1;//互动广告框，只有 1
        options.data = {};
        options.data.title = "奖励";//互动抽中奖后的道具提示文字
        //options.data.url = "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png";//互动抽中奖后的道具图标(可选)

        qttGame.showVideo((res) => {
            if (res == 1) {
				SendUnityMessage("ShowVideoSuccess")
            } else if (res == 0) {
				SendUnityMessage("ShowVideoFail")
            } else if (res == 2) {
				SendUnityMessage("ShowVideoCancel")
            }}, options);
		SendUnityMessage("ShowVideo")
	},
	closeVideo(){
		console.log("Js Log:","closeVideo");
	}
}

//发送消息给unity。
function ReceiveFromUnity(message) {
	console.log("== Js Get From Unity ==" + message);
	if(message == "ShowBanner"){
		HHSDK.showBanner();
	}else if(message == "CloseBanner"){
		HHSDK.closeBanner();
	}else if(message == "ShowInsert"){
		HHSDK.showInsert();
	}else if(message == "CloseInsert"){
		HHSDK.closeInsert();
	}else if(message == "ShowVideo"){
		HHSDK.showVideo();
	}else if(message == "CloseVideo"){
		HHSDK.closeVideo();
	}
}

//发送消息给unity。
function SendUnityMessage(message) {
	window.gameInstance.SendMessage("Main Camera", "ReceiveFromJs", message)
}