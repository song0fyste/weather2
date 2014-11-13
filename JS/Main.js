dataflg = 0;


function timerObj() {
    setInterval(writeInfo, 1000);
};

function writeInfo() {
    var Nowymdhms　 = 　new Date();
    var NowYear = Nowymdhms.getFullYear();
    var NowMon = Nowymdhms.getMonth() + 1;
    var NowDay = Nowymdhms.getDate();
    var NowHour = Nowymdhms.getHours();
    var NowMin = Nowymdhms.getMinutes();
    var NowSec = Nowymdhms.getSeconds();

    var myDate = NowYear + "/" + NowMon + "/" + NowDay
    var myTime = NowHour + ":" + NowMin;

    $("#date").html(myDate);
    $("#time").html(myTime);
    
    // 現在のデータが無いor00分00秒の場合はデータ取得
    if (dataflg == 0) {
        //取得する
        loadData();
    } else if (NowMin == 0) {
        if (NowSec == 0) {
            //取得する
            loadData();
        }
    }
    
};


function loadData() {

    var url = "http://www.drk7.jp/weather/json/13.js?callback=?";
    $.getJSON(url);

};


function drk7jpweather() {}
drk7jpweather.callback = function(arg) {
    var str = "",
        area = {};
    
    dataflg = 1;

    
//    str += arg.pref.id + "\r\n"; // 県名
    var pubymdhms = new Date(arg.pubDate);
    
    var Nowymdhms = new Date();
    
    $("#systemMsg").html("発信 " + formatDate(pubymdhms,"MM/DD hh:mm") + " 取得 " + formatDate(Nowymdhms,"MM/DD hh:mm:ss"));
    
    for (area in arg.pref.area) {
        if (area == "東京地方") {
            for (info in arg.pref.area[area].info) {
                if (arg.pref.area[area].info[info].date == formatDate(new Date(),"YYYY/MM/DD")) {
//                    alert("今日：" + arg.pref.area[area].info[info].date);   
                }
                if (arg.pref.area[area].info[info].date == formatDate(addDate(new Date(),1,"DD"),"YYYY/MM/DD")) {
//                    alert("明日：" + arg.pref.area[area].info[info].date);   
                }
            }
        }
        
//        str += area + " ";
//        str += arg.pref.area[area].info[0].date + " の ";
//        str += "最高気温 " + arg.pref.area[area].info[0].temperature.range[0].content + " 度 ";
//        str += "最低気温 " + arg.pref.area[area].info[0].temperature.range[1].content + " 度\r\n";
    };    
    
};

/**
 * 日付をフォーマットする
 * @param  {Date}   date     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
var formatDate = function (date, format) {
  if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
};

/**
 * 日付を加算する
 * @param  {Date}   date       日付
 * @param  {Number} num        加算数
 * @param  {String} [interval] 加算する単位
 * @return {Date}              加算後日付
 * addDate(new Date('2014/2/23'), 1, 'MM'); // 2014/2/23 月が加算される
 */
var addDate = function (date, num, interval) {
  switch (interval) {
    case 'YYYY':
      date.setYear(date.getYear() + num);
      break;
    case 'MM':
      date.setMonth(date.getMonth() + num);
      break;
    case 'hh':
      date.setHours(date.getHours() + num);
      break;
    case 'mm':
      date.setMinutes(date.getMinutes() + num);
      break;
    case 'ss':
      date.setSeconds(date.getSeconds() + num);
      break;
    default:
      date.setDate(date.getDate() + num);
  }
  return date;
};
/**
 * 2つの日付の差を計算する
 * @param  {Date}   date1      日付1
 * @param  {Date}   date2      日付2
 * @param  {String} [interval] 差の単位
 * @return {Number}            2つの日付の差
 */
var dateDiff = function (date1, date2, interval) {
  var diff = date2.getTime() - date1.getTime();
  switch (interval) {
    case 'YYYY':
      var d1 = new Date(date1.getTime());
      var d2 = new Date(date2.getTime());
      d1.setYear(0);
      d2.setYear(0);
      var i;
      if (diff >= 0) {
        i = d2.getTime() < d1.getTime() ? -1 : 0;
      } else {
        i = d2.getTime() <= d1.getTime() ? 0 : 1;
      }
      return date2.getYear() - date1.getYear() + i;
      break;
    case 'MM':
      var d1 = new Date(date1.getTime());
      var d2 = new Date(date2.getTime());
      d1.setYear(0);
      d1.setMonth(0);
      d2.setYear(0);
      d2.setMonth(0);
      var i;
      if (diff >= 0) {
        i = d2.getTime() < d1.getTime() ? -1 : 0;
      } else {
        i = d2.getTime() <= d1.getTime() ? 0 : 1;
      }
      return ((date2.getYear() * 12) + date2.getMonth()) - ((date1.getYear() * 12) + date1.getMonth()) + i;
      break;
    case 'hh':
      return ~~(diff / (60 * 60 * 1000));
      break;
    case 'mm':
      return ~~(diff / (60 * 1000));
      break;
    case 'ss':
      return ~~(diff / 1000);
      break;
    default:
      return ~~(diff / (24 * 60 * 60 * 1000));
  }
};


//  TODO
//  当日判定
//  jsonデータのセット
