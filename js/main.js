// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  CANVAS 2D ENGINE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const CV = document.getElementById('scene-canvas');
const cx = CV.getContext('2d');
let CW, CH;

function resizeCv() {
  CW = CV.offsetWidth; CH = CV.offsetHeight;
  CV.width = CW; CV.height = CH;
  const sc = document.getElementById('shop-walk-canvas');
  if(sc && sc.width) { sc.width=window.innerWidth; sc.height=window.innerHeight; }
  const vc = document.getElementById('victory-canvas');
  if(vc && vc.width) { vc.width=window.innerWidth; vc.height=window.innerHeight; }
}
window.addEventListener('resize', () => { resizeCv(); if(animSt.bg >= 0) drawBg(animSt.bg); });

// â”€â”€ ROOM BACKGROUNDS â”€â”€
function drawBg(idx) {
  cx.clearRect(0,0,CW,CH);
  [drawRoom0, drawRoom1, drawRoom2][Math.min(idx,2)](cx, CW, CH);
}

function drawRoom0(g,W,H){
  // â”€â”€ GÃœNDÃœZ: Krem duvarlÄ±, aydÄ±nlÄ±k oda â”€â”€
  // Warm cream wall
  const wallG=g.createLinearGradient(0,0,0,H*.66);
  wallG.addColorStop(0,'#e8dfc8');wallG.addColorStop(1,'#d8ccb0');
  g.fillStyle=wallG;g.fillRect(0,0,W,H*.66);
  // Warm wood floor
  const floorG=g.createLinearGradient(0,H*.66,0,H);
  floorG.addColorStop(0,'#5a3e20');floorG.addColorStop(1,'#3d2810');
  g.fillStyle=floorG;g.fillRect(0,H*.66,W,H*.34);
  // Wall/floor divider baseboard
  g.fillStyle='#8a6a3a';g.fillRect(0,H*.655,W,10);
  g.fillStyle='#c8a870';g.fillRect(0,H*.655,W,3);
  // Floor planks
  for(let x=0;x<W;x+=W*.07){g.strokeStyle='rgba(0,0,0,.12)';g.lineWidth=1;g.beginPath();g.moveTo(x,H*.67);g.lineTo(x,H);g.stroke();}
  // Ceiling strip
  g.fillStyle='#f0e8d0';g.fillRect(0,0,W,H*.04);
  g.fillStyle='#c8b890';g.fillRect(0,H*.04,W,3);

  // â”€â”€ 4 WINDOWS with bright blue sky â”€â”€
  const wins=[{x:W*.03,w:W*.14},{x:W*.2,w:W*.12},{x:W*.35,w:W*.12},{x:W*.5,w:W*.1}];
  wins.forEach(({x:wx,w:ww},wi)=>{
    // Window recess shadow
    g.fillStyle='rgba(0,0,0,.08)';g.fillRect(wx-4,H*.03,ww+8,H*.42);
    // Sky gradient
    const skyG=g.createLinearGradient(wx,H*.04,wx,H*.44);
    skyG.addColorStop(0,'#4a9fdf');skyG.addColorStop(.5,'#7bc4f4');skyG.addColorStop(1,'#c8ecff');
    g.fillStyle=skyG;g.fillRect(wx,H*.04,ww,H*.4);
    // Sun on first window
    if(wi===0){
      g.save();g.shadowColor='#fff4a0';g.shadowBlur=20;
      g.fillStyle='#fffac0';g.beginPath();g.arc(wx+ww*.65,H*.1,ww*.11,0,Math.PI*2);g.fill();
      g.restore();
      // Sun rays
      g.save();g.globalAlpha=.12;g.strokeStyle='#ffee80';g.lineWidth=2;
      for(let a=0;a<Math.PI*2;a+=Math.PI/6){g.beginPath();g.moveTo(wx+ww*.65,H*.1);g.lineTo(wx+ww*.65+Math.cos(a)*ww*.3,H*.1+Math.sin(a)*H*.15);g.stroke();}
      g.restore();
    }
    // Clouds
    [[.15,.2],[.55,.28],[.3,.42]].forEach(([cx2,cy2])=>{
      g.fillStyle='rgba(255,255,255,.9)';
      g.beginPath();g.ellipse(wx+ww*cx2,H*cy2,ww*.12,H*.022,0,0,Math.PI*2);g.fill();
      g.beginPath();g.ellipse(wx+ww*cx2+ww*.05,H*cy2-H*.013,ww*.08,H*.017,0,0,Math.PI*2);g.fill();
    });
    // Light spill on wall below window
    const spill=g.createRadialGradient(wx+ww*.5,H*.44,0,wx+ww*.5,H*.44,ww*1.2);
    spill.addColorStop(0,'rgba(220,240,255,.18)');spill.addColorStop(1,'transparent');
    g.fillStyle=spill;g.fillRect(wx-ww*.3,H*.44,ww*1.6,H*.22);
    // Window frame (wooden, warm)
    g.strokeStyle='#8a6a3a';g.lineWidth=3;g.strokeRect(wx,H*.04,ww,H*.4);
    // Cross bars
    g.lineWidth=2;
    g.beginPath();g.moveTo(wx+ww*.5,H*.04);g.lineTo(wx+ww*.5,H*.44);g.stroke();
    g.beginPath();g.moveTo(wx,H*.21);g.lineTo(wx+ww,H*.21);g.stroke();
    // Window sill
    g.fillStyle='#a08050';g.fillRect(wx-4,H*.44,ww+8,8);
  });

  // Sunlight beam across floor
  const beam=g.createLinearGradient(W*.03,H*.44,W*.2,H*.7);
  beam.addColorStop(0,'rgba(255,240,180,.15)');beam.addColorStop(1,'transparent');
  g.fillStyle=beam;g.beginPath();g.moveTo(W*.03,H*.44);g.lineTo(W*.17,H*.44);g.lineTo(W*.28,H*.7);g.lineTo(W*.0,H*.7);g.closePath();g.fill();

  // â”€â”€ Desk â”€â”€
  g.fillStyle='#6a4820';g.fillRect(W*.22,H*.53,W*.5,H*.13);
  g.fillStyle='#8a6030';g.fillRect(W*.22,H*.53,W*.5,5);
  g.fillStyle='#5a3810';[-1,1].forEach(s=>{g.fillRect(W*.22+(s<0?0:W*.5-8),H*.6,8,H*.08);});
  // Monitor
  g.fillStyle='#2a2a2a';g.fillRect(W*.34,H*.32,W*.13,H*.21);
  g.fillStyle='#1a2c3c';g.fillRect(W*.35,H*.33,W*.11,H*.18);
  g.save();g.shadowColor='#00c8ff';g.shadowBlur=10;g.fillStyle='rgba(0,180,255,.1)';g.fillRect(W*.35,H*.33,W*.11,H*.18);g.restore();
  g.fillStyle='#3a3a3a';g.fillRect(W*.395,H*.53,W*.022,H*.03);
  // Monitor base
  g.fillStyle='#2a2a2a';g.fillRect(W*.375,H*.535,W*.06,4);
  // Coffee mug
  g.fillStyle='#f0f0f0';g.fillRect(W*.67,H*.5,W*.024,H*.04);g.fillStyle='#5a3010';g.fillRect(W*.672,H*.51,W*.02,H*.025);
  g.fillStyle='rgba(180,100,40,.4)';g.fillRect(W*.672,H*.505,W*.02,4);
  // Plant
  g.fillStyle='#3c2200';g.fillRect(W*.79,H*.55,W*.034,H*.1);
  g.fillStyle='#2a5a18';g.beginPath();g.arc(W*.807,H*.49,W*.026,0,Math.PI*2);g.fill();
  g.fillStyle='#3a7a24';g.beginPath();g.arc(W*.802,H*.47,W*.018,0,Math.PI*2);g.fill();
  g.fillStyle='#4a9030';g.beginPath();g.arc(W*.812,H*.468,W*.012,0,Math.PI*2);g.fill();
  // Wall art / neon sign (daylight-dimmed)
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=6;g.globalAlpha=.5;
  g.strokeStyle='#00f5ff';g.lineWidth=1.5;g.strokeRect(W*.85,H*.08,W*.12,H*.2);
  g.font=`bold ${Math.round(H*.065)}px Orbitron,monospace`;g.fillStyle='#00f5ff';g.textAlign='center';
  g.fillText('SYS',W*.91,H*.18);g.fillText('PRO',W*.91,H*.265);g.restore();
  // Bookshelf on wall
  g.fillStyle='#8a6030';g.fillRect(W*.65,H*.1,W*.18,H*.3);
  g.fillStyle='#6a4820';g.fillRect(W*.65,H*.1,W*.18,4);g.fillRect(W*.65,H*.4,W*.18,4);
  [[W*.66,'#c04040',H*.13],[W*.685,'#4060c0',H*.15],[W*.71,'#40a040',H*.12],[W*.735,'#c08040',H*.14],
   [W*.66,'#8040c0',H*.25],[W*.685,'#c08080',H*.23],[W*.71,'#40c0c0',H*.26],[W*.735,'#c0c040',H*.24]].forEach(([bx,bc,by])=>{
    g.fillStyle=bc;g.fillRect(bx,by,0.022*W,H*.11);
    g.fillStyle='rgba(255,255,255,.15)';g.fillRect(bx,by,0.022*W,4);
  });
}

function drawRoom1(g,W,H){
  // â”€â”€ GECE: LoÅŸ ama gÃ¶rÃ¼nÃ¼r â€” slate-blue duvar, mum Ä±ÅŸÄ±ÄŸÄ± â”€â”€
  // Walls: slate-blue (NOT pitch black â€” vignette overlay karanlÄ±ÄŸÄ± ekliyor)
  const wallG=g.createLinearGradient(0,0,0,H*.66);
  wallG.addColorStop(0,'#1c1834');wallG.addColorStop(.5,'#16122a');wallG.addColorStop(1,'#121020');
  g.fillStyle=wallG;g.fillRect(0,0,W,H*.66);
  // Floor: warm charcoal with slight purple tint
  const floorG=g.createLinearGradient(0,H*.66,0,H);
  floorG.addColorStop(0,'#160e28');floorG.addColorStop(1,'#0e0a1a');
  g.fillStyle=floorG;g.fillRect(0,H*.66,W,H*.34);
  // Baseboard â€” subtle purple glow edge
  g.fillStyle='#2c1a50';g.fillRect(0,H*.655,W,6);
  g.save();g.shadowColor='#9900ff';g.shadowBlur=8;g.fillStyle='rgba(100,0,180,.45)';g.fillRect(0,H*.655,W,2);g.restore();
  for(let x=0;x<W;x+=52){g.strokeStyle='rgba(120,0,200,.1)';g.lineWidth=1;g.beginPath();g.moveTo(x,H*.66);g.lineTo(x,H);g.stroke();}
  // Ceiling
  g.fillStyle='#1e1a38';g.fillRect(0,0,W,H*.03);
  g.fillStyle='#2a2248';g.fillRect(0,H*.03,W,2);

  // â”€â”€ 4 NIGHT WINDOWS â”€â”€
  const wins=[{x:W*.03,w:W*.14},{x:W*.2,w:W*.11},{x:W*.34,w:W*.1},{x:W*.47,w:W*.09}];
  wins.forEach(({x:wx,w:ww},wi)=>{
    const nightG=g.createLinearGradient(wx,H*.04,wx,H*.44);
    nightG.addColorStop(0,'#000510');nightG.addColorStop(.5,'#010820');nightG.addColorStop(1,'#020c2a');
    g.fillStyle=nightG;g.fillRect(wx,H*.04,ww,H*.4);
    // Stars
    for(let i=0;i<16;i++){
      const sx=wx+Math.sin(i*wi*1.7+i*0.9)*ww*.44+ww*.5,sy=H*.05+Math.abs(Math.cos(i*1.1))*H*.35;
      const br=.35+Math.sin(i*2.3)*.3;
      g.fillStyle=`rgba(255,255,255,${Math.max(0.1,br)})`;
      g.beginPath();g.arc(sx,sy,Math.random()*.8+.2,0,Math.PI*2);g.fill();
    }
    if(wi===0){
      // Moon
      g.save();g.shadowColor='#aaccff';g.shadowBlur=22;
      g.fillStyle='#ddeeff';g.beginPath();g.arc(wx+ww*.65,H*.13,ww*.12,0,Math.PI*2);g.fill();
      g.fillStyle=nightG;g.beginPath();g.arc(wx+ww*.73,H*.12,ww*.1,0,Math.PI*2);g.fill();
      g.restore();
    }
    // Purple mist from window
    const mist=g.createLinearGradient(wx,H*.44,wx,H*.66);
    mist.addColorStop(0,'rgba(80,0,140,.12)');mist.addColorStop(1,'transparent');
    g.fillStyle=mist;g.fillRect(wx-ww*.05,H*.44,ww*1.1,H*.22);
    g.strokeStyle='#300060';g.lineWidth=2;g.strokeRect(wx,H*.04,ww,H*.4);
    g.lineWidth=1;g.strokeStyle='#280050';
    g.beginPath();g.moveTo(wx+ww*.5,H*.04);g.lineTo(wx+ww*.5,H*.44);g.stroke();
    g.beginPath();g.moveTo(wx,H*.22);g.lineTo(wx+ww,H*.22);g.stroke();
  });

  // â”€â”€ CANDLELIGHT warmth â”€â”€
  [W*.26,W*.63].forEach(cx2=>{
    // Warm glow halo on wall/desk
    const cg=g.createRadialGradient(cx2,H*.52,0,cx2,H*.52,W*.12);
    cg.addColorStop(0,'rgba(255,160,40,.18)');cg.addColorStop(1,'transparent');
    g.fillStyle=cg;g.fillRect(cx2-W*.12,H*.3,W*.24,H*.3);
    g.save();g.shadowColor='#ff8800';g.shadowBlur=20;
    // Candle body
    g.fillStyle='#f5e8c0';g.fillRect(cx2-4,H*.525,8,H*.05);
    // Flame
    g.fillStyle='#ffdd44';g.beginPath();g.ellipse(cx2,H*.518,4,7,0,0,Math.PI*2);g.fill();
    g.fillStyle='#ff8800';g.beginPath();g.ellipse(cx2,H*.522,2,4,0,0,Math.PI*2);g.fill();
    g.fillStyle='#fff0a0';g.beginPath();g.ellipse(cx2,H*.52,1.5,3,0,0,Math.PI*2);g.fill();
    g.restore();
    // Candle plate
    g.fillStyle='#c0a060';g.beginPath();g.ellipse(cx2,H*.578,12,4,0,0,Math.PI*2);g.fill();
  });

  // Purple fog/mist
  const fog=g.createLinearGradient(0,H*.6,0,H);fog.addColorStop(0,'rgba(80,0,160,.08)');fog.addColorStop(1,'rgba(40,0,80,.04)');
  g.fillStyle=fog;g.fillRect(0,H*.6,W,H*.4);

  // Desk
  g.fillStyle='#100c06';g.fillRect(W*.21,H*.52,W*.54,H*.14);g.fillStyle='#1a1208';g.fillRect(W*.21,H*.52,W*.54,4);
  // Dual monitors
  [W*.27,W*.42].forEach(mx=>{
    g.fillStyle='#0c0c0c';g.fillRect(mx,H*.3,W*.12,H*.22);
    g.fillStyle='#06101a';g.fillRect(mx+W*.006,H*.31,W*.108,H*.19);
    g.save();g.shadowColor='#9900ff';g.shadowBlur=12;g.fillStyle='rgba(120,0,200,.12)';g.fillRect(mx+W*.006,H*.31,W*.108,H*.19);g.restore();
    g.fillStyle='#181818';g.fillRect(mx+W*.044,H*.52,W*.022,H*.03);
  });
  // Keyboard
  g.save();g.shadowColor='#9900ff';g.shadowBlur=8;g.fillStyle='#0e0820';g.fillRect(W*.28,H*.56,W*.22,H*.06);g.restore();
  // Speaker
  g.fillStyle='#181818';g.fillRect(W*.68,H*.36,W*.04,H*.16);
  g.strokeStyle='rgba(136,0,255,.28)';g.lineWidth=1;for(let i=0;i<4;i++)g.strokeRect(W*.683,H*.38+i*H*.03,W*.034,H*.024);
  // Neon shelf
  g.save();g.shadowColor='#8800ff';g.shadowBlur=22;g.fillStyle='rgba(136,0,255,.4)';g.fillRect(W*.77,H*.51,W*.1,3);g.restore();
  // Neon sign â€” ominous purple
  g.save();g.shadowColor='#aa00ff';g.shadowBlur=32;
  g.strokeStyle='#8800cc';g.lineWidth=1.5;g.strokeRect(W*.85,H*.07,W*.12,H*.22);
  g.fillStyle='rgba(136,0,255,.06)';g.fillRect(W*.85,H*.07,W*.12,H*.22);
  g.font=`bold ${Math.round(H*.065)}px Orbitron,monospace`;g.fillStyle='#9900dd';g.textAlign='center';
  g.fillText('SYS',W*.91,H*.18);g.fillText('PRO',W*.91,H*.275);g.restore();
  // Floating dust particles
  for(let i=0;i<14;i++){
    const px=W*(0.08+i*0.065+Math.sin(i*1.4)*0.04),py=H*(0.28+Math.cos(i*0.9)*0.16);
    g.fillStyle=`rgba(160,80,255,${0.04+i*.014})`;g.beginPath();g.arc(px,py,1.5,0,Math.PI*2);g.fill();
  }
}

