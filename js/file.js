;(function(window, $) {

    $(init);

    function saveAs1(blob, filename) {

        var blob = new Blob(["Hello, world!"], {
            type : "text/plain;charset=utf-8"
        });
        saveAs(blob, "hello world.txt");
    }

    function import1() {

    }

    function init() {
        $("#import").click(function() {
            $("#jsonfile").click();
        });
        $("#jsonfile").change(selectFileHander);
        $("#export").click(function() {
            saveAs1();
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
