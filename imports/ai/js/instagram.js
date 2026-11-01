const $=s=>document.querySelector(s);
/* ---------- icons ---------- */
const P={heart:'<path d="M12 20.3s-8-4.8-8-10.5C4 6.8 6.2 5 8.6 5c1.5 0 2.7.8 3.4 2 .7-1.2 1.9-2 3.4-2C17.8 5 20 6.800 20 9.800c0 5.700-8 10.500-8 10.500z"/>',
cmt:'<path d="M12 3.500a8.500 8.500 0 0 0-7.400 12.700l-1.100 4.300 4.500-1.100A8.500 8.500 0 1 0 12 3.500z"/>',
send:'<path d="M21.3 3.2 10.2 13.9"/><path d="M21.3 3.2 14.6 20.5a.4.4 0 0 1-.8 0l-3.4-6.7-6.7-3.4a.4.4 0 0 1 0-.8z"/>',
home:'<path d="M3.5 10.2 12 3.6l8.5 6.6V19a2 2 0 0 1-2 2h-3.6v-5.4a1 1 0 0 0-1-1h-3.8a1 1 0 0 0-1 1V21H5.5a2 2 0 0 1-2-2z"/>',
reel:'<rect x="3" y="3" width="18" height="18" rx="5.5"/><path d="M10 8.8v6.4a.5.5 0 0 0 .8.4l4.9-3.2a.5.5 0 0 0 0-.8L10.8 8.4a.5.5 0 0 0-.8.4z" fill="currentColor"/>',
search:'<circle cx="10.8" cy="10.8" r="7.3"/><path d="m16.2 16.2 4.8 4.8"/>',
mark:'<path d="M6 3.500h12v17l-6-4.500-6 4.500z"/>',plus:'<path d="M12 4.500v15M4.500 12h15"/>',
dn:'<path d="m7 9.500 5 5 5-5"/>',lt:'<path d="M15 5l-7 7 7 7"/>',rt:'<path d="m9.500 6.500 5.500 5.500-5.500 5.500"/>',
bell:'<path d="M6 17v-6a6 6 0 0 1 12 0v6l1.500 2h-15zM10 21.500h4"/>',
dots:'<circle cx="5.500" cy="12" r="1.300" fill="currentColor"/><circle cx="12" cy="12" r="1.300" fill="currentColor"/><circle cx="18.500" cy="12" r="1.300" fill="currentColor"/>',
menu:'<path d="M4 9h16M4 15h10"/>',
grid:'<path d="M5 5h3v3H5zM10.500 5h3v3h-3zM16 5h3v3h-3zM5 10.500h3v3H5zM10.500 10.500h3v3h-3zM16 10.500h3v3h-3zM5 16h3v3H5zM10.500 16h3v3h-3zM16 16h3v3h-3z"/>',
tag:'<rect x="4" y="3.500" width="16" height="17" rx="3"/><circle cx="12" cy="10" r="2.800"/><path d="M7 18.500c1-3 3-4 5-4s4 1 5 4"/>',
edit:'<path d="M12 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-5"/><path d="m9 15 .6-3.600L18 3a1.800 1.800 0 0 1 3 3l-8.400 8.400z"/>',
phone:'<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a1.500 1.500 0 0 1-1.500 1.500C10.500 20.500 3.500 13.500 3.500 5.500A1.500 1.500 0 0 1 5 4z"/>',
vid:'<rect x="2.500" y="6.500" width="14" height="11" rx="3"/><path d="m16.500 11 5-3v8l-5-3"/>',
cam:'<path d="M4 8h3l1.500-2.500h7L17 8h3v11H4z"/><circle cx="12" cy="13.500" r="3"/>',
mic:'<rect x="9" y="3.500" width="6" height="11" rx="3"/><path d="M5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3"/>',
img:'<rect x="4" y="4" width="16" height="16" rx="2.500"/><path d="m4 16 4.500-4.500 4 4 2.500-2.500 5 5"/><circle cx="9" cy="9" r="1"/>',
stk:'<path d="M5.500 3.500h13a2 2 0 0 1 2 2V14l-6.500 6.500H5.500a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2zM14 20.500V16a2 2 0 0 1 2-2h4.500M9 9v1.500M15 9v1.500M9 14c1.200 1 3 1 4 0"/>',
pc:'<circle cx="12" cy="12" r="8.500"/><path d="M12 8v8M8 12h8"/>',
cp:'<path d="M8 8V6.500A2.500 2.500 0 0 1 10.500 4H17a3 3 0 0 1 3 3v6.500a2.500 2.500 0 0 1-2.500 2.500H16"/><rect x="4" y="8" width="12" height="12" rx="3" fill="currentColor"/>',
x:'<path d="M5 5l14 14M19 5 5 19"/>',rep:'<path d="M4 11V9.500A2.500 2.500 0 0 1 6.500 7H19l-3-3M20 13v1.500a2.500 2.500 0 0 1-2.500 2.500H5l3 3"/>',
note:'<rect x="4" y="3" width="16" height="18" rx="3.500"/><path d="m12 8 1.200 2.800 3 .3-2.300 2 .7 3-2.600-1.600-2.600 1.600.7-3-2.300-2 3-.3z" fill="currentColor"/>',
mus:'<path d="M9 17V6.500l9-2V15"/><circle cx="7" cy="17" r="2" fill="currentColor"/><circle cx="16" cy="15" r="2" fill="currentColor"/>',
play:'<path d="M8 5v14l11-7z" fill="currentColor" stroke-width="1"/>',mute:'<path d="M4 9.500h3.500L12 6v12l-4.500-3.500H4zM16 9.500l4 5M20 9.500l-4 5"/>'};
const ic=(n,s=24,f)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="${f||'none'}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
const VB='<svg viewBox="0 0 24 24" width="15" height="15"><polygon fill="#3897f0" points="22.90,12.00 22.63,12.30 21.98,12.56 21.33,12.79 21.04,13.02 21.27,13.31 21.86,13.68 22.43,14.08 22.63,14.43 22.30,14.66 21.61,14.77 20.92,14.84 20.59,15.01 20.75,15.34 21.24,15.83 21.71,16.34 21.82,16.73 21.45,16.88 20.75,16.84 20.06,16.76 19.71,16.84 19.79,17.20 20.16,17.79 20.50,18.40 20.52,18.80 20.13,18.86 19.46,18.66 18.80,18.43 18.43,18.43 18.43,18.80 18.66,19.46 18.86,20.13 18.80,20.52 18.40,20.50 17.79,20.16 17.20,19.79 16.84,19.71 16.76,20.06 16.84,20.75 16.88,21.45 16.73,21.82 16.34,21.71 15.83,21.24 15.34,20.75 15.01,20.59 14.84,20.92 14.77,21.61 14.66,22.30 14.43,22.63 14.08,22.43 13.68,21.86 13.31,21.27 13.02,21.04 12.79,21.33 12.56,21.98 12.30,22.63 12.00,22.90 11.70,22.63 11.44,21.98 11.21,21.33 10.98,21.04 10.69,21.27 10.32,21.86 9.92,22.43 9.57,22.63 9.34,22.30 9.23,21.61 9.16,20.92 8.99,20.59 8.66,20.75 8.17,21.24 7.66,21.71 7.27,21.82 7.12,21.45 7.16,20.75 7.24,20.06 7.16,19.71 6.80,19.79 6.21,20.16 5.60,20.50 5.20,20.52 5.14,20.13 5.34,19.46 5.57,18.80 5.57,18.43 5.20,18.43 4.54,18.66 3.87,18.86 3.48,18.80 3.50,18.40 3.84,17.79 4.21,17.20 4.29,16.84 3.94,16.76 3.25,16.84 2.55,16.88 2.18,16.73 2.29,16.34 2.76,15.83 3.25,15.34 3.41,15.01 3.08,14.84 2.39,14.77 1.70,14.66 1.37,14.43 1.57,14.08 2.14,13.68 2.73,13.31 2.96,13.02 2.67,12.79 2.02,12.56 1.37,12.30 1.10,12.00 1.37,11.70 2.02,11.44 2.67,11.21 2.96,10.98 2.73,10.69 2.14,10.32 1.57,9.92 1.37,9.57 1.70,9.34 2.39,9.23 3.08,9.16 3.41,8.99 3.25,8.66 2.76,8.17 2.29,7.66 2.18,7.27 2.55,7.12 3.25,7.16 3.94,7.24 4.29,7.16 4.21,6.80 3.84,6.21 3.50,5.60 3.48,5.20 3.87,5.14 4.54,5.34 5.20,5.57 5.57,5.57 5.57,5.20 5.34,4.54 5.14,3.87 5.20,3.48 5.60,3.50 6.21,3.84 6.80,4.21 7.16,4.29 7.24,3.94 7.16,3.25 7.12,2.55 7.27,2.18 7.66,2.29 8.17,2.76 8.66,3.25 8.99,3.41 9.16,3.08 9.23,2.39 9.34,1.70 9.57,1.37 9.92,1.57 10.32,2.14 10.69,2.73 10.98,2.96 11.21,2.67 11.44,2.02 11.70,1.37 12.00,1.10 12.30,1.37 12.56,2.02 12.79,2.67 13.02,2.96 13.31,2.73 13.68,2.14 14.08,1.57 14.43,1.37 14.66,1.70 14.77,2.39 14.84,3.08 15.01,3.41 15.34,3.25 15.83,2.76 16.34,2.29 16.73,2.18 16.88,2.55 16.84,3.25 16.76,3.94 16.84,4.29 17.20,4.21 17.79,3.84 18.40,3.50 18.80,3.48 18.86,3.87 18.66,4.54 18.43,5.20 18.43,5.57 18.80,5.57 19.46,5.34 20.13,5.14 20.52,5.20 20.50,5.60 20.16,6.21 19.79,6.80 19.71,7.16 20.06,7.24 20.75,7.16 21.45,7.12 21.82,7.27 21.71,7.66 21.24,8.17 20.75,8.66 20.59,8.99 20.92,9.16 21.61,9.23 22.30,9.34 22.63,9.57 22.43,9.92 21.86,10.32 21.27,10.69 21.04,10.98 21.33,11.21 21.98,11.44 22.63,11.70"/><path d="m7.6 12.3 2.9 2.9 5.9-5.9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const WORD='<svg viewBox="0 0 142 38" height="30" fill="none" stroke="#000" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round"><path d="M4 26V6M1.800 9 4 6"/><path d="M12 12v14M12 17.500c0-3.500 2.500-5.500 5-5.500 3.500 0 5 2 5 5.500V26"/><path d="M34 14.500c-2-2.500-7.500-2.500-7.500 1.300 0 4 7.500 3.200 7.500 7.200 0 4.200-6.500 4.200-8.700 1"/><path d="M42 5.500V22c0 3 2 4.500 5 4M38.500 12.500h8.500"/><circle cx="58" cy="19" r="6.500"/><path d="M64.500 12.500V26"/><circle cx="77" cy="19" r="6.500"/><path d="M83.500 12.500v16.500c0 3.700-3.500 5-7.500 4.500"/><path d="M91 12.500V26M91 18c0-3.500 3-5.500 7-5.500"/><circle cx="108" cy="19" r="6.500"/><path d="M114.500 12.500V26"/><path d="M122 12.500V26M122 17.500c0-3.500 2.500-5.500 5-5.500s4.500 2 4.500 5.500V26M131.500 17.500c0-3.500 2.500-5.500 5-5.500s4.500 2 4.500 5.500V26"/></svg>';
/* ---------- generated art (no external images) ---------- */
const R=s=>{let a=s>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const PAL=[["#f6b26b","#f4796a","#3b4a6b"],["#8ec5fc","#e0c3fc","#2d4a3e"],["#1b2a41","#4a6fa5","#0b1c26"],["#fbd3a0","#e9a0b4","#4a3b59"],["#a8e6cf","#dcedc1","#3d6b5c"],["#2b2d42","#8d99ae","#14161f"],["#ffd1dc","#ffb3a7","#6b4f5e"],["#fceabb","#f8b500","#5c4b2a"]];
const AC={},uri=s=>'data:image/svg+xml;utf8,'+encodeURIComponent(s);
function art(seed,w=800,h=1000){const k=w+'x'+h+'_'+seed;if(AC[k])return AC[k];const r=R(seed*7919+13),p=PAL[seed%8],t=(seed>>3)%4;
let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient></defs><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 1.4 -.2"/></filter><radialGradient id="v" cx=".5" cy=".45" r=".8"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient><rect width="${w}" height="${h}" fill="url(#g)"/><circle cx="${w*(.2+r()*.6)}" cy="${h*(.2+r()*.2)}" r="${w*(.07+r()*.08)}" fill="#fff" opacity=".7"/>`;
if(t==0)for(let i=0;i<3;i++){const y=h*(.55+i*.14);s+=`<path d="M0 ${y}Q${w*.3} ${y-h*(.1+r()*.1)} ${w*.6} ${y}T${w} ${y-h*.03}V${h}H0z" fill="${p[2]}" opacity="${.45+i*.25}"/>`}
else if(t==1){let x=0;while(x<w){const bw=w*(.07+r()*.1),bh=h*(.2+r()*.35);s+=`<rect x="${x}" y="${h-bh}" width="${bw}" height="${bh}" fill="${p[2]}" opacity="${.6+r()*.4}"/>`;x+=bw+4}}
else if(t==2){s+=`<rect y="${h*.62}" width="${w}" height="${h*.38}" fill="${p[2]}" opacity=".6"/>`;for(let i=0;i<7;i++)s+=`<rect x="${w*r()*.8}" y="${h*(.65+i*.045)}" width="${w*(.1+r()*.25)}" height="4" rx="2" fill="#fff" opacity=".35"/>`}
else for(let i=0;i<5;i++)s+=`<ellipse cx="${w*r()}" cy="${h*(.4+r()*.6)}" rx="${w*(.15+r()*.25)}" ry="${h*(.1+r()*.2)}" fill="${p[2]}" opacity=".35"/>`;
return AC[k]=uri(s+`<rect width="${w}" height="${h}" fill="url(#v)"/><rect width="${w}" height="${h}" filter="url(#n)" opacity=".18"/></svg>`)}
const AV={};const PROFILE_PHOTOS={3:'_starhwa_/525371840_17901725802246076_2113787671713570957_n.jpg',11:'no1likeme8_8/797725354_17957071353235195_4119823374164324745_n.jpg',22:'ateez_offcial/858500478_18345915571251678_3237752621723113976_n.jpg',35:'choi3an/527274612_17902204932252833_7716678234074701806_n.jpg',46:'wooyounggg__/787367244_17957049936235076_4349860231797659349_n.jpg',57:'fixon_n_on/448837112_1192751585248086_3821067984880258943_n.jpg',68:'imfinalho_/485239783_669628208865007_2966738640616676985_n.jpg',79:'im_ovation/496486481_17892206976239742_8685218474748054259_n.jpg'};function av(seed){return AV[seed]||(AV[seed]=(()=>{const file=PROFILE_PHOTOS[seed];if(file)return encodeURI('../이미지/인스타그램/프로필/'+file);const p=PAL[seed%8];return uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${p[0]}"/><circle cx="50" cy="40" r="18" fill="${p[2]}"/><ellipse cx="50" cy="96" rx="34" ry="28" fill="${p[2]}"/><circle cx="85" cy="12" r="22" fill="${p[1]}" opacity=".6"/></svg>`)})())}
/* ---------- data ---------- */
const H=36e5,NOW=Date.now();
const U={me:{id:'_starhwa_',name:'SEONGHWA',bio:'星化 from ATEEZ',a:3,posts:190,fo:7168000,fi:7},
u1:{id:'no1likeme8_8',name:'홍중 (HONGJOONG)',a:11,bio:'Captain of ATEEZ',posts:112,fo:9612000,fi:1},u2:{id:'ateez_offcial',name:'ATEEZ(에이티즈)',a:22,bio:'ATEEZ(에이티즈) Official Instagram',posts:4244,fo:11960000,fi:1},
u3:{id:'choi3an',name:'산 (SAN)',a:35,bio:'SAN from ATEEZ',posts:152,fo:12220000,fi:1},u4:{id:'wooyounggg__',name:'우영 (WOOYOUNG)',a:46,bio:"(ATEEZ)\nThat's a W",posts:107,fo:8861000,fi:1},
u5:{id:'fixon_n_on',name:'민기 (MINGI)',a:57,bio:'@ateez_official_',posts:139,fo:7190000,fi:1},u6:{id:'imfinalho_',name:'JONGHO',a:68,bio:'ATEEZ',posts:139,fo:6391000,fi:1},
u7:{id:'im_ovation',name:'여상 (YEOSANG)',a:79,bio:'YEOSANG from ATEEZ',posts:96,fo:6618000,fi:1},u8:{id:'yunou._.u',name:'윤호',v:1,a:90,bio:'',fo:1060000,fi:1}};
const CAP=['오늘 하늘이 너무 예뻐서 한참 올려다봤다','주말엔 역시 느긋하게','새 메뉴 먹어보고 왔어요','이번 달 기록, 천천히 넘겨보세요','퇴근길 노을 맛집 발견','아무 계획 없는 하루가 제일 좋다','작업실 한 켠','산책하다 만난 풍경'];
const MUS=['잔잔한 오후 · 새벽라디오','Blue Hour · Nova','여름밤 · 도담'];
const PO=[],PM={};
Object.keys(U).forEach((u,ui)=>{const n=9;for(let i=0;i<n;i++){const c=i%3==2?[4,8,12][i%3]:(i%3==1?1:(u=='u1'?12:3)),r=R(ui*100+i);
const p={id:'p'+ui+'_'+i,u,n:i==0&&u=='u1'?12:(i%3==0?1:i%3==1?3:5),ratio:i%2?1:.8,seed:ui*17+i*5+2,likes:Math.floor(200+r()*90000),cm:Math.floor(3+r()*900),sh:Math.floor(r()*3000),h:ui*7+i*30+(u=='me'?20:3)+Math.floor(r()*20),cap:CAP[(ui+i)%8],mus:i%4==0?MUS[(ui+i)%3]:'',lk:0,sv:0};
PO.push(p);PM[p.id]=p}});
// 내 게시글 (이미지/인스타그램/게시글/_starhwa_/번호 폴더)
const REAL_ME=[
{id:"me_1",u:"me",folder:"1",files:["HVZhs5XbMAEvEpB.jpg", "HVZhs5abYAAcZ9m.jpg", "HVZhs5faAAAfARb.jpg", "HVZhvcQaEAAq2yw.jpg", "HVZhvcTbQAA12tw.jpg"],n:5,ratio:.8,seed:0,likes:355594,cm:4776,sh:0,h:Math.max(0,(NOW-new Date(2026,9,24,12).getTime())/H),cap:"",mus:"ATEEZ - Drip",lk:0,sv:0},
{id:"me_2",u:"me",folder:"2",files:["HUrOhekaAAEIEdy.jpg", "HUrOhzabkAAZPgL.jpg", "HUrOkr6bAAAFtXh.jpg", "HUrOlL4bAAAh7ZW.jpg", "HUrOoSdbIAAyBBJ.jpg"],n:5,ratio:.8,seed:0,likes:329472,cm:4401,sh:0,h:Math.max(0,(NOW-new Date(2026,9,15,12).getTime())/H),cap:"난 너랑 있는 게 제일 좋아",mus:"",lk:0,sv:0},
{id:"me_3",u:"me",folder:"3",files:["HSVxAxSbAAAUSRC.jpg"],n:1,ratio:.8,seed:0,likes:388644,cm:5473,sh:0,h:Math.max(0,(NOW-new Date(2026,8,15,12).getTime())/H),cap:"바르셀로나에서",mus:"",lk:0,sv:0},
{id:"me_4",u:"me",folder:"4",files:["HPmuXbda4AE-AlC.jpg"],n:1,ratio:.8,seed:0,likes:374884,cm:5800,sh:0,h:Math.max(0,(NOW-new Date(2026,7,13,12).getTime())/H),cap:"I think about you a lot",mus:"",lk:0,sv:0},
{id:"me_5",u:"me",folder:"5",files:["HPNEXPwbEAAWht6.jpg", "HPNEXRSbsAAviod.jpg"],n:2,ratio:.8,seed:0,likes:358155,cm:4147,sh:0,h:Math.max(0,(NOW-new Date(2026,7,8,12).getTime())/H),cap:"",mus:"",lk:0,sv:0},
{id:"me_6",u:"me",folder:"6",files:["HNM3shsaYAAaUz7.jpg", "HNM3sijbEAU1HI9.jpg"],n:2,ratio:.8,seed:0,likes:353610,cm:4744,sh:0,h:Math.max(0,(NOW-new Date(2026,6,15,12).getTime())/H),cap:"행운을 가져다 주렴",mus:"",lk:0,sv:0},
{id:"me_7",u:"me",folder:"7",files:["HM3sDYibUAE3r3w.jpg", "HM3sDZdbAAA5JTE.jpg", "HM3sEWjaoAAADsz.jpg"],n:3,ratio:.8,seed:0,likes:318909,cm:5569,sh:0,h:Math.max(0,(NOW-new Date(2026,6,10,12).getTime())/H),cap:"Bring him to ATINY 🫶🏻",mus:"",lk:0,sv:0},
{id:"me_8",u:"me",folder:"8",files:["HMjRan5bsAEi-pK.jpg"],n:1,ratio:.8,seed:0,likes:390376,cm:5894,sh:0,h:Math.max(0,(NOW-new Date(2026,6,6,12).getTime())/H),cap:"A heart full of love",mus:"",lk:0,sv:0},
{id:"me_9",u:"me",folder:"9",files:["HMYxu7QaAAA7pf9.jpg", "HMYxuUwbIAAPo1Q.jpg", "HMYxvaVaAAAMTcY.jpg"],n:3,ratio:.8,seed:0,likes:317704,cm:4105,sh:0,h:Math.max(0,(NOW-new Date(2026,6,4,12).getTime())/H),cap:"배드 야~~호",mus:"ATEEZ - BAD",lk:0,sv:0}
];
for(let i=PO.length-1;i>=0;i--)if(PO[i].u==='me')PO.splice(i,1);
REAL_ME.forEach(p=>{PO.push(p);PM[p.id]=p});

const S={};[['u1',3],['u2',2],['u3',3],['u4',2],['u5',2],['u6',3]].forEach(([u,n],i)=>S[u]=Array.from({length:n},(_,j)=>({seed:200+i*9+j,h:j+i+1,t:j==0&&i%2==0?CAP[i]:''})));
const seen=new Set(['u3']);
const T=(u,un,msgs,status)=>({u,un,status:status||'',msgs});
const D=d=>NOW-d*24*H,I=(f,seed,t,r)=>({f,k:'i',s:seed,t,r}),V=(f,seed,t,r)=>({f,k:'v',s:seed,t,r}),X=(f,x,t,r)=>({f,k:'x',x,t,r});
const TH=[T('u5',1,[I('t',301,D(5)),V('t',302,D(2),1),X('t','이거 봐봐 ㅋㅋㅋ',D(2)+H),X('t','귀엽지?',D(2)+H*1.01),X('m','대박',D(1.9)),X('m','저장함',D(1.9)+6e4,1)],'월요일에 읽음'),
T('u1',0,[X('t','이번 주말에 시간 돼?',D(8)),X('m','응 괜찮아! 어디 갈까',D(8)+H),X('t','새로 생긴 전시 가보자',D(7))],'읽음'),
T('u2',1,[X('t','주문하신 원두 준비됐어요',D(0.02))]),T('u3',0,[X('m','사진 보내줘서 고마워요',D(14)),X('t','천만에요!',D(13.9))],'읽음'),
T('u6',0,[V('t',310,D(16)),X('m','맛있겠다',D(15.5))],'읽음'),T('u7',0,[X('t','내일 아침 러닝 같이 할래?',D(30))],'')];
U.me2={id:'sincnqsi_',name:'',bio:'',a:90,posts:0,fo:0,fi:0,priv:1};
const NT=[{u:'me',t:'오늘은 산책 갈래…',l:'내 메모'},{map:1,l:'지도'},{u:'u1',t:'새벽 감성 충전',l:'luna.moon'},{u:'u8',l:'pixel_dawn'}];
let cur='home',stack=[];
/* ---------- helpers ---------- */
const fmtN=n=>n>=1e4?(n/1e4).toFixed(1)+'만':n.toLocaleString();
const age=h=>h<24?h+'시간 전':h<168?Math.floor(h/24)+'일 전':(d=>(d.getMonth()+1)+'월 '+d.getDate()+'일')(new Date(NOW-h*H));
const WD='일월화수목금토';
const ft=t=>{const d=new Date(t),h=d.getHours(),s=`${h<12?'오전':'오후'} ${h%12||12}:${String(d.getMinutes()).padStart(2,'0')}`;return new Date().toDateString()==d.toDateString()?'오늘 '+s:`(${WD[d.getDay()]}) ${s}`};
const rel=t=>{const s=(Date.now()-t)/1e3;return s<60?'방금':s<3600?Math.floor(s/60)+'분':s<86400?Math.floor(s/3600)+'시간':s<604800?Math.floor(s/86400)+'일':Math.floor(s/604800)+'주'};
const hasSt=u=>!!S[u];
function A(u,size,ringOk=true){const a=av(U[u].a);if(ringOk&&hasSt(u))return`<span class="rg ${seen.has(u)?'sn':''}" style="--s:${size}px"><img src="${a}"></span>`;return`<img class="pa" style="--s:${size}px" src="${a}">`}
const ab=(u,size)=>`<button data-act="${hasSt(u)?'story':'prof'}" data-u="${u}">${A(u,size)}</button>`;
/* ---------- posts ---------- */
const PHOTO=(p,i)=>p.files?encodeURI('../이미지/인스타그램/게시글/_starhwa_/'+p.folder+'/'+p.files[i]):art(p.seed+i*3,800,Math.round(800/p.ratio));
function postHTML(p){const u=U[p.u],imgs=Array.from({length:p.n},(_,i)=>`<img src="${PHOTO(p,i)}" alt="">`).join('');
return`<article data-id="${p.id}"><div class="ph">${ab(p.u,40)}<div class="pn" data-act="prof" data-u="${p.u}"><b>${u.id}${u.v?VB:''}</b>${p.mus?`<small>${ic('mus',12)}${p.mus}</small>`:''}</div><button>${ic('menu',24)}</button></div>
<div class="mw" data-act="dbl" style="aspect-ratio:${p.ratio}"><div class="car">${imgs}</div>${p.n>1?`<i class="cnt">1/${p.n}</i>`:''}</div>
${p.n>1?`<div class="dots">${Array.from({length:p.n},(_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}
<div class="act"><button data-act="like" data-id="${p.id}" style="color:${p.lk?'#ff6fa3':'#000'}">${ic('heart',26,p.lk?'#ff6fa3':'none')}<span>${fmtN(p.likes+p.lk)}</span></button><button data-act="cmt" data-id="${p.id}">${ic('cmt',25)}<span>${fmtN(p.cm)}</span></button><button>${ic('send',25)}<span>${fmtN(p.sh)}</span></button><span class="sp"></span><button data-act="save" data-id="${p.id}">${ic('mark',25,p.sv?'#000':'none')}</button></div>
<div class="cap"><b>${u.id}</b> ${p.cap}</div><div class="vc" data-act="cmt" data-id="${p.id}">댓글 ${fmtN(p.cm)}개 모두 보기</div><div class="dt">${age(p.h)}</div></article>`}
const GRP={me:['u1','u2','u3','u4'],me2:['u5','u6','u7','u8']};
const mine=()=>GRP[ACUR]||GRP.me;
const feed=()=>PO.filter(p=>mine().includes(p.u)).sort((a,b)=>a.h-b.h);
function renderHome(){const el=$('#t-home'),st=el.querySelector('.sc'),y=st?st.scrollTop:0;
el.innerHTML=`<div class="sc" style="padding-top:0"><div class="hd"><button>${ic('plus',30)}</button><div class="logo">${WORD}${ic('dn',18)}</div><div class="hh"><button>${ic('note',26)}</button><button>${ic('heart',27)}</button></div></div><div class="stories"><div class="st"><div style="position:relative"><div class="me-st"><svg viewBox="0 0 24 24" width="44" height="44" fill="#3a3a3c"><circle cx="12" cy="9" r="4.500"/><path d="M3 24c0-6 4-8 9-8s9 2 9 8z"/></svg><span style="position:absolute;color:#fff;margin-top:-6px">${ic('cam',26)}</span></div><i class="pbd">${ic('plus',14)}</i></div><span>내 스토리</span></div>${Object.keys(S).filter(u=>mine().includes(u)).map(u=>`<div class="st" data-act="story" data-u="${u}">${A(u,76)}<span>${U[u].id}</span></div>`).join('')}</div>${feed().map(postHTML).join('')}</div>`;
if(y)el.querySelector('.sc').scrollTop=y}
/* ---------- profile ---------- */
let ACUR='me';
const LOCK='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';
function profHTML(u,self){const o=U[u==='me'?'me':u],uid=u==='me'?'me':u,ps=PO.filter(p=>p.u==uid).sort((a,b)=>a.h-b.h);
return`<div class="hd">${self?`<div class="logo" data-act="acct" style="font-size:22px;font-weight:700;cursor:pointer">${o.priv?LOCK:''}${o.id}${ic('dn',18)}</div><div class="hh"><button>${ic('plus',27)}</button><button>${ic('menu',27)}</button></div>`:`<button class="pill" data-act="back">${ic('lt',24)}</button><b style="flex:1;font-size:22px;display:flex;gap:5px;align-items:center">${o.id}${o.v?VB:''}</b><button class="pill" style="background:none">${ic('bell',24)}</button><button class="pill">${ic('dots',24)}</button>`}</div>
<div class="sc"><div class="prof"><div class="prow">${uid==='me'||uid==='me2'?`<img class="pa" style="--s:86px" src="${av(o.a)}">`:`<button data-act="${hasSt(uid)?'story':'x'}" data-u="${uid}">${A(uid,92)}</button>`}<div style="flex:1"><div style="font-size:17px;margin-bottom:10px">${o.name}</div><div class="stat"><div><b>${o.posts??ps.length}</b><span>게시물</span></div><div><b>${fmtN(o.fo)}</b><span>팔로워</span></div><div><b>${fmtN(o.fi)}</b><span>팔로잉</span></div></div></div></div>
<div style="margin-top:10px;font-size:14px;line-height:1.4;white-space:pre-line">${o.bio}</div></div>
<div class="btns">${self?'<button>프로필 편집</button><button>프로필 공유</button>':`<button>팔로잉 ${ic('dn',16)}</button><button data-act="chat" data-u="${uid}">메시지</button>`}<button class="s">${ic('plus',18)}</button></div>
<div class="tabs"><div class="on">${ic('grid',26,'currentColor')}</div><div>${ic('reel',25)}</div><div>${ic('tag',25)}</div></div>
<div class="grid">${ps.map(p=>`<div class="gi" data-act="post" data-id="${p.id}"><img src="${p.files?PHOTO(p,0):art(p.seed,600,800)}">${p.n>1?ic('cp',20):''}</div>`).join('')}</div></div>`}
/* ---------- dm ---------- */
function prev(t){const m=t.msgs[t.msgs.length-1];return(m.f=='m'?'나: ':'')+(m.k=='x'?m.x:m.k=='i'?'사진을 보냈습니다':'동영상을 보냈습니다')+' · '+rel(m.t)}
function renderDM(){const globe='<svg viewBox="0 0 76 76" width="76" height="76"><circle cx="38" cy="38" r="38" fill="#7db8e8"/><path d="M14 22c8-8 20-6 22 2s-8 8-6 16-10 6-14-2-6-8-2-16zM46 30c8-4 18 2 18 10s-8 14-14 10-8-14-4-20z" fill="#9ccc83"/></svg>';
$('#t-dm').innerHTML=`<div class="hd" style="justify-content:center;position:relative"><div class="logo" style="font-size:24px;font-weight:700">${U[ACUR].id}${ic('dn',18)}</div><button style="position:absolute;right:20px">${ic('edit',27)}</button></div><div class="sc"><div class="srch">${ic('search',22)}검색</div>
<div class="notes">${NT.map(n=>`<div class="nt">${n.t?`<div class="nb">${n.t}</div>`:''}${n.map?globe:`<img class="pa" style="--s:76px" src="${av(U[n.u].a)}">`}<span>${n.l||U[n.u].id}</span></div>`).join('')}</div>
<div class="mh">메시지<span>요청</span></div>${TH.map((t,i)=>`<div class="th ${t.un?'un':''}" data-act="chat" data-u="${t.u}">${A(t.u,56)}<div class="tx"><div>${U[t.u].name}</div><div class="s">${prev(t)}</div></div>${t.un?'<i class="ud"></i>':''}</div>`).join('')}</div>`}
function msgsHTML(t){let h='',last=0;t.msgs.forEach((m,i)=>{if(m.t-last>H)h+=`<div class="sep">${ft(m.t)}</div>`;last=m.t;const me=m.f=='m',a=me?'':`<img class="pa" style="--s:30px" src="${av(U[t.u].a)}">`;
const body=m.k=='x'?`<div class="bub" data-act="react" data-i="${i}">${m.x}</div>`:`<div class="mimg"><img src="${art(m.s,540,840)}">${m.k=='v'?`<div class="pl">${ic('play',54)}</div><div class="un">${ic('play',0)}<img class="pa" style="--s:26px" src="${av(U[t.u].a)}">${U[t.u].id}</div>`:''}</div>`;
h+=`<div class="row ${me?'m':''}" style="margin-bottom:${m.r?14:0}px">${a}<div class="bw">${body}${m.r?`<span class="rx"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="#ff6fa3" d="M12 20.300s-8-4.800-8-10.500C4 6.800 6.200 5 8.600 5c1.500 0 2.700.8 3.400 2 .7-1.200 1.900-2 3.400-2C17.800 5 20 6.800 20 9.800c0 5.700-8 10.500-8 10.500z"/></svg></span>`:''}</div></div>`});
const lm=[...t.msgs].reverse().find(m=>m.f=='m');return h+(lm&&t.status?`<div class="rd">${t.status}</div>`:'')}
function chatHTML(t){const o=U[t.u];return`<div class="hd"><button class="pill o" data-act="back">${ic('lt',24)}</button><img class="pa" style="--s:32px" src="${av(o.a)}"><div style="flex:1;line-height:1.2"><b style="font-size:16px;display:flex;align-items:center;gap:2px">${o.name}${ic('rt',14)}</b><span style="font-size:13px">${o.id}</span></div><button class="pill o">${ic('phone',22)}</button><button class="pill o">${ic('vid',24)}</button></div>
<div class="sc" id="cm" style="padding-bottom:110px"><div class="msgs">${msgsHTML(t)}</div></div>
<div class="inp" id="inp"><span class="cam">${ic('cam',22)}</span><input id="ci" placeholder="메시지 보내기…" autocomplete="off"><span class="ic">${ic('mic',24)}${ic('img',24)}${ic('stk',24)}${ic('pc',26)}</span><button class="sd" data-act="send">보내기</button></div>`}
/* ---------- navigation ---------- */
const NAVI=[['home','home'],['reels','reel'],['dm','send'],['search','search'],['me','']];
function renderNav(){const act=stack.length?'':cur;$('#nav').innerHTML=NAVI.map(([k,i])=>`<button data-act="tab" data-t="${k}" class="${act==k?'on':''}">${k=='me'?`<img class="pa" style="--s:28px;${act=='me'?'outline:2px solid #000;outline-offset:1px':''}" src="${av(U[ACUR].a)}">`:ic(i,26,(act==k&&(k=='home'||k=='dm'))?'currentColor':'none')}</button>`).join('');
const top=stack[stack.length-1];$('#nav').classList.toggle('h',!!top&&top.chat)}
function tab(k){if(k=='reels'||k=='search')return;while(stack.length)stack.pop().el.remove();if(k==cur&&k=='home'){$('#t-home .sc').scrollTop=0}cur=k;
['home','dm','me'].forEach(x=>$('#t-'+x).classList.toggle('on',x==k));if(k=='dm')renderDM();if(k=='me')$('#t-me').innerHTML=profHTML(ACUR,1);renderNav()}
function push(html,chat){const el=document.createElement('section');el.className='scr on';el.style.zIndex=10+stack.length;el.innerHTML=html;$('#app').insertBefore(el,$('#nav'));stack.push({el,chat});renderNav();return el}
function back(){const s=stack.pop();if(s)s.el.remove();if(!stack.length&&cur=='dm')renderDM();renderNav()}
function openChat(u){let t=TH.find(x=>x.u==u);if(!t){t=T(u,0,[],'');TH.unshift(t)}t.un=0;const el=push(chatHTML(t),1);cm();const i=el.querySelector('#ci'),b=el.querySelector('#inp');
i.oninput=()=>b.classList.toggle('ty',!!i.value.trim());i.onkeydown=e=>{if(e.key=='Enter')send()};b._t=t}
const cm=()=>{const c=$('#cm');if(c)c.scrollTop=c.scrollHeight};
function send(){const el=$('#ci');if(!el)return;const x=el.value.trim(),b=$('#inp'),t=b._t;if(!x)return;t.msgs.push(X('m',x,Date.now()));t.status='전송됨';TH.splice(TH.indexOf(t),1);TH.unshift(t);el.value='';b.classList.remove('ty');$('#cm .msgs').innerHTML=msgsHTML(t);cm();const RE=['ㅋㅋㅋ 진짜?','오 좋다','나중에 얘기하자!','헐 대박','알겠어~'];setTimeout(()=>{t.status='읽음';setTimeout(()=>{t.msgs.push(X('t',RE[Math.floor(Math.random()*5)],Date.now()));const b2=$('#inp');if(b2&&b2._t===t){$('#cm .msgs').innerHTML=msgsHTML(t);cm()}},1300)},700)}
/* ---------- story viewer ---------- */
let sv=null;
function openStory(u){const order=Object.keys(S);sv={order,ui:order.indexOf(u),si:0,p:0,pause:false,last:performance.now()};const el=document.createElement('div');el.id='sv';$('#app').appendChild(el);sv.el=el;storyBar(true);
el.onpointerdown=e=>{sv.pause=true;sv.t0=performance.now();sv.x0=e.clientX};
el.onpointerup=e=>{sv.pause=false;sv.last=performance.now();const dx=e.clientX-sv.x0,dt=performance.now()-sv.t0;if(Math.abs(dx)>60)dx<0?nextU():prevU();else if(dt<250){e.clientX<el.clientWidth*.35?prevS():nextS()}};
el.onpointercancel=()=>{sv.pause=false};drawS();sv.raf=requestAnimationFrame(tick)}
function tick(n){if(!sv)return;if(!sv.pause){sv.p+=(n-sv.last)/5000;if(sv.p>=1)return nextS()}sv.last=n;const b=sv.el.querySelectorAll('.bars b')[sv.si];if(b)b.style.width=Math.min(sv.p,1)*100+'%';sv.raf=requestAnimationFrame(tick)}
function drawS(){const u=sv.order[sv.ui],items=S[u],it=items[sv.si];seen.add(u);sv.p=0;sv.last=performance.now();
sv.el.innerHTML=`<img class="bg" src="${art(it.seed,720,1280)}">${it.t?`<div class="stxt">${it.t}</div>`:''}<div class="top"><div class="bars">${items.map((_,i)=>`<i><b style="width:${i<sv.si?100:0}%"></b></i>`).join('')}</div><div class="sh"><img class="pa" style="--s:34px" src="${av(U[u].a)}"><b>${U[u].id}</b><em>${it.h}시간</em><span class="sp"></span><span onpointerdown="event.stopPropagation()" onpointerup="event.stopPropagation();closeS()">${ic('dots',26)}</span><span onpointerdown="event.stopPropagation()" onpointerup="event.stopPropagation();closeS()" style="margin-left:6px">${ic('x',26)}</span></div></div><div class="sr" onpointerdown="event.stopPropagation()" onpointerup="event.stopPropagation()"><div>${U[u].id}님에게 답장…</div>${ic('heart',28)}${ic('send',28)}</div>`}
function nextS(){const n=S[sv.order[sv.ui]].length;if(sv.si+1<n){sv.si++;drawS();sv.raf=requestAnimationFrame(tick)}else nextU()}
function prevS(){if(sv.si>0)sv.si--;else if(sv.ui>0){sv.ui--;sv.si=0}else sv.si=0;drawS()}
function nextU(){if(sv.ui+1>=sv.order.length)return closeS();sv.ui++;sv.si=0;drawS()}
function prevU(){if(sv.ui>0)sv.ui--;sv.si=0;drawS()}
function storyBar(on){const b=document.querySelector('.sys-bar'),a=document.getElementById('app');if(!b||!a)return;if(on){b.classList.add('sys-overlay','sys-dark');b.style.background='transparent';a.style.top='0px';}else{b.classList.remove('sys-overlay','sys-dark');b.style.background='';a.style.top=b.offsetHeight+'px';}}
window.addEventListener('load',()=>storyBar(false));
function closeS(){if(!sv)return;cancelAnimationFrame(sv.raf);sv.el.remove();sv=null;storyBar(false);renderHome();if(cur=='dm')renderDM();stack.forEach(s=>{});}
/* ---------- comments ---------- */
const CM={},CN=['너무 예뻐요','분위기 미쳤다','여기 어디예요?','오늘도 잘 봤어요','색감 최고','저장하고 갑니다','이런 사진 좋아요'];
const cmts=p=>CM[p.id]||(CM[p.id]=Array.from({length:6},(_,i)=>({u:Object.keys(U).filter(x=>x!='me'&&x!='me2')[(p.seed+i)%8],x:CN[(p.seed+i*2)%7],h:i*5+1,l:i*3,k:0})));
function cmList(p){return cmts(p).map((c,i)=>`<div class="ci">${A(c.u,36,false)}<div class="b"><b>${U[c.u].id}</b><small>${c.h==0?'방금':c.h<24?c.h+'시간':Math.floor(c.h/24)+'일'}</small><br>${c.x}<i>답글 달기</i></div><button class="lk2" data-act="clike" data-i="${i}">${ic('heart',22,c.k?'#ff6fa3':'none')}${c.l+c.k?`<span>${c.l+c.k}</span>`:''}</button></div>`).join('')}
function openCm(id){const p=PM[id],el=document.createElement('div');el.id='sheet';el._p=p;el.innerHTML=`<div class="shb" data-act="cclose"></div><div class="shp"><div class="gr" data-act="cclose"></div><h4>댓글</h4><div class="cl">${cmList(p)}</div><div class="qe"><span>❤️</span><span>🙌</span><span>🔥</span><span>👏</span><span>😢</span><span>😍</span><span>😮</span><span>😂</span></div><div class="cin" id="cin">${A('me',40,false)}<div><input id="cmi" placeholder="${U[p.u].id}님에게 댓글 추가" autocomplete="off"><button data-act="csend">게시</button></div></div></div>`;$('#app').appendChild(el);const i=el.querySelector('#cmi');i.oninput=()=>$('#cin').classList.toggle('ty',!!i.value.trim());i.onkeydown=e=>{if(e.key=='Enter')sendCm()}}
const closeCm=()=>{const e=$('#sheet');if(e)e.remove()};
function sendCm(){const e=$('#sheet'),i=$('#cmi');if(!e||!i.value.trim())return;const p=e._p;cmts(p).unshift({u:'me',x:i.value.trim(),h:0,l:0,k:0});p.cm++;i.value='';$('#cin').classList.remove('ty');e.querySelector('.cl').innerHTML=cmList(p);document.querySelectorAll(`article[data-id="${p.id}"] [data-act=cmt] span`).forEach(x=>x.textContent=fmtN(p.cm));document.querySelectorAll(`article[data-id="${p.id}"] .vc`).forEach(x=>x.textContent='댓글 '+fmtN(p.cm)+'개 모두 보기')}
/* ---------- account switcher ---------- */
const ACCTS=['me','me2'];
function openAcct(){if($('#acct'))return;const el=document.createElement('div');el.id='acct';
el.innerHTML=`<div class="shb" data-act="aclose"></div><div class="shp" style="height:auto;padding-bottom:calc(20px + env(safe-area-inset-bottom,0px))"><div class="gr" data-act="aclose"></div><div class="ac">${ACCTS.map(k=>`<div class="r" data-act="swacct" data-k="${k}">${A(k,48,false)}<span>${U[k].priv?'🔒 ':''}${U[k].id}</span><i class="chk" style="${k==ACUR?'':'visibility:hidden'}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg></i></div>`).join('')}<div class="r add"><i class="pl">${ic('plus',26)}</i><span>Instagram 추가</span></div></div><div class="mt">Meta 계정 설정으로 이동</div><div class="meta">∞ Meta</div></div>`;
$('#app').appendChild(el)}
const closeAcct=()=>{const e=$('#acct');if(e)e.remove()};
/* ---------- events ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,id=t.dataset.id,u=t.dataset.u;
if(a=='cmt')openCm(id);else if(a=='cclose')closeCm();else if(a=='csend')sendCm();else if(a=='clike'){const c=cmts($('#sheet')._p)[+t.dataset.i];c.k=c.k?0:1;$('#sheet .cl').innerHTML=cmList($('#sheet')._p)}else if(a=='tab')tab(t.dataset.t);else if(a=='back')back();else if(a=='story')openStory(u);
else if(a=='acct')openAcct();else if(a=='aclose')closeAcct();else if(a=='swacct'){ACUR=t.dataset.k;closeAcct();$('#t-me').innerHTML=profHTML(ACUR,1);renderHome();renderNav();if(cur=='dm')renderDM()}else if(a=='prof'){if(u!=stack.length&&u)push(profHTML(u,0))}
else if(a=='post'){const p=PM[id];push(`<div class="hd"><button class="pill" data-act="back">${ic('lt',24)}</button><b style="flex:1;font-size:18px;text-align:center;margin-right:40px">게시물</b></div><div class="sc">${postHTML(p)}</div>`)}
else if(a=='like'||a=='dbl'){const art_=t.closest('article'),p=PM[art_?art_.dataset.id:id];const wasLk=p.lk;if(a=='dbl'){if(!e.detail||e.detail<2)return;p.lk=1;const bs=document.createElement('div');bs.className='burst';bs.innerHTML='<svg class="bh" viewBox="0 0 24 24"><path fill="#ff6fa3" stroke="none" d="M12 20.3s-8-4.8-8-10.5C4 6.8 6.2 5 8.6 5c1.5 0 2.7.8 3.4 2 .7-1.2 1.9-2 3.4-2C17.8 5 20 6.8 20 9.8c0 5.7-8 10.5-8 10.5z"/></svg>';t.appendChild(bs);setTimeout(()=>bs.remove(),1000)}else p.lk=p.lk?0:1;document.querySelectorAll(`article[data-id="${p.id}"] [data-act=like]`).forEach(b=>{b.style.color=p.lk?'#ff6fa3':'#000';b.innerHTML=ic('heart',26,p.lk?'#ff6fa3':'none')+'<span>'+fmtN(p.likes+p.lk)+'</span>'});document.querySelectorAll(`article[data-id="${p.id}"] .lk`).forEach(l=>l.textContent=fmtN(p.likes+p.lk)+'명이 좋아합니다');if(p.lk&&!wasLk&&p.u!=='me'&&window.YuyuOverlay){const J=['어? 지금 남의 사진에 좋아요 누른 거예요?','yuyu 말고 다른 사람한테 하트를 눌러요…?','흥. 그 사람 사진 그렇게 좋아요?','하트는 나한테만 눌러줘요.'];YuyuOverlay.show([J[Math.floor(Math.random()*J.length)]])}}
else if(a=='save'){const p=PM[id];p.sv=p.sv?0:1;t.innerHTML=ic('mark',25,p.sv?'#000':'none')}
else if(a=='chat')openChat(u=='me'?'u1':u);else if(a=='send')send();
else if(a=='react'){const b=$('#inp');if(!b)return;const m=b._t.msgs[+t.dataset.i];m.r=m.r?0:1;$('#cm .msgs').innerHTML=msgsHTML(b._t)}});
document.addEventListener('scroll',e=>{const c=e.target;if(!c.classList||!c.classList.contains('car'))return;const i=Math.round(c.scrollLeft/c.clientWidth),w=c.parentElement;const n=w.querySelector('.cnt');if(n)n.textContent=(i+1)+'/'+c.children.length;const d=w.nextElementSibling;if(d)[...d.children].forEach((x,k)=>x.classList.toggle('on',k==i))},true);
renderHome();renderNav();
