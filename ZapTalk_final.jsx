import { useState, useRef, useEffect } from "react";

const replies = ["Haan bilkul! 👍","Theek hai yaar 💪","Wah mast idea! 🔥","Ok dekh raha hoon ✅","Lol 😂 sahi kaha","Chill karo ho jayega 😎","Send karo jaldi ⚡","Deploy ho gaya 🚀","Acha samajh gaya 🤔","ZapTalk best hai! 💯"];

const chats = [
  {id:1,name:"Dev Team 🚀",av:"💻",status:"online",last:"Ali: Push the build 🔥",time:"12:41",unread:3,group:true},
  {id:2,name:"Zara Khan",av:"👩",status:"online",last:"Okay I'll send it ✅",time:"11:58",unread:1,group:false},
  {id:3,name:"Rayan Malik",av:"🧑",status:"away",last:"bhai kal milte hain 🤝",time:"10:20",unread:0,group:false},
  {id:4,name:"Mehak Siddiqui",av:"🌸",status:"online",last:"Haha so funny 😂",time:"09:05",unread:5,group:false},
  {id:5,name:"Hamza Bhai",av:"🧔",status:"offline",last:"Kal tak bhej deta hoon",time:"Yesterday",unread:0,group:false},
];

const initMsgs = [
  {id:1,text:"Assalam o Alaikum! 👋 Meeting at 3pm confirm hai?",out:false,time:"10:00"},
  {id:2,text:"Wa Alaikum Assalam! Haan bilkul ready hoon ✅",out:true,time:"10:02"},
  {id:3,text:"Client ki nayi feature request aayi hai 🚨",out:false,time:"10:05"},
  {id:4,text:"Seriously?! Kaunsi feature?",out:true,time:"10:06"},
  {id:5,text:"Real-time notifications chahiye 🔔 Deadline Sunday hai",out:false,time:"10:08"},
  {id:6,text:"Sunday?! 😅 Theek hai socket.io se ho jayega",out:true,time:"10:10"},
  {id:7,text:"You're the GOAT bro 🐐",out:false,time:"10:12"},
  {id:8,text:"ZapTalk mein voice messages bhi dalo! 🎙️",out:false,time:"12:38"},
  {id:9,text:"Next sprint mein daalte hain 🎯",out:true,time:"12:40"},
];

const emojis=["😂","❤️","🔥","✅","😅","🙏","😎","💯","🚀","👍","😮","🎯","💪","🤔","😊","⚡","🌸","🎉","👏","🥳"];

