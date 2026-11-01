/* 한국어 고정 언어 설정 */
(function(){
  const apply=()=>{
    document.documentElement.lang='ko-KR';
    document.documentElement.setAttribute('translate','no');
    document.querySelectorAll('[lang]').forEach(el=>el.setAttribute('lang','ko-KR'));
  };
  window.HwahoI18n={
    t:key=>String(key??''),
    lang:()=> 'ko',
    apply
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();