/* 小韋工具組・頁首主視覺（Gemini 生成）
   各站共用：改這一支、所有網頁同時更新
   https://xsos32-design.github.io/job/kv.js */
(function(){
 if(window.__xwKV) return; window.__xwKV=1;
 var p=location.pathname.toLowerCase(), k='';
 var M=[
  [/\/job\/(index\.html)?$/,'job','#ffc53d'],
  [/\/rollcall\/(rollcall\.html|index\.html)?$/,'rollcall','#00efd4'],
  [/\/roster\/(index\.html)?$/,'roster','#00efd4'],
  [/\/t2arrival21402153\/(index\.html)?$/,'flights','#ff4d7d'],
  [/\/backupdutyfree-2140-2153\/(index\.html)?$/,'arrival','#ff4d7d'],
  [/\/dutyliquorwiki\/(index\.html)?$/,'liquor','#ffc53d','#main'],
  [/\/chocolatewiki\/(index\.html)?$/,'choc','#ffc53d','#main'],
  [/\/promotion\/(index\.html)?$/,'promo','#49e3a3'],
  [/\/chocolatepromo\/(index\.html)?$/,'chocpromo','#49e3a3']
 ], c='', t='';
 for(var i=0;i<M.length;i++){ if(M[i][0].test(p)){k=M[i][1];c=M[i][2];t=M[i][3]||'';break;} }
 if(!k) return;
 var src=location.origin+'/job/kv/'+k+'.webp?v=1';
 function go(){
  if(document.getElementById('xwkv')) return;
  var s=document.createElement('style');
  s.textContent='#xwkv{position:relative;display:block;width:100%;height:clamp(88px,24vw,210px);'
   +'background:#05070a url('+src+') right center/cover no-repeat;'
   +'-webkit-mask-image:linear-gradient(#000 70%,transparent);mask-image:linear-gradient(#000 70%,transparent);'
   +'margin:0 0 -12px;pointer-events:none;z-index:0}'
   +'#xwkv::after{content:"";position:absolute;left:0;right:0;bottom:22%;height:1px;'
   +'background:linear-gradient(90deg,transparent,'+c+'55 30%,transparent);opacity:.7}'
   +'@media print{#xwkv{display:none}}';
  document.head.appendChild(s);
  var d=document.createElement('div'); d.id='xwkv'; d.setAttribute('aria-hidden','true');
  var host=(t&&document.querySelector(t))||document.body; host.insertBefore(d, host.firstChild);
 }
 if(document.body) go(); else document.addEventListener('DOMContentLoaded',go);
})();
