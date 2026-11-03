/* Chapter 02 virtual clock: early January 2019. */
(function(){
 if(window.__CHAPTER_02_CLOCK__)return;
 window.__CHAPTER_02_CLOCK__=true;
 var NativeDate=Date,realStart=NativeDate.now(),virtualStart=new NativeDate(2019,0,5,16,20,0,0).getTime();
 var current=function(){return virtualStart+(NativeDate.now()-realStart)};
 class ChapterDate extends NativeDate{constructor(){if(arguments.length===0)super(current());else super(...arguments)}static now(){return current()}}
 window.Date=ChapterDate;
})();