/** The simplest use of uibuilder client library
 * See the docs if the client doesn't start on its own.
 */

// Listen for incoming messages from Node-RED and action
// uibuilder.onChange('msg', (msg) => {
//     // do stuff with the incoming msg
// })


function updateRealTime() {
  var currentTime = new Date();
  var year = currentTime.getFullYear();
  var month = currentTime.getMonth() + 1; // Tháng trong JavaScript được tính từ 0 đến 11, nên cần cộng thêm 1
  var day = currentTime.getDate();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  var formattedTime = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
  document.getElementById('real-time').textContent = formattedTime;
}

// Cập nhật thời gian mỗi giây
setInterval(updateRealTime, 1000);


window.syntaxHighlight = function (json) {
  json = JSON.stringify(json, undefined, 4)
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number'
      if ((/^"/).test(match)) {
          if ((/:$/).test(match)) {
              cls = 'key'
          } else {
              cls = 'string'
          }
      } else if ((/true|false/).test(match)) {
          cls = 'boolean'
      } else if ((/null/).test(match)) {
          cls = 'null'
      }
      return '<span class="' + cls + '">' + match + '</span>'
  })
  return json
} // --- End of syntaxHighlight --- //

window.onload = function () 
{
  // Start up uibuilder - see the docs for the optional parameters
  uibuilder.start()
  uibuilder.onChange('msg', function (msg) 
  {

    //AC total output from oct 3rd
    if (msg.topic === "total_output" ){ 
      const AC_total = document.getElementById('AC_total_output')
      AC_total.innerText = msg.payload; // tính PR rồi quăng vào đây
    }

      if (msg.topic === "PR" ){
        const GM_pr = document.getElementById('GM_pr_value_big')
        GM_pr.innerText = msg.payload.agm; // tính PR rồi quăng vào đây
        const AR_pr = document.getElementById('AR_pr_value_big')
        AR_pr.innerText = msg.payload.ar; // tính PR rồi quăng vào đây
        const AP_pr = document.getElementById('AP_pr_value_big')
        AP_pr.innerText = msg.payload.ap; // tính PR rồi quăng vào đây
        const AC_pr = document.getElementById('AC_pr_value_big')
        AC_pr.innerText = msg.payload.ac; // tính PR rồi quăng vào đây 
      }

      // STATUS COLOR

      if (msg.topic === "GM_status") {
        const GM_stt = document.getElementById('GM_status_id');
        GM_stt.style.backgroundColor = msg.payload;
      }

      if (msg.topic === "AR_status") {
        const AR_stt = document.getElementById('AR_status_id');
        AR_stt.style.backgroundColor = msg.payload;
      }
      if (msg.topic === "AP_status") {
        const AP_stt = document.getElementById('AP_status_id');
        AP_stt.style.backgroundColor = msg.payload;
      }
      if (msg.topic === "AC_status") {
        const AC_stt = document.getElementById('AC_status_id');
        AC_stt.style.backgroundColor = msg.payload;
      }
      if (msg.topic === "oven_status") {
        const Oven_stt = document.getElementById('oven_status_id');
        Oven_stt.style.backgroundColor = msg.payload;
      }

      if (msg.topic === "AC_parameter" ){ 
        const AC_out = document.getElementById('AC_output')
        AC_out.innerText = msg.payload.AC_OUPUT; // tính PR rồi quăng vào đây
        const AC_oee = document.getElementById('AC_oee')
        AC_oee.innerText = msg.payload.AC_OEE; // tính PR rồi quăng vào đây
        const AC_or = document.getElementById('AC_or')
        AC_or.innerText = msg.payload.AC_OR; // tính PR rồi quăng vào đây
        const AC_pr = document.getElementById('AC_pr')
        AC_pr.innerText = msg.payload.AC_PR; // tính PR rồi quăng vào đây 
        const AC_qr = document.getElementById('AC_qr')
        AC_qr.innerText = msg.payload.AC_QR; // tính PR rồi quăng vào đây 
      }
      
      if (msg.topic === "AGM")
      {
          const GM_machine = document.getElementById('GM_machine_ouput_card_value')
          GM_machine.innerText = msg.payload.output;
          const GM_production = document.getElementById('GM_production_card_value')
          GM_production.innerText = msg.payload.operation;
      }

      if (msg.topic === "AR")
      {
          const AR_machine = document.getElementById('AR_machine_ouput_card_value')
          AR_machine.innerText = msg.payload.output;
          const AR_production = document.getElementById('AR_production_card_value')
          AR_production.innerText = msg.payload.operation;
      }

      if (msg.topic === "AC")
      {            
          const AC_machine = document.getElementById('AC_machine_ouput_card_value')
          AC_machine.innerText = msg.payload.output;
          const AC_production = document.getElementById('AC_production_card_value')
          AC_production.innerText = msg.payload.operation;
      }

      if (msg.topic === "AP")
      {
          const AP_machine = document.getElementById('AP_machine_ouput_card_value')
          AP_machine.innerText = msg.payload.output;
          const AP_production = document.getElementById('AP_production_card_value')
          AP_production.innerText = msg.payload.operation;
      }

      if (msg.topic === "CV")
      {
          const CV_loading_qty = document.getElementById('loading-qty')
          CV_loading_qty.innerText = msg.payload[0].output_total; // tính PR rồi quăng vào đây
          const CV_loading_ct = document.getElementById('loading-ct')
          CV_loading_ct.innerText = msg.payload[0].cycle_time;
          const CV_feeding_lost = document.getElementById('feeding-lost')
          CV_feeding_lost.innerText = msg.payload[0].feeding_lost;
          const CV_watting_lost = document.getElementById('watting-lost')
          CV_watting_lost.innerText = msg.payload[0].waiting_lost;
      }
      
      if (msg.topic === "OV1")
      {
          const OV1_UPV = document.getElementById('OV1-UPV')
          OV1_UPV.innerText = msg.payload[0].pv_up_col;
          const OV1_USV = document.getElementById('OV1-USV')
          OV1_USV.innerText = msg.payload[0].sv_up_col;
          const OV1_DPV = document.getElementById('OV1-DPV')
          OV1_DPV.innerText = msg.payload[0].pv_down_col;
          const OV1_DSV = document.getElementById('OV1-DSV')
          OV1_DSV.innerText = msg.payload[0].sv_down_col;
          const OV1_speed = document.getElementById('OV1-speed')
          OV1_speed.innerText = msg.payload[0].speed_col;
      }
      if (msg.topic === "OV2")
      {
          const OV2_UPV = document.getElementById('OV2-UPV')
          OV2_UPV.innerText = msg.payload[0].pv_up_col; 
          const OV2_USV = document.getElementById('OV2-USV')
          OV2_USV.innerText = msg.payload[0].sv_up_col;
          const OV2_DPV = document.getElementById('OV2-DPV')
          OV2_DPV.innerText = msg.payload[0].pv_down_col;
          const OV2_DSV = document.getElementById('OV2-DSV')
          OV2_DSV.innerText = msg.payload[0].sv_down_col;
          const OV2_speed = document.getElementById('OV2-speed')
          OV2_speed.innerText = msg.payload[0].speed_col;
      }
      if (msg.topic === "OV3")
      {
          const OV3_UPV = document.getElementById('OV3-UPV')
          OV3_UPV.innerText = msg.payload[0].pv_up_col; 
          const OV3_USV = document.getElementById('OV3-USV')
          OV3_USV.innerText = msg.payload[0].sv_up_col;
          const OV3_DPV = document.getElementById('OV3-DPV')
          OV3_DPV.innerText = msg.payload[0].pv_down_col;
          const OV3_DSV = document.getElementById('OV3-DSV')
          OV3_DSV.innerText = msg.payload[0].sv_down_col;
          const OV3_speed = document.getElementById('OV3-speed')
          OV3_speed.innerText = msg.payload[0].speed_col;
      }

      if (msg.topic === "have_material") {
          var circleEl = document.getElementById('circle');
          var numberEl = document.getElementById('number');
          // Cập nhật màu sắc của hình tròn thành đỏ
          circleEl.style.backgroundColor = 'red';

          // Thay đổi số trong hình tròn thành "quần què"
          numberEl.innerText = 'quần què';
      }

      
  //------------------------------ horizon bar chart -------------------------------------------
  if(msg.topic === 'downtime_chart')
  {   
    var xValues = ["PRODUCTION", "PLANDOWN", "IDLE", "ALARM"];
    var leftValues = msg.payload.dudime;
    var rightValues = msg.payload.remaining;
    var barColors = ["#009879", "#009879","#009879","#009879"];


    let new_hori_chart = Chart.getChart('horizon-bar');
    const config_hori_chart = {type: "bar",
    data: {
    labels: xValues,
    datasets: [
        {
            label: 'data1',
            backgroundColor: barColors,
            data: leftValues,
        },
        {
            label: '',
            backgroundColor: '#f4f5f6',
            data: rightValues,
        },
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: false},
        title: {
          display: true,
          text: "DOWNTIME STATISTICS"
        },
        scales: {
            x: {stacked: true,},
            y: {stacked: true}
          }
      }
    };

    if (new_hori_chart) {
      new_hori_chart.data.labels = xValues;
      new_hori_chart.data.datasets[0].data = leftValues;
      new_hori_chart.data.datasets[1].data = rightValues;
      new_hori_chart.backgroundColor = '#009879';
      // console.log(leftValues);
      // console.log(new_hori_chart.data.datasets[0].data);
      // console.log(rightValues);
      // console.log(new_hori_chart.data.datasets[1].data);
      new_hori_chart.update();
      } else {
        new new_hori_chart('horizon-bar', config_hori_chart)
      }
    }
//------------------------------ end -------------------------------------------


// //------------------------------ multi-line chart  -------------------------------------------
if(msg.topic === 'performance_chart')
{
    var speedCanvas = document.getElementById("multi-line");
    var valuedataFirst = msg.payload.AGM_pr_chart
    var dataFirst = {
        label: "GAUGE MARKING",
        data: valuedataFirst,
        lineTension: 0.3,
        fill: false,
        borderColor: 'red'
      };

    var valuedataSecond = msg.payload.AR_pr_chart
    var dataSecond = {
        label: "BUFFING",
        data: valuedataSecond,
        lineTension: 0.3,
        fill: false,
        borderColor: 'blue'
      };

    var valuedataThird = msg.payload.AP_pr_chart
    var dataThird = {
        label: "PRIMING",
        data: valuedataThird,
        lineTension: 0.3,
        fill: false,
        borderColor: 'green'
      };

    var valuedataForth = msg.payload.AC_pr_chart 
    var dataForth = {
        label: "CEMENTING",
        data: valuedataForth,
        lineTension: 0.3,
        fill: false,
        borderColor: 'purple'
      };  

    var speedDataYaxis =["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"];
    var speedData = {
      labels: speedDataYaxis,    // THỜI GIAN
      datasets: [dataFirst, dataSecond, dataThird, dataForth]
    };

    var chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
        position: 'top',
        labels: { 
          boxWidth: 60,
          fontColor: 'black'
        }
      }
    };

    let new_multi_line_chart = Chart.getChart(speedCanvas);
    const config_multi_line_chart = {
    type: 'bar',
    data: speedData,
    options: chartOptions
    }

    if (new_multi_line_chart) {
      new_multi_line_chart.data.labels = speedDataYaxis;
      new_multi_line_chart.data.datasets[0].data = valuedataFirst;
      new_multi_line_chart.data.datasets[1].data = valuedataSecond;
      new_multi_line_chart.data.datasets[2].data = valuedataThird;
      new_multi_line_chart.data.datasets[3].data = valuedataForth;
      new_multi_line_chart.update();
    } else {
      new new_multi_line_chart('speedCanvas', config_multi_line_chart)
    }
  }
// //------------------------------ end -------------------------------------------









// //------------------------------ bar-line-chart  -------------------------------------------
if(msg.topic ==='AC_output_chart_topic')     
{
var countries = ["7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
var currentOutput = msg.payload.ac_out;
var targetOutput = msg.payload.target;
var bar_chart_difference = msg.payload.different;

    
    let new_bar_line_chart = Chart.getChart('bar-line');
    const config_bar_line_chart = {
      plugins: [ChartDataLabels],
      type: "bar",
      data: {
      labels: countries,
      datasets: [
        {
            label: 'CURRENT',
            backgroundColor: '#009879',
            data: currentOutput,
            datalabels: {
              color: 'white',
              anchor: 'start',
              align : 'top',
              }
        },
        {
            label: 'TARGET',
            backgroundColor: 'red',
            data: targetOutput,
            type: 'line',
            datalabels: {
              display: false,
            }
        },
        {
            label: 'DIFFERENT',
            backgroundColor: '#a4a9b2ff',
            data: bar_chart_difference,
            datalabels: {
              color: 'black',
              anchor: 'end',
              align : 'top'
            },
            type: 'bar',
            yAxisID: 'y1',
        },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart Title',
          }
        },
        legend: {
            display: false},
        title: {
          display: true,
          text: "World Wine Production 2019"
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            grid: {
              display: false,
            },
            stacked: true,
            min: 0,
            max: 200,
          },
          y1: {
            grid: {
              display: false,
            },
            display:false,
            position: 'right',
            stacked: true,
            min: -500,
            max: 50,
          }
          }
      }
    }
    if (new_bar_line_chart) {
      new_bar_line_chart.data.labels = countries;
      new_bar_line_chart.data.datasets[0].data = currentOutput;
      new_bar_line_chart.data.datasets[1].data = targetOutput;
      new_bar_line_chart.data.datasets[2].data = bar_chart_difference;
      //new_bar_line_chart.backgroundColor = barColors;
      new_bar_line_chart.update();
      } else {
        new new_hori_chart('bar-line', config_bar_line_chart)
      }
    }

