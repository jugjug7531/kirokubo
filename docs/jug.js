//グラフの描写
function draw(tmpdata, tmpdate){
var ctx = document.getElementById("canvas").getContext("2d");
var config = new Chart(ctx,{
type: 'line',
data: {
        labels: tmpdate,
        datasets: [{
        label: "最高記録",
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
            labelString: '最高キャッチ数',
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

var test =['null'];
var date2, loop, k=0;

//初期動作ここから
  //日付取得
  var hiduke = new Date();
  var year = hiduke.getFullYear();
  var month = hiduke.getMonth()+1;
  var day = hiduke.getDate();
  var spawn = [];
  var tmp; //過去選択時に何ヶ月前かを記録するもの
  //横軸：今月の日付の配列作成
  var array1 = new Array();
  console.log(year + "/" + month + "/" + day);
  dayLongCheck(month);
  for (var i = 0; i < loop; i++) {
    array1[i] = year + "/" + month + "/" + (i+1);
  }
  //グラフ作成
  draw(test[k],array1);
//初期動作ここまで

$(function() {
  //ブラウザ再読み込み時にローカルストレージの中身を表示
    if (localStorage.getItem('database')) {
      console.log("kkk:"+k);
      $("#tourokuday").text(JSON.parse(localStorage.getItem('spawn'))[0]+"/"+JSON.parse(localStorage.getItem('spawn'))[1]+"/"+JSON.parse(localStorage.getItem('spawn'))[2]);
      test = JSON.parse(localStorage.getItem('database'));
      k = JSON.parse(localStorage.getItem('key'));
      spawn = JSON.parse(localStorage.getItem('spawn'));
      console.log("母母",test,k);
      //月が変わったら(次の月に変わったら)今月分の配列を後ろに増やす
      console.log(JSON.parse(localStorage.getItem('spawn'))[3],year*12+month);
      if (JSON.parse(localStorage.getItem('spawn'))[3]<year*12+month) {
        console.log(JSON.parse(localStorage.getItem('spawn'))[3],year,month,year*12+month);
        dayLongCheck(month);
        //今月分の配列増やしてtest配列のindexを１増やして移動する
        test.push(new Array(loop));
        console.log(test);
        k++;
        //kの値をローカルストレージに保存する
        spawn[3]=year*12+month;
        localStorage.setItem('key',JSON.stringify(k));
        localStorage.setItem('spawn',JSON.stringify(spawn));

      }
      draw(test[k],array1);
    }else {
      //初めて立ち上げた日を記録する配列を作ろう。
      //そして、こいつを基準に月or年が変わったかどうか判断して配列を追加しよう。
      spawn = [year,month,day,year*12+month,year*12+month];
      localStorage.setItem('spawn',JSON.stringify(spawn));
      console.log(JSON.parse(localStorage.getItem('spawn')));
      $("#tourokuday").text(spawn[0]+"/"+spawn[1]+"/"+spawn[2]);
      localStorage.setItem('key',JSON.stringify(k));
    }
  //最初は今日の日付を表示する
  $("#calender").val(year+"/"+month+"/"+day);
  //カレンダーで日付を選ぶ部分
  $("#calender").datepicker({
  onSelect: function(dateText, inst) {
  var date2 = $(this).datepicker( 'getDate' ); //カレンダーで指定された日時
    //未来の記録はできないようにする
    if (date2.getFullYear() > new Date().getFullYear()){
      //未来の年を選択した場合
      $('#future').text("未来の記録はできないよ！！").css("color","red");
      $('#add').prop('disabled',true);
    }else if (date2.getFullYear() == new Date().getFullYear() && date2.getMonth() > new Date().getMonth()){
      //今年かつ来月以降を選択した場合
      $('#future').text("未来の記録はできないよ！！").css("color","red");
      $('#add').prop('disabled',true);
    }else if(date2.getFullYear() == new Date().getFullYear() && date2.getMonth() == new Date().getMonth() && date2.getDate() > new Date().getDate()){
      //今年かつ今月かつ明日以降を選択した場合
      $('#future').text("未来の記録はできないよ！！").css("color","red");
      $('#add').prop('disabled',true);
    } else if(date2.getFullYear()*12+date2.getMonth()+1<spawn[4]){
      //登録月より前の日付を選択した場合
        $('#future').text("登録月より前の記録はできないよ！！").css("color","red");
        $('#add').prop('disabled',true);
    } else {
      console.log(spawn);
        //未来を選択しなかった場合（正しい場合）
        // "未来の記録はできないよ！！"表示を消去＆ボタン復活
        $('#future').text("");
        $('#add').prop('disabled',false);
        //月及び年が過去に変わった時の仕様 何ヶ月前を選択したのかをtmpに記録
        tmp=0;
        if (year>date2.getFullYear() || (year == date2.getFullYear() && month>date2.getMonth()+1) ){
          tmp = (year*12+month) - (date2.getFullYear()*12+date2.getMonth()+1);
          console.log("何ヶ月前？："+ tmp);
          k = k-tmp;
          console.log("k="+k);
        }
        //月及び年が未来に変わった時の仕様(見る専用) 何ヶ月先を選択したのかをtmpに記録
        if (year<date2.getFullYear() || (year == date2.getFullYear() && month<date2.getMonth()+1) ){
          tmp =(date2.getFullYear()*12+date2.getMonth()+1) - (year*12+month);
          console.log("何ヶ月先？："+ tmp);
          k = k+tmp;
          console.log("k="+k);
        }
        datechange(date2);
    }
  }});
});

//記録ボタンクリック時のアクション
$('#add').click(function(){
  //ローカルストレージがなければ新しくデータ配列作る
  if(!localStorage.getItem('database')){
    dayLongCheck(month);
    test[k] = new Array(loop);
  }

  // console.log(year,month,day);
  // console.log("選択日："year*12+month,"現選択日：");
  //データ登録して再描写する部分
  test[k].splice(day-1,1);//データ削除
  test[k].splice(day-1,0,document.kiroku.kaisuu.value);//データ追加
  localStorage.setItem('database',JSON.stringify(test)); //ローカルストレージに保存
  draw(test[k],array1);
});

//消去ボタンクリック時のアクション
$('#clear').click(function(){
  if(!confirm('本当に消去しますか？')){
    return false;
  }else{
    localStorage.clear();
    $('#clear1').text("消去しました！")
    test[k] = [];
    draw(test[k],array1);
  }
});

//横軸グラフの日付変更
function datechange(hiduke){
  year = hiduke.getFullYear();
  month = hiduke.getMonth()+1;
  day = hiduke.getDate();
  array1=[];

  dayLongCheck(month);
  for (var i = 0; i < loop; i++) {
    array1[i] = year + "/" + month + "/" + (i+1);
  }
}

//月の日数判定
function dayLongCheck(month){
  if(month==4||month==6||month==9||month==11){
    loop=30;
  }else if (month==2) {
    //うるう年判定
    if (year%4 == 0 && year%100 != 0 || year%400 == 0) {
        loop=29;
        console.log("閏年だよ");
    } else {
        loop=28;
    }
  }else{
    loop=31;
  }
}
