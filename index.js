// 柱状图数据
var barData = {
  item: {
    "barData": [
      {
        "name": "新增订单",
        "data": [
          {
            "value": 3,
            "name": "未知",
            "id": 0
          },
          {
            "value": 617,
            "name": "SW事业部",
            "id": 1
          },
          {
            "value": 267,
            "name": "JFN事业部",
            "id": 2
          },
          {
            "value": 155,
            "name": "PJ事业部",
            "id": 3
          },
          {
            "value": 43,
            "name": "Pi事业部",
            "id": 4
          },
          {
            "value": 1095,
            "name": "AG事业部",
            "id": 5
          },
          {
            "value": 2,
            "name": "HA事业部",
            "id": 6
          },
          {
            "value": 3,
            "name": "Q事业部",
            "id": 7
          },
          {
            "value": 1,
            "name": "SP事业部",
            "id": 10
          },
          {
            "value": 1,
            "name": "W事业部",
            "id": 11
          },
          {
            "value": 1,
            "name": "VC事业部",
            "id": 12
          },
          {
            "value": 2,
            "name": "SK事业部",
            "id": 13
          },
          {
            "value": 19,
            "name": "细刻公共",
            "id": 15
          }
        ]
      },
      {
        "name": "新增邮件",
        "data": [
          {
            "value": 1,
            "name": "JFN事业部",
            "id": 2
          },
          {
            "value": 2,
            "name": "VC事业部",
            "id": 12
          }
        ]
      },
      {
        "name": "新增纠纷",
        "data": [
          {
            "value": 1,
            "name": "SW事业部",
            "id": 1
          },
          {
            "value": 1,
            "name": "JFN事业部",
            "id": 2
          }
        ]
      },
      {
        "name": "新增工单",
        "data": [
          {
            "value": 11,
            "name": "SW事业部",
            "id": 1
          },
          {
            "value": 2,
            "name": "JFN事业部",
            "id": 2
          },
          {
            "value": 2,
            "name": "Pi事业部",
            "id": 4
          }
        ]
      }
    ]
  }
}

// 事业部列表
var businessUnitList = {
  "code": "OK",
  "desc": "OK",
  "item": {
    "businessUnit": [
      {
        "id": 1,
        "name": "SW事业部"
      },
      {
        "id": 2,
        "name": "JFN事业部"
      },
      {
        "id": 3,
        "name": "PJ事业部"
      },
      {
        "id": 4,
        "name": "Pi事业部"
      },
      {
        "id": 5,
        "name": "AG事业部"
      }
    ]
  },
  "errParam": null,
  "failed": false,
  "success": true
};

// todolist
var todolist = {
  "code": "OK",
  "desc": "OK",
  "item": {
    "todolist": [
      {
        "finish": 0,
        "unfinished": 900,
        "title": "待处理邮件"
      },
      {
        "finish": 3,
        "unfinished": 686,
        "title": "待处理订单"
      },
      {
        "finish": 0,
        "unfinished": 3,
        "title": "待处理纠纷"
      },
      {
        "finish": 0,
        "unfinished": 15,
        "title": "待处理工单"
      }
    ]
  },
}

// 扇形图数据
var lineData = {
  "item": {
    "lineData": [
      {
        "value": 727,
        "name": null
      },
      {
        "value": 3,
        "name": "Account Issues"
      },
      {
        "value": 7,
        "name": "Discounts/Promotion"
      },
      {
        "value": 265,
        "name": "Order Shipping"
      },
      {
        "value": 525,
        "name": "Order Status"
      },
      {
        "value": 238,
        "name": "Others"
      },
      {
        "value": 7,
        "name": "Product Details"
      },
      {
        "value": 1271,
        "name": "Return/Exchange/Refund"
      }
    ]
  },
};

var myLineChart = null;
var myBarChart = null;

// 获取事业部数据
var getBusinessUnitList = function () {
  $.ajax({
    type: "GET",
    url: '/api/displayPlatFrom/get/groups',
    dataType: "json",
    success: function (data) {
      businessUnitList = data.item.businessUnitList;
      renderSelectDistributeds();
    },
    error: function (jqXHR) {
      businessUnitList = [];
      renderSelectDistributeds();
    }
  });
};