function drawRoom2(g,W,H){
  // â”€â”€ BÃ–LÃœM 3: YÃ¼ksek teknoloji, gece, loÅŸ ama gÃ¶rÃ¼nÃ¼r â”€â”€
  // Wall: deep navy (not pure black)
  const wallG=g.createLinearGradient(0,0,0,H*.66);
  wallG.addColorStop(0,'#0e0c20');wallG.addColorStop(.5,'#0a0818');wallG.addColorStop(1,'#080612');
  g.fillStyle=wallG;g.fillRect(0,0,W,H*.66);
  // Floor: dark navy with glow from monitors
  g.fillStyle='#07071a';g.fillRect(0,H*.66,W,H*.34);
  // Glowing floor grid
  for(let x=0;x<W;x+=52){
    const tg=g.createLinearGradient(x,H*.66,x,H);tg.addColorStop(0,'rgba(0,245,255,.15)');tg.addColorStop(1,'transparent');
    g.fillStyle=tg;g.fillRect(x,H*.66,1.5,H*.34);
  }
  // Ceiling
  g.fillStyle='#101020';g.fillRect(0,0,W,H*.03);

  // â”€â”€ 4 WINDOWS â€” same count as other rooms, night sky â”€â”€
  const wins=[{x:W*.03,w:W*.14},{x:W*.2,w:W*.11},{x:W*.34,w:W*.1},{x:W*.47,w:W*.09}];
  wins.forEach(({x:wx,w:ww},wi)=>{
    const nightG=g.createLinearGradient(wx,H*.04,wx,H*.44);
    nightG.addColorStop(0,'#000510');nightG.addColorStop(.5,'#010820');nightG.addColorStop(1,'#020c2a');
    g.fillStyle=nightG;g.fillRect(wx,H*.04,ww,H*.4);
    // Stars in each window
    for(let i=0;i<14;i++){
      const sx=wx+Math.sin(i*wi+i)*ww*.45+ww*.5,sy=H*.05+Math.abs(Math.cos(i*1.3))*H*.35;
      g.fillStyle=`rgba(255,255,255,${.3+Math.random()*.6})`;
      g.beginPath();g.arc(sx,sy,Math.random()*.8+.2,0,Math.PI*2);g.fill();
    }
    // City lights (bottom of windows)
    for(let i=0;i<8;i++){
      const lx=wx+i*ww*.13,ly=H*.38+Math.sin(i)*H*.04;
      g.fillStyle=`rgba(${Math.random()>0.5?'255,200,100':'100,200,255'},0.6)`;
      g.fillRect(lx,ly,3,H*.06+Math.sin(i)*H*.02);
    }
    if(wi===0){
      // Moon
      g.save();g.shadowColor='#aaccff';g.shadowBlur=18;
      g.fillStyle='#ddeeff';g.beginPath();g.arc(wx+ww*.65,H*.13,ww*.11,0,Math.PI*2);g.fill();
      g.fillStyle=nightG;g.beginPath();g.arc(wx+ww*.73,H*.12,ww*.09,0,Math.PI*2);g.fill();
      g.restore();
    }
    // Purple mist spill
    const mist=g.createLinearGradient(wx,H*.44,wx,H*.66);
    mist.addColorStop(0,'rgba(60,0,120,.1)');mist.addColorStop(1,'transparent');
    g.fillStyle=mist;g.fillRect(wx-ww*.05,H*.44,ww*1.1,H*.22);
    g.strokeStyle='#1a0040';g.lineWidth=2;g.strokeRect(wx,H*.04,ww,H*.4);
    g.lineWidth=1;g.strokeStyle='#150030';
    g.beginPath();g.moveTo(wx+ww*.5,H*.04);g.lineTo(wx+ww*.5,H*.44);g.stroke();
    g.beginPath();g.moveTo(wx,H*.22);g.lineTo(wx+ww,H*.22);g.stroke();
  });

  // mega desk
  g.fillStyle='#07070f';g.fillRect(W*.1,H*.51,W*.66,H*.15);
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=16;g.fillStyle='rgba(0,245,255,.2)';g.fillRect(W*.1,H*.51,W*.66,2.5);g.restore();
  // triple monitors
  [[W*.14,'#00f5ff'],[W*.28,'#ff00aa'],[W*.42,'#aaff00']].forEach(([mx,c])=>{
    g.fillStyle='#0a0a0a';g.fillRect(mx,H*.25,W*.11,H*.26);
    g.save();g.shadowColor=c;g.shadowBlur=20;
    g.fillStyle=c+'20';g.fillRect(mx+W*.006,H*.26,W*.098,H*.23);
    g.strokeStyle=c+'55';g.lineWidth=1;g.strokeRect(mx+W*.006,H*.26,W*.098,H*.23);
    g.restore();
    g.fillStyle='#181818';g.fillRect(mx+W*.036,H*.51,W*.022,H*.03);
  });
  // RGB floor strip
  const rg=g.createLinearGradient(0,0,W,0);rg.addColorStop(0,'#ff0080');rg.addColorStop(.33,'#00f5ff');rg.addColorStop(.66,'#aaff00');rg.addColorStop(1,'#ff0080');
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=14;g.fillStyle=rg;g.fillRect(0,H*.648,W,4);g.restore();
  // hologram ring
  g.save();g.shadowColor='#aaff00';g.shadowBlur=22;g.strokeStyle='rgba(170,255,0,.5)';g.lineWidth=1.5;g.setLineDash([5,5]);g.beginPath();g.arc(W*.88,H*.36,H*.2,0,Math.PI*2);g.stroke();g.setLineDash([]);g.restore();
  // wall accent
  g.save();g.shadowColor='#ff00aa';g.shadowBlur=14;g.strokeStyle='rgba(255,0,170,.28)';g.lineWidth=1;g.beginPath();g.moveTo(W*.8,0);g.lineTo(W*.8,H*.66);g.stroke();g.restore();
  // big neon sign
  g.save();g.shadowColor='#aaff00';g.shadowBlur=24;
  g.strokeStyle='#aaff00';g.lineWidth=1.5;g.strokeRect(W*.84,H*.06,W*.13,H*.22);
  g.fillStyle='rgba(170,255,0,.04)';g.fillRect(W*.84,H*.06,W*.13,H*.22);
  g.font=`bold ${Math.round(H*.065)}px Orbitron,monospace`;g.fillStyle='#aaff00';g.textAlign='center';
  g.fillText('SYS',W*.905,H*.17);g.fillText('PRO',W*.905,H*.26);g.restore();
}

