// 柱状图数据
var barData = []

// 事业部列表
var businessUnitList = [];

// todolist
var todolist = []

// 扇形图数据
var lineData = [];

var myLineChart = null;
var myBarChart = null;

// 获取事业部数据
var getBusinessUnitList = function () {
  $.ajax({
    type: "GET",
    url: '/api/displayPlatFrom/get/groups',
    dataType: "json",
    success: function (data) {
      businessUnitList = data.item.businessUnit;
      renderSelectDistributeds();

      // 请求模块数据
      getFanLineChartData();
      getTodoListData();
      getBarData();
    },
    error: function (jqXHR) {
      businessUnitList = [];
      $('.work-dashboard-wrapper').html(`<p class='no-data' style='font-size: 22px; margin: 120px auto'>欢迎访问ACE系统</p>`)
    }
  });
};

// 获取扇形图数据
var getFanLineChartData = function (ids = '', time = 0) {
  time = time ? time : intervalMap['week']();
  $.ajax({
    type: "GET",
    url: `/api/displayPlatFrom/get/freshdeskTicketType?time=${ time }&groups=${ ids }`,
    dataType: "json",
    success: function (data) {
      lineData = data.item.lineData;
      if (lineData.length > 0) {
        $('#fan-line-content').show();
        $('.line-no-data').hide();
        renderFanLineChart();
      } else {
        $('#fan-line-content').hide();
        $('.line-no-data').show();
      }
    },
    error: function (jqXHR) {
      lineData = [];
      $('#fan-line-content').hide();
      $('.line-no-data').show();
    }
  });
}

// 获取柱状图数据
var getBarData = function (ids = '', time = 0) {
  time = time ? time : intervalMap['today']();

  if(!ids) {
    // 获取本模块的多选框
    var checkboxs = $(`.distributeds-checkboxs[data-type='1'] input.checkbox-item:checkbox:checked`);

    var checkboxsids = $.map(checkboxs, function (item) {
      return $(item).attr('data-id');
    }).join(',');
    ids = checkboxsids;
  }

  $.ajax({
    type: "GET",
    url: `/api/displayPlatFrom/get/barData?groups=${ ids }&time=${ time }`,
    dataType: "json",
    success: function (data) {
      barData = data.item.barData;

      // 过滤空数组
      barData = $.map(barData, function (item) {
        if(item.data.length > 0) {
          return item;
        }
      })

      if (barData.length > 0) {
        $('#bar-content').show();
        $('.bar-no-data').hide();
        renderBarChart();
      } else {
        $('#bar-content').hide();
        $('.bar-no-data').show();
      }
    },
    error: function (jqXHR) {
      barData = [];
      $('#bar-content').hide();
      $('.bar-no-data').show();
    }
  });
}

// 获取todolist数据
var getTodoListData = function (ids = '') {

  if(!ids) {
    // 获取本模块的多选框
    var checkboxs = $(`.distributeds-checkboxs[data-type='0'] input.checkbox-item:checkbox:checked`);

    var checkboxsids = $.map(checkboxs, function (item) {
      return $(item).attr('data-id');
    }).join(',');
    ids = checkboxsids;
  }

  $.ajax({
    type: "GET",
    url: `/api/displayPlatFrom/get/todolist?groups=${ ids }`,
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

// 刷新模块方法
var reloadModule = function (type, ids = '', time = '') {
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

// 获取当天0点的时间戳
var getTodayTime = function () {
  return new Date(new Date().toLocaleDateString()).getTime();
}

// 返回时间间隔时间戳(秒)
var intervalMap = {
  today: function () {
    return ((new Date(new Date().toLocaleDateString()).getTime())/1000).toFixed(0);
  },
  week: function () {
    return ((getTodayTime() - 7 * 24 * 60 * 60 *1000)/1000).toFixed(0);
  },
  month: function () {
    return ((getTodayTime() - 30 * 24 * 60 * 60 *1000)/1000).toFixed(0);
  },
  threeMonth: function () {
    return ((getTodayTime() - 90 * 24 * 60 * 60 *1000)/1000).toFixed(0) ;
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

  var categories = $.map(barData[ 0 ][ 'data' ], function (item) {
    return item.name;
  })

  var series = $.map(barData, function (item) {
    return {
      name: item.name,
      type: 'bar',
      barGap: 0,
      label: labelOption,
      data: $.map(item.data, function (itemVal) {
        return itemVal.value
      }),
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
  setTimeout(function () {
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
    color:['#37a2da','#9fe6b8','#ffdb5c', '#ed86b2', '#e7bcf3', '#9d96f5'],
    label: {
      show: true,
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: 'left',
      data: $.map(lineData, function (item) {
        return item.name;
      })
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
  setTimeout(function () {
    myLineChart.hideLoading();
  }, 500)
}

// 渲染todo列表
var renderTodoList = function () {
  var backgroundList = [ '#a1d5df', '#a1dfa1', '#f7ee7f', '#f1a66a' ]

  var strHtml = $.map(todolist, function (item, index) {
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
  var strHtml = `<label><input type="checkbox" data-id='all' class='checkbox-all checkbox' checked>全部</label>`;

  strHtml += $.map(businessUnitList, function (item) {
    return `<label><input type="checkbox" data-id=${ item.id } class='checkbox-item checkbox' checked>${ item.name }</label>`;
  }).join('');

  $('.distributeds-checkboxs').html(strHtml);

  // 初始默认勾选框都选中
  // var checkboxs = $('.distributeds-checkboxs').find('.checkbox');
  //
  // for (var i = 0; i < checkboxs.length; i++) {
  //   if (checkboxs[ i ].type == "checkbox")
  //     checkboxs[ i ].checked = true;
  // }
}

// 时间段点击事件
$('.right-operate').on('click', 'span', function (event) {
  var target = $(event.currentTarget);

  // 如果当前元素是被点击的, 不做任何操作
  if (target.hasClass('active')) return false;

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


  var $groupsBox = target.parents('.groups-box');
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

// 初始调用
getBusinessUnitList();

// 窗口变化后图表resize
// window.addEventListener("resize", function () {
  //myBarChart.resize();
  // myLineChart.resize();
// });