//------------------------------ end -------------------------------------------
    //update_chart();
} 
)



/////////// CONFIG CHART /////////////// CONFIG CHART///////////////

var countries = ["7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
var currentOutput = [72, 80, 85, 73, 60, 71, 50, 72, 95, 24, 72, 82, 80, 89, 85, 88, 92, 100, 50];
var targetOutput = [120, 110, 120, 100, 115, 130, 123, 100, 115, 112, 98, 110, 105, 104, 100, 100, 100, 100, 100];
var bar_chart_difference = [0, -5, -7, 3, 6];
var barColors1 = ["#009879", "#009879","#009879","#009879","#009879"];

new Chart("bar-line", {
  plugins: [ChartDataLabels],
  type: "bar",
  data: {
  labels: countries,
  datasets: [
    {
        label: 'CURRENT',
        backgroundColor: barColors1,
        data: currentOutput,
        datalabels: {
          color: 'white',
          anchor: 'start',
          align : 'top',
        }
    },
    {
        label: 'TARGET',
        data: targetOutput,
        type: 'line',
        datalabels: {
          display: false,
        },
        elements: {
          line: {
            borderWidth: 0.5,
            backgroundColor: 'red',
            borderColor: 'red'
                },
          point:{
            backgroundColor: 'white',
            borderColor: ' red',
            borderWidth: 1,
            radius: 3

                }
      },
    },
    {
      label: 'DIFFERENT',
      backgroundColor: '#a4a9b2ff',
      data: bar_chart_difference,
      datalabels: {
        color: 'black',
        anchor: 'end',
        align : 'top'
      },
      type: 'bar',
      yAxisID: 'y1',
    },
    ]
  },
  
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'CAPACITY TRENDS',
      }
    },
    legend: {
        display: false},
    title: {
      display: true,
      text: "World Wine Production 2019"
    },
    scales: {
        x: {
          grid: {
            display: false,
          },
          stacked: true,
        },
        y: {
          grid: {
            display: false,
          },
          display: false,
          stacked: true,
          min: 0,
          max: 200,
        },
        y1: {
          grid: {
            display: false,
          },
          display:false,
          position: 'right',
          stacked: true,
          min: -500,
          max: 50,
        }
      }
  }
});

 
////////////////////////////////////   MULTI-LINE  /////////////////////////////////////////////////////////