// â”€â”€ PIXEL CHARACTERS â”€â”€
function drawChar(g, x, y, size, role, facingLeft, frame, isWalking) {
  g.save();
  // Mimar is taller â€” scale up
  const isMimar = role==='mimar';
  const scaledSize = isMimar ? size * 1.28 : size;
  if(facingLeft){g.translate(x,0);g.scale(-1,1);g.translate(-x,0);}
  const s=scaledSize, bob=Math.sin(frame*.18)*1.5;
  const legA=isWalking?Math.sin(frame*.38)*11:Math.sin(frame*.07)*2;
  const armA=isWalking?Math.sin(frame*.38)*14:Math.sin(frame*.07)*3;

  // shadow
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x,y+s*.93,s*.34,s*.07,0,0,Math.PI*2);g.fill();

  if(role==='mimar'){
    // â”€â”€ MIMAR: Long dark robe, tall figure â”€â”€
    // Robe (floor-length, wide)
    const robeGrad=g.createLinearGradient(x-s*.32,0,x+s*.32,0);
    robeGrad.addColorStop(0,'#070714');robeGrad.addColorStop(.5,'#0e0e22');robeGrad.addColorStop(1,'#070714');
    g.fillStyle=robeGrad;
    g.beginPath();g.moveTo(x-s*.26,y-s*.05+bob);g.lineTo(x+s*.26,y-s*.05+bob);g.lineTo(x+s*.34,y+s*.93+bob);g.lineTo(x-s*.34,y+s*.93+bob);g.closePath();g.fill();
    // Robe inner sheen
    g.fillStyle='rgba(136,0,255,.08)';
    g.beginPath();g.moveTo(x-s*.04,y-s*.02+bob);g.lineTo(x+s*.04,y-s*.02+bob);g.lineTo(x+s*.06,y+s*.9+bob);g.lineTo(x-s*.06,y+s*.9+bob);g.closePath();g.fill();
    // Robe hem details
    g.strokeStyle='rgba(136,0,255,.3)';g.lineWidth=1.5;
    g.beginPath();g.moveTo(x-s*.34,y+s*.9+bob);g.lineTo(x+s*.34,y+s*.9+bob);g.stroke();
    // Body/torso under robe
    g.fillStyle='#0c0c20';g.fillRect(x-s*.22,y-s*.1+bob,s*.44,s*.5);
    // Collar / chest detail
    g.fillStyle='rgba(136,0,255,.22)';g.fillRect(x-s*.1,y-s*.06+bob,s*.2,s*.22);
    g.strokeStyle='rgba(136,0,255,.4)';g.lineWidth=1;g.strokeRect(x-s*.1,y-s*.06+bob,s*.2,s*.22);
    // Robe arms (wide sleeves)
    [-1,1].forEach(side=>{
      g.save();g.translate(x+side*s*.3,y+s*.04+bob);g.rotate(-side*armA*Math.PI/180);
      g.fillStyle='#09091a';g.fillRect(-s*.11,0,s*.22,s*.28);
      g.fillStyle='rgba(136,0,255,.1)';g.fillRect(-s*.11,0,s*.22,s*.28);
      g.restore();
    });
    // Head
    g.fillStyle='#b08060';g.fillRect(x-s*.16,y-s*.38+bob,s*.32,s*.28);
    // Shadow/hood around face
    g.fillStyle='rgba(0,0,0,.6)';g.fillRect(x-s*.18,y-s*.38+bob,s*.36,s*.12);
    // Eyes â€” glowing purple
    g.fillStyle='#9900ff';g.fillRect(x-s*.1,y-s*.28+bob,s*.07,s*.07);g.fillRect(x+s*.03,y-s*.28+bob,s*.07,s*.07);
    g.save();g.shadowColor='#aa00ff';g.shadowBlur=8;g.fillStyle='#dd44ff';g.fillRect(x-s*.09,y-s*.27+bob,s*.03,s*.03);g.fillRect(x+s*.04,y-s*.27+bob,s*.03,s*.03);g.restore();
    // Mouth â€” thin, stern
    g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=1;g.beginPath();g.moveTo(x-s*.06,y-s*.14+bob);g.lineTo(x+s*.06,y-s*.14+bob);g.stroke();
    // Hood (tall dark cowl)
    g.fillStyle='#050510';
    g.beginPath();g.moveTo(x-s*.22,y-s*.38+bob);g.quadraticCurveTo(x-s*.24,y-s*.9+bob,x,y-s*.96+bob);g.quadraticCurveTo(x+s*.24,y-s*.9+bob,x+s*.22,y-s*.38+bob);g.fill();
    g.fillStyle='rgba(136,0,255,.1)';g.beginPath();g.moveTo(x-s*.04,y-s*.38+bob);g.quadraticCurveTo(x-s*.04,y-s*.85+bob,x,y-s*.92+bob);g.quadraticCurveTo(x+s*.04,y-s*.85+bob,x+s*.04,y-s*.38+bob);g.fill();
    // Purple aura glow
    g.save();g.globalAlpha=.18;g.fillStyle='#8800ff';g.beginPath();g.arc(x,y+bob,s*.62,0,Math.PI*2);g.fill();g.restore();

  } else if(role==='librarian'){
    // â”€â”€ LÄ°BRARÄ°AN: Feminine figure, long hair, skirt, glasses â”€â”€
    // Legs (slimmer, skirt covers upper)
    g.fillStyle='#243060';
    [-1,1].forEach(side=>{g.save();g.translate(x+side*s*.08,y+s*.56+bob);g.rotate(-side*legA*Math.PI/180);g.fillRect(-s*.065,0,s*.13,s*.37);g.restore();});
    // Shoes (small heels)
    [-1,1].forEach(side=>{g.save();g.translate(x+side*s*.08,y+s*.93+bob);g.rotate(-side*legA*Math.PI/180);g.fillStyle='#1a0808';g.fillRect(-s*.08,-s*.02,s*.18,s*.08);g.fillStyle='#2a0a0a';g.fillRect(x+side*s*.08-s*.01,y+s*.93+bob-s*.06,s*.04,s*.06);g.restore();});
    // Skirt (A-line, wider at bottom)
    const skirtG=g.createLinearGradient(x,y+s*.36+bob,x,y+s*.6+bob);
    skirtG.addColorStop(0,'#1a3a90');skirtG.addColorStop(1,'#243080');
    g.fillStyle=skirtG;
    g.beginPath();g.moveTo(x-s*.2,y+s*.36+bob);g.lineTo(x+s*.2,y+s*.36+bob);g.lineTo(x+s*.28,y+s*.6+bob);g.lineTo(x-s*.28,y+s*.6+bob);g.closePath();g.fill();
    // Body / blouse
    g.fillStyle='#e8e8f8';g.fillRect(x-s*.19,y-s*.06+bob,s*.38,s*.44);
    g.fillStyle='rgba(100,100,255,.1)';g.fillRect(x-s*.15,y-s*.03+bob,s*.3,s*.2);
    // Collar detail
    g.fillStyle='#c0c0e0';g.fillRect(x-s*.08,y-s*.06+bob,s*.16,s*.08);
    // Arms (slimmer, feminine)
    g.fillStyle='#e8e8f8';
    [-1,1].forEach(side=>{g.save();g.translate(x+side*s*.24,y+s*.04+bob);g.rotate(-side*armA*Math.PI/180);g.fillRect(-s*.065,0,s*.13,s*.26);g.restore();});
    // Hands
    g.fillStyle='#f0c880';
    [-1,1].forEach(side=>{g.save();g.translate(x+side*s*.24,y+s*.04+bob);g.rotate(-side*armA*Math.PI/180);g.fillRect(-s*.055,s*.25,s*.11,s*.1);g.restore();});
    // Head (slightly rounder/smaller for feminine)
    g.fillStyle='#f0c880';g.beginPath();g.roundRect(x-s*.15,y-s*.38+bob,s*.3,s*.3,s*.06);g.fill();
    // Eyes (larger, with lashes)
    g.fillStyle='#2a2a2a';g.fillRect(x-s*.09,y-s*.28+bob,s*.065,s*.07);g.fillRect(x+s*.025,y-s*.28+bob,s*.065,s*.07);
    g.fillStyle='#4a8aff';g.fillRect(x-s*.08,y-s*.275+bob,s*.045,s*.045);g.fillRect(x+s*.035,y-s*.275+bob,s*.045,s*.045);
    g.fillStyle='#fff';g.fillRect(x-s*.075,y-s*.268+bob,s*.018,s*.018);g.fillRect(x+s*.04,y-s*.268+bob,s*.018,s*.018);
    // Eyelashes (top)
    g.strokeStyle='#1a1a1a';g.lineWidth=1.2;
    [-s*.09,-s*.07,-s*.05,s*.025,s*.045,s*.065].forEach((ex,i)=>{g.beginPath();g.moveTo(x+ex,y-s*.28+bob);g.lineTo(x+ex-s*.005,y-s*.305+bob);g.stroke();});
    // Mouth (lips, smaller)
    g.fillStyle='#e05070';g.fillRect(x-s*.05,y-s*.16+bob,s*.1,s*.04);
    g.fillStyle='#c03050';g.fillRect(x-s*.04,y-s*.155+bob,s*.08,s*.025);
    // Glasses
    g.strokeStyle='#5a5a5a';g.lineWidth=1.8;
    g.strokeRect(x-s*.14,y-s*.295+bob,s*.1,s*.078);g.strokeRect(x+s*.04,y-s*.295+bob,s*.1,s*.078);
    g.beginPath();g.moveTo(x-s*.04,y-s*.258+bob);g.lineTo(x+s*.04,y-s*.258+bob);g.stroke();
    g.beginPath();g.moveTo(x+s*.14,y-s*.275+bob);g.lineTo(x+s*.17,y-s*.27+bob);g.stroke();
    g.beginPath();g.moveTo(x-s*.14,y-s*.275+bob);g.lineTo(x-s*.17,y-s*.27+bob);g.stroke();
    // â”€â”€ LONG HAIR (key feminine feature) â”€â”€
    // Hair base / top
    g.fillStyle='#3a2000';g.beginPath();g.ellipse(x,y-s*.32+bob,s*.18,s*.14,0,0,Math.PI*2);g.fill();
    // Hair sides flowing down to shoulders/waist
    g.fillStyle='#3a2000';
    // Left side hair
    g.beginPath();g.moveTo(x-s*.12,y-s*.38+bob);g.quadraticCurveTo(x-s*.3,y-s*.2+bob,x-s*.28,y+s*.22+bob);g.quadraticCurveTo(x-s*.26,y+s*.28+bob,x-s*.22,y+s*.22+bob);g.quadraticCurveTo(x-s*.26,y-s*.1+bob,x-s*.18,y-s*.35+bob);g.closePath();g.fill();
    // Right side hair
    g.beginPath();g.moveTo(x+s*.12,y-s*.38+bob);g.quadraticCurveTo(x+s*.3,y-s*.2+bob,x+s*.28,y+s*.22+bob);g.quadraticCurveTo(x+s*.26,y+s*.28+bob,x+s*.22,y+s*.22+bob);g.quadraticCurveTo(x+s*.26,y-s*.1+bob,x+s*.18,y-s*.35+bob);g.closePath();g.fill();
    // Hair highlight
    g.fillStyle='#5a3010';g.beginPath();g.ellipse(x-s*.03,y-s*.38+bob,s*.06,s*.04,-.3,0,Math.PI*2);g.fill();
    // Small hat/bun on top
    g.fillStyle='#2a1400';g.beginPath();g.arc(x,y-s*.44+bob,s*.1,0,Math.PI*2);g.fill();
    g.fillStyle='#4a2a00';g.fillRect(x-s*.14,y-s*.48+bob,s*.28,s*.04);

  } else {
    // â”€â”€ DEFAULT CHARS (baker, gym, player) â”€â”€
    const lc={player:'#081626',baker:'#4a2200',gym:'#082414'}[role]||'#101020';
    g.fillStyle=lc;
    [-1,1].forEach(side=>{g.save();g.translate(x+side*s*.1,y+s*.44+bob);g.rotate(-side*legA*Math.PI/180);g.fillRect(-s*.08,0,s*.16,s*.39);g.restore();});
    [-1,1].forEach(side=>{g.save();g.translate(x+side*s*.1,y+s*.83+bob);g.rotate(-side*legA*Math.PI/180);g.fillStyle='#080606';g.fillRect(-s*.1,-s*.04,s*.22,s*.1);g.restore();});
    const bc={player:'#081626',baker:'#eeeeff',gym:'#186230'}[role]||'#101020';
    g.fillStyle=bc;g.fillRect(x-s*.22,y-s*.06+bob,s*.44,s*.5);
    g.fillStyle='rgba(255,255,255,.06)';g.fillRect(x-s*.18,y-s*.03+bob,s*.36,s*.18);
    g.fillStyle=bc;
    [-1,1].forEach(side=>{g.save();g.translate(x+side*s*.28,y+s*.04+bob);g.rotate(-side*armA*Math.PI/180);g.fillRect(-s*.08,0,s*.16,s*.3);g.restore();});
    const sk={player:'#deb890',baker:'#f5c090',gym:'#d0a870'}[role]||'#e0b888';
    g.fillStyle=sk;g.fillRect(x-s*.18,y-s*.38+bob,s*.36,s*.32);
    g.fillStyle='#1a1a1a';g.fillRect(x-s*.1,y-s*.28+bob,s*.06,s*.066);g.fillRect(x+s*.04,y-s*.28+bob,s*.06,s*.066);
    g.fillStyle='#fff';g.fillRect(x-s*.09,y-s*.27+bob,s*.024,s*.024);g.fillRect(x+s*.05,y-s*.27+bob,s*.024,s*.024);
    g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.2;g.beginPath();g.arc(x,y-s*.16+bob,s*.055,.2,Math.PI-.2);g.stroke();
    if(role==='baker'){
      g.fillStyle='#fff';g.fillRect(x-s*.18,y-s*.55+bob,s*.36,s*.05);
      g.fillStyle='#fff';g.beginPath();g.arc(x,y-s*.61+bob,s*.16,Math.PI,0);g.fill();g.beginPath();g.arc(x,y-s*.61+bob,s*.16,0,Math.PI);g.fill();
      g.fillStyle='rgba(220,220,220,.3)';g.fillRect(x-s*.06,y-s*.73+bob,s*.04,s*.19);
    } else if(role==='gym'){
      g.fillStyle='#0e3c18';g.fillRect(x-s*.2,y-s*.53+bob,s*.4,s*.05);
      g.fillStyle='#0e3c18';g.fillRect(x-s*.15,y-s*.8+bob,s*.3,s*.28);
      g.fillStyle='rgba(255,255,255,.06)';g.fillRect(x-s*.08,y-s*.76+bob,s*.06,s*.2);
    } else { // player
      g.fillStyle='#051c2c';g.fillRect(x-s*.21,y-s*.49+bob,s*.42,s*.06);
      g.fillStyle='#051c2c';g.fillRect(x-s*.16,y-s*.77+bob,s*.32,s*.29);
      g.fillStyle='#083a54';g.fillRect(x+s*.07,y-s*.5+bob,s*.14,s*.05);
      g.strokeStyle='#00f5ff';g.lineWidth=1.5;g.beginPath();g.arc(x,y-s*.53+bob,s*.22,Math.PI,0);g.stroke();
      g.fillStyle='#00f5ff';g.fillRect(x-s*.225,y-s*.535+bob,s*.05,s*.08);g.fillRect(x+s*.175,y-s*.535+bob,s*.05,s*.08);
    }
  }
  g.restore();
}

// â”€â”€ ANIM STATE â”€â”€
const animSt = {
  bg:-1, npc:'baker', frame:0, phase:'idle',
  npcX:0, npcTX:0, npcY:0, playerX:0, playerY:0,
  lines:[], lineIdx:0, idleTimer:0,
  typed:'', full:'', typeTimer:0,
  rafId:null, cb:null
};

function startScene(bgIdx, npcKey, lines, cb) {
  cancelAnimationFrame(animSt.rafId);
  animSt.bg=bgIdx; animSt.npc=npcKey;
  animSt.frame=0; animSt.phase='walk_in';
  animSt.npcX=-80; animSt.npcTX=CW*.6; animSt.npcY=CH*.58;
  animSt.playerX=CW*.32; animSt.playerY=CH*.58;
  animSt.lines=lines; animSt.lineIdx=0; animSt.idleTimer=0;
  animSt.typed=''; animSt.full=''; animSt.typeTimer=0;
  animSt.cb=cb;
  hideSpeech();
  document.getElementById('skip-btn').style.display='block';
  animLoop();
}

function animLoop() {
  animSt.frame++;
  const st=animSt, walk=st.phase==='walk_in'||st.phase==='walk_out';
  drawBg(st.bg);

  // â”€â”€ DYNAMIC LIGHTING OVERLAY for dark scenes (bg 1 & 2) â”€â”€
  if(st.bg===1 || st.bg===2){
    drawLightingOverlay(cx, CW, CH, st.bg, st.frame, st.npcX, st.npcY, st.playerX, st.playerY);
  }

  drawChar(cx, st.playerX, st.playerY, Math.round(CH*.22), 'player', true, st.frame, false);

  if(st.phase==='walk_in'){
    st.npcX=Math.min(st.npcX+3.6, st.npcTX);
    drawChar(cx, st.npcX, st.npcY, Math.round(CH*.22), st.npc, false, st.frame, true);
    if(st.npcX>=st.npcTX){st.phase='talk';beginLine();}
  } else if(st.phase==='talk'){
    drawChar(cx, st.npcX, st.npcY, Math.round(CH*.22), st.npc, false, st.frame, false);
    st.typeTimer++;
    if(st.typeTimer%2===0 && st.typed.length<st.full.length){
      st.typed=st.full.slice(0,st.typed.length+1);
      document.getElementById('speech-txt').textContent=st.typed;
    }
    if(st.typed.length>=st.full.length){
      // Wait for user to press SPACE (handled in keydown listener)
    }
  } else if(st.phase==='walk_out'){
    st.npcX-=3.4;
    drawChar(cx, st.npcX, st.npcY, Math.round(CH*.22), st.npc, true, st.frame, true);
    if(st.npcX<-100){
      document.getElementById('skip-btn').style.display='none';
      if(st.cb) st.cb();
      return;
    }
  }
  animSt.rafId=requestAnimationFrame(animLoop);
}

