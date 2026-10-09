/* ── 高精度 POS 畫面重繪（依實機版面、字級、位置） ── */
function sv2(w,h,inner){return '<svg viewBox="0 0 '+w+' '+h+'" class="pic" preserveAspectRatio="xMidYMid meet" role="img">'+inner+'</svg>'}
function T(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" font-size="'+(o.s||7)+'" fill="'+(o.f||"#13214A")+'"'+(o.w?' font-weight="700"':'')+(o.a?' text-anchor="'+o.a+'"':'')+(o.ls?' letter-spacing="'+o.ls+'"':'')+'>'+xe(s)+'</text>'}
function R(x,y,w,h,f,st,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+f+'"'+(st?' stroke="'+st+'" stroke-width="'+(sw||0.6)+'"':'')+'/>'}
var KC={y:"#F0E24B",p:"#F2BFCE",b:"#CFE2F7",g:"#8FE39B",c:"#9FE4F0",n:"#DCE6F5",l:"#D9E36B",w:"#EDEFF5"};
function posSVG(o){
 var W=600,H=400,s=R(0,0,W,H,"#DDE3EE","#7A86A8",1);
 /* 標題列 */
 s+=R(1,1,W-2,9,"#AEB6E8");
 s+=T(5,8,"[主畫面]　版本：2.0.0.650　門市：SA SA　機台：SA-34　IP：192.168.33.14",{s:6,f:"#1B2660"});
 /* 表頭 */
 s+=R(1,10,W-2,64,"#C6CBEE");
 s+=T(5,20,"交易日期：2026/10/01(四)",{s:7});s+=T(5,31,"歸帳日期：2026/10/01",{s:7});s+=T(5,42,"收銀人員：66666　POS用_桃園",{s:7});
 s+=T(140,20,"序號：2295155",{s:7});s+=T(140,31,"店：SA　SA　機：34",{s:7});s+=T(140,42,"售貨人員：31024　陳怡君",{s:7});
 s+=T(246,20,"F",{s:7});
 s+=T(268,20,"銷貨單號：3402295155",{s:7,f:"#C0392B",w:1});
 s+=T(268,31,"活動代碼：",{s:7});s+=T(268,42,"統一編號：",{s:7});
 s+=T(5,53,"Passport/Id No：",{s:7});s+=T(5,64,"Flight No(D)："+(o.flight||"BR0023"),{s:7});s+=T(5,72,"EC：",{s:7});
 s+=T(150,53,"Transfer：",{s:7});s+=T(150,64,"CardNumber：",{s:7});s+=T(150,72,"Departure：2026/10/01",{s:7});
 s+=T(268,53,"Nationality：1　中華民國",{s:7});s+=T(268,64,"Collecting：",{s:7});
 /* TOTAL 區 */
 s+=R(400,10,199,30,"#5A5FD2");
 s+=T(406,25,"TOTAL：",{s:10,f:"#FFFFFF",w:1});s+=T(594,25,o.total||"0",{s:11,f:"#FFFFFF",w:1,a:"end"});
 s+=T(406,37,"不足：",{s:9,f:"#E7E9FF",w:1});s+=T(594,37,o.due!==undefined?o.due:(o.total||"0"),{s:10,f:"#FFFFFF",w:1,a:"end"});
 s+=T(406,50,"會員編號：",{s:7});s+=T(406,60,"會員姓名：",{s:7});s+=T(406,70,"集點卡號：",{s:7});
 s+=R(548,44,48,10,"#E6E9F2","#8A96B4");s+=T(572,51,"會員功能<",{s:6,a:"middle"});
 /* 商品表頭 */
 var CX=[5,20,92,236,272,306,342,378,416,452,520];
 var CH=["No","商品編號","商品名稱","單價","折扣","售價","數量","小計","售貨員","序號","備註"];
 s+=R(1,76,W-2,13,"#E8EAF2","#9FAEC6");
 CH.forEach(function(c,i){s+=T(CX[i],85,c,{s:6.8,w:1,f:"#1B2440"});if(i)s+='<line x1="'+(CX[i]-4)+'" y1="76" x2="'+(CX[i]-4)+'" y2="89" stroke="#9FAEC6" stroke-width="0.5"/>';});
 /* 商品列 */
 var bodyTop=89,bodyBot=o.tab==="pay"?236:296;
 s+=R(1,bodyTop,W-2,bodyBot-bodyTop,"#93A0BC");
 if(o.item){
  s+=R(1,bodyTop,W-2,13,"#2B4FC8");
  var V=["1","2831568702520","Mac 110 Proof 12Y 0.75L","3680","100","3680","1","3680","31024","",""];
  V.forEach(function(v,i){if(v)s+=T(CX[i],bodyTop+9,v,{s:6.8,f:"#FFFFFF"})});
 }
 /* 匯率表（付款頁） */
 if(o.tab==="pay"){
  var FX=[["USD","美元","31.45000","117.01113"],["JPD","日幣","0.19370","18998.45121"],["HKD","港幣","3.90000","943.58974"],["KRW","韓元","0.02183","168575.35502"],["CNY","人民幣","4.65000","791.39785"],["EUR","歐元","35.33000","104.16077"]];
  s+=R(400,76,199,13,"#E8EAF2","#9FAEC6");
  [["代碼",404],["幣別",436],["匯率",472],["金額",530]].forEach(function(c){s+=T(c[1],85,c[0],{s:6.6,w:1})});
  FX.forEach(function(r,i){var y=89+i*12;s+=R(400,y,199,12,i%2?"#F4F6FA":"#FFFFFF","#C9D2E2",0.4);
   s+=T(404,y+8.4,r[0],{s:6.4});s+=T(436,y+8.4,r[1],{s:6.4});s+=T(500,y+8.4,r[2],{s:6.4,a:"end"});s+=T(594,y+8.4,r[3],{s:6.4,a:"end"});});
  s+=R(400,161,199,75,"#93A0BC");
  /* 付款明細表頭 */
  s+=R(1,236,399,13,"#E8EAF2","#9FAEC6");
  [["No",5],["代碼",22],["付款名稱",52],["付款金額",116],["匯率",176],["本地幣值",212],["參考號碼",268]].forEach(function(c){s+=T(c[1],245,c[0],{s:6.6,w:1})});
  s+=R(1,249,399,47,"#C3CBDC");
 }
 /* 分頁列 */
 s+=R(1,296,W-2,16,"#DDE3EE");
 var t1=(o.tab==="pay"),TB=function(x,lab,on){var g='<path d="M'+x+' 298 h46 l7 6 l-7 6 h-46 z" fill="'+(on?"#2B4FC8":"#AAB4CC")+'"/>';return g+T(x+22,307,lab,{s:7.5,a:"middle",f:"#FFFFFF",w:1})};
 s+=TB(6,"交 易",!t1)+TB(64,"付 款",t1);
 s+=T(130,307,"交易品項："+(o.item?1:0),{s:7});s+=T(196,307,"商品數量："+(o.item?1:0),{s:7});s+=T(262,307,"折讓金額：0",{s:7});
 s+=R(404,298,42,12,"#E6E9F2","#8A96B4");s+=T(425,306.5,"輸入區",{s:6.6,a:"middle"});
 s+=R(448,298,150,12,"#FFFFFF","#8A96B4");if(o.input)s+=T(452,306.5,o.input,{s:7.5,w:1});
 /* 鍵盤 */
 var cw=56,ch=18,x0=5,y0=314;
 var fk=(o.keys||[]),KK=[];
 fk.forEach(function(k,i){KK.push([k[0],i%4,Math.floor(i/4),k[1]])});
 var nums=["7","8","9","4","5","6","1","2","3","0","00","<<\nBACK"];
 nums.forEach(function(n,i){KK.push([n,4+(i%3),Math.floor(i/3),"b"])});
 (o.right||[]).forEach(function(k,i){KK.push([k[0],7,i,k[1]])});
 var gx=x0, s2='';
 KK.forEach(function(k){
  var colw=(k[1]>=4&&k[1]<7)?36:cw;
  var x=x0+(k[1]<4?k[1]*(cw+1):(4*(cw+1)+(k[1]-4)*(36+1)));
  if(k[1]===7)x=x0+4*(cw+1)+3*(36+1);
  var y=y0+k[2]*(ch+1),f=KC[k[3]||"n"],on=(o.hi&&k[0]===o.hi);
  s2+=R(x,y,colw,ch,f,on?"#E8541E":"#9FAEC6",on?2.2:0.6);
  var ln=String(k[0]).split("\n");
  ln.forEach(function(tx,i2){s2+=T(x+colw/2,y+(ln.length>1?ch/2-0.5+i2*7.2:ch/2+2.6),tx,{s:6.6,a:"middle",w:1,f:"#16233F"})});
  if(on)s2+='<circle cx="'+(x+colw-4)+'" cy="'+(y+4)+'" r="3.4" fill="#E8541E"/>';
 });
 s+=s2;
 /* 右側面板 */
 var px=x0+4*(cw+1)+3*(36+1)+cw+4;
 if(o.tab==="pay"){
  s+=R(px,y0,54,12,"#E6E9F2","#8A96B4");s+=T(px+27,y0+8.4,"EDC連線切換",{s:5.8,a:"middle"});
  s+=T(px+60,y0+9,"EDC為連線狀態",{s:7.5,w:1});
 }else{
  s+=R(px,y0,W-px-4,12,"#2B4FC8");s+=T(px+(W-px-4)/2,y0+8.6,"即時訊息",{s:6.6,a:"middle",f:"#FFFFFF",w:1});
  s+=R(px,y0+12,W-px-4,47,"#EDEFF5","#9FAEC6");
 }
 /* 狀態列 */
 s+=R(1,H-10,W-2,9,"#DDE3EE");
 s+=R(480,H-10,22,9,"#E9E24B");s+=T(491,H-3.4,"連線",{s:5.8,a:"middle"});
 s+=T(510,H-3.4,"使用者：鐘嘉瑜",{s:6});s+=T(594,H-3.4,o.time||"AM 04:15:03",{s:6,a:"end"});
 return sv2(W,H,s);
}
var TRADE_KEYS=[["重新\n登入","y"],["商品\n查詢","n"],["營業員","n"],["提貨\n註記","n"],["商品\n刪除","y"],["酬賓券","p"],["贈品","n"],["貴賓","n"],["快速\n結帳","p"],["單筆\n折扣","n"],["轉機\n註記","n"],["會員\n功能","c"],["下一頁","b"],["單筆\n折讓","p"],["統編","n"],["活動\n代碼","n"]];
var TRADE_RIGHT=[["數量","w"],["清除","y"],["Enter","g"],["結帳","p"]];
var PAY_KEYS=[["返回\n銷售","y"],["現金","n"],["信用卡","n"],["匯率表","n"],["付款\n刪除","y"],["美元","n"],["電子\n支付","n"],["RICH\nPay","l"],["上一頁","b"],["人民幣","n"],["酬賓券","p"],["禮卷","n"],["下一頁","b"],["日幣","n"],["桃園\n消費券","n"],["其他\n付款","n"]];
var PAY_RIGHT=[["清除","y"],["商品\n預覽","w"],["統編","w"],["確認\n付款","p"]];
function dlgSVG(o){
 var W=600,H=400,s=R(0,0,W,H,"#DDE3EE","#7A86A8",1);
 s+=R(1,1,W-2,9,"#AEB6E8");s+=T(5,8,"[主畫面]　版本：2.0.0.650　門市：SA SA　機台：SA-34　IP：192.168.33.14",{s:6,f:"#1B2660"});
 s+=R(1,10,W-2,40,"#C6CBEE");
 s+=T(5,20,"交易日期：2026/10/01(四)",{s:7});s+=T(5,31,"歸帳日期：2026/10/01",{s:7});s+=T(5,42,"收銀人員：",{s:7});
 s+=T(140,20,"序號：2295155",{s:7});s+=T(140,31,"店：SA　SA　機：34",{s:7});
 s+=T(268,20,"銷貨單號：3402295155",{s:7,f:"#C0392B",w:1});s+=T(268,31,"活動代碼：",{s:7});
 s+=R(400,10,199,22,"#5A5FD2");s+=T(406,25,"TOTAL：",{s:10,f:"#FFFFFF",w:1});s+=T(594,25,"0",{s:11,f:"#FFFFFF",w:1,a:"end"});
 s+=R(1,50,W-2,240,"#93A0BC");
 /* 對話框 */
 var dx=70,dy=34,dw=380,dh=252;
 s+=R(dx,dy,dw,dh,"#EDEFF5","#5A6686",1.2);
 s+=R(dx,dy,dw,12,"#C9CFE8");s+=T(dx+6,dy+9,"新交易基本資料",{s:7,w:1});
 var fx=dx+10,vx=dx+74,vw=150,fy=dy+20;
 var F=o.fields||[];
 F.forEach(function(f,i){var y=fy+i*18;
  s+=T(fx,y+9,f[0],{s:7});
  s+=R(vx,y,vw,13,f[2]===0?"#E4E7EE":"#FFFFFF","#8A96B4");
  if(f[1])s+=T(vx+4,y+9.3,f[1],{s:7.2,f:"#101A33"});
  if(f[3])s+=T(vx+vw+6,y+9.3,f[3],{s:7});
  if(o.focus===i){s+='<rect x="'+(vx-2)+'" y="'+(y-2)+'" width="'+(vw+4)+'" height="17" fill="none" stroke="#E8541E" stroke-width="2"/>';}
 });
 /* 右側按鈕 */
 var bx=dx+244;
 [["匯率表",0],["加總合併刷卡",1],["刷登機證",2]].forEach(function(b){
  var y=fy+10+b[1]*44;s+=R(bx,y,86,24,"#E6E9F2","#8A96B4",1);s+=T(bx+43,y+15,b[0],{s:7,a:"middle"});});
 /* 下方按鈕 2x4 */
 var by=dy+dh-56,bw=80;
 [["查價(F1)",0,0],["交易作廢\n(A+F1)",1,0],["暫存取出",2,0],["確定(A+E)",3,0],["會員登錄(F9)",0,1],["Pos Rich",1,1],["其他功能",2,1],["取消(Esc)",3,1]].forEach(function(b){
  var x=dx+10+b[1]*(bw+6),y=by+b[2]*26,on=(o.hi===b[0]);
  s+=R(x,y,bw,22,"#E6E9F2",on?"#E8541E":"#8A96B4",on?2.2:1);
  var ln=b[0].split("\n");ln.forEach(function(t,i){s+=T(x+bw/2,y+(ln.length>1?8+i*8:14),t,{s:6.8,a:"middle"})});
  if(on)s+='<circle cx="'+(x+bw-5)+'" cy="'+(y+5)+'" r="3.6" fill="#E8541E"/>';
 });
 /* 右面板 */
 var rx=dx+dw+6,rw=W-rx-6;
 if(o.list){
  s+=R(rx,dy+6,rw,16,"#C9CFE8");s+=T(rx+6,dy+17,"售貨員選擇表：",{s:8,w:1});
  o.list.forEach(function(r,i){var y=dy+24+i*18;
   s+=R(rx,y,rw,17,i%2?"#DCE3F4":"#EFF2F8","#A9B4CC",0.5);
   s+=T(rx+8,y+12,r[0],{s:8,w:1});s+=T(rx+54,y+12,r[1],{s:8});});
 }else{
  s+=R(rx,dy+6,rw,186,"#CFE0F2","#8A96B4",1);
  s+=T(rx+8,dy+22,"導引訊息框：",{s:8,w:1});
 }
 /* 螢幕鍵盤 */
 s+=kbdSVG(dx+10,dy+dh+8,360);
 s+=R(1,H-10,W-2,9,"#DDE3EE");s+=R(480,H-10,22,9,"#E9E24B");s+=T(491,H-3.4,"連線",{s:5.8,a:"middle"});
 s+=T(510,H-3.4,"使用者：鐘嘉瑜",{s:6});s+=T(594,H-3.4,o.time||"AM 04:14:34",{s:6,a:"end"});
 return sv2(W,H,s);
}
function kbdSVG(x0,y0,w){
 var rows=[["Caps","Tab","-","/","@",":","Home","End"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M","Space"]];
 var s=R(x0-4,y0-4,w+8,4*17+10,"#F2F4F8","#B9C3D6",0.8),cw=w/10;
 rows.forEach(function(r,ri){r.forEach(function(k,ci){var kw=(k==="Space")?cw*2.4:cw-2;
  s+=R(x0+ci*cw,y0+ri*17,kw,15,"#FFFFFF","#C3CCDD",0.5);
  s+=T(x0+ci*cw+kw/2,y0+ri*17+10.5,k,{s:7,a:"middle",f:"#24304F"});});});
 var nx=x0+w+14,nk=[["7",0,0],["8",1,0],["9",2,0],["←",3,0],["4",0,1],["5",1,1],["6",2,1],["Clr",3,1],["1",0,2],["2",1,2],["3",2,2],["Ent",3,2],["0",0,3],["00",1,3],[".",2,3]];
 nk.forEach(function(k){s+=R(nx+k[1]*22,y0+k[2]*17,20,15,"#FFFFFF","#C3CCDD",0.5);s+=T(nx+k[1]*22+10,y0+k[2]*17+10.5,k[0],{s:7,a:"middle",f:"#24304F"});});
 return s;
}
function cpnSVG(o){
 var W=600,H=400,s=R(0,0,W,H,"#DDE3EE","#7A86A8",1);
 s+=R(1,1,W-2,9,"#AEB6E8");s+=T(5,8,"[主畫面]　版本：2.0.0.650　門市：SA SA　機台：SA-34　IP：192.168.33.14",{s:6,f:"#1B2660"});
 s+=R(1,10,W-2,10,"#2B3FA8");s+=T(6,18,"優惠券輸入",{s:7,f:"#FFFFFF",w:1});
 s+=T(8,34,o.title,{s:10,w:1});
 s+=T(430,34,"交易匯總資訊",{s:9,w:1});
 /* 左表 */
 s+=R(8,40,352,14,"#E8EAF2","#9FAEC6");
 (o.cols||["No.","優惠券名稱","優惠券號","抵用金額"]).forEach(function(c,i){s+=T([12,40,160,266][i],50,c,{s:6.8,w:1})});
 s+=R(8,54,352,96,"#93A0BC");
 /* 右表 */
 s+=R(406,40,186,14,"#E8EAF2","#9FAEC6");s+=T(410,50,"資料名稱",{s:6.8,w:1});s+=T(560,50,"金額",{s:6.8,w:1});
 (o.sum||[]).forEach(function(r,i){var y=54+i*14;
  s+=R(406,y,186,14,i===0?"#2B4FC8":(i%2?"#EFF2F8":"#FFFFFF"),"#C9D2E2",0.5);
  s+=T(410,y+10,r[0],{s:6.8,f:i===0?"#FFFFFF":"#13214A"});
  s+=T(588,y+10,r[1],{s:6.8,a:"end",f:i===0?"#FFFFFF":"#13214A"});});
 /* 側邊按鈕 */
 [["上頁",0],["上筆",1],["下筆",2],["下頁",3]].forEach(function(b){
  var y=46+b[1]*26;s+=R(366,y,34,22,"#E6E9F2","#8A96B4",1);s+=T(383,y+14,b[0],{s:7,a:"middle"});});
 /* 中段 */
 if(o.note)s+=T(8,164,o.note,{s:7.5});
 s+=T(8,186,"輸入區：",{s:7.5});s+=R(52,176,200,14,"#FFFFFF","#8A96B4");
 (o.mid||[]).forEach(function(b,i){var x=264+i*74;s+=R(x,176,68,16,"#E6E9F2","#8A96B4",1);s+=T(x+34,187,b,{s:7,a:"middle"});});
 /* 下方按鈕列 */
 (o.btns||[]).forEach(function(b){
  var on=(o.hi===b[0]);
  s+=R(b[1],202,b[2],18,"#E6E9F2",on?"#E8541E":"#8A96B4",on?2.2:1);
  s+=T(b[1]+b[2]/2,214,b[0],{s:7,a:"middle"});
  if(on)s+='<circle cx="'+(b[1]+b[2]-5)+'" cy="207" r="3.6" fill="#E8541E"/>';});
 s+=kbdSVG(14,236,380);
 s+=R(1,H-10,W-2,9,"#DDE3EE");s+=R(480,H-10,22,9,"#E9E24B");s+=T(491,H-3.4,"連線",{s:5.8,a:"middle"});
 s+=T(510,H-3.4,"使用者：鐘嘉瑜",{s:6});s+=T(594,H-3.4,o.time||"AM 04:15:09",{s:6,a:"end"});
 return sv2(W,H,s);
}