var speedCanvas = document.getElementById("multi-line");
var valuedataFirst = [860,1140,1060,1060,1070,1110,1330]
var dataFirst = {
    label: "GAUGE MARKING",
    data: valuedataFirst,
    lineTension: 0.3,
    borderColor: 'red',
    elements: {
      line: {
        borderColor: 'red',
      },
      point:{
        backgroundColor: 'red',
      }
  },
    
  };

var valuedataSecond = [860,555,444,800,850,900,950]
var dataSecond = {
    label: "BUFFING",
    data: valuedataSecond,
    lineTension: 0.3,
    elements: {
      line: {
        borderColor: 'blue',
      },
      point:{
        backgroundColor: 'blue',
      }
  },
  };

var valuedataThird = [400,450,500,600,650,670,750]
var dataThird = {
    label: "PRIMING",
    data: valuedataThird,
    lineTension: 0.3,
    elements: {
      line: {
        borderColor: 'green',
      },
      point:{
        backgroundColor: 'green',
      }
  },
  };

var valuedataForth = [200,250,350,480,700,600,1330]  
var dataForth = {
    label: "CEMENTING",
    data: valuedataForth,
    lineTension: 0.3,
    elements: {
      line: {
        borderColor: 'purple',
      },
      point:{
        backgroundColor: 'purple',
      }
  },
  };  

