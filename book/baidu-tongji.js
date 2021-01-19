require(["gitbook"], function (gitbook) {

	gitbook.events.bind("start", function (e, pluginConfig) {

		let config = pluginConfig["gta-baidu"] || {};

		if (!config.token) {
			throw "Need to option 'token' for Baidu Analytics plugin";
		}

		function load(code) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			try {
				script.appendChild(document.createTextNode(code));
			} catch (ex) {
				script.text = code;
			}
			document.head.appendChild(script);
		}

		let auto = config.auto === false ? false : true; //禁止自动收集页面
		let script = `var _hmt = _hmt || []; window._hmt = _hmt; 
		              (function() {
						    var hm = document.createElement('script');
							hm.src = 'https://hm.baidu.com/hm.js?${config.token}';
							var s = document.getElementsByTagName('script')[0];
							s.parentNode.insertBefore(hm, s); 
					        _hmt.push(['_setAutoPageview', ${auto}]);
					  })();`;

		load(script);
	});
});