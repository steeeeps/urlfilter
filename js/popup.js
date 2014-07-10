;(function() {
	window.onload = init;
	function init() {
		var enable = T.getEnable();
		document.getElementById("enable").className = enable ? "popup-item checked" : "popup-item ";
		on('enable', "click", enableClickHandler);
		on('options', "click", function() {
			chrome.tabs.create({
				url:'setting.html'
			});
		});
		on('about', 'click', function() {
			chrome.tabs.create({
				url:'http://steeeeps.net/2014/05/19/url-filter/'
			});
		});
	}

	function on(id, type, callback) {
		var node = document.getElementById(id);
		node.addEventListener(type, callback, false);
	}

	function enableClickHandler() {
		var node = document.getElementById("enable");
		var clsName = node.className;
		//disable
		if (clsName.indexOf('checked') != -1) {
			clsName = clsName.replace('checked', '');
			T.setEnable(false);
		}
		//enable
		else {
			clsName += " checked ";
			T.setEnable(true);
		}
		node.className = clsName;
	}

})(window);