// â”€â”€ LIGHTING OVERLAY â€” Broken Age / Disco Elysium style â”€â”€
// Technique: radial "point lights" punched through a dark vignette overlay
// Sources: candles on desk, monitor glow, NPC position (for mimar's purple aura)
function drawLightingOverlay(g, W, H, bgIdx, frame, npcX, npcY, playerX, playerY){
  // 1. Dark semi-transparent vignette over entire canvas
  // Not pitch-black â€” a "slate night" ambient (about 55-65% opacity at edges)
  const vigG=g.createRadialGradient(W*.45,H*.5,H*.12,W*.45,H*.5,H*.75);
  if(bgIdx===1){
    // Mimar night â€” deep blue-purple vignette, warm center
    vigG.addColorStop(0,'rgba(4,2,12,.0)');     // center â€” open/visible
    vigG.addColorStop(.35,'rgba(4,2,12,.18)');
    vigG.addColorStop(.65,'rgba(4,2,12,.42)');
    vigG.addColorStop(1,'rgba(4,2,12,.72)');
  } else {
    // High-tech night â€” deep navy vignette
    vigG.addColorStop(0,'rgba(2,2,14,.0)');
    vigG.addColorStop(.35,'rgba(2,2,14,.15)');
    vigG.addColorStop(.65,'rgba(2,2,14,.38)');
    vigG.addColorStop(1,'rgba(2,2,14,.68)');
  }
  g.fillStyle=vigG; g.fillRect(0,0,W,H);

  // 2. Candle light spots on desk (warm orange radial, flickering)
  const flicker = 0.85 + Math.sin(frame*.11)*0.08 + Math.sin(frame*.27)*0.07;
  if(bgIdx===1){
    [W*.265, W*.635].forEach(cx2=>{
      const cg=g.createRadialGradient(cx2,H*.53,0,cx2,H*.53,W*.22*flicker);
      cg.addColorStop(0,`rgba(255,160,60,${.28*flicker})`);
      cg.addColorStop(.4,`rgba(255,100,20,${.12*flicker})`);
      cg.addColorStop(1,'rgba(255,80,0,0)');
      g.fillStyle=cg; g.fillRect(0,0,W,H);
    });
  }

  // 3. Monitor glow â€” cool blue/colored light on characters
  if(bgIdx===1){
    // dual monitors â€” purple/blue glow
    [W*.33,W*.48].forEach(mx=>{
      const mg=g.createRadialGradient(mx,H*.4,0,mx,H*.4,W*.18);
      mg.addColorStop(0,`rgba(100,20,200,.22)`);
      mg.addColorStop(.5,`rgba(60,0,140,.08)`);
      mg.addColorStop(1,'rgba(60,0,140,0)');
      g.fillStyle=mg; g.fillRect(0,0,W,H);
    });
  } else {
    // triple monitors â€” multi-color neon glow
    [[W*.195,'#00f5ff'],[W*.335,'#ff00aa'],[W*.475,'#aaff00']].forEach(([mx,c])=>{
      const r=parseInt(c.slice(1,3),16),gr=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);
      const mg=g.createRadialGradient(mx,H*.38,0,mx,H*.38,W*.15);
      mg.addColorStop(0,`rgba(${r},${gr},${b},.18)`);
      mg.addColorStop(.5,`rgba(${r},${gr},${b},.06)`);
      mg.addColorStop(1,`rgba(${r},${gr},${b},0)`);
      g.fillStyle=mg; g.fillRect(0,0,W,H);
    });
  }

  // 4. NPC presence light â€” mimar has a purple aura that illuminates nearby area
  if(bgIdx===1 && npcX > 0){
    const ng=g.createRadialGradient(npcX,npcY-H*.1,0,npcX,npcY-H*.1,H*.28);
    ng.addColorStop(0,`rgba(120,0,200,.15)`);
    ng.addColorStop(.4,`rgba(80,0,140,.07)`);
    ng.addColorStop(1,'rgba(80,0,140,0)');
    g.fillStyle=ng; g.fillRect(0,0,W,H);
  }

  // 5. Player desk lamp â€” small warm light where player stands
  const pg=g.createRadialGradient(playerX,playerY-H*.1,0,playerX,playerY-H*.1,H*.22);
  pg.addColorStop(0,`rgba(200,220,255,.12)`);
  pg.addColorStop(.5,`rgba(180,200,255,.04)`);
  pg.addColorStop(1,'rgba(180,200,255,0)');
  g.fillStyle=pg; g.fillRect(0,0,W,H);

  // 6. Neon sign glow pools on wall/floor
  if(bgIdx===1){
    const ng2=g.createRadialGradient(W*.91,H*.18,0,W*.91,H*.18,W*.14);
    ng2.addColorStop(0,'rgba(136,0,204,.22)');ng2.addColorStop(1,'rgba(136,0,204,0)');
    g.fillStyle=ng2; g.fillRect(0,0,W,H);
  } else {
    const ng2=g.createRadialGradient(W*.91,H*.17,0,W*.91,H*.17,W*.14);
    ng2.addColorStop(0,'rgba(170,255,0,.14)');ng2.addColorStop(1,'rgba(170,255,0,0)');
    g.fillStyle=ng2; g.fillRect(0,0,W,H);
  }
}

function beginLine(){
  const ln=animSt.lines[animSt.lineIdx];
  animSt.full=ln.text; animSt.typed=''; animSt.typeTimer=0; animSt.idleTimer=0;
  
  // Set speaker name in transmission box
  document.getElementById('spk-name').textContent= ln.speaker || 'UNKNOWN';
  document.getElementById('speech-txt').innerHTML='';
  
  const wrap=document.getElementById('speech-wrap');
  wrap.classList.add('show');

  // Position bubble above the NPC character on canvas
  // Canvas is inside game-container, so we use NPC's canvas coordinates
  const canvas = document.getElementById('scene-canvas');
  const canvasRect = canvas.getBoundingClientRect();
  const containerRect = canvas.parentElement.getBoundingClientRect();
  
  // Scale NPC position from canvas coords to screen coords
  const scaleX = canvasRect.width / CV.width;
  const scaleY = canvasRect.height / CV.height;
  
  const npcScreenX = (animSt.npcX * scaleX) + (canvasRect.left - containerRect.left);
  const npcScreenY = (animSt.npcY * scaleY) + (canvasRect.top - containerRect.top);
  
  // Place bubble above the NPC's head
  const charHeight = Math.round(CH * 0.22);
  const bubbleX = npcScreenX - 40;
  const bubbleY = npcScreenY - (charHeight * scaleY) - 20;
  
  wrap.style.left = Math.max(10, bubbleX) + 'px';
  wrap.style.bottom = 'auto';
  wrap.style.top = Math.max(10, bubbleY) + 'px';
  wrap.style.transform = 'translateY(-100%)';
}

function hideSpeech(){
  document.getElementById('speech-wrap').classList.remove('show');
}
function skipScene(){
  cancelAnimationFrame(animSt.rafId);
  hideSpeech();
  document.getElementById('skip-btn').style.display='none';
  if(animSt.cb) animSt.cb();
}

// Shop walk animation
const shopCV = document.getElementById('shop-walk-canvas');
const shopCx = shopCV.getContext('2d');
let shopAnimId=null, shopFrame=0, shopCharX=-100;

