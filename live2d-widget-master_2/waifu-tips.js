/*
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

function loadWidget(config) {
	let { waifuPath, apiPath, cdnPath } = config;
	let useCDN = false, modelList;
	if (typeof cdnPath === "string") {
		useCDN = true;
		if (!cdnPath.endsWith("/")) cdnPath += "/";
	} else if (typeof apiPath === "string") {
		if (!apiPath.endsWith("/")) apiPath += "/";
	} else {
		console.error("Invalid initWidget argument!");
		return;
	}
	localStorage.removeItem("waifu-display");
	sessionStorage.removeItem("waifu-text");
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
			<div id="waifu-tool">
				<span class="fa fa-lg fa-comment"></span>
				<span class="fa fa-lg fa-paper-plane"></span>
				<span class="fa fa-lg fa-user-circle"></span>
				<span class="fa fa-lg fa-street-view"></span>
				<span class="fa fa-lg fa-camera-retro"></span>
				<span class="fa fa-lg fa-info-circle"></span>
				<span class="fa fa-lg fa-times"></span>
				<span class="fa fa-lg fa-chevron-right" id="live2d-go-right"></span>
				<span class="fa fa-lg fa-chevron-left" id="live2d-go-left"></span>
			</div>
		</div>`);
	// https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
	setTimeout(() => {
		document.getElementById("waifu").style.bottom = 0;
	}, 0);

	function randomSelection(obj) {
		return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
	}
	// 检测用户活动状态，并在空闲时显示消息
	let userAction = false,
		userActionTimer,
		messageTimer,
		messageArray = ["好久不見，日子過得好快呢……", "大壞蛋！你都多久沒理人家了呀，嘤嘤嘤～", "嗨～快來逗我玩吧！", "拿小拳拳捶你胸口！", "記得把小家加入 Adblock 白名單哦！"];
	window.addEventListener("mousemove", () => userAction = true);
	window.addEventListener("keydown", () => userAction = true);
	setInterval(() => {
		if (userAction) {
			userAction = false;
			clearInterval(userActionTimer);
			userActionTimer = null;
		} else if (!userActionTimer) {
			userActionTimer = setInterval(() => {
				showMessage(randomSelection(messageArray), 6000, 9);
			}, 20000);
		}
	}, 1000);

        (function () { // 根据位置加载
                if (localStorage.getItem("Live2DPlace") === "left") {
                        document.getElementById("live2d-go-left").style.display = "none";
                } else if (localStorage.getItem("Live2DPlace") === "right") {
                        document.getElementById("live2d-go-right").style.display = "none";
                        document.getElementById("live2d_css").href = live2d_path + "waifu_right.css";
                }
        })();

	(function registerEventListener() { // 工具栏菜单效果
		document.querySelector("#waifu-tool .fa-comment").addEventListener("click", showHitokoto); // 一言API对话
		document.querySelector("#waifu-tool .fa-paper-plane").addEventListener("click", () => { // 飞机大战（雾）
			if (window.Asteroids) {
				if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
				window.ASTEROIDSPLAYERS.push(new Asteroids());
			} else {
				const script = document.createElement("script");
				script.src = "https://cdn.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js";
				document.head.appendChild(script);
			}
		});
		document.querySelector("#waifu-tool .fa-user-circle").addEventListener("click", loadOtherModel); // 切换模型
		document.querySelector("#waifu-tool .fa-street-view").addEventListener("click", loadRandModel); // 切换材质
		document.querySelector("#waifu-tool .fa-camera-retro").addEventListener("click", () => { // 输出照片
			showMessage("照好了麻，是不是很可愛呢？", 6000, 9);
			Live2D.captureName = "photo.png"; // 输出照片的名字
			Live2D.captureFrame = true;
		});
		document.querySelector("#waifu-tool .fa-info-circle").addEventListener("click", () => { // 关于页转跳
			open("https://github.com/stevenjoezhang/live2d-widget"); //关于页链接
		});
		document.querySelector("#waifu-tool .fa-times").addEventListener("click", () => { // 关闭看板娘
			localStorage.setItem("waifu-display", Date.now());
			showMessage("願你有一天能與重要的人重逢。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			setTimeout(() => {
				document.getElementById("waifu").style.display = "none";
				document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
			}, 3000);
		});
		document.querySelector("#waifu-tool .fa-chevron-right").addEventListener("click", () => { // 切换看板娘位置（左 => 右）
			localStorage.setItem("Live2DPlace", "right");
			showMessage("耶，可以去右邊了呢～。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			document.getElementById("waifu-toggle").style.display = "none";
			setTimeout(() => {
				document.getElementById("live2d_css").href = live2d_path + "waifu_right.css";
				document.getElementById("waifu").style.bottom = "0px";
				document.getElementById("live2d-go-right").style.display = "none";
				document.getElementById("live2d-go-left").style.display = "block";
			}, 3000);
			setTimeout('document.getElementById("waifu-toggle").style.display = "inline"',6000);
		});
                document.querySelector("#waifu-tool .fa-chevron-left").addEventListener("click", () => { // 切换看板娘位置（左 <= 右）
			localStorage.setItem("Live2DPlace", "left");
			showMessage("耶，可以去左邊了呢～。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			document.getElementById("waifu-toggle").style.display = "none";
			setTimeout(() => {
				document.getElementById("live2d_css").href = live2d_path + "waifu_left.css";
				document.getElementById("waifu").style.bottom = "0px";
				document.getElementById("live2d-go-left").style.display = "none";
				document.getElementById("live2d-go-right").style.display = "block";
			}, 3000);
			setTimeout('document.getElementById("waifu-toggle").style.display = "inline"',6000);
		});
		const devtools = () => { };
		console.log("%c", devtools);
		devtools.toString = () => {
			showMessage("哈哈，你打開了控制台，是想要看看我的小秘密嗎？", 6000, 9);
		};
		window.addEventListener("copy", () => {
			showMessage("你都複製了些什麼呀，轉載記得要加上出處喔！", 6000, 9);
		});
		window.addEventListener("visibilitychange", () => {
			if (!document.hidden) showMessage("哇，你終於回來了～", 6000, 9);
		});
	})();

	(function welcomeMessage() {
		let text;
		if (location.pathname.includes("index")) { // 如果是主页
			const now = new Date().getHours();
			if (now > 5 && now <= 7) text = "早上好！一日之計在於晨，美好的一天就要開始了。";
			else if (now > 7 && now <= 11) text = "上午好！工作順利嘛，不要久坐，多起來多運動哦！";
			else if (now > 11 && now <= 13) text = "中午了，工作了一個上午，現在是午餐時間！";
			else if (now > 13 && now <= 17) text = "午後很容易犯困呢，今天的運動目標完成了嗎？";
			else if (now > 17 && now <= 19) text = "傍晚了！窗外夕陽的景色很美麗呢，最美不過夕陽紅～";
			else if (now > 19 && now <= 21) text = "晚上好，今天過得怎麼樣？";
			else if (now > 21 && now <= 23) text = ["已經這麼晚了呀，早點休息吧，晚安～", "深夜時要愛護眼睛呀！"];
			else text = "你是夜貓子呀？這麼晚還不睡覺，明天起的來嗎？";
		} else if (location.pathname.includes("about-us")) {
			text = `這裡是網頁製作者們的名單和分工喔～`
		} else if (location.pathname.includes("taiwan-data")) {
			text = `希望確診數不要再增加了(◞‸◟)`
		} else if (location.pathname.includes("world-data")) {
			text = `今天怎麼又增加這麼多確診數(☍﹏⁰。)`
		} else if (location.pathname.includes("vaccine")) {
			text = [`快來看看已經有多少人打了疫苗啦~`, `偷偷告訴你，我還沒有打疫苗(°ཀ°)`]
		} else if (location.pathname.includes("game")) {
			text = `一個破破的unity小遊戲made by meヽ(✿ﾟ▽ﾟ)ノ`
		} else if (location.pathname.includes("video")) {
			text = [`快來看點影片補充點COVID-19的知識啦～`, `這些都是我精心挑選過的人類高質量影片呢(•‾⌣‾•)`]
		} else if (location.pathname.includes("reference")) {
			text = [`想要看我的source code嗎？(灬ºωº灬)`, `這裡面的程式碼不是我的程式碼，是“我們”的程式碼(´∀｀ゞ`]
		} else if (document.referrer !== "") {
			const referrer = new URL(document.referrer),
				domain = referrer.hostname.split(".")[1];
			if (location.hostname === referrer.hostname) text = `歡迎閱讀<span>「${document.title.split(" - ")[0]}」</span>`;
			else if (domain === "baidu") text = `Hello！來自 百度搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&wd=")[1].split("&")[0]}</span> 找到我的嗎？`;
			else if (domain === "so") text = `Hello！來自 360搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&q=")[1].split("&")[0]}</span> 找到我的嗎？`;
			else if (domain === "google") text = `Hello！来自 Google搜索 的朋友<br>歡迎閱讀<span>「${document.title.split(" - ")[0]}」</span>`;
			else text = `Hello！來自 <span>${referrer.hostname}</span> 的朋友`;
		} else {
			text = `歡迎閱讀<span>「${document.title.split(" - ")[0]}」</span>`;
		}
		showMessage(text, 7000, 8);
	})();

	function showHitokoto() { // 增加 hitokoto.cn 的 API
		fetch("https://v1.hitokoto.cn")
			.then(response => response.json())
			.then(result => {
				const text = `這句一言來自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`;
				showMessage(result.hitokoto, 6000, 9);
				setTimeout(() => {
					showMessage(text, 4000, 9);
				}, 6000);
			});
	}

	function showMessage(text, timeout, priority) {
		if (!text || (sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > priority)) return;
		if (messageTimer) {
			clearTimeout(messageTimer);
			messageTimer = null;
		}
		text = randomSelection(text);
		sessionStorage.setItem("waifu-text", priority);
		const tips = document.getElementById("waifu-tips");
		tips.innerHTML = text;
		tips.classList.add("waifu-tips-active");
		messageTimer = setTimeout(() => {
			sessionStorage.removeItem("waifu-text");
			tips.classList.remove("waifu-tips-active");
		}, timeout);
	}

	(function initModel() {
		let modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (modelId === null) {
			// 首次访问时加载 指定模型 的 指定材质
			modelId = 2; // 模型 ID
			modelTexturesId = 39; // 材质 ID
		}
		loadModel(modelId, modelTexturesId);
		fetch(waifuPath)
			.then(response => response.json())
			.then(result => {
				window.addEventListener("mouseover", event => {
					for (let { selector, text } of result.mouseover) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
						return;
					}
				});
				window.addEventListener("click", event => {
					for (let { selector, text } of result.click) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
						return;
					}
				});
				result.seasons.forEach(({ date, text }) => {
					const now = new Date(),
						after = date.split("-")[0],
						before = date.split("-")[1] || after;
					if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
						text = randomSelection(text);
						text = text.replace("{year}", now.getFullYear());
						//showMessage(text, 7000, true);
						messageArray.push(text);
					}
				});
			});
	})();

	async function loadModelList() {
		const response = await fetch(`${cdnPath}model_list.json`);
		modelList = await response.json();
	}

	async function loadModel(modelId, modelTexturesId, message) {
		localStorage.setItem("modelId", modelId);
		localStorage.setItem("modelTexturesId", modelTexturesId);
		showMessage(message, 4000, 10);
		if (useCDN) {
			if (!modelList) await loadModelList();
			const target = randomSelection(modelList.models[modelId]);
			loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
		} else {
			loadlive2d("live2d", `${apiPath}get/?id=${modelId}-${modelTexturesId}`);
			console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`);
		}
	}

	async function loadRandModel() {
		const modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (useCDN) {
			if (!modelList) await loadModelList();
			const target = randomSelection(modelList.models[modelId]);
			loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
			showMessage("我的新衣服好看嘛？", 4000, 10);
		} else {
			// 材质加载方式, 可选 "rand"(随机), "switch"(顺序)
			fetch(`${apiPath}switch_textures/?id=${modelId}-${modelTexturesId}`)
				.then(response => response.json())
				.then(result => {
					if (result.textures.id === 1 && (modelTexturesId === 1 || modelTexturesId === 0)) showMessage("我還沒有其他衣服呢！", 4000, 10);
					else loadModel(modelId, result.textures.id, "我的新衣服好看嘛？");
				});
		}
	}

	async function loadOtherModel() {
		let modelId = localStorage.getItem("modelId");
		if (useCDN) {
			if (!modelList) await loadModelList();
			const index = (++modelId >= modelList.models.length) ? 0 : modelId;
			loadModel(index, 0, modelList.messages[index]);
		} else {
			fetch(`${apiPath}switch/?id=${modelId}`)
				.then(response => response.json())
				.then(result => {
					loadModel(result.model.id, 0, result.model.message);
				});
		}
	}
}

function initWidget(config, apiPath) {
	if (typeof config === "string") {
		config = {
			waifuPath: config,
			apiPath
		};
	}
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
			<span>看板娘</span>
		</div>`);
	const toggle = document.getElementById("waifu-toggle");
	toggle.addEventListener("click", () => {
		toggle.classList.remove("waifu-toggle-active");
		if (toggle.getAttribute("first-time")) {
			loadWidget(config);
			toggle.removeAttribute("first-time");
		} else {
			localStorage.removeItem("waifu-display");
			document.getElementById("waifu").style.display = "";
			setTimeout(() => {
				document.getElementById("waifu").style.bottom = 0;
			}, 0);
		}
	});
	if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
		toggle.setAttribute("first-time", true);
		setTimeout(() => {
			toggle.classList.add("waifu-toggle-active");
		}, 0);
	} else {
		loadWidget(config);
	}
}

// Can call this from another script
function showMessage(text, timeout, priority) {
	if (!text || (sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > priority)) return;
	// if (messageTimer) {
	// 	clearTimeout(messageTimer);
	// 	messageTimer = null;
	// }
	text = randomSelection(text);
	sessionStorage.setItem("waifu-text", priority);
	const tips = document.getElementById("waifu-tips");
	tips.innerHTML = text;
	tips.classList.add("waifu-tips-active");
	messageTimer = setTimeout(() => {
		sessionStorage.removeItem("waifu-text");
		tips.classList.remove("waifu-tips-active");
	}, timeout);
}

function randomSelection(obj) {
	return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
}