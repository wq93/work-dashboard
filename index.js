// 事业部列表
var businessUnitList = [
  {
    id: 1,
    name: 'sw1'
  },
  {
    id: 2,
    name: 'sw2'
  },
  {
    id: 3,
    name: 'sw3'
  },
  {
    id: 4,
    name: 'sw4'
  },
  {
    id: 5,
    name: 'sw5'
  },
  {
    id: 6,
    name: 'sw6'
  },
  {
    id: 1,
    name: 'sw1'
  },
  {
    id: 2,
    name: 'sw2'
  },
  {
    id: 3,
    name: 'sw3'
  },
  {
    id: 4,
    name: 'sw4'
  },
  {
    id: 5,
    name: 'sw5'
  },
  {
    id: 6,
    name: 'sw6'
  }
]

// todolist
var todolist = [
  {
    title: '待处理邮件', // 标题
    finish: 1, // 已完成
    total: 555, // 总共
  },
  {
    title: '待处理订单',
    finish: 111,
    total: 333
  },
  {
    title: '待处理纠纷',
    finish: 111,
    total: 222
  },
  {
    title: '待处理工单',
    finish: 444,
    total: 555
  },
]

// 扇形图数据
var lineData = [
  { value: 335, name: '李阳-1' },
  { value: 310, name: '李阳-2' },
  { value: 234, name: '李阳-3' },
  { value: 135, name: '李阳-4' },
  { value: 1548, name: '李阳-5' },
  { value: 1548, name: '李阳-6' },
  { value: 1548, name: '李阳-7' },
  { value: 1548, name: '李阳-8' },
  { value: 1548, name: '李阳-9' },
  { value: 1548, name: '李阳-10' },
  { value: 1548, name: '李阳-11' },
  { value: 1548, name: '李阳-12' },
];

// 柱状图数据
var barData = [
  {
    name: '早上点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 110,
      },
      {
        name: '李阳事业部-2',
        value: 111,
      },
      {
        name: '李阳事业部-3',
        value: 112,
      },
      {
        name: '李阳事业部-4',
        value: 113,
      },
      {
        name: '李阳事业部-5',
        value: 114,
      }
    ]
  },
  {
    name: '中午点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 120,
      },
      {
        name: '李阳事业部-2',
        value: 121,
      },
      {
        name: '李阳事业部-3',
        value: 122,
      },
      {
        name: '李阳事业部-4',
        value: 123,
      },
      {
        name: '李阳事业部-5',
        value: 124,
      }
    ]
  },
  {
    name: '晚上点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 130,
      },
      {
        name: '李阳事业部-2',
        value: 131,
      },
      {
        name: '李阳事业部-3',
        value: 132,
      },
      {
        name: '李阳事业部-4',
        value: 133,
      },
      {
        name: '李阳事业部-5',
        value: 134,
      }
    ]
  },
  {
    name: '夜宵点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 140,
      },
      {
        name: '李阳事业部-2',
        value: 141,
      },
      {
        name: '李阳事业部-3',
        value: 142,
      },
      {
        name: '李阳事业部-4',
        value: 143,
      },
      {
        name: '李阳事业部-5',
        value: 144,
      }
    ]
  },
]

var myLineChart = null;
var myBarChart = null;

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
        start: 65,
        end: 85
      },
      {
        type: 'inside',
        realtime: true,
        start: 45,
        end: 85
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
        center: [ '60%', '50%' ],
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
    var finishRatio = Math.round(item.finish * 100 / item.total);
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
                <li><span class='description-icon'></span><span>未完成${ item.total - item.finish }</span></li>
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
  var type = target.attr('data-type');

  // 切换active类名
  $(`.right-operate[data-type=${ type }] span`).removeClass('active');
  $(event.currentTarget).addClass('active');

  // 获取本模块的多选框
  var checkboxs = $(`.distributeds-checkboxs[data-type=${ type }] input.checkbox-item:checkbox:checked`)
  console.log(checkboxs);
  // 更新模块数据
  switch (type) {
    case '0':
      renderTodoList();
      break;
    case '1':
      renderBarChart();
      break;
    case '2':
      renderFanLineChart();
      break;
  }
});

// 点击查询事件
$('.query-btn').click(function (event) {
  var target = $(event.currentTarget);
  var type = target.attr('data-type');

  // 获取本模块的多选框
  var checkboxs = $(`.distributeds-checkboxs[data-type=${ type }] input.checkbox-item:checkbox:checked`)
  console.log(checkboxs);
  // 更新模块数据
  switch (type) {
    case '0':
      renderTodoList();
      break;
    case '1':
      renderBarChart();
      break;
    case '2':
      renderFanLineChart();
      break;
  }
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

renderSelectDistributeds();
renderTodoList();
renderBarChart();
renderFanLineChart();

// 窗口变化后图表resize
// window.addEventListener("resize", () => {
//   myBarChart.resize();
//   myLineChart.resize();
// });

