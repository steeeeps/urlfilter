(function(window) {
    //get regex from http://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string

    var u = localStorage.getItem("filterObj");
    var filterObj = JSON.parse(u) || {
        urls : [],
        times : [],
        enable : true
    };
    //获取当前访问的域名
    function getDomainFromUrl(url) {
        var host = "null";
        if ( typeof url == "undefined" || null == url)
            url = window.location.href;
        var regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/;
        var match = url.match(regex);
        if ( typeof match != "undefined" && null != match)
            host = match[0];

        return host;
    }

    function timeToDate(time) {
        time = time.split(":");
        var date = new Date();
        var limitDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1]);
        return limitDate;
    }

    function timeLimit() {
        var curDate = new Date();
        var times = filterObj.times;
        for (var i = 0, len = times.length; i < len; i++) {
            var item = times[i];
            var startDate = timeToDate(item.start);
            var endDate = timeToDate(item.end);
            if (curDate > startDate && curDate < endDate) {
                return true;
            }
        }
        return false;
    }

    function checkForValidUrl(tabId, changeInfo, tab) {
        var url = getDomainFromUrl(tab.url).toLowerCase();
        if (!filterObj.enable) {
            return;
        }
        if (filterObj.times.length > 0) {
            if (timeLimit() && filterObj.urls.indexOf(url) != -1) {
                chrome.tabs.update(tab.id, {
                    url : "no.html"
                });
            }
        } else {
            if (filterObj.urls.indexOf(url) != -1) {
                chrome.tabs.update(tab.id, {
                    url : "no.html"
                });
            }
        }
    };

    chrome.extension.onMessage.addListener(function(msg) {
        filterObj = msg;
    });
    chrome.tabs.onUpdated.addListener(checkForValidUrl);

})(window);