function startShopWalk(cb){
  if(shopAnimId) cancelAnimationFrame(shopAnimId);
  shopFrame=0; shopCharX=-100;
  shopCV.width=window.innerWidth; shopCV.height=window.innerHeight;
  shopCV.style.position='absolute'; shopCV.style.inset='0';
  function loop(){
    shopCx.clearRect(0,0,shopCV.width,shopCV.height);
    shopCharX+=4;
    shopFrame++;
    drawChar(shopCx, shopCharX, shopCV.height*.82, Math.round(shopCV.height*.2), 'player', false, shopFrame, true);
    if(shopCharX>shopCV.width*.45){
      shopCx.clearRect(0,0,shopCV.width,shopCV.height);
      if(cb) cb();
      return;
    }
    shopAnimId=requestAnimationFrame(loop);
  }
  loop();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  GAME DATA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const SHOP_ITEMS = [
  // CHAPTER 1 items
  { id:'headphones', name:'Gamer Headset', icon:'ğŸ§', price:400, desc:'Assistance for multiple-choice questions.', tier:1, tierLabel:'C1',
    advantage: { title:'IN-GAME ADVANTAGE', body:'A "concentration hint" appears on screen during multiple choice (MC) questions â€” providing analytical data on the category of the right answer.', tag:'MC Hint', tagType:'neon' }},
  { id:'mousepad',   name:'RGB Mousepad',   icon:'ğŸ–±ï¸', price:600, desc:'Assistance for drag-and-drop questions.', tier:1, tierLabel:'C1',
    advantage: { title:'IN-GAME ADVANTAGE', body:'An "ergonomic hint" appears during drag-and-drop (DD) questions â€” guiding you in Actor and Use Case classification.', tag:'DD Hint', tagType:'neon' }},
  { id:'keyboard',   name:'Mechanical Keyboard', icon:'âŒ¨ï¸', price:900, desc:'Assistance for User Story questions.', tier:1, tierLabel:'C1',
    advantage: { title:'IN-GAME ADVANTAGE', body:'A "keyboard hint" appears in User Story Builder questions â€” showing the exact order the blanks should be filled.', tag:'USB Hint', tagType:'neon' }},
  { id:'webcam',     name:'4K Webcam',      icon:'ğŸ“·', price:700, desc:'Client gesture analysis â€” for Chapter 1.', tier:1, tierLabel:'C1',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Provides AI gesture analysis during Baker Ahmet and Ms. Selin questions â€” telling you what the client actually means.', tag:'Client Hint', tagType:'neon' }},
  // CHAPTER 2 items
  { id:'monitor2',   name:'Dual Monitors',   icon:'ğŸ–¥ï¸', price:2200, desc:'Reference screen for all question types.', tier:2, tierLabel:'C2',
    advantage: { title:'IN-GAME ADVANTAGE', body:'A reference document opens on the secondary screen. Instantly shows the difference between <<include>> and <<extend>>, and Actor/Use Case definitions.', tag:'Gen Hint', tagType:'pink' }},
  { id:'chair',      name:'Ergonomic Chair', icon:'ğŸª‘', price:1800, desc:'Reduces penalty for wrong answers.', tier:2, tierLabel:'C2',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Credit penalty for wrong answers drops from 20% to 15%. Active all chapter long.', tag:'Penalty -5%', tagType:'gold' }},
  { id:'speaker',    name:'5.1 Sound System', icon:'ğŸ”Š', price:2500, desc:'Voice analysis for Architect questions.', tier:2, tierLabel:'C2',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Captures keywords like "sometimes" or "always" via voice analysis during Architect dialogues and highlights them.', tag:'Arch Hint', tagType:'pink' }},
  { id:'light',      name:'LED Panel Light',  icon:'ğŸ’¡', price:1500, desc:'Visual support for User Story questions.', tier:2, tierLabel:'C2',
    advantage: { title:'IN-GAME ADVANTAGE', body:'An illumination hint appears on User Story Builder questions â€” clearly showing the [Actor]â†’[Action]â†’[Benefit] sequence.', tag:'USB Hint', tagType:'gold' }},
  // CHAPTER 3 items
  { id:'monitor3',   name:'Triple Monitor Setup', icon:'ğŸ“º', price:6000, desc:'3 screens â€” ultimate support across all questions.', tier:3, tierLabel:'C3',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Left: theory, Center: question, Right: draft solution. Powerful hint for all question types.', tag:'Power Hint', tagType:'gold' }},
  { id:'server',     name:'Personal Server',  icon:'ğŸ–§',  price:8000, desc:'Full database scan for DD questions.', tier:3, tierLabel:'C3',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Scans the Actor/Use Case database during drag and drop questions: constantly reminds the rule "Actors OUTSIDE, Use Cases INSIDE".', tag:'DD Power', tagType:'neon' }},
  { id:'desk',       name:'Smart Standing Desk', icon:'ğŸ—ƒï¸', price:5000, desc:'Reduces penalty for wrong answers.', tier:3, tierLabel:'C3',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Same bonus as the Ergonomic Chair â€” penalty drops from 20% to 15%. Does not stack with the chair.', tag:'Penalty -5%', tagType:'gold' }},
  { id:'vr',         name:'VR Headset',      icon:'ğŸ¥½', price:7000, desc:'Global powerful context hint.', tier:3, tierLabel:'C3',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Models the Use Case diagram in 3D. Active across all question types â€” vividly shows Actors outside the oval and Use Cases inside.', tag:'3D Hint', tagType:'gold' }},
  { id:'neural_implant', name:'Neural Link Implant', icon:'🧠', price:18000, desc:'Direct brain-to-system interface.', tier:4, tierLabel:'C4',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Highlights logic flaws in user stories natively in your mind.', tag:'Neural Hint', tagType:'pink' }},
  { id:'quantum_server', name:'Quantum Server', icon:'⚛️', price:25000, desc:'Massive parallel processing capabilities.', tier:4, tierLabel:'C4',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Processes all permutations in drag-and-drop instantly.', tag:'Q-Compute', tagType:'neon' }},
  { id:'ai_assistant', name:'Shadow AI Companion', icon:'🤖', price:45000, desc:'A sentient assistant for core analysis.', tier:5, tierLabel:'C5',
    advantage: { title:'IN-GAME ADVANTAGE', body:'The AI suggests the 100% correct answer automatically.', tag:'AI Auto', tagType:'gold' }},
  { id:'cyber_deck', name:'Militech Cyberdeck', icon:'💻', price:60000, desc:'The ultimate hacking and analysis tool.', tier:5, tierLabel:'C5',
    advantage: { title:'IN-GAME ADVANTAGE', body:'Bypasses all standard security checks. Zero penalty for mistakes.', tag:'Zero Penalty', tagType:'gold' }},
];

// Which tiers are available per chapter (1-indexed)
const SHOP_TIER_PER_CHAPTER = { 0:1, 1:2, 2:3, 3:4, 4:5 }; // chapter index â†’ tier

const CHAPTERS = [
  { num:'CHAPTER 1', title:'Humble Beginnings', sub:'Fresh out of college. Small office. Start with local clients, develop basic analysis skills.' },
  { num:'CHAPTER 2', title:'The Mysterious Client', sub:'A knock on the door at midnight. A man in a black suit enters. He calls himself the "Architect".' },
  { num:'CHAPTER 3', title:'The Big Contract', sub:'The most complex systems of the secret society. Modeling this right will change everything.' },
  { num:'CHAPTER 4', title:'The Syndicate Module', sub:'Deeper into the system. Uncovering hidden interfaces and dealing with massive data flows.' },
  { num:'CHAPTER 5', title:'Core Breach', sub:'The ultimate system analysis. Identifying the master control actors and their covert use cases.' },
];

// Per-chapter base reward (full score, no mistakes)
const CHAPTER_BASE_REWARD = [1800, 7000, 22000, 45000, 90000];
// Penalty per wrong answer
const WRONG_PENALTY_PCT = 0.20; // 20% dÃ¼ÅŸÃ¼ÅŸ her hatalÄ±da

const MISSIONS = [
  // â”€â”€ CHAPTER 1 â”€â”€
  { ch:0, bg:0, npc:'baker',
    lines:[{speaker:'BAKER AHMET',color:'#ff8c00',text:'Hey kid! Heard you build systems.'},{speaker:'BAKER AHMET',color:'#ff8c00',text:"I track bakery stock manually, it's getting difficult."},{speaker:'BAKER AHMET',color:'#ff8c00',text:'Can you do a system analysis for me?'}],
    concept:{title:'ğŸ¯ WHAT IS AN ACTOR & USE CASE?',body:'Actor: The person/role using the system\n("Who uses it?")\n\nUse Case: The action performed by the actor\n("What do they do?")'},
    q:"Correctly classify ACTORS and USE CASES for Baker Ahmet's stock tracking system:",
    hint:"Actor = 'Who uses it?', Use Case = 'What do they do?'",
    type:'dd',
    items:[{id:'a1',l:'Baker',t:'actor'},{id:'a2',l:'Warehouse Clerk',t:'actor'},{id:'u1',l:'View Stock',t:'usecase'},{id:'u2',l:'Update Stock',t:'usecase'},{id:'u3',l:'Generate Report',t:'usecase'},{id:'u4',l:'Add New Product',t:'usecase'}],
    ca:['a1','a2'],cu:['u1','u2','u3','u4'],
  },
  { ch:0, bg:0, npc:'librarian',
    lines:[{speaker:'MS. SELIN',color:'#4a90d9',text:'Hello... you do software systems, right?'},{speaker:'MS. SELIN',color:'#4a90d9',text:"Our library members borrow books but we use pen and paper, it's very painful."},{speaker:'MS. SELIN',color:'#4a90d9',text:"I don't know, maybe we can move to a computer? How do you write that down?"}],
    concept:{title:'ğŸ“ USER STORY FORMAT',body:'"As a(n) [Actor],\nI want to [Action],\nso that [Benefit]."'},
    q:"Ms. Selin wants her members to borrow books online. Which one expresses this request in the correct User Story format?",
    hint:'Three parts: Who (member), What to do (borrow online), Why (without visiting library).',
    type:'mc',
    choices:[
      {id:'c1',text:'"The system should track books and send notifications."',ok:false},
      {id:'c2',text:'"As a Library Member, I want to borrow books online, so that I can access books without visiting the library."',ok:true},
      {id:'c3',text:'"Borrowing books in the library will be transferred to computer."',ok:false},
      {id:'c4',text:'"As a Librarian, I want to see the book database."',ok:false},
    ],
  },
  { ch:0, bg:0, npc:'gym',
    lines:[{speaker:'MR. MEHMET',color:'#27ae60',text:'Analyst friend! My gym needs a system.'},{speaker:'MR. MEHMET',color:'#27ae60',text:'Members will register, trainers will make schedules.'},{speaker:'MR. MEHMET',color:'#27ae60',text:'Every time "Register" runs, email verification is a must!'}],
    concept:{title:'ğŸ”— <<include>> RELATIONSHIP',body:'If a use case always triggers\nanother one when it runs\nâ†’ use <<include>>'},
    q:'If "Email Verification" must run every time "Member Registration" runs, what is the relationship type?',
    hint:'Mandatory/always â†’ <<include>>. Sometimes/optional â†’ <<extend>>.',
    type:'mc',
    choices:[
      {id:'c1',text:'<<extend>> â€” Optional extension',ok:false},
      {id:'c2',text:'<<include>> â€” Mandatory dependency',ok:true},
      {id:'c3',text:'Inheritance (Generalization)',ok:false},
      {id:'c4',text:'Simple Association relationship',ok:false},
    ],
  },
  // â”€â”€ CHAPTER 2 â”€â”€
  { ch:1, bg:1, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'...Our shadow members must leave no trace when entering the system.'},{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'Our leaders must see everything. Everything.'},{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'Write the User Story. If you fail... there will be consequences.'}],
    concept:{title:'ğŸ”’ ADVANCED USER STORY',body:'"As a(n) [Role],\nI want to [Action],\nso that [Reason/Benefit]."\n\nEach part must be CLEAR!'},
    q:"Complete the correct User Story for the 'Shadow Member' based on the Architect's request:",
    hint:'"Shadow Member" acts, anonymous login is the action, identity concealment is the benefit.',
    type:'sb',
    template:['As a(n) ','BLANK_ACTOR',', I want to ','BLANK_ACTION',', so that ','BLANK_BENEFIT','.'],
    blanks:{
      BLANK_ACTOR:{opts:['Shadow Member','System Admin','Leader','Guest'],ok:'Shadow Member'},
      BLANK_ACTION:{opts:['login anonymously to the system','view all members','change my password','get a report'],ok:'login anonymously to the system'},
      BLANK_BENEFIT:{opts:['my identity remains hidden','I can work faster','I earn money','I manage the system'],ok:'my identity remains hidden'},
    },
  },
  { ch:1, bg:1, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'Our members send messages.'},{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'Sometimes â€” only sometimes â€” they want encryption.'},{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'How do you model this optional relationship?'}],
    concept:{title:'ğŸ”€ <<extend>> RELATIONSHIP',body:'Optional scenario:\nConditionally added to\nthe main use case.\n\n"Encrypt Message" only\nactivates sometimes.'},
    q:'What is the correct Use Case relationship for "Encrypt Message" which is sometimes added to "Send Message"?',
    hint:'"Sometimes", "optional" â†’ <<extend>>.',
    type:'mc',
    choices:[
      {id:'c1',text:'"Send Message" <<include>> "Encrypt Message"',ok:false},
      {id:'c2',text:'"Encrypt Message" <<extend>> "Send Message"',ok:true},
      {id:'c3',text:'The two Use Cases are independent, no relation',ok:false},
      {id:'c4',text:'A new Actor named "Encryptor" must be added',ok:false},
    ],
  },
  { ch:1, bg:1, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'There are three actors: Shadow Member, Leader, Admin.'},{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'Login is common for everyone. Reports are only for the Leader.'},{speaker:'ARCHITECT',color:'#cc00ff',dark:true,text:'Classify them correctly, analyst.'}],
    concept:{title:'ğŸ‘¥ MULTIPLE ACTORS',body:'Multiple actors can typically\nuse the same use case.\n\nBut special use cases\nbelong strictly to a specific actor.'},
    q:'Correctly classify the actors and use cases to be included into the system:',
    hint:'Login â†’ Everyone. View Reports â†’ Only Leader.',
    type:'dd',
    items:[{id:'a1',l:'Shadow Member',t:'actor'},{id:'a2',l:'Leader',t:'actor'},{id:'a3',l:'System Admin',t:'actor'},{id:'u1',l:'Login',t:'usecase'},{id:'u2',l:'Send Anonymous Message',t:'usecase'},{id:'u3',l:'View Member Reports',t:'usecase'},{id:'u4',l:'System Audit',t:'usecase'}],
    ca:['a1','a2','a3'],cu:['u1','u2','u3','u4'],
  },
  // â”€â”€ CHAPTER 3 â”€â”€
  { ch:2, bg:2, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'Time for the big contract, analyst.'},{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'We are going to rebuild the entire membership system.'},{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'You need to model the Use Case relationships.'}],
    concept:{title:'ğŸ† COMPREHENSIVE MODELING',body:"1. Identify all actors\n2. List each actor's use cases\n3. Add <<include>> and <<extend>>\n4. Draw the system boundary"},
    q:'"Member Login" requires "Session Log" every time; "2FA" activates only if enabled. The two relationships respectively?',
    hint:'Mandatory â†’ <<include>>, Conditional â†’ <<extend>>.',
    type:'mc',
    choices:[
      {id:'c1',text:'"Session Log"=<<extend>>, "2FA"=<<include>>',ok:false},
      {id:'c2',text:'Both are <<include>>',ok:false},
      {id:'c3',text:'"Session Log"=<<include>>, "2FA"=<<extend>>',ok:true},
      {id:'c4',text:'Both are <<extend>>',ok:false},
    ],
  },
  { ch:2, bg:2, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'Last question, analyst. The last one.'},{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'If you want to earn the "Shadow Analyst" title...'},{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'Find the invalid User Story.'}],
    concept:{title:'ğŸ“ USER STORY SUMMARY',body:'Valid User Story:\n1. Actor MUST be CLEAR\n2. Action must be specific\n3. Benefit must be measurable'},
    q:"Which of the following is an INVALID User Story?",
    hint:"In a valid User Story, who, what, and why must be perfectly clear.",
    type:'mc',
    choices:[
      {id:'c1',text:'"As an Admin, I want to delete user accounts, so that I can keep the system clean."',ok:false},
      {id:'c2',text:'"The system should manage users and keep them updated."',ok:true},
      {id:'c3',text:'"As a Customer, I want to see my order history, so that I can track my purchases."',ok:false},
      {id:'c4',text:'"As an Analyst, I want to model requirements, so that the team gains clarity."',ok:false},
    ],
  },
  { ch:2, bg:2, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'One last test, analyst.'},{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'Can you comprehensively identify actors and use cases?'},{speaker:'ARCHITECT',color:'#ffd700',dark:true,text:'Failure is not an option this time.'}],
    concept:{title:'ğŸ”® COMPREHENSIVE USE CASE DIAGRAM',body:'All use cases inside\nthe system boundary and\nactors outside\nform the diagram.'},
    q:"Correctly classify all actors and use cases of the Secret Society Communication System:",
    hint:'Actors are roles using the system, use cases are the actions within.',
    type:'dd',
    items:[{id:'a1',l:'Shadow Member',t:'actor'},{id:'a2',l:'Leader',t:'actor'},{id:'a3',l:'System Admin',t:'actor'},{id:'u1',l:'Anonymous Login',t:'usecase'},{id:'u2',l:'Send Encrypted Message',t:'usecase'},{id:'u3',l:'Manage Users',t:'usecase'},{id:'u4',l:'System Audit',t:'usecase'},{id:'u5',l:'View Member Report',t:'usecase'}],
    ca:['a1','a2','a3'],cu:['u1','u2','u3','u4','u5'],
  },
  // CHAPTER 4
  { ch:3, bg:1, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#ff4444',dark:true,text:'The Syndicate requires your expertise.'},{speaker:'ARCHITECT',color:'#ff4444',dark:true,text:'We have a high-latency asynchronous payment module.'},{speaker:'ARCHITECT',color:'#ff4444',dark:true,text:'Identify the correct Actor structure.'}],
    concept:{title:'EXTERNAL SYSTEMS AS ACTORS',body:'Actors are not just people.\nExternal systems (like APIs\nor Payment Gateways) are\nalso Actors!'},
    q:"Which of the following is a VALID external Actor in the Syndicate Payment System?",
    hint:"Non-human systems that interact automatically are Actors too.",
    type:'mc',
    choices:[
      {id:'c1',text:'The Internal Server Database',ok:false},
      {id:'c2',text:'The External Banking API',ok:true},
      {id:'c3',text:'The Payment Button',ok:false},
      {id:'c4',text:'Encryption Algorithm',ok:false},
    ],
  },
  { ch:3, bg:1, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#ff4444',dark:true,text:'Transactions are recorded.'},{speaker:'ARCHITECT',color:'#ff4444',dark:true,text:'When an irregularity is found, an alarm is triggered.'},{speaker:'ARCHITECT',color:'#ff4444',dark:true,text:'Model this conditional behavior.'}],
    concept:{title:'CONDITIONAL TRIGGER',body:'When an action happens\nonly under specific\nconditions, use <<extend>>.'},
    q:'What is the relationship between "Record Transaction" and "Trigger Fraud Alarm"?',
    hint:'Alarms only trigger conditionally (when fraud is suspected).',
    type:'sb',
    template:['The use case ','BLANK_USECASE',', is extended by ','BLANK_EXTENDED','.'],
    blanks:{
      BLANK_USECASE:{opts:['Trigger Fraud Alarm','Record Transaction','User Login'],ok:'Record Transaction'},
      BLANK_EXTENDED:{opts:['User Login','Trigger Fraud Alarm','Record Transaction'],ok:'Trigger Fraud Alarm'}
    },
  },
  // CHAPTER 5
  { ch:4, bg:2, npc:'mimar',
    lines:[{speaker:'ARCHITECT',color:'#00ffcc',dark:true,text:'This is the absolute Core.'},{speaker:'ARCHITECT',color:'#00ffcc',dark:true,text:'Master Admin and the Auto-Pruning Script.'},{speaker:'ARCHITECT',color:'#00ffcc',dark:true,text:'One final classification. Do not fail me.'}],
    concept:{title:'SYSTEM & SCRIPT ACTORS',body:'Both humans (Master Admin)\nand cron jobs (Auto-Prune)\ninteract with the system from outside.'},
    q:"Classify the Master Admin and Automated Scripts alongside their Use Cases:",
    hint:"Even automated scripts sit OUTSIDE the system boundary.",
    type:'dd',
    items:[{id:'a1',l:'Master Admin',t:'actor'},{id:'a2',l:'Auto-Prune Script',t:'actor'},{id:'u1',l:'Force System Reboot',t:'usecase'},{id:'u2',l:'Bypass Login',t:'usecase'},{id:'u3',l:'Delete Old Logs',t:'usecase'}],
    ca:['a1','a2'],cu:['u1','u2','u3'],
  }
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  GAME STATE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const GS = {
  money:0, xp:0, correctCount:0,
  missionIdx:0, currentChapter:-1,
  wrongCount:0,        // per-mission wrong answers
  missionEarned:0,     // what we'll actually earn this mission
  chapterEarned:0,     // accumulated for current chapter
  inventory:[],        // bought item ids
};

// missions per chapter
function missionsForChapter(ch){ return MISSIONS.filter(m=>m.ch===ch); }
function chapterOf(mIdx){ return MISSIONS[mIdx].ch; }

// â”€â”€ LAYERS â”€â”€
function showLayer(id){document.getElementById(id).classList.add('show');}
function hideLayer(id){document.getElementById(id).classList.remove('show');}
function showGuide(){showLayer('scr-guide');}
function closeGuide(){hideLayer('scr-guide');}

// â”€â”€ TITLE â”€â”€
function startGame(){
  hideLayer('scr-title');
  document.getElementById('hud').style.display='flex';
  setActiveNav('Terminal');
  resizeCv();
  GS.currentChapter=-1;
  GS.missionIdx=0;
  drawBg(0);
  startChapter(0);
}

// â”€â”€ CHAPTER â”€â”€
function startChapter(chIdx){
  const ch=CHAPTERS[chIdx];
  document.getElementById('ch-num').textContent=ch.num;
  document.getElementById('ch-title').textContent=ch.title;
  document.getElementById('ch-sub').textContent=ch.sub;
  GS.currentChapter=chIdx;
  GS.chapterEarned=0;
  document.getElementById('h-chap').textContent=`PHASE: ${chIdx+1}`;
  setActiveNav('Terminal');
  showLayer('scr-chapter');
}
function dismissChapter(){
  hideLayer('scr-chapter');
  // Find first mission of this chapter
  const first=MISSIONS.findIndex(m=>m.ch===GS.currentChapter);
  GS.missionIdx=first;
  loadMission(GS.missionIdx);
}