export default function ZapTalk(){
  const [dark,setDark]=useState(false);
  const [active,setActive]=useState(chats[0]);
  const [list,setList]=useState(chats);
  const [msgs,setMsgs]=useState(initMsgs);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const [showEmoji,setShowEmoji]=useState(false);
  const [search,setSearch]=useState("");
  const [mid,setMid]=useState(100);
  const endRef=useRef(null);

  const c={
    sb:dark?"#111b21":"#fff",
    sbH:dark?"#202c33":"#f0f2f5",
    bOut:dark?"#005c4b":"#dcf8c6",
    bIn:dark?"#202c33":"#fff",
    txt:dark?"#e9edef":"#111b21",
    muted:dark?"#8696a0":"#667781",
    border:dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)",
    inp:dark?"#2a3942":"#fff",
    inpArea:dark?"#202c33":"#f0f2f5",
    accent:"#25d366",
    active2:dark?"#2a3942":"#f0f2f5",
    tick:"#53bdeb",
  };

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[msgs,typing]);

  const now=()=>{const d=new Date();return d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0");};

  const send=()=>{
    const t=input.trim();if(!t)return;
    setMsgs(p=>[...p,{id:mid,text:t,out:true,time:now()}]);
    setMid(m=>m+1);setInput("");setShowEmoji(false);setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      setMsgs(p=>[...p,{id:mid+1,text:replies[Math.floor(Math.random()*replies.length)],out:false,time:now()}]);
      setMid(m=>m+2);
    },1400+Math.random()*900);
  };

  const filtered=list.filter(ch=>ch.name.toLowerCase().includes(search.toLowerCase()));
  const sc=s=>s==="online"?"#25d366":s==="away"?"#f59e0b":c.muted;

  const wpLight=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e8d5b7'/%3E%3Ccircle cx='15' cy='15' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Ccircle cx='55' cy='15' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Ccircle cx='35' cy='35' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Ccircle cx='75' cy='35' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Ccircle cx='15' cy='55' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Ccircle cx='55' cy='55' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Ccircle cx='35' cy='75' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Ccircle cx='75' cy='75' r='1.5' fill='%23c9b99a' opacity='.6'/%3E%3Cpath d='M25 5 Q30 15 25 25 Q20 15 25 5Z' fill='%23b8a07a' opacity='.18'/%3E%3Cpath d='M65 45 Q70 55 65 65 Q60 55 65 45Z' fill='%23b8a07a' opacity='.18'/%3E%3C/svg%3E")`;
  const wpDark=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%230b141a'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23fff' opacity='.04'/%3E%3Ccircle cx='50' cy='10' r='1' fill='%23fff' opacity='.04'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%23fff' opacity='.04'/%3E%3Ccircle cx='70' cy='30' r='1' fill='%23fff' opacity='.04'/%3E%3C/svg%3E")`;

  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"-apple-system,'Segoe UI',sans-serif",background:c.sb,color:c.txt,overflow:"hidden"}}>

      {/* SIDEBAR */}
      <div style={{width:300,minWidth:300,background:c.sb,borderRight:`1px solid ${c.border}`,display:"flex",flexDirection:"column"}}>
        <div style={{background:c.sbH,padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#25d366,#128c7e)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>⚡</div>
          <div style={{flex:1,fontSize:18,fontWeight:700,color:c.txt}}>ZapTalk</div>
          <span onClick={()=>setDark(d=>!d)} style={{fontSize:20,cursor:"pointer",padding:4,userSelect:"none"}}>{dark?"☀️":"🌙"}</span>
          <span style={{fontSize:20,color:c.muted,cursor:"pointer",padding:4}}>⋮</span>
        </div>
        <div style={{padding:"8px 12px",borderBottom:`1px solid ${c.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:c.inpArea,borderRadius:8,padding:"7px 12px"}}>
            <span style={{color:c.muted}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search or start new chat"
              style={{flex:1,background:"none",border:"none",outline:"none",color:c.txt,fontSize:14,fontFamily:"inherit"}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {filtered.map(ch=>{
            const isAct=active.id===ch.id;
            return(
              <div key={ch.id} onClick={()=>{setActive(ch);setList(p=>p.map(x=>x.id===ch.id?{...x,unread:0}:x));setMsgs(initMsgs);setTyping(false);}}
                style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",cursor:"pointer",background:isAct?c.active2:"transparent",borderBottom:`1px solid ${c.border}`}}>
                <div style={{position:"relative",flexShrink:0}}>
                  <div style={{width:50,height:50,borderRadius:"50%",background:c.inpArea,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{ch.av}</div>
                  {ch.status!=="offline"&&<div style={{width:11,height:11,borderRadius:"50%",background:sc(ch.status),border:`2px solid ${c.sb}`,position:"absolute",bottom:1,right:1}}/>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:15,fontWeight:500}}>{ch.name}</span>
                    <span style={{fontSize:12,color:ch.unread>0?c.accent:c.muted}}>{ch.time}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:13,color:c.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,marginRight:6}}>{ch.last}</span>
                    {ch.unread>0&&<span style={{background:c.accent,color:"#fff",fontSize:12,fontWeight:600,minWidth:20,height:20,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 5px"}}>{ch.unread}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAT PANEL */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0,position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"8px 16px",background:c.sbH,borderBottom:`1px solid ${c.border}`,minHeight:58,zIndex:10}}>
          <div style={{position:"relative"}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:c.inpArea,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{active.av}</div>
            {active.status!=="offline"&&<div style={{width:10,height:10,borderRadius:"50%",background:sc(active.status),border:`2px solid ${c.sbH}`,position:"absolute",bottom:1,right:1}}/>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,fontWeight:600}}>{active.name}</div>
            <div style={{fontSize:12,color:typing?c.accent:c.muted}}>{typing?"typing…":active.status==="online"?"online":active.status==="away"?"away":"last seen recently"}</div>
          </div>
          {["🔍","📞","📹","⋮"].map((ic,i)=>(
            <div key={i} style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:"50%",fontSize:18,color:c.muted}}>{ic}</div>
          ))}
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"12px 6%",display:"flex",flexDirection:"column",gap:3,backgroundImage:dark?wpDark:wpLight,backgroundRepeat:"repeat"}}>
          <div style={{display:"flex",justifyContent:"center",margin:"6px 0"}}>
            <span style={{background:dark?"rgba(17,27,33,0.85)":"rgba(255,255,255,0.85)",backdropFilter:"blur(4px)",padding:"4px 14px",borderRadius:8,fontSize:12,color:c.muted,fontWeight:500}}>TODAY</span>
          </div>
          {msgs.map(m=>(
            <div key={m.id} style={{display:"flex",justifyContent:m.out?"flex-end":"flex-start",marginBottom:1}}>
              <div style={{maxWidth:"65%",padding:"6px 10px 4px",borderRadius:m.out?"8px 0 8px 8px":"0 8px 8px 8px",background:m.out?c.bOut:c.bIn,color:c.txt,fontSize:14.5,lineHeight:1.5,boxShadow:dark?"0 1px 2px rgba(0,0,0,0.4)":"0 1px 2px rgba(0,0,0,0.12)",position:"relative",wordBreak:"break-word"}}>
                <div style={{position:"absolute",top:0,[m.out?"right":"left"]:-8,width:8,height:13,background:m.out?c.bOut:c.bIn,clipPath:m.out?"polygon(0 0,100% 0,0 100%)":"polygon(100% 0,0 0,100% 100%)"}}/>
                {m.text}
                <span style={{display:"inline-flex",alignItems:"center",gap:3,marginLeft:8,float:"right",marginTop:3}}>
                  <span style={{fontSize:11,color:c.muted}}>{m.time}</span>
                  {m.out&&<span style={{fontSize:13,color:c.tick}}>✓✓</span>}
                </span>
              </div>
            </div>
          ))}
          {typing&&(
            <div style={{display:"flex",justifyContent:"flex-start"}}>
              <div style={{padding:"10px 14px",borderRadius:"0 8px 8px 8px",background:c.bIn,boxShadow:dark?"0 1px 2px rgba(0,0,0,0.4)":"0 1px 2px rgba(0,0,0,0.12)",display:"flex",gap:5,alignItems:"center",position:"relative"}}>
                <div style={{position:"absolute",top:0,left:-8,width:8,height:13,background:c.bIn,clipPath:"polygon(100% 0,0 0,100% 100%)"}}/>
                {[0,200,400].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:c.muted,animation:`wb 1.2s ${d}ms infinite`}}/>)}
              </div>
            </div>
          )}
          <div ref={endRef}/>
        </div>

        {showEmoji&&(
          <div style={{position:"absolute",bottom:66,left:12,background:dark?"#233138":"#fff",border:`1px solid ${c.border}`,borderRadius:12,padding:10,display:"flex",flexWrap:"wrap",gap:4,width:255,boxShadow:"0 8px 24px rgba(0,0,0,0.2)",zIndex:200}}>
            {emojis.map(e=><span key={e} onClick={()=>{setInput(i=>i+e);setShowEmoji(false);}} style={{fontSize:24,cursor:"pointer",padding:"3px 5px",borderRadius:6}}>{e}</span>)}
          </div>
        )}

        <div style={{padding:"8px 12px",background:c.inpArea,borderTop:`1px solid ${c.border}`,display:"flex",alignItems:"flex-end",gap:8}}>
          <div onClick={()=>setShowEmoji(s=>!s)} style={{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:"50%",fontSize:22,color:c.muted,userSelect:"none"}}>😊</div>
          <div style={{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:"50%",fontSize:20,color:c.muted}}>📎</div>
          <div style={{flex:1,background:c.inp,borderRadius:24,padding:"9px 16px",display:"flex",alignItems:"center",gap:8,boxShadow:dark?"none":"0 1px 3px rgba(0,0,0,0.08)"}}>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder="Type a message" rows={1}
              style={{flex:1,background:"none",border:"none",outline:"none",color:c.txt,fontFamily:"inherit",fontSize:15,resize:"none",maxHeight:80,lineHeight:1.5}}/>
            <span style={{fontSize:20,color:c.muted,cursor:"pointer"}}>📷</span>
          </div>
          <div onClick={send} style={{width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,#25d366,#128c7e)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20,boxShadow:"0 2px 8px rgba(37,211,102,0.4)",userSelect:"none"}}>
            {input.trim()?"➤":"🎙️"}
          </div>
        </div>
      </div>

      <style>{`@keyframes wb{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}textarea{scrollbar-width:none;}textarea::-webkit-scrollbar{display:none}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(134,150,160,0.3);border-radius:3px}`}</style>
    </div>
  );
}
