;(function(window, $) {
    $(init);
    function init() {
        $("#addUrl").click(addurlHandler);
        $('#addtime').click(addTimeClickHandler);
        getUrlList();
        urlDeleter();
        initTimeControl();
        getTimeList();
        timeDeleter();
    }

    function addurlHandler() {
        var u = $('#urlinput').val();
        if (!u || !isUrl(u)) {
            alert("请输入正确的域名!");
            return;
        }
        if (T.hasUrl(u)) {
            alert("列表中已有该域名!");
            return;
        }
        creatUrlDom(u);
        T.saveUrl(u);
        $('#urlinput').val('');
    }

    function getUrlList() {
        var list = T.getUrlList();
        for (var i = 0, len = list.length; i < len; i++) {
            var u = list[i];
            creatUrlDom(u);
        }
    }

    function isUrl(url) {
        var strRegex = "^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$";
        var re = new RegExp(strRegex);
        return re.test(url);
    }

    function isTime(str) {
        var strRegex = "^[0-9]{2}\:[0-6][0-9]$";
        var re = new RegExp(strRegex);
        return re.test(str);

    }

    function creatUrlDom(url) {
        var item = $('<tr><td><a target="_blank" href="' + url + '">' + url + '</a></td><td><button data-url="' + url + '" type="button" class="close" aria-hidden="true">&times;</button></td></tr>').prependTo('#urltable tbody');

    }

    //添加删除url事件
    function urlDeleter() {
        $("#urltable").click(function(e) {
            var target = e.target;
            if (target.tagName != "BUTTON") {
                return;
            }
            var url = target.getAttribute("data-url");
            if (T.deleteUrl(url)) {
                $(target.parentNode.parentNode).remove();
            } else {
                alert("删除url失败，请重试!");
            }
        });
    }

    function initTimeControl() {
        $('#starttime').datetimepicker({
            pickDate : false,
            format : 'HH:mm'
        });
        $('#endtime').datetimepicker({
            pickDate : false,
            format : 'HH:mm'
        });
    }

    function addTimeClickHandler() {
        var starttime = $('#starttime .time-control').val().trim();
        var endtime = $('#endtime .time-control').val().trim();

        if (!timeValidater(starttime, endtime)) {
            return;
        }
        var item = {
            start : starttime,
            end : endtime
        };
        if (T.hasTime(item)) {
            alert("列表中已有该时间段!");
            return;
        }
        T.saveTime(item);
        creatTimeDom(item);
    }

    function creatTimeDom(item) {
        var item = $('<tr><td>' + item.start + '</td><td>' + item.end + '</td><td><button data-time=\'' + JSON.stringify(item) + '\' type="button" class="close" aria-hidden="true">&times;</button></td></tr>').prependTo('#timetable tbody');

    }

    function timeValidater(start, end) {
        if (!isTime(start)) {
            alert('请输入正确起始的时间');
            return false;
        }
        if (!isTime(end)) {
            alert('请输入正确终止的时间');
            return false;
        }
        if (!timeComparer(start, end)) {
            alert('请确保终止时间大于起始时间!');
            return false;
        }

        return true;

    }

    /**
     *时间比较，时间格式 12:30
     * @param {Object} time1 时间
     * @param {Object} time2 比较对象
     */
    function timeComparer(time1, time2) {
        var date1 = timeToDate(time1);
        var date2 = timeToDate(time2);
        return date1 < date2;
    }

    function timeToDate(time) {
        time = time.split(":");
        var date = new Date();
        var limitDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1]);
        return limitDate;
    }

    function getTimeList() {
        var list = T.getTimeList();
        for (var i = 0, len = list.length; i < len; i++) {
            var u = list[i];
            creatTimeDom(u);
        }
    }

    //添加删除url事件
    function timeDeleter() {
        $("#timetable").click(function(e) {
            var target = e.target;
            if (target.tagName != "BUTTON") {
                return;
            }
            var item = target.getAttribute("data-time");
            var obj = JSON.parse(item);
            if (T.deleteTime(obj)) {
                $(target.parentNode.parentNode).remove();
            } else {
                alert("删除时间失败，请重试!");
            }
        });
    }

})(window, $);
