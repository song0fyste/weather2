


function rewriteData(data) {
//    $("#today > .period > .t00-06").html("test")
//    alert("呼んでるよ");
    loadData();
};


function loadData() {
//    $.getJSON("http://www.drk7.jp/weather/json/13.js?callback=?",
//              function(data){
//                alert("test" + data.link)
//            };
//    $.ajax({
//        type: 'GET',
//        url: 'http://www.drk7.jp/weather/json/13.js',
//        dataType : 'jsonp',
//        jsonpCallback: 'drk7jpweather.callback',
//        success: function(json){
//            alert("読んだ");
//        },
//        error: function(){
//            alert('失敗');
//        }
//    });
    $.getJSON(
			'http://www.drk7.jp/weather/json/13.js?hoge=?'	//callback名が決め打ち仕様なので？さえあればparam名は何でもよい
    );
//    alert("呼んだ");
};


function drk7jpweather() {}
drk7jpweather.callback = function(arg) {
      var str = "",
            area = {},
            script = {};
    
        str += arg.pref.id + "\r\n"; // 県名

        for( area in arg.pref.area ){

            str += area + " ";
            str += arg.pref.area[ area ].info[0].date + " の ";
            str += "最高気温 " + arg.pref.area[ area ].info[0].temperature.range[0].content + " 度 ";
            str += "最低気温 " + arg.pref.area[ area ].info[0].temperature.range[1].content + " 度\r\n";
        };
        alert(str);
//    alert("呼んだ");
};

//  TODO
//  当日判定
//  タイマーで１時間毎の問い合わせ
//  jsonデータのセット