var speedDataYaxis =["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"];
var speedData = {
  labels: speedDataYaxis,    // THỜI GIAN
  datasets: [dataFirst, dataSecond, dataThird, dataForth]
};

var chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
        line: {
        borderWidth: 1.5,// Thay đổi kích thước độ rộng của đường
            },
        point:{
        radius: 1.3
            }
    },
  plugins: {
    title: {
      display: true,
      text: 'PERFORMANCE',
    },
      legend: {
         labels: { 
         boxWidth:  25,
         boxHeight: 2,
         color: 'black',
                 },
             },
           },
  // lưới
  scales: {
    x: {stacked: true,
      grid: {display: false},
    },
    y: {
      type: 'linear',
      position: 'left',
   
      grid: {display: false},
    },
  },
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});


/////////////////////////////// HORIZON BAR  /////////////////////////////////////////////////

      var xValues = ["PRODUCTION", "PLANDOWN", "IDLE", "ALARM"];
      var leftValues = [55, 49, 44, 24];
      var rightValues = [45, 51, 56, 76];
      var barColors = ["#009879", "#009879","#009879","#009879"];

      new Chart("horizon-bar", {
        type: "bar",
        data: {
        labels: xValues,
        datasets: [
          {
              label: 'Current Time',
              backgroundColor: barColors,
              data: leftValues,
          },
          {
              label: 'Remaining',
              backgroundColor: '#a4a9b2ff',
              data: rightValues
          },
          ]
      },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend: {display: false},
                title: {
                display: true,
                text: 'DOWNTIME STATISTICS',
                },
            },
            scales: {
              x: {stacked: true,grid: {
                display: false,
              },},
              y: {stacked: true,grid: {
                display: false,
              },},
            }
        }
      }
    );}
  