// â”€â”€ MISSION â”€â”€
function loadMission(idx){
  const m=MISSIONS[idx];
  const chMissions=missionsForChapter(m.ch);
  const mPosInCh=chMissions.indexOf(m)+1;
  const hMiss = document.getElementById('h-mission');
  if(hMiss) hMiss.textContent = `${mPosInCh} / ${chMissions.length}`;

  // Base reward for this mission = chapter base / num missions in chapter
  const base=Math.round(CHAPTER_BASE_REWARD[m.ch]/chMissions.length);
  GS.missionEarned=base;
  GS.wrongCount=0;

  // Play scene then show question
  hidePanel();
  startScene(m.bg, m.npc, m.lines, ()=>{
    showQuestion(m);
  });
}

// â”€â”€ EQUIPMENT HINT SYSTEM â”€â”€
// Each item provides a gameplay hint for specific mission types
const EQUIPMENT_HINTS = {
  headphones: {
    label: '🎧 Gamer Headset',
    color: '#00f5ff',
    hint: (m) => {
      if(m.type==='mc') return 'Noise cancellation increases concentration — wrong choices feel different. Eliminate distractions.';
      return null;
    }
  },
  mousepad: {
    label: '🖱️ RGB Mousepad',
    color: '#aaff00',
    hint: (m) => {
      if(m.type==='dd') return 'Wide mousepad makes drag and drop easier! Actors left, Use Cases right.';
      return null;
    }
  },
  keyboard: {
    label: '⌨️ Mechanical Keyboard',
    color: '#ff00aa',
    hint: (m) => {
      if(m.type==='sb') return 'Blue Switch keys make words clear. For User Story blanks: Actor, then Action, then Benefit.';
      return null;
    }
  },
  webcam: {
    label: '📸 4K Webcam',
    color: '#ffd700',
    hint: (m) => {
      if(m.npc==='baker') return 'Webcam AI gesture analysis read Baker Ahmet: he meant Baker and Warehouse Clerk.';
      if(m.npc==='librarian') return 'Webcam eye tracking for Ms. Selin: Choose the one starting with "As a..."';
      return null;
    }
  },
  monitor2: {
    label: '🖥️ Dual Monitors',
    color: '#00f5ff',
    hint: (m) => {
      const base = 'Reference doc is open on the second monitor! ';
      if(m.type==='mc') return base + '<<include>> = MANDATORY (always), <<extend>> = CONDITIONAL (sometimes). Check the choices.';
      if(m.type==='dd') return base + 'Actors on left, Use Cases on right. Actor = PERSON/ROLE, Use Case = ACTION.';
      return base + 'References are now at your fingertips!';
    }
  },
  chair: {
    label: '🪑 Ergonomic Chair',
    color: '#aaff00',
    hint: (m) => 'Ergonomic chair prevents fatigue - you think clearer. Penalty reduced from 20% to 15%!'
  },
  speaker: {
    label: '🔊 5.1 Sound System',
    color: '#ff00aa',
    hint: (m) => {
      if(m.npc==='mimar') return 'Sound system catches voice limits - focus on "sometimes" and "always".';
      return null;
    }
  },
  light: {
    label: '💡 LED Panel Light',
    color: '#ffd700',
    hint: (m) => {
      if(m.type==='sb') return 'LED light makes the template clear: [Actor] -> [Action] -> [Benefit]. Follow this order!';
      return null;
    }
  },
  monitor3: {
    label: '📺 Triple Monitors',
    color: '#aaff00',
    hint: (m) => 'Triple monitors full power! Left: theory, Center: question, Right: draft. Easy to eliminate wrong answers.'
  },
  server: {
    label: '🖧 Personal Server',
    color: '#00f5ff',
    hint: (m) => {
      if(m.type==='dd') return 'Server scanned the DB! Actors are ALWAYS OUTSIDE the system, Use Cases INSIDE.';
      return null;
    }
  },
  desk: {
    label: '🗄️ Smart Standing Desk',
    color: '#ff00aa',
    hint: (m) => 'Motorized desk at optimal position. Penalty reduced to 15%!'
  },
  vr: {
    label: '🥽 VR Headset',
    color: '#ffd700',
    hint: (m) => 'VR Headset models in 3D! Actors outside, Use Cases inside. Apply this structure.'
  },
  neural_implant: {
    label: '🧠 Neural Link',
    color: '#ff00aa',
    hint: (m) => 'Direct mental link senses structural flaws instantly. External APIs are Actors!'
  },
  quantum_server: {
    label: '⚛️ Quantum Server',
    color: '#00f5ff',
    hint: (m) => 'Quantum server tried all permutations. It\'s about "Trigger Fraud Alarm" condition.'
  },
  ai_assistant: {
    label: '🤖 Shadow AI',
    color: '#ffd700',
    hint: (m) => 'Advanced AI simulated highest accurate actor array: Scripts are external actors.'
  },
  cyber_deck: {
    label: '💻 Cyberdeck',
    color: '#aaff00',
    hint: (m) => 'Legendary cyberdeck active. Penalty deductions eliminated! (Penalty = 0%)'
  }
};

function getEquipmentHints(m) {
  const hints = [];
  GS.inventory.forEach(id => {
    const eq = EQUIPMENT_HINTS[id];
    if (!eq) return;
    const h = typeof eq.hint === 'function' ? eq.hint(m) : eq.hint;
    if (h) hints.push({ label: eq.label, color: eq.color, text: h });
  });
  return hints;
}

// â”€â”€ QUESTION PANEL â”€â”€
function hidePanel(){
  document.getElementById('question-panel').classList.remove('show');
}

// HELP COST: buying a concept hint costs this amount
const HELP_COST = 150;

function showQuestion(m){
  // Concept card â€” HIDDEN by default, only revealed via help
  const cc=document.getElementById('concept-card');
  cc.style.display='none';
  if(m.concept){
    document.getElementById('cc-title').textContent=m.concept.title;
    document.getElementById('cc-body').textContent=m.concept.body;
  }

  const chMissions=missionsForChapter(m.ch);
  const mPos=chMissions.indexOf(m)+1;
  document.getElementById('q-label').textContent=`MISSION // ${mPos} OF ${chMissions.length}`;
  document.getElementById('q-xp-badge').textContent=`XP +${30+Math.round(20*1)}`;
  setActiveNav('Network');

  const base=Math.round(CHAPTER_BASE_REWARD[m.ch]/chMissions.length);
  updatePotDisplay(base, 0);

  // Penalty reduction for desk/chair
  if(GS.inventory.includes('cyber_deck')){
    window._penaltyOverride = 0.0;
  } else if(GS.inventory.includes('desk') || GS.inventory.includes('chair')){
    window._penaltyOverride = 0.15;
  } else {
    window._penaltyOverride = null;
  }

  const hb=document.getElementById('hint-box');
  hb.style.display='none';

  // Clear help offer
  const hof=document.getElementById('help-offer');
  if(hof) hof.style.display='none';

  // â”€â”€ EQUIPMENT HINTS â”€â”€
  const eqHints = getEquipmentHints(m);
  const eqArea = document.getElementById('eq-hint-area') || (() => {
    const d = document.createElement('div');
    d.id = 'eq-hint-area';
    document.getElementById('question-panel').querySelector('.qp-inner').insertBefore(
      d, document.getElementById('question-panel').querySelector('.qp-row-top')
    );
    return d;
  })();
  if(eqHints.length > 0){
    eqArea.style.display='block';
    eqArea.innerHTML = eqHints.map(h=>`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:9px 14px;margin-bottom:7px;
        border-radius:7px;border:1px solid ${h.color}28;background:${h.color}06;">
        <span style="font-family:'Orbitron';font-size:.64rem;color:${h.color};white-space:nowrap;padding-top:3px">${h.label}</span>
        <span style="font-family:'Rajdhani';font-size:.9rem;color:#b8ccd8;line-height:1.55">${h.text}</span>
      </div>
    `).join('');
  } else {
    eqArea.style.display='none';
    eqArea.innerHTML='';
  }

  document.getElementById('q-text').textContent=m.q;
  document.getElementById('fb-box').className='fb-box';
  document.getElementById('action-row').innerHTML='';

  if(m.type==='mc') renderMC(m);
  else if(m.type==='dd') renderDD(m);
  else if(m.type==='sb') renderSB(m);

  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      document.getElementById('question-panel').classList.add('show');
    });
  });
}

function offerHelp(m){
  // Show the help offer box
  let hof=document.getElementById('help-offer');
  if(!hof){
    hof=document.createElement('div');hof.id='help-offer';hof.className='help-offer-box';
    const qInner=document.querySelector('.qp-inner');
    const fbBox=document.getElementById('fb-box');
    qInner.insertBefore(hof,fbBox.nextSibling);
  }
  const canAfford=GS.money>=HELP_COST;
  hof.style.display='flex';
  hof.innerHTML=`
    <div class="ho-text">💡 Do you want to see the concept explanation?</div>
    <div class="ho-cost">${canAfford?`₺${HELP_COST.toLocaleString()} credits`:'Insufficient balance'}</div>
    ${canAfford?`<button class="btn btn-gold btn-sm" onclick="buyHelp()">GET HELP</button>`:`<button class="btn btn-sm" style="border-color:var(--dim);color:var(--dim);cursor:not-allowed" disabled>GET HELP</button>`}
  `;
}

function buyHelp(){
  const m=MISSIONS[GS.missionIdx];
  if(GS.money<HELP_COST||!m.concept) return;
  GS.money-=HELP_COST;
  updateHUD();
  // Show concept card
  const cc=document.getElementById('concept-card');
  cc.style.display='block';
  // Hide offer
  const hof=document.getElementById('help-offer');
  if(hof) hof.style.display='none';
  // Also show the standard hint
  const hb=document.getElementById('hint-box');
  if(m.hint){hb.style.display='block';hb.innerHTML=`<strong>💡 Hint:</strong> ${m.hint}`;}
}

function updatePotDisplay(base, wrongs){
  const pct = window._penaltyOverride || WRONG_PENALTY_PCT;
  const reduced=Math.round(base*Math.pow(1-pct, wrongs));
  GS.missionEarned=reduced;
  document.getElementById('q-pot').textContent=`â‚º${reduced.toLocaleString()}`;
  const pr=document.getElementById('penalty-row');
  if(wrongs>0){
    const lost=base-reduced;
    const penLabel = window._penaltyOverride ? ' (Desk/Chair advantage!)' : '';
    pr.textContent=`⚠️ ${wrongs} mistakes - ₺${lost.toLocaleString()} deducted${penLabel}`;
  } else { pr.textContent=''; }
}

// â”€â”€ MULTIPLE CHOICE â”€â”€
function renderMC(m){
  const ia=document.getElementById('interact-area');
  ia.innerHTML='<div class="choice-list" id="choice-list"></div>';
  const list=document.getElementById('choice-list');
  ['A','B','C','D'].forEach((lt,i)=>{
    const ch=m.choices[i];if(!ch)return;
    const btn=document.createElement('button');btn.className='c-btn';btn.id=`cb-${ch.id}`;
    btn.innerHTML=`<span class="c-letter">${lt}</span><span>${ch.text}</span>`;
    btn.onclick=()=>{
      document.querySelectorAll('.c-btn').forEach(b=>b.classList.remove('sel'));
      btn.classList.add('sel');
      document.getElementById('action-row').innerHTML=`<button class="btn btn-neon" onclick="checkMC('${ch.id}')">âœ“ VERIFY</button>`;
    };
    list.appendChild(btn);
  });
}
function checkMC(sid){
  const m=MISSIONS[GS.missionIdx];
  const ch=m.choices.find(c=>c.id===sid);
  const btn=document.getElementById(`cb-${sid}`);
  const fb=document.getElementById('fb-box');
  if(ch.ok){
    btn.classList.add('ok');
    onCorrect(m);
  } else {
    GS.wrongCount++;
    btn.classList.add('no');
    const base=Math.round(CHAPTER_BASE_REWARD[m.ch]/missionsForChapter(m.ch).length);
    updatePotDisplay(base, GS.wrongCount);
    fb.className='fb-box no';fb.textContent='âŒ Incorrect! Think about the concepts and try another option.';
    document.getElementById('action-row').innerHTML='';
    document.querySelectorAll('.c-btn:not(.no)').forEach(b=>{
      b.onclick=()=>{
        const id=b.id.replace('cb-','');
        document.querySelectorAll('.c-btn:not(.no)').forEach(x=>x.classList.remove('sel'));
        b.classList.add('sel');
        document.getElementById('action-row').innerHTML=`<button class="btn btn-neon" onclick="checkMC('${id}')">âœ“ VERIFY</button>`;
      };
    });
    if(m.concept) offerHelp(m);
  }
}