// 获取扇形图数据
var getFanLineChartData = function (ids, time) {
  $.ajax({
    type: "GET",
    url: `/api/displayPlatFrom/get/freshdeskTicketType?tmie=${time}&groups=${ids}`,
    dataType: "json",
    success: function (data) {
      lineData = data.item.lineData;
      renderFanLineChart();
    },
    error: function (jqXHR) {
      lineData = [];
      renderFanLineChart();
    }
  });
}

// 获取todolist数据
var getTodoListData = function (ids) {
  $.ajax({
    type: "GET",
    url: `/api/displayPlatFrom/get/todolist?groups=${ids}`,
    dataType: "json",
    success: function (data) {
      todolist = data.item.todolist;
      renderTodoList();
    },
    error: function (jqXHR) {
      todolist = [];
      renderTodoList();
    }
  });
}

// 获取柱状图数据
var getBarData = function (ids, time) {
  $.ajax({
    type: "GET",
    url: `/api/displayPlatFrom/get/barData?groups=${ids}&time=${time}`,
    dataType: "json",
    success: function (data) {
      barData = data.item.barData;
      renderBarChart();
    },
    error: function (jqXHR) {
      barData = [];
      renderBarChart();
    }
  });
}

// 刷新模块方法
var reloadModule = function (type, ids, time) {
  switch (type) {
    case '0':
      getTodoListData(ids, time);
      break;
    case '1':
      getBarData(ids, time);
      break;
    case '2':
      getFanLineChartData(ids, time);
      break;
  }
}

// 返回时间间隔时间戳
var intervalMap = {
  today: function () {
    return new Date(new Date().toLocaleDateString()).getTime();
  },
  week: function () {
    return Date.now() - 7 * 24 * 60 * 60 * 1000;
  },
  month: function () {
    return Date.now() - 30 * 24 * 60 * 60 * 1000;
  },
  threeMonth: function () {
    return Date.now() - 90 * 24 * 60 * 60 * 1000;
  }
}
// 渲染柱状图
var renderBarChart = function () {
  var labelOption = {
    normal: {
      show: true,
      position: 'insideBottom',
      distance: 15,
      align: 'left',
      verticalAlign: 'middle',
      rotate: 90,
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      }
    }
  };

  var categories = barData[ 0 ][ 'data' ].map(item => item.name);

  var series = barData.map(item => {
    return {
      name: item.name,
      type: 'bar',
      barGap: 0,
      label: labelOption,
      data: item.data.map(item => item.value),
    }
  })

  var option = {
    color: [ '#003366', '#006699', '#4cabce', '#e5323e' ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [ 'Forest', 'Steppe', 'Desert', 'Wetland' ]
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: false },
        dataView: { show: false, readOnly: false },
        magicType: { show: false, type: [ 'bar' ] },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    calculable: true,
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 30
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 30
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: categories
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: series,
    backgroundColor: '#f3f3f3',
  };

  myBarChart = echarts.init(document.getElementById('bar-content'));
  myBarChart.showLoading({
    text: 'loading',
    color: '#f2b047',
    textColor: '#000',
  });
  myBarChart.setOption(option);
  setTimeout(() => {
    myBarChart.hideLoading();
  }, 500)
}

// 渲染扇形图
var renderFanLineChart = function () {
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    label: {
      show: true,
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: 'left',
      data: lineData.map(item => item.name)
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '40%',
        center: [ '50%', '50%' ],
        data: lineData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    backgroundColor: '#f3f3f3',
  };
  myLineChart = echarts.init(document.getElementById('fan-line-content'));
  myLineChart.showLoading({
    text: 'loading',
    color: '#f2b047',
    textColor: '#000',
  });
  myLineChart.setOption(option);
  setTimeout(() => {
    myLineChart.hideLoading();
  }, 500)
}

