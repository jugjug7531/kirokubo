//記録する技の選択

//グラフの描写
function draw(tmpdata, tmpdate){
var ctx = document.getElementById("canvas").getContext("2d");
var config = new Chart(ctx,{
type: 'line',
data: {
        labels: tmpdate,
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
        data:tmpdata
     }]
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
}
)
};
var test = [20, 18, 22]
var date = ["2016/12/1", "2016/12/2", "2016/12/3"]
draw(test,date);

//日付取得
var hiduke = new Date();
var year = hiduke.getFullYear();
var month = hiduke.getMonth()+1;
var day = hiduke.getDate();

//記録ボタンクリック時のアクション
function add(){
  test.push(document.kiroku.kaisuu.value);
  date.push(year+"/"+month+"/"+day);
  draw(test,date);
}
