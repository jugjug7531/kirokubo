
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
   scaleOverride : true,
   scaleStepWidth : 5,
   scaleStartValue : 0,
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
         ticks: {　//スケール
           min:0,
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

var test = [];

//日付取得
var hiduke = new Date();
var year = hiduke.getFullYear();
var month = hiduke.getMonth()+1;
var day = hiduke.getDate();

//カレンダー表示＆日付取得
$(function() {
  //ブラウザ再読み込み時にローカルストレージの中身を表示
    if (localStorage.getItem('database')) {
      //localStorage.removeItem('database');
      test = JSON.parse(localStorage.getItem('database'));
      console.log(test);
      draw(test,array1);
    }
  $("#calender").datepicker({
  onSelect: function(dateText, inst) {
  //var date1 = dateText; // 08/13/2014の形
  var date2 = $(this).datepicker( 'getDate' ); //　Wed Aug 13 2014 00:00:00 GMT+0900　の形
  $("#date").text(date2.getMonth()+1);
  datechange(date2);
  }
  });
});

//横軸：日付の配列作成
var array1 = new Array(31);
for (var i = 0; i < array1.length; i++) {
  array1[i] = year + "/" + month + "/" + (i+1);
}
draw(test,array1);

//記録ボタンクリック時のアクション
function add(){
  test.push(document.kiroku.kaisuu.value);
  //localStorage.setItem('database',JSON.stringify(test)); //ローカルストレージに保存
  //console.log(localStorage.getItem('database'));
  draw(test,array1);
}
$('#addd').click(function(){
  localStorage.setItem('database',JSON.stringify(test)); //ローカルストレージに保存
  console.log(localStorage.getItem('database'));
})

//横軸グラフの日付変更
function datechange(hiduke){
  year = hiduke.getFullYear();
  month = hiduke.getMonth()+1;
  day = hiduke.getDate();
  var loop;
  array1=[];
  if(month==2||month==4||month==6||month==9||month==11){
    loop=30
  }else{
    loop=31
  }
  for (var i = 0; i < loop; i++) {
    array1[i] = year + "/" + month + "/" + (i+1);
  }
}
