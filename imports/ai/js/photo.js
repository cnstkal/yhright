(function(){
  // 임시 샘플 사진 20장: 외부 링크 없이 캔버스로 생성한 그라데이션 이미지
  function make(i){
    var portrait=i%3!==1, w=portrait?600:800, h=portrait?800:600;
    var c=document.createElement("canvas");c.width=w;c.height=h;var g=c.getContext("2d");
    var hue=(i*47)%360, g1=g.createLinearGradient(0,0,w,h);
    g1.addColorStop(0,"hsl("+hue+",65%,72%)");g1.addColorStop(1,"hsl("+((hue+60)%360)+",55%,38%)");
    g.fillStyle=g1;g.fillRect(0,0,w,h);
    g.fillStyle="rgba(255,255,255,.55)";g.beginPath();g.arc(w*(.25+(i%5)*.12),h*.35,Math.min(w,h)*.14,0,Math.PI*2);g.fill();
    g.fillStyle="rgba(0,0,0,.25)";g.fillRect(0,h*.72,w,h*.28);
    return c.toDataURL("image/jpeg",.82);
  }
  // 이미지/사진 폴더의 실제 사진을 보관함에 표시
  var FILES=["HP2LllraQAA8ue2.jpg","HP2LllwbgAEqVRd.jpg","HP2Lmk2aQAATNpC.jpg","HP2LnkqbIAAiYij.jpg","HP2LpeAbEAAqwqr.jpg","HP2LpeAbUAAo5UU.jpg","HP2LpeBbwAAWpQ5.jpg","HS57O5Ka8AARH3L.jpg","HS57QRmaYAAzhkw.jpg","HS57Rk-boAAdFeo.jpg","HS57RlOa8AAkoO-.jpg","HUrOhekaAAEIEdy.jpg","HUrOhzabkAAZPgL.jpg","HUrOiYZbAAArf6D.jpg","HVZhxbEacAAFyf4.jpg"];
  var photos=FILES.map(function(f,i){
    var m=(i*13+43)%60, h=12+(i*5)%12;
    return {src:encodeURI("../이미지/사진/"+f),thumb:encodeURI("../이미지/사진/thumbs/"+f),video:"",time:"오후 "+(h>12?h-12:h)+":"+(m<10?"0":"")+m};
  });
  photos[0].time="오후 12:43";
  document.getElementById("cnt").textContent=photos.length.toLocaleString("ko-KR")+"개의 항목";
  var grid=document.getElementById("grid"),strip=document.getElementById("strip"),big=document.getElementById("big"),
      stage=document.getElementById("stage"),lib=document.getElementById("lib"),det=document.getElementById("det"),
      dtime=document.getElementById("dtime"),cur=0;
  photos.forEach(function(p,i){
    var b=document.createElement("button");b.className="cell";b.setAttribute("aria-label","사진 "+(i+1));
    b.innerHTML='<img alt="" loading="lazy" decoding="async" src="'+p.thumb+'">'+(p.video?'<span class="dur">'+p.video+'</span>':"");
    b.onclick=function(){open(i)};grid.appendChild(b);
    var t=document.createElement("button");t.setAttribute("aria-label","사진 "+(i+1));
    t.innerHTML='<img alt="" loading="lazy" decoding="async" src="'+p.thumb+'">';t.onclick=function(){show(i,true)};strip.appendChild(t);
  });
  function show(i,smooth){
    if(i<0||i>=photos.length)return;
    cur=i;big.src=photos[i].src;dtime.textContent=photos[i].time;
    var bs=strip.children;
    for(var k=0;k<bs.length;k++)bs[k].classList.toggle("cur",k===i);
    var el=bs[i];strip.scrollTo({left:el.offsetLeft-(strip.clientWidth-el.offsetWidth)/2,behavior:smooth?"smooth":"auto"});
  }
  function open(i){lib.hidden=true;det.hidden=false;show(i,false);}
  document.getElementById("back").onclick=function(){det.hidden=true;lib.hidden=false;};
  // 좌우 스와이프 및 키보드 화살표로 이전/다음 사진
  var sx=null;
  stage.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;},{passive:true});
  stage.addEventListener("touchend",function(e){
    if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;
    if(Math.abs(dx)>40)show(cur+(dx<0?1:-1),true);
  });
  document.addEventListener("keydown",function(e){
    if(det.hidden)return;
    if(e.key==="ArrowRight")show(cur+1,true);
    if(e.key==="ArrowLeft")show(cur-1,true);
  });
})();
