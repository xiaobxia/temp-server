var uuidString;//用于保存uuid字符串
var uuidNumber = []; //将uuid字符串放在数组里
var idStr = " "; //这里是生成之后的所有div的id字符串
var idList = []; //这里是生成之后，所有div的id数组

Highcharts.setOptions({
  global: {
    useUTC: false
  }
});

function initDom(uuidNumber) {
  //这里循环生成uuidNumber.size个div
  var html = ''
  for (var i = 0; i < uuidNumber.length; i++) {
    //这里指定id="div" +id,对应为div1,div2,div3;
    var id = "div" + i;
    html += "<div id='" + id + "' style='width: 600px; height: 200px; margin-top: 80px'>" + id + "</div>"
    idStr += id + " ";  //拼接id字符串
    idList.push(id);  //把id放到数组里面
  }
  $("body").append(html);
}

function activeLastPointToolip(chart) {
  var points = chart.series[0].points;
  console.log(points.length)
  chart.tooltip.refresh(points[points.length - 1]);
}

function queryData(chart, series, uuidNumber, index) {
  var vcpuuid = "http://192.168.50.4:8080/data/instance/vcpu?uuid=" + uuidNumber[index];
  // $.ajax({
  //     type: 'GET',
  //     url: vcpuuid,
  //     dataType: "json",  //数据格式设置为jsonp
  //     jsonp: "callback",  //Jquery生成验证参数的名称
  //     responseType: 'application/json',
  //     success: function (result) {
  //       var type = result.type;
  //       var id = result.id;
  //       var usage = result.usage;
  //       var x = (new Date()).getTime()
  //       var y = usage
  //       series.addPoint([x, y], true, false);
  //       activeLastPointToolip(chart);
  //     },
  //     error: function () {
  //         alert("error");
  //     }
  // });
  setTimeout(function () {
    var result = {
      usage: parseFloat((1 + Math.random()).toFixed(2))
    }
    var type = result.type;
    var id = result.id;
    var usage = result.usage;
    var x = (new Date()).getTime()
    var y = usage
    series.addPoint([x, y], true, true);
    activeLastPointToolip(chart);
  }, 100)
}

function initChart(uuidNumber) {
  for (var i = 0; i < uuidNumber.length; i++) {
    (function (i) {
      var chart = Highcharts.chart('div' + i, {
        chart: {
          type: 'spline',
          marginRight: 10,
          events: {
            load: function () {
              var series = this.series[0]
              chart = this;
              activeLastPointToolip(chart);
              setInterval(function () {
                queryData(chart, series, uuidNumber, i)
              }, 2000);
            }
          }
        },
        credits: {
          enabled: false
        },
        title: {
          text: 'cpu使用率'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 75
        },
        yAxis: {
          title: {
            text: null
          }
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
              Highcharts.numberFormat(this.y, 2);
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'cpu使用率',
          data: (function () {
            // 生成随机值
            var data = [];
            var showNumber = 20;
            var time = (new Date()).getTime();
            for (var i = 1 - showNumber; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: 0
              });
            }
            return data;
          }())
        }]
      })
    })(i)
  }
}

setTimeout(function () {
  var result = [{uuid: 1}, {uuid: 2}]
  var size = result.length;
  for (i = 0; i < size; i++) {
    uuidNumber.push(result[i].uuid);
  }
  uuidString = result[0].uuid;
  initDom(uuidNumber)
  initChart(uuidNumber)
}, 100);
// $.ajax({
//     type: 'GET',
//     url: 'http://192.168.50.4:8080/data/instance/list',
//     dataType: "json",  //数据格式设置为jsonp
//     jsonp: "callback",  //Jquery生成验证参数的名称
//     responseType: 'application/json',
//     success: function (result) {
//       console.log(result);
//       var size = result.length;
//       for (i = 0; i < size; i++) {
//         uuidNumber.push(result[i].uuid);
//       }
//       uuidString = result[0].uuid;
//       initDom(uuidNumber)
//       initChart(uuidNumber)
//     }
// })
