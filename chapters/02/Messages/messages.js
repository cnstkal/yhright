(()=>{
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const HOUR=3600000,DAY=86400000,KEY='yhright.messages.v2';
const SMS_DEFAULT=['c3','c4'];/* 기존 데이터에 sms 표시가 없을 때 SMS(초록)로 보는 연락처 */

/* ---------- 데이터 (기존 데이터 유지) ---------- */
function seed(){
const now=Date.now();
const m=(me,text,ago)=>({id:uid(),me,text,img:'',ts:now-ago});
return{
contacts:[
{id:'c1',name:'신한은행',phone:'1577-8000'},
{id:'c2',name:'서린고 행정실',phone:'032-000-2019'}
],
threads:[
{id:'t1',ids:['c1'],unread:0,sms:true,msgs:[
m(false,'[신한은행] 정윤호님 계좌에 320,000원이 입금되었습니다.',DAY*3+8*HOUR),
m(false,'[신한은행] 정윤호님 계좌에서 모텔 장기투숙비 280,000원이 출금되었습니다.',DAY*2+9*HOUR)
]},
{id:'t2',ids:['c2'],unread:0,sms:true,msgs:[
m(false,'[서린고] 겨울방학 보충수업 일정이 안내되었습니다. 자세한 내용은 담임 선생님께 확인하세요.',DAY*5)
]}
]
};
}