// â”€â”€ DRAG DROP â€” True drag & drop, neutral colors â”€â”€
function renderDD(m){
  const ia=document.getElementById('interact-area');
  const aSlot=[],uSlot=[];

  function rebuild(){
    ia.innerHTML=`
      <div style="font-size:.92rem;font-family:'Rajdhani';font-weight:600;color:var(--dim);margin-bottom:10px">
        Drag and drop the cards into the correct category:
      </div>
      <div class="dd-pool" id="dd-pool"></div>
      <div class="dd-cols">
        <div class="dd-col" id="dd-a"
          ondragover="event.preventDefault();this.classList.add('drag-over')"
          ondragleave="this.classList.remove('drag-over')"
          ondrop="dropDD(event,'a')">
          <div class="dd-col-title">ğŸ­ ACTORS</div>
          <div id="dd-a-placed"></div>
        </div>
        <div class="dd-col" id="dd-u"
          ondragover="event.preventDefault();this.classList.add('drag-over')"
          ondragleave="this.classList.remove('drag-over')"
          ondrop="dropDD(event,'u')">
          <div class="dd-col-title">ğŸ“‹ USE CASES</div>
          <div id="dd-u-placed"></div>
        </div>
      </div>`;

    const pool=document.getElementById('dd-pool');
    // Shuffle the pool display order for extra challenge
    const remaining=m.items.filter(item=>!aSlot.includes(item.id)&&!uSlot.includes(item.id));
    remaining.forEach(item=>{
      const c=document.createElement('div');
      c.className='dd-chip';   // neutral â€” no actor/usecase color class
      c.textContent=item.l;
      c.draggable=true;
      c.dataset.id=item.id;
      c.addEventListener('dragstart',e=>{
        e.dataTransfer.setData('text/plain',item.id);
        c.classList.add('dragging');
      });
      c.addEventListener('dragend',()=>c.classList.remove('dragging'));
      // Also support click-to-cycle (click â†’ actor â†’ usecase â†’ back)
      c.addEventListener('click',()=>{
        if(aSlot.includes(item.id)){aSlot.splice(aSlot.indexOf(item.id),1);uSlot.push(item.id);}
        else if(uSlot.includes(item.id)){uSlot.splice(uSlot.indexOf(item.id),1);}
        else{aSlot.push(item.id);}
        rebuild();
      });
      pool.appendChild(c);
    });

    // Placed items â€” neutral color, just with remove X
    [[aSlot,'dd-a-placed'],[uSlot,'dd-u-placed']].forEach(([sl,cid])=>{
      const cont=document.getElementById(cid);
      sl.forEach(id=>{
        const item=m.items.find(x=>x.id===id);
        const chip=document.createElement('span');chip.className='placed';
        chip.innerHTML=`${item.l} <span class="x" onclick="rmDD('${id}','${sl===aSlot?'a':'u'}')">âœ•</span>`;
        cont.appendChild(chip);
      });
    });
    ddSubmitBtn(m,aSlot,uSlot);
  }

  window.dropDD=(e,col)=>{
    e.preventDefault();
    document.querySelectorAll('.dd-col').forEach(c=>c.classList.remove('drag-over'));
    const id=e.dataTransfer.getData('text/plain');
    if(!id) return;
    // Remove from wherever it was
    const ai=aSlot.indexOf(id);if(ai>-1)aSlot.splice(ai,1);
    const ui=uSlot.indexOf(id);if(ui>-1)uSlot.splice(ui,1);
    if(col==='a') aSlot.push(id); else uSlot.push(id);
    rebuild();
  };
  window.rmDD=(id,col)=>{
    const arr=col==='a'?aSlot:uSlot;const i=arr.indexOf(id);if(i>-1)arr.splice(i,1);rebuild();
  };
  window._ddA=aSlot;window._ddU=uSlot;window._ddM=m;
  rebuild();
}

function ddSubmitBtn(m,aSlot,uSlot){
  const ar=document.getElementById('action-row');ar.innerHTML='';
  const hasAny=aSlot.length>0||uSlot.length>0;
  if(!hasAny) return;
  const b=document.createElement('button');b.className='btn btn-neon';b.textContent='âœ“ ACCEPT ANALYSIS';
  b.onclick=()=>{
    const aOk=m.ca.every(a=>aSlot.includes(a))&&aSlot.every(a=>m.ca.includes(a));
    const uOk=m.cu.every(u=>uSlot.includes(u))&&uSlot.every(u=>m.cu.includes(u));
    const fb=document.getElementById('fb-box');
    if(aOk&&uOk){onCorrect(m);}
    else{
      GS.wrongCount++;
      const base=Math.round(CHAPTER_BASE_REWARD[m.ch]/missionsForChapter(m.ch).length);
      updatePotDisplay(base,GS.wrongCount);
      fb.className='fb-box no';
      fb.textContent=`âŒ Not quite right! ${!aOk?"Actor list is missing/wrong. ":""}${!uOk?"Use Case list is missing/wrong. ":""}Try again.`;
      if(m.concept) offerHelp(m);
    }
  };
  ar.appendChild(b);
}

// â”€â”€ STORY BUILDER â”€â”€
function renderSB(m){
  const ia=document.getElementById('interact-area');
  const filled={};Object.keys(m.blanks).forEach(k=>filled[k]=null);
  function rebuild(){
    let html='<div class="sb-template">';
    m.template.forEach(part=>{
      if(part.startsWith('BLANK_')){
        if(filled[part])html+=`<span class="sb-blank filled" onclick="clearSB('${part}')">${filled[part]} âœ•</span>`;
        else html+=`<span class="sb-blank">[select]</span>`;
      }else{html+=part;}
    });
    html+='</div>';
    Object.keys(m.blanks).forEach(k=>{
      if(!filled[k]){
        html+=`<div style="margin-top:10px;font-size:.7rem;color:var(--dim);letter-spacing:1px;text-transform:uppercase;margin-bottom:5px">${k.replace('BLANK_','')}</div><div class="sb-opts">`;
        m.blanks[k].opts.forEach(opt=>{
          const used=Object.values(filled).includes(opt);
          html+=`<div class="sb-opt${used?' used':''}" onclick="fillSB('${k}','${opt.replace(/'/g,"&#39;")}')">${opt}</div>`;
        });
        html+='</div>';
      }
    });
    ia.innerHTML=html;
    const all=Object.values(filled).every(v=>v!==null);
    document.getElementById('action-row').innerHTML=all?`<button class="btn btn-neon" onclick="checkSB()">âœ“ VERIFY USER STORY</button>`:'';
  }
  window.fillSB=(k,v)=>{filled[k]=v;rebuild();};
  window.clearSB=(k)=>{filled[k]=null;rebuild();};
  window._sbF=filled;window._sbM=m;
  rebuild();
}
function checkSB(){
  const m=window._sbM,f=window._sbF;
  const fb=document.getElementById('fb-box');
  let ok=true;Object.keys(m.blanks).forEach(k=>{if(f[k]!==m.blanks[k].ok)ok=false;});
  if(ok){onCorrect(m);}
  else{
    GS.wrongCount++;
    const base=Math.round(CHAPTER_BASE_REWARD[m.ch]/missionsForChapter(m.ch).length);
    updatePotDisplay(base,GS.wrongCount);
    fb.className='fb-box no';fb.textContent='âŒ User Story doÄŸru deÄŸil! Kim, ne, neden â€” her parÃ§ayÄ± kontrol et.';
    document.getElementById('action-row').innerHTML=`<button class="btn btn-pink" onclick="renderSB(window._sbM)">ğŸ”„ Tekrar Dene</button>`;
    if(m.concept) offerHelp(m);
  }
}

// â”€â”€ CORRECT â”€â”€
function onCorrect(m){
  const earned=GS.missionEarned;
  const xpGain=30+Math.round(20*(1-GS.wrongCount*WRONG_PENALTY_PCT));
  GS.money+=earned;
  GS.xp+=xpGain;
  GS.correctCount++;
  GS.chapterEarned+=earned;
  updateHUD();

  // Slide panel out, show reward
  hidePanel();
  setTimeout(()=>{
    const penalty=GS.wrongCount>0?`${GS.wrongCount} hata nedeniyle â‚º${Math.round(CHAPTER_BASE_REWARD[m.ch]/missionsForChapter(m.ch).length)-earned} kesildi`:'';
    document.getElementById('rew-title').innerHTML=GS.wrongCount===0?'MÃœKEMMEL!<br>TAM PUAN!':'GÃ–REV<br>TAMAMLANDI!';
    document.getElementById('rew-sub').textContent=GS.wrongCount===0?'OPERATION ANALYSIS: VERIFIED // PERFECT SCORE':'OPERATION ANALYSIS: VERIFIED // REWARD DISPATCHING';
    document.getElementById('rew-money-val').textContent=earned.toLocaleString();
    document.getElementById('rew-xp-val').textContent=`+${xpGain} XP`;
    document.getElementById('rew-penalty').textContent=penalty;
    document.getElementById('rew-btn').textContent='RETURN TO TERMINAL';
    document.getElementById('rew-btn').onclick=nextStep;
    showLayer('scr-reward');
  }, 500);
}

function nextStep(){
  hideLayer('scr-reward');
  GS.missionIdx++;
  const nextM=MISSIONS[GS.missionIdx];

  // Check if chapter changed or game ended
  if(!nextM){
    // game over after last chapter shop
    openShop(GS.currentChapter, ()=>endGame());
    return;
  }

  if(nextM.ch !== GS.currentChapter){
    // chapter ended â†’ go to shop
    openShop(GS.currentChapter, ()=>{
      startChapter(nextM.ch);
    });
  } else {
    loadMission(GS.missionIdx);
  }
}

// â”€â”€ SHOP â”€â”€
function buildShopCard(item){
  const owned=GS.inventory.includes(item.id);
  const canAfford=GS.money>=item.price;
  const adv=item.advantage||{};
  const tagClass={'neon':'adv-tag-neon','pink':'adv-tag-pink','gold':'adv-tag-gold'}[adv.tagType||'neon'];
  const modelId = item.id.toUpperCase().replace(/[^A-Z0-9]/g,'_');
  const div=document.createElement('div');
  div.className=`shop-item${owned?' bought':!canAfford?' cant':''}`;
  div.innerHTML=`
    <div class="si-img">
      <span style="font-size:3.5rem">${item.icon}</span>
      <div class="model-tag">MODEL_${modelId}</div>
    </div>
    <div class="si-body">
      <div class="si-name">${item.name}</div>
      <div class="si-desc">${item.desc}</div>
      <div class="si-price-row">
        <div class="si-price">${owned?'âœ“ ALINDI':`â‚º${item.price.toLocaleString()}`}</div>
        ${owned
          ?`<div class="shop-bought-badge">âœ“ OWNED</div>`
          :canAfford
            ?`<button class="shop-buy-btn" onclick="buyItem('${item.id}')">PURCHASE</button>`
            :`<button class="shop-buy-btn" disabled style="opacity:.4;cursor:not-allowed">PURCHASE</button>`
        }
      </div>
    </div>
    ${adv.title?`
    <div class="si-advantage">
      <div class="si-adv-title">${adv.title}</div>
      <div class="si-adv-body">${adv.body||''}</div>
      ${adv.tag?`<span class="si-adv-tag ${tagClass}">${adv.tag}</span>`:''}
    </div>`:''}
  `;
  return div;
}

function openShop(chapterIdx, cb){
  window._shopCb=cb;
  const tier=SHOP_TIER_PER_CHAPTER[chapterIdx]||1;
  document.getElementById('shop-chapter-title').textContent=`BLACK MARKET TERMINAL`;
  document.getElementById('shop-wallet-val').textContent=`₺${GS.money.toLocaleString()}`;
  const grid=document.getElementById('shop-grid');
  grid.innerHTML='';
  SHOP_ITEMS.filter(it=>it.tier<=tier).forEach(item=>grid.appendChild(buildShopCard(item)));
  renderInventoryBar();
  setActiveNav('Market');
  showLayer('scr-shop');
  startShopWalk(()=>{});
}

function buyItem(id){
  const item=SHOP_ITEMS.find(i=>i.id===id);
  if(!item||GS.inventory.includes(id)||GS.money<item.price) return;
  GS.money-=item.price;
  GS.inventory.push(id);
  updateHUD();
  openShopRefresh();
}

function openShopRefresh(){
  const chapterIdx=GS.currentChapter;
  const tier=SHOP_TIER_PER_CHAPTER[chapterIdx]||1;
  document.getElementById('shop-wallet-val').textContent=`₺${GS.money.toLocaleString()}`;
  const grid=document.getElementById('shop-grid');
  grid.innerHTML='';
  SHOP_ITEMS.filter(it=>it.tier<=tier).forEach(item=>grid.appendChild(buildShopCard(item)));
  renderInventoryBar();
}

function renderInventoryBar(){
  const bar=document.getElementById('inventory-bar');
  if(GS.inventory.length===0){bar.innerHTML='<span style="color:var(--dim);font-size:.78rem">No items acquired yet</span>';return;}
  bar.innerHTML='';
  GS.inventory.forEach(id=>{
    const it=SHOP_ITEMS.find(i=>i.id===id);
    if(!it)return;
    const div=document.createElement('div');div.className='inv-item';
    div.textContent=`${it.icon} ${it.name}`;
    bar.appendChild(div);
  });
}

function closeShop(){
  if(shopAnimId) cancelAnimationFrame(shopAnimId);
  hideLayer('scr-shop');
  setActiveNav('Terminal');
  if(window._shopCb){window._shopCb();window._shopCb=null;}
}

