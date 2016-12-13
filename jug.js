//記録する技の選択
//var =

var tmpdata1 = [30,35,56];
data=40;
tmpdata1.push(data);
console.log(tmpdata1);
//グラフの描写
var config = {
type: 'line',
data: {
    labels: ["2016/12/1", "2016/12/2", "2016/12/3", "2016/12/4", "2016/12/5", "2016/12/6", "2016/12/7"],
    datasets: [{
        label: "5bカスケード",
        fill: false,
        backgroundColor: "#3A7AC9",
        borderWidth: 2,
        borderColor: "#3A7AC9",
        pointBorderColor: "#3A7AC9",
        pointBackgroundColor: "#3A7AC9",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3A7AC9",
        pointHoverBorderColor: "#3A7AC9",
        pointHoverBorderWidth: 2,
        tension: 0,
        //data: [20, 18, 22, 27, 25, 24, 31]
        data:tmpdata1
     }//,
    // {
    //     label: "4bシャワー",
    //     fill: false,
    //     backgroundColor: "#FF0000",
    //     borderWidth: 2,
    //     borderColor: "#FF0000",
    //     pointBorderColor: "#FF0000",
    //     pointBackgroundColor: "#FF0000",
    //     pointBorderWidth: 2,
    //     pointHoverRadius: 5,
    //     pointHoverBackgroundColor: "#FF0000",
    //     pointHoverBorderColor: "#FF0000",
    //     pointHoverBorderWidth: 2,
    //     tension: 0,
    //     data: [10, 28, 32, 44, 38, 42, 52]
    // },
    // {
    //     label: "3bバッククロス",
    //     fill: false,
    //     backgroundColor: "#32CD32",
    //     borderWidth: 2,
    //     borderColor: "#32CD32",
    //     pointBorderColor: "#32CD32",
    //     pointBackgroundColor: "#32CD32",
    //     pointBorderWidth: 2,
    //     pointHoverRadius: 5,
    //     pointHoverBackgroundColor: "#32CD32",
    //     pointHoverBorderColor: "#32CD32",
    //     pointHoverBorderWidth: 2,
    //     tension: 0,
    //     data: [6, 9, 10, 11, 9, 12, 10]
    // }
  ]
  },
options: {
   responsive: true,
   scales: {
      xAxes: [{
         display: true,
         stacked: false,
         gridLines: {
            display: false
         }
      }],
      yAxes: [{
         display: true,
         scaleLabel: {
            display: true,
            labelString: 'キャッチ数',
            fontFamily: 'monospace',
            fontSize: 14
         },
         ticks: {
            callback: function(value){
               return value+'回';
            }
         }
      }]
   }
}
};
//var cas_5b = new config;
window.onload = function() {
var ctx = document.getElementById("canvas").getContext("2d");
window.myLine = new Chart(ctx, config);
};
