(()=>{'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const KEY='yhright.kakaotalk.v2',H=36e5,DAY=864e5;

/* ---------- 데이터 ---------- */
const ME={id:'me',name:'정윤호',st:'괜찮아'};
const FR=[
 {id:'f1',name:'송민기',st:'별거 아님'},
 {id:'f2',name:'민재',st:'학교'},
 {id:'f3',name:'현우',st:'잠'},
 {id:'f4',name:'수빈',st:'🍀'},
 {id:'f5',name:'모텔 사장님',st:''},
 {id:'f6',name:'옆방 할아버지',st:''},
 {id:'f7',name:'공시생 형',st:'공부 중'}
];
const HUE={me:210,f1:340,f2:200,f3:30,f4:170,f5:260,f6:120,f7:50,f8:300};
const fById=id=>id==='me'?ME:FR.find(f=>f.id===id);
const SIL='<svg viewBox="0 0 24 24"><circle cx="12" cy="8.500" r="4.800"/><path d="M2.500 24c.5-6.500 4.800-9 9.500-9s9 2.500 9.500 9z"/></svg>';
const avHtml=(id,cls='')=>`<span class="kt-av ${cls}" style="background:hsl(${HUE[id]||210},18%,72%)">${SIL}</span>`;

function seed(){
 const n=Date.now(),m=(from,text,ago)=>({id:uid(),me:from==='me',from,text,ts:n-ago});
 return{chats:[
  {id:'c1',name:'송민기',group:false,members:['f1'],unread:1,msgs:[
   m('f1','야 오늘 학교 끝나고 뭐함',DAY*3+5*H),
   m('me','모텔 들어가야지 왜',DAY*3+4.8*H),
   m('f1','밥은 먹고 들어가라',DAY*3+4.5*H),
   m('me','돈 없어서 대충 먹을거임ㅋㅋ',DAY*3+4.3*H),
   m('f1','또 그 소리 ㅋㅋ 내가 뭐 사갈게',DAY*3+4*H),
   m('me','됐어 괜찮아',DAY*3+3.8*H),
   m('f1','너 진짜 고집 개쎄',DAY*2+2*H),
   m('me','니가 할 말은 아닌듯',DAY*2+1.8*H)
  ]},
  {id:'c2',name:'민기',group:true,members:['f1','f2','f3'],unread:2,msgs:[
   m('f2','내일 수행평가 준비했냐',DAY*2+6*H),
   m('f1','윤호는 했겠냐',DAY*2+5.9*H),
   m('me','야 나 했거든',DAY*2+5.7*H),
   m('f3','ㅋㅋㅋㅋㅋㅋ',DAY*2+5.6*H),
   m('f1','끝나고 편의점 ㄱ',DAY+3*H),
   m('me','돈 없어서 구경만 함',DAY+2.9*H),
   m('f1','아 진짜 내가 살게',DAY+2.8*H)
  ]},
  {id:'c3',name:'민재',group:false,members:['f2'],unread:0,msgs:[
   m('f2','윤호야 프린트 남는 거 있음?',DAY+8*H),
   m('me','응 내일 줄게',DAY+7.8*H),
   m('f2','ㄱㅅ',DAY+7.7*H)
  ]},
  {id:'c4',name:'모텔 사람들',group:true,members:['f5','f6','f7'],unread:0,msgs:[
   m('f5','윤호 학생 오늘 방 정리할 때 수건 문 앞에 둘게요',DAY+4*H),
   m('me','감사합니다 사장님!',DAY+3.9*H),
   m('f6','학생 밥은 먹었나',5*H),
   m('me','네 할아버지 ㅎㅎ',4.8*H),
   m('f7','복도에 택배 왔던데 네 거 아님?',2*H),
   m('me','아 제 거 맞아요 감사합니다',1.8*H)
  ]}
 ]};
}