// 渲染todo列表
var renderTodoList = function () {
  var backgroundList = [ '#a1d5df', '#a1dfa1', '#f7ee7f', '#f1a66a' ]

  var strHtml = todolist.map((item, index) => {
    var finishRatio = Math.round(item.finish * 100 / (item.unfinished + item.finish));
    var background = backgroundList[ index ];
    return `<div class="todo-item">
              <h3>${ item.title }</h3>
              <div class='complete-ratio'>
                <div class='finish-box' style='width:${ finishRatio }%; background: ${ background };'></div>
                <div class='unfinish-box' style='width:${ 100 - finishRatio }%;'></div>
                <p class='ratio-box'>${ finishRatio }%</p>
              </div>
              <ul class='description-box'>
                <li><span class='description-icon' style="background: ${ background }"></span><span>已完成${ item.finish }</span></li>
                <li><span class='description-icon'></span><span>未完成${ item.unfinished }</span></li>
              </>
            </div>`
  }).join('');

  $('.todo-list').html(strHtml);
}

// 渲染事业部复选框列表
var renderSelectDistributeds = function () {
  var strHtml = `<label><input type="checkbox" data-id='all' class='checkbox-all'>全部</label>`
  strHtml += businessUnitList.map(item => {
    return `<label><input type="checkbox" data-id=${ item.id } class='checkbox-item'>${ item.name }</label>`
  }).join('');

  $('.distributeds-checkboxs').html(strHtml);
}

// 时间段点击事件
$('.right-operate').on('click', 'span', function (event) {
  var target = $(event.currentTarget);

  // 如果当前元素是被点击的, 不做任何操作
  if(target.hasClass('active')) return false;

  var type = target.attr('data-type');
  var interval = target.attr('data-interval');
  var startTime = intervalMap[ interval ]();
  // 切换active类名
  $(`.right-operate[data-type=${ type }] span`).removeClass('active');
  target.addClass('active');

  // 获取本模块的多选框
  var checkboxs = $(`.distributeds-checkboxs[data-type=${ type }] input.checkbox-item:checkbox:checked`)

  var ids = $.map(checkboxs, function (item) {
    return $(item).attr('data-id');
  }).join(',')

  // 更新模块数据
  reloadModule(type, ids, startTime)
});

// 点击查询事件
$('.query-btn').click(function (event) {
  var target = $(event.currentTarget);
  var type = target.attr('data-type');

  // 获取本模块的多选框
  var checkboxs = $(`.distributeds-checkboxs[data-type=${ type }] input.checkbox-item:checkbox:checked`) || [];

  var ids = $.map(checkboxs, function (item) {
    return $(item).attr('data-id');
  }).join(',')


  var $groupsBox = target.parents('.groups-box');;
  var interval = $groupsBox.find('.right-operate .active').attr('data-interval');
  var startTime = intervalMap[ interval ]();

  // 更新模块数据
  reloadModule(type, ids, startTime);
})

// 全选/反选事件
$(".distributeds-checkboxs").on("change", '.checkbox-all', function (event) {
  var target = $(event.currentTarget);
  var $parents = target.parents('.distributeds-checkboxs');
  // checkout勾选状态
  var checkedStatus = target.is(':checked');
  var checkboxs = $parents.find('.checkbox-item');

  for (var i = 0; i < checkboxs.length; i++) {
    if (checkboxs[ i ].type == "checkbox")
      checkboxs[ i ].checked = checkedStatus;
  }
})

// 单个勾选事件
$(".distributeds-checkboxs").on("change", '.checkbox-item', function (event) {
  var target = $(event.currentTarget);
  var $parents = target.parents('.distributeds-checkboxs');

  // 获取没选中的checkbox-item
  var unCheckedBoxs = $parents.find(".checkbox-item").not("input:checked");

  // 切换全选勾选框的勾选状态
  if (unCheckedBoxs.length > 0) {
    $parents.find('.checkbox-all')[ 0 ].checked = false;
  } else {
    $parents.find('.checkbox-all')[ 0 ].checked = true;
  }
})

getBusinessUnitList();
getFanLineChartData();
getTodoListData();
getBarData();

// 窗口变化后图表resize

// window.addEventListener("resize", () => {
//   myBarChart.resize();
//   myLineChart.resize();
// });

