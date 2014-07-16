;(function(window, $) {

    $(init);

    function init() {
        $("#import").click(function() {
            $("#jsonfile").click();
        });
        $("#jsonfile").change(selectFileHander);
        $("#export").click(function() {
            var blob = new Blob([localStorage.getItem("filterObj")], {
                type : "text/plain;charset=utf-8"
            });
            saveAs(blob, "urlfiter.txt");
        });
        $("#removeall").click(function(){
            localStorage.removeItem("filterObj");
               window.location.reload();
        });
    }

    function selectFileHander(evt) {
        var files = evt.target.files;
        var file = files[0];
        var name = file.name;
        var type = name.substring(name.lastIndexOf('.'), name.length);
        if (type != ".txt") {
            alert("请上传txt格式文件！");
            return;
        }
        var reader = new FileReader();
        reader.onload = fileReaded;
        reader.readAsText(file, "GB2312");
    }

    function fileReaded(evt) {
        var result = evt.target.result;
        try {
            var filterObj = JSON.parse(result);
            localStorage.setItem("filterObj", JSON.stringify(filterObj));
        } catch(err) {
            alert("不是标准的json格式!");
            throw err;
        }
        window.location.reload();
    }

})(window, $);
