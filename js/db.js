;(function(window, T) {

    Array.prototype.remove = function(item) {

        var i = this.indexOf(item);
        if (i != -1) {
            this.splice(i, 1);
        }
    };

    function _getTimeIndex(item) {
        var times = filterObj.times;
        for (var i = 0, len = times.length; i < len; i++) {
            var it = times[i];
            if (it.start == item.start && it.end == item.end) {
                return i;
            }
        }
        return -1;
    }

    var filterObj = {
        urls : [],
        times : [],
        enable : true
    };
    T.saveUrl = function(url) {
        filterObj.urls.push(url);
        _saveFilterObj();
    };

    T.deleteUrl = function(url) {
        try {
            filterObj.urls.remove(url);
            _saveFilterObj();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    };

    T.hasUrl = function(url) {
        return filterObj.urls.indexOf(url) != -1 ? true : false;
    };
    T.getUrlList = function() {
        var u = _getFilterObj().urls;
        return u;
    };

    T.saveTime = function(item) {
        filterObj.times.push(item);
        _saveFilterObj();
    };

    T.deleteTime = function(item) {
        try {
            var i = _getTimeIndex(item);
            filterObj.times.splice(i, 1);
            _saveFilterObj();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    };

    T.getTimeList = function() {
        return _getFilterObj().times;
    };

    T.hasTime = function(item) {
        return _getTimeIndex(item) != -1 ? true : false;
    };
    T.getEnable = function() {
        return _getFilterObj().enable;
    };

    T.setEnable = function(enable) {
        filterObj.enable = enable;
        _saveFilterObj();
    };
    function _getFilterObj() {
        var u = localStorage.getItem("filterObj");
        filterObj = JSON.parse(u) || {
            urls : [],
            times : [],
            enable : true
        };
        return filterObj;
    }

    function _saveFilterObj() {
        localStorage.setItem("filterObj", JSON.stringify(filterObj));
        chrome.extension.sendMessage(filterObj, function(e) {
            console.log(e);
        });
    }

})(window, window.T ? window.T : window.T = {});