function setActiveNav(name){
  document.querySelectorAll('.nav-item').forEach(el=>{
    if(el.querySelector('span').textContent.toLowerCase() === name.toLowerCase()){
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// â”€â”€ HUD â”€â”€
function updateHUD(){
  document.getElementById('h-money').textContent=`₺${GS.money.toLocaleString()}`;
  document.getElementById('h-xp').textContent=`${Math.min(Math.round((GS.xp/600)*100),100)}%`;
  document.getElementById('h-xpbar').style.width=Math.min((GS.xp/600)*100,100)+'%';
  let t='Intern';
  if(GS.xp>=80)t='Junior';
  if(GS.xp>=160)t='Senior';
  if(GS.xp>=280)t='Shadow Analyst';
  document.getElementById('h-title').textContent=`${t}`;
  document.getElementById('h-chap').textContent=`${GS.currentChapter + 1} / 5`;
}

// â”€â”€ VICTORY ANIMATION â”€â”€
let victoryRaf=null, victoryFrame=0;

function drawVictoryScene(canvas){
  const g=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  g.clearRect(0,0,W,H);
  const f=victoryFrame;

  // â”€â”€ BACKGROUND: Dark office at night â”€â”€
  const bgG=g.createLinearGradient(0,0,0,H);
  bgG.addColorStop(0,'#06050f');bgG.addColorStop(1,'#030208');
  g.fillStyle=bgG;g.fillRect(0,0,W,H);
  g.fillStyle='#0a0818';g.fillRect(0,H*.65,W,H*.35);

  // Floor grid
  for(let x=0;x<W;x+=60){
    const tg=g.createLinearGradient(x,H*.65,x,H);tg.addColorStop(0,'rgba(0,245,255,.1)');tg.addColorStop(1,'transparent');
    g.fillStyle=tg;g.fillRect(x,H*.65,1.5,H*.35);
  }

  // Wall windows (night)
  [{x:W*.04,w:W*.12},{x:W*.18,w:W*.1},{x:W*.31,w:W*.1},{x:W*.44,w:W*.09}].forEach(({x:wx,w:ww},wi)=>{
    const nG=g.createLinearGradient(wx,H*.05,wx,H*.43);
    nG.addColorStop(0,'#000814');nG.addColorStop(1,'#010c22');
    g.fillStyle=nG;g.fillRect(wx,H*.05,ww,H*.38);
    for(let i=0;i<12;i++){
      const sx=wx+(Math.sin(i*(wi+1)*1.3)*.45+.5)*ww,sy=H*.06+(Math.abs(Math.cos(i*1.2)))*.32*H;
      const twinkle=.3+Math.sin(f*.08+i)*0.25;
      g.fillStyle=`rgba(255,255,255,${Math.max(0.05,twinkle)})`;
      g.beginPath();g.arc(sx,sy,.6+Math.sin(f*.12+i)*.4,0,Math.PI*2);g.fill();
    }
    g.strokeStyle='#1a1040';g.lineWidth=2;g.strokeRect(wx,H*.05,ww,H*.38);
    g.lineWidth=1;g.strokeStyle='#140c30';
    g.beginPath();g.moveTo(wx+ww*.5,H*.05);g.lineTo(wx+ww*.5,H*.43);g.stroke();
    g.beginPath();g.moveTo(wx,H*.22);g.lineTo(wx+ww,H*.22);g.stroke();
  });

  // Big desk
  g.fillStyle='#0e0c1c';g.fillRect(W*.08,H*.5,W*.7,H*.15);
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=14;g.fillStyle='rgba(0,245,255,.18)';g.fillRect(W*.08,H*.5,W*.7,2.5);g.restore();

  // Triple monitors (the ones earned)
  const monColors=['#00f5ff','#ff00aa','#aaff00'];
  [[W*.12,'#00f5ff'],[W*.27,'#ff00aa'],[W*.42,'#aaff00']].forEach(([mx,c],mi)=>{
    g.fillStyle='#0a0a14';g.fillRect(mx,H*.22,W*.12,H*.28);
    g.save();g.shadowColor=c;g.shadowBlur=20+Math.sin(f*.05+mi)*6;
    const pulseAlpha=.15+Math.sin(f*.06+mi*2)*.05;
    g.fillStyle=c+Math.round(pulseAlpha*255).toString(16).padStart(2,'0');
    g.fillRect(mx+W*.007,H*.23,W*.106,H*.25);
    // Draw "SHADOW ANALYST" text on monitors
    g.font=`bold ${Math.round(H*.025)}px Orbitron,monospace`;g.fillStyle=c;g.textAlign='center';
    g.fillText(['USE CASE','ACTOR','SYSTEM'][mi],mx+W*.06,H*.35+Math.sin(f*.04)*2);
    g.restore();
    g.fillStyle='#181828';g.fillRect(mx+W*.04,H*.5,W*.03,H*.028);
  });

  // â”€â”€ SEATED SHADOW ANALYST CHARACTER â”€â”€
  // Chair behind desk
  g.fillStyle='#181828';g.fillRect(W*.56,H*.42,W*.08,H*.2);
  g.fillStyle='#1e1e38';g.fillRect(W*.54,H*.56,W*.12,H*.08);
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=4;g.strokeStyle='rgba(0,245,255,.2)';g.lineWidth=1;g.strokeRect(W*.54,H*.56,W*.12,H*.08);g.restore();

  // Body / desk position (character seated, leaning slightly)
  const lean=Math.sin(f*.03)*2; // subtle breathing lean
  const cx2=W*.6, cy=H*.52;
  const s=H*.18; // character scale

  // Arms on desk
  g.fillStyle='#081626';
  g.fillRect(cx2-s*.4,cy+s*.05,s*.25,s*.08); // left arm
  g.fillRect(cx2+s*.15,cy+s*.05,s*.25,s*.08); // right arm

  // Torso (sleek dark jacket)
  const bodyG=g.createLinearGradient(cx2-s*.22,cy-s*.1,cx2+s*.22,cy+s*.4);
  bodyG.addColorStop(0,'#0c1828');bodyG.addColorStop(1,'#060e1c');
  g.fillStyle=bodyG;g.fillRect(cx2-s*.22,cy-s*.08+lean,s*.44,s*.48);
  // Jacket lapel
  g.fillStyle='rgba(0,245,255,.12)';
  g.beginPath();g.moveTo(cx2,cy-s*.08+lean);g.lineTo(cx2-s*.1,cy+s*.1+lean);g.lineTo(cx2,cy+s*.05+lean);g.closePath();g.fill();
  g.beginPath();g.moveTo(cx2,cy-s*.08+lean);g.lineTo(cx2+s*.1,cy+s*.1+lean);g.lineTo(cx2,cy+s*.05+lean);g.closePath();g.fill();
  // Neon strip on jacket (rank indicator)
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=8;g.fillStyle='rgba(0,245,255,.7)';
  g.fillRect(cx2-s*.22,cy+s*.06+lean,s*.44,2);g.restore();

  // Head
  g.fillStyle='#d8a878';
  g.beginPath();g.roundRect(cx2-s*.16,cy-s*.4+lean,s*.32,s*.3,s*.05);g.fill();

  // Hair (dark, styled back â€” confident look)
  g.fillStyle='#1c1008';
  g.beginPath();g.ellipse(cx2,cy-s*.44+lean,s*.18,s*.12,0,0,Math.PI*2);g.fill();
  g.beginPath();g.moveTo(cx2-s*.16,cy-s*.38+lean);g.quadraticCurveTo(cx2-s*.2,cy-s*.5+lean,cx2-s*.06,cy-s*.52+lean);
  g.quadraticCurveTo(cx2+s*.08,cy-s*.54+lean,cx2+s*.16,cy-s*.38+lean);g.fill();
  // Hair shine
  g.fillStyle='rgba(80,50,20,.4)';g.beginPath();g.ellipse(cx2+s*.04,cy-s*.48+lean,s*.05,s*.025,-.3,0,Math.PI*2);g.fill();

  // Eyes â€” confident, focused
  g.fillStyle='#1a1a1a';
  g.fillRect(cx2-s*.1,cy-s*.3+lean,s*.065,s*.065);
  g.fillRect(cx2+s*.035,cy-s*.3+lean,s*.065,s*.065);
  // Iris â€” glowing neon tint
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=4;
  g.fillStyle='#00c8ff';g.fillRect(cx2-s*.09,cy-s*.295+lean,s*.04,s*.04);
  g.fillStyle='#00c8ff';g.fillRect(cx2+s*.045,cy-s*.295+lean,s*.04,s*.04);g.restore();
  // Eye highlight
  g.fillStyle='#fff';g.fillRect(cx2-s*.082,cy-s*.287+lean,s*.015,s*.015);g.fillRect(cx2+s*.053,cy-s*.287+lean,s*.015,s*.015);

  // Confident slight smirk
  g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=1.5;
  g.beginPath();g.moveTo(cx2-s*.04,cy-s*.16+lean);g.quadraticCurveTo(cx2+s*.01,cy-s*.13+lean,cx2+s*.07,cy-s*.15+lean);g.stroke();

  // Glasses (optional â€” analyst look)
  g.strokeStyle='#4a6080';g.lineWidth=1.5;
  g.strokeRect(cx2-s*.13,cy-s*.315+lean,s*.095,s*.075);
  g.strokeRect(cx2+s*.035,cy-s*.315+lean,s*.095,s*.075);
  g.beginPath();g.moveTo(cx2-s*.035,cy-s*.278+lean);g.lineTo(cx2+s*.035,cy-s*.278+lean);g.stroke();

  // Hands on keyboard
  g.fillStyle='#c89060';
  g.beginPath();g.roundRect(cx2-s*.35,cy+s*.08,s*.14,s*.07,s*.02);g.fill();
  g.beginPath();g.roundRect(cx2+s*.21,cy+s*.08,s*.14,s*.07,s*.02);g.fill();

  // Keyboard on desk
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=6;g.fillStyle='#0c1828';g.fillRect(cx2-s*.4,cy+s*.13,s*.8,s*.06);g.restore();
  g.strokeStyle='rgba(0,245,255,.15)';g.lineWidth=1;
  for(let kx=cx2-s*.38;kx<cx2+s*.38;kx+=s*.08){g.strokeRect(kx,cy+s*.135,s*.07,s*.04);}

  // Neon ambient glow around the analyst
  const aura=g.createRadialGradient(cx2,cy,0,cx2,cy,H*.25);
  aura.addColorStop(0,`rgba(0,180,255,.06)`);
  aura.addColorStop(.5,`rgba(0,100,200,.03)`);
  aura.addColorStop(1,'transparent');
  g.fillStyle=aura;g.fillRect(0,0,W,H);

  // â”€â”€ NEON "SHADOW ANALYST" title sign on wall â”€â”€
  g.save();
  const titleFlicker=0.8+Math.sin(f*.07)*.15+Math.sin(f*.13)*.05;
  g.globalAlpha=titleFlicker;
  g.shadowColor='#00f5ff';g.shadowBlur=28;
  g.strokeStyle='#00f5ff';g.lineWidth=1.5;g.strokeRect(W*.77,H*.06,W*.2,H*.26);
  g.fillStyle='rgba(0,245,255,.04)';g.fillRect(W*.77,H*.06,W*.2,H*.26);
  g.font=`900 ${Math.round(H*.05)}px Orbitron,monospace`;g.fillStyle='#00f5ff';g.textAlign='center';
  g.fillText('SHADOW',W*.87,H*.16);g.fillText('ANALYST',W*.87,H*.23);
  g.font=`${Math.round(H*.028)}px Orbitron,monospace`;g.fillStyle='rgba(255,215,0,.9)';
  g.fillText('â­ CERTIFIED',W*.87,H*.295);
  g.restore();

  // RGB floor strip
  const rgbG=g.createLinearGradient(0,0,W,0);
  rgbG.addColorStop(0,'#ff0080');rgbG.addColorStop(.33,'#00f5ff');rgbG.addColorStop(.66,'#aaff00');rgbG.addColorStop(1,'#ff0080');
  g.save();g.shadowColor='#00f5ff';g.shadowBlur=12;g.fillStyle=rgbG;g.fillRect(0,H*.645,W,3);g.restore();

  // Vignette
  const vig=g.createRadialGradient(cx2,H*.5,H*.1,cx2,H*.5,H*.7);
  vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(.5,'rgba(0,0,0,.1)');vig.addColorStop(1,'rgba(0,0,0,.65)');
  g.fillStyle=vig;g.fillRect(0,0,W,H);

  victoryFrame++;
}

function startVictoryAnimation(){
  const canvas=document.getElementById('victory-canvas');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  showLayer('scr-victory');
  victoryFrame=0;
  function loop(){
    drawVictoryScene(canvas);
    victoryRaf=requestAnimationFrame(loop);
  }
  loop();
}

function showFinalStats(){
  if(victoryRaf){cancelAnimationFrame(victoryRaf);victoryRaf=null;}
  hideLayer('scr-victory');
  showLayer('scr-final');
  document.getElementById('h-chap').textContent='✓ COMPLETE';
  document.getElementById('final-stats').innerHTML=`
    <div class="fs-stat"><div class="fs-val">₺${GS.money.toLocaleString()}</div><div class="fs-lbl">Remaining Balance</div></div>
    <div class="fs-stat"><div class="fs-val">${GS.xp}</div><div class="fs-lbl">Total XP</div></div>
    <div class="fs-stat"><div class="fs-val">${GS.correctCount}/${MISSIONS.length}</div><div class="fs-lbl">Missions Solved</div></div>
    <div class="fs-stat"><div class="fs-val">${GS.inventory.length}</div><div class="fs-lbl">Equipment Acquired</div></div>
  `;
  const fi=document.getElementById('final-inventory');
  if(GS.inventory.length>0){
    const storyLines = {
      headphones: 'Gamer Headset — concentration peaked in MC questions.',
      mousepad:   'RGB Mousepad — glided through Drag&Drop questions.',
      keyboard:   'Mechanical Keyboard — provided hints for User Story blanks.',
      webcam:     '4K Webcam — provided gesture analysis hints.',
      monitor2:   'Dual Monitors — reference screen helped in all types.',
      chair:      'Ergonomic Chair — protected money by dropping penalty to 15%.',
      speaker:    '5.1 Sound System — caught the Architect\'s keywords.',
      light:      'LED Panel Light — made Story Builder questions crystal clear.',
      monitor3:   'Triple Monitors — you were unbeatable with 3 screens.',
      server:     'Personal Server — scanned DB for DD questions.',
      desk:       'Smart Desk — protected your balance dropping penalty to 15%.',
      vr:         'VR Headset — dominated by modeling Use Cases in 3D.',
      neural_implant: 'Neural Link — sensed system flaws via brain interface.',
      quantum_server: 'Quantum Server — calculated all permutations in milliseconds.',
      ai_assistant:   'Shadow AI — constant shadow protection.',
      cyber_deck:     'Militech Cyberdeck — bypassed all security with zero penalty.',
    };
    fi.innerHTML=`
      <div style="font-family:Orbitron;font-size:.72rem;color:var(--neon);letter-spacing:2px;margin-bottom:10px">🛒 GEAR CONTRIBUTION</div>
      <div style="max-width:680px;margin:0 auto">
        ${GS.inventory.map(id=>{
          const it=SHOP_ITEMS.find(i=>i.id===id);
          const story=storyLines[id]||(it ? it.icon+' '+it.name : id);
          return it?`<div style="display:flex;align-items:center;gap:10px;padding:7px 14px;margin-bottom:6px;border-radius:6px;border:1px solid rgba(0,245,255,.15);background:rgba(0,245,255,.04);font-family:'Rajdhani';font-size:.88rem;color:#b0c8d8"><span style="font-size:1.2rem">${it.icon}</span><span>${story}</span></div>`:''
        }).join('')}
      </div>`;
  } else {
    fi.innerHTML=`<div style="color:var(--dim);font-size:.9rem">No equipment acquired - answer better next time!</div>`;
  }
}

// â”€â”€ END GAME â”€â”€
function endGame(){
  startVictoryAnimation();
}

function restartGame(){
  if(victoryRaf){cancelAnimationFrame(victoryRaf);victoryRaf=null;}
  GS.money=0;GS.xp=0;GS.correctCount=0;GS.missionIdx=0;GS.currentChapter=-1;GS.wrongCount=0;GS.missionEarned=0;GS.chapterEarned=0;GS.inventory=[];
  window._penaltyOverride=null;
  hideLayer('scr-final');
  hideLayer('scr-victory');
  updateHUD();
  resizeCv();
  drawBg(0);
  startChapter(0);
}

// â”€â”€ INIT â”€â”€
resizeCv();
drawBg(0);
updateHUD();

// â”€â”€ SPACE KEY HANDLER â”€â”€
// Only advance dialogue during 'talk' phase, ignore during walk_in/walk_out
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space' || e.key === ' ') {
    e.preventDefault(); // Prevent SPACE from activating focused buttons
    
    // Only respond if we're in talk phase
    if (animSt.phase === 'talk' && animSt.typed.length >= animSt.full.length) {
      animSt.lineIdx++;
      if (animSt.lineIdx < animSt.lines.length) {
        beginLine();
      } else {
        animSt.phase = 'walk_out';
        hideSpeech();
      }
    }
  }
});

// Prevent buttons from keeping focus (stops SPACE re-triggering them)
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    e.target.blur();
  }
});
