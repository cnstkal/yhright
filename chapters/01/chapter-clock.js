/* Chapter 01 virtual device clock: Monday, 4 September 2017, 16:36. */
(function(){
  if(window.__CHAPTER_01_CLOCK__) return;
  window.__CHAPTER_01_CLOCK__=true;
  const NativeDate=Date;
  const realStart=NativeDate.now();
  const virtualStart=new NativeDate(2017,8,4,16,36,0,0).getTime();
  const current=()=>virtualStart+(NativeDate.now()-realStart);
  class ChapterDate extends NativeDate{
    constructor(...args){ if(args.length===0) super(current()); else super(...args); }
    static now(){ return current(); }
  }
  window.Date=ChapterDate;
})();