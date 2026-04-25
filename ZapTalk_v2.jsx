import { useState, useRef, useEffect } from "react";

const replies = [
  "Haan bilkul! 👍",
  "Theek hai yaar, kar lete hain 💪",
  "Wah bhai, mast idea hai! 🔥",
  "Ok ok, main dekh raha hoon ✅",
  "Lol 😂😂 sahi kaha",
  "Bhai chill karo, ho jayega 😎",
  "Send kar do yaar jaldi se ⚡",
  "Done! Deploy ho gaya 🚀",
  "Acha samajh gaya 🤔",
  "ZapTalk best hai! 💯",
  "Yes bhai, fully agree 🙏",
];

const chats = [
  { id:1, name:"Dev Team 🚀", avatar:"💻", status:"online", last:"Ali: Push the new build 🔥", time:"12:41", unread:3, pinned:true, group:true },
  { id:2, name:"Zara Khan", avatar:"👩", status:"online", last:"Okay I'll send it now ✅", time:"11:58", unread:1, pinned:true, group:false },
  { id:3, name:"Rayan Malik", avatar:"🧑", status:"away", last:"bhai kal milte hain 🤝", time:"10:20", unread:0, pinned:false, group:false },
  { id:4, name:"Mehak Siddiqui", avatar:"🌸", status:"online", last:"Haha yes that's funny 😂", time:"09:05", unread:5, pinned:false, group:false },
  { id:5, name:"Hamza Bhai", avatar:"🧔", status:"offline", last:"Kal tak bhej deta hoon", time:"Yesterday", unread:0, pinned:false, group:false },
  { id:6, name:"Design Crew 🎨", avatar:"🎨", status:"online", last:"Sara: Mockups ready 🖼️", time:"Mon", unread:0, pinned:false, group:true },
];

const initMsgs = [
  { id:1, text:"Assalam o Alaikum everyone! 👋 Dev meeting at 3pm confirm hai?", out:false, time:"10:00", status:"read" },
  { id:2, text:"Wa Alaikum Assalam! Haan bilkul, main ready hoon ✅", out:true, time:"10:02", status:"read" },
  { id:3, text:"Perfect! Koi nayi feature request aayi hai client ki taraf se 🚨", out:false, time:"10:05", status:"read" },
  { id:4, text:"Seriously?! Kaunsi feature? Dark mode wali thi na?", out:true, time:"10:06", status:"read" },
  { id:5, text:"Haan aur real-time notifications bhi chahiye 🔔 Deadline Sunday hai yaar", out:false, time:"10:08", status:"read" },
  { id:6, text:"Sunday?! 😅 Theek hai, socket.io se ho jayega bhai tension mat lo", out:true, time:"10:10", status:"read" },
  { id:7, text:"You're the GOAT bro 🐐 Main UI handle karta hoon", out:false, time:"10:12", status:"read" },
  { id:8, text:"ZapTalk ke liye voice messages bhi add karo! 🎙️", out:false, time:"12:38", status:"read" },
  { id:9, text:"Lol yahi soch raha tha! Next sprint mein daalte hain 🎯", out:true, time:"12:40", status:"read" },
];

const emojis = ["😂","❤️","🔥","✅","😅","🙏","😎","💯","🚀","👍","😮","🎯","💪","🤔","😊","⚡","🌸","🎉","👏","🥳"];

// WhatsApp-style chat background SVG pattern (tiled)
const WP_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cdefs%3E%3Cpattern id='p' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='%23e8f5e2'/%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Ccircle cx='50' cy='10' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Ccircle cx='30' cy='30' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Ccircle cx='70' cy='30' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Ccircle cx='10' cy='50' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Ccircle cx='50' cy='50' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Ccircle cx='30' cy='70' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Ccircle cx='70' cy='70' r='1.2' fill='%23c5e0b5' opacity='0.7'/%3E%3Cpath d='M20 0 Q25 10 20 20 Q15 10 20 0Z' fill='%23b8d9a8' opacity='0.25'/%3E%3Cpath d='M60 40 Q65 50 60 60 Q55 50 60 40Z' fill='%23b8d9a8' opacity='0.25'/%3E%3Cpath d='M0 60 Q5 70 0 80 Q-5 70 0 60Z' fill='%23b8d9a8' opacity='0.2'/%3E%3Cpath d='M40 20 L44 28 L36 28Z' fill='%23c5e0b5' opacity='0.2'/%3E%3Cpath d='M5 35 L9 43 L1 43Z' fill='%23c5e0b5' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23p)'/%3E%3C/svg%3E")`;

export default function ZapTalk() {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [chatList, setChatList] = useState(chats);
  const [messages, setMessages] = useState(initMsgs);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [search, setSearch] = useState("");
  const [msgId, setMsgId] = useState(100);
  const [theme, setTheme] = useState("light"); // light | dark
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const dark = theme === "dark";

  const T = {
    sidebarBg: dark ? "#111b21" : "#ffffff",
    sidebarHeader: dark ? "#202c33" : "#f0f2f5",
    chatBg: dark ? "#0b141a" : "#efeae2",
    bubbleOut: dark ? "#005c4b" : "#dcf8c6",
    bubbleIn: dark ? "#202c33" : "#ffffff",
    bubbleOutText: dark ? "#e9edef" : "#111b21",
    bubbleInText: dark ? "#e9edef" : "#111b21",
    headerBg: dark ? "#202c33" : "#f0f2f5",
    inputBg: dark ? "#2a3942" : "#ffffff",
    inputAreaBg: dark ? "#202c33" : "#f0f2f5",
    text: dark ? "#e9edef" : "#111b21",
    textMuted: dark ? "#8696a0" : "#667781",
    border: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
    accent: "#25d366",
    accentDark: "#128c7e",
    searchBg: dark ? "#111b21" : "#f0f2f5",
    unreadBg: "#25d366",
    hoverBg: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    activeBg: dark ? "#2a3942" : "#f0f2f5",
    timeText: dark ? "#667781" : "#667781",
    tickBlue: "#53bdeb",
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, typing]);

  const now = () => {
    const d = new Date();
    return d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0");
  };

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id:msgId, text, out:true, time:now(), status:"sent" }]);
    setMsgId(m => m+1);
    setInput(""); setShowEmoji(false); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id:msgId+1, text:replies[Math.floor(Math.random()*replies.length)], out:false, time:now(), status:"read" }]);
      setMsgId(m => m+2);
    }, 1400 + Math.random()*900);
  };

  const handleKey = e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } };

  const openChat = (chat) => {
    setActiveChat(chat);
    setChatList(prev => prev.map(c => c.id===chat.id ? {...c,unread:0} : c));
    setMessages(initMsgs); setTyping(false);
  };

  const statusColor = s => s==="online" ? "#25d366" : s==="away" ? "#f59e0b" : T.textMuted;

  const filtered = chatList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"-apple-system,'Segoe UI',Helvetica,Arial,sans-serif", background:T.sidebarBg, color:T.text, overflow:"hidden" }}>

      {/* ─── SIDEBAR ─── */}
      <div style={{ width:320, minWidth:320, background:T.sidebarBg, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ background:T.sidebarHeader, padding:"10px 16px", display:"flex", alignItems:"center", gap:10 }}>
          {/* Avatar */}
          <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#25d366,#128c7e)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>⚡</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17, fontWeight:700, color:T.text, letterSpacing:-0.3 }}>ZapTalk</div>
          </div>
          {/* Theme toggle */}
          <button onClick={() => setTheme(t => t==="light"?"dark":"light")}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, color:T.textMuted, padding:"4px 6px", borderRadius:6 }}
            title="Toggle theme">{dark ? "☀️" : "🌙"}</button>
          <span style={{ fontSize:20, color:T.textMuted, cursor:"pointer" }}>🔮</span>
          <span style={{ fontSize:20, color:T.textMuted, cursor:"pointer" }}>⋮</span>
        </div>

        {/* Search */}
        <div style={{ padding:"8px 12px", background:T.sidebarBg, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:T.searchBg, borderRadius:8, padding:"7px 12px" }}>
            <span style={{ color:T.textMuted, fontSize:14 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search or start new chat"
              style={{ flex:1, background:"none", border:"none", outline:"none", color:T.text, fontSize:14, fontFamily:"inherit" }} />
          </div>
        </div>

        {/* Chat List */}
        <div style={{ flex:1, overflowY:"auto" }}>
          {filtered.map((c, i) => {
            const isActive = activeChat.id === c.id;
            return (
              <div key={c.id} onClick={() => openChat(c)}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer", background: isActive ? T.activeBg : "transparent", borderBottom:`1px solid ${T.border}`, transition:"background 0.1s" }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = T.hoverBg; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                {/* Avatar with status */}
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:50, height:50, borderRadius:"50%", background: dark ? "#2a3942" : "#dfe5e7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{c.avatar}</div>
                  {c.status !== "offline" && <div style={{ width:12, height:12, borderRadius:"50%", background:statusColor(c.status), border:`2px solid ${T.sidebarBg}`, position:"absolute", bottom:1, right:1 }} />}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:16, fontWeight:500, color:T.text }}>{c.name}</span>
                    <span style={{ fontSize:12, color: c.unread > 0 ? T.accent : T.timeText }}>{c.time}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:13, color:T.textMuted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1, marginRight:6 }}>
                      {c.pinned && "📌 "}{c.last}
                    </span>
                    {c.unread > 0 && <span style={{ background:T.unreadBg, color:"#fff", fontSize:12, fontWeight:600, minWidth:20, height:20, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 5px", flexShrink:0 }}>{c.unread}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── CHAT PANEL ─── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, position:"relative" }}>

        {/* Chat Header */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 16px", background:T.headerBg, borderBottom:`1px solid ${T.border}`, zIndex:10, minHeight:60 }}>
          <div style={{ position:"relative", cursor:"pointer" }}>
            <div style={{ width:42, height:42, borderRadius:"50%", background: dark ? "#2a3942" : "#dfe5e7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{activeChat.avatar}</div>
            {activeChat.status !== "offline" && <div style={{ width:10, height:10, borderRadius:"50%", background:statusColor(activeChat.status), border:`2px solid ${T.headerBg}`, position:"absolute", bottom:1, right:1 }} />}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:16, fontWeight:600, color:T.text }}>{activeChat.name}</div>
            <div style={{ fontSize:12, color: typing ? T.accent : T.textMuted }}>
              {typing ? "typing…" : activeChat.status === "online" ? "online" : activeChat.status === "away" ? "away" : "last seen recently"}
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {["🔍","📞","📹","⋮"].map((ic,i) => (
              <div key={i} style={{ width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", borderRadius:"50%", fontSize:18, color:T.textMuted }}
                onMouseEnter={e => e.currentTarget.style.background = T.hoverBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>{ic}</div>
            ))}
          </div>
        </div>

        {/* Messages Area with WhatsApp wallpaper */}
        <div style={{ flex:1, overflowY:"auto", padding:"12px 8%", display:"flex", flexDirection:"column", gap:2,
          background: dark ? `#0b141a url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%230b141a'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='50' cy='10' r='1' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='70' cy='30' r='1' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='10' cy='50' r='1' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='50' cy='50' r='1' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='30' cy='70' r='1' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='70' cy='70' r='1' fill='%23ffffff' opacity='0.04'/%3E%3C/svg%3E")` : WP_BG,
          backgroundRepeat:"repeat",
        }}>
          {/* Date bubble */}
          <div style={{ display:"flex", justifyContent:"center", margin:"8px 0" }}>
            <div style={{ background: dark ? "rgba(17,27,33,0.85)" : "rgba(255,255,255,0.85)", backdropFilter:"blur(4px)", padding:"4px 14px", borderRadius:8, fontSize:12, color:T.textMuted, fontWeight:500 }}>TODAY</div>
          </div>

          {messages.map(msg => (
            <div key={msg.id} style={{ display:"flex", justifyContent: msg.out ? "flex-end" : "flex-start", marginBottom:2 }}>
              <div style={{
                maxWidth:"65%", padding:"6px 10px 4px",
                borderRadius: msg.out ? "8px 0px 8px 8px" : "0px 8px 8px 8px",
                background: msg.out ? T.bubbleOut : T.bubbleIn,
                color: msg.out ? T.bubbleOutText : T.bubbleInText,
                fontSize:14.5, lineHeight:1.5,
                boxShadow: dark ? "0 1px 2px rgba(0,0,0,0.4)" : "0 1px 2px rgba(0,0,0,0.13)",
                position:"relative",
                wordBreak:"break-word",
              }}>
                {/* Tail (WhatsApp-style) */}
                <div style={{
                  position:"absolute", top:0,
                  [msg.out ? "right" : "left"]: -8,
                  width:8, height:12,
                  background: msg.out ? T.bubbleOut : T.bubbleIn,
                  clipPath: msg.out ? "polygon(0 0, 100% 0, 0 100%)" : "polygon(100% 0, 0 0, 100% 100%)",
                }} />
                {msg.text}
                <div style={{ display:"flex", alignItems:"center", gap:3, justifyContent:"flex-end", marginTop:2, float:"right", marginLeft:8 }}>
                  <span style={{ fontSize:11, color: msg.out ? (dark ? "#8696a0" : "#667781") : T.textMuted }}>{msg.time}</span>
                  {msg.out && <span style={{ fontSize:13, color: msg.status==="read" ? T.tickBlue : T.textMuted, lineHeight:1 }}>✓✓</span>}
                </div>
              </div>
            </div>
          ))}

          {/* Typing */}
          {typing && (
            <div style={{ display:"flex", justifyContent:"flex-start", marginBottom:2 }}>
              <div style={{ padding:"10px 14px", borderRadius:"0px 8px 8px 8px", background:T.bubbleIn, boxShadow: dark ? "0 1px 2px rgba(0,0,0,0.4)" : "0 1px 2px rgba(0,0,0,0.13)", display:"flex", gap:4, alignItems:"center", position:"relative" }}>
                <div style={{ position:"absolute", top:0, left:-8, width:8, height:12, background:T.bubbleIn, clipPath:"polygon(100% 0, 0 0, 100% 100%)" }} />
                {[0,180,360].map((d,i) => (
                  <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:T.textMuted, animation:`wpbounce 1.2s ${d}ms infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Emoji Picker */}
        {showEmoji && (
          <div style={{ position:"absolute", bottom:68, left:16, background: dark ? "#233138" : "#ffffff", border:`1px solid ${T.border}`, borderRadius:12, padding:10, display:"flex", flexWrap:"wrap", gap:4, width:260, boxShadow:"0 8px 30px rgba(0,0,0,0.2)", zIndex:200 }}>
            {emojis.map(e => (
              <span key={e} onClick={() => { setInput(i => i+e); setShowEmoji(false); inputRef.current?.focus(); }}
                style={{ fontSize:24, cursor:"pointer", padding:"3px 5px", borderRadius:6, lineHeight:1 }}>{e}</span>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div style={{ padding:"8px 12px", background:T.inputAreaBg, borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"flex-end", gap:8 }}>
          {/* Emoji + Attach */}
          <div style={{ display:"flex", gap:2 }}>
            <div onClick={() => setShowEmoji(s => !s)} style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", borderRadius:"50%", fontSize:22, color:T.textMuted }}
              onMouseEnter={e => e.currentTarget.style.background = T.hoverBg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>😊</div>
            <div style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", borderRadius:"50%", fontSize:20, color:T.textMuted }}
              onMouseEnter={e => e.currentTarget.style.background = T.hoverBg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>📎</div>
          </div>

          {/* Text input */}
          <div style={{ flex:1, background:T.inputBg, borderRadius:24, padding:"9px 16px", display:"flex", alignItems:"center", gap:8, boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.08)" }}>
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              placeholder="Type a message" rows={1}
              style={{ flex:1, background:"none", border:"none", outline:"none", color:T.text, fontFamily:"inherit", fontSize:15, resize:"none", maxHeight:80, lineHeight:1.5, overflowY:"auto" }} />
            <div style={{ fontSize:20, cursor:"pointer", color:T.textMuted }}>📷</div>
          </div>

          {/* Send / Mic Button */}
          <div onClick={sendMsg} style={{ width:46, height:46, borderRadius:"50%", background:`linear-gradient(135deg,${T.accent},${T.accentDark})`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:20, boxShadow:"0 2px 8px rgba(37,211,102,0.4)", flexShrink:0, transition:"transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            {input.trim() ? "➤" : "🎙️"}
          </div>
        </div>
      </div>

      {/* ─── RIGHT INFO PANEL ─── */}
      <div style={{ width:250, minWidth:250, background: dark ? "#111b21" : "#ffffff", borderLeft:`1px solid ${T.border}`, display:"flex", flexDirection:"column", overflowY:"auto" }}>
        {/* Profile */}
        <div style={{ background: dark ? "#202c33" : "#f0f2f5", padding:"30px 20px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:10, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ width:80, height:80, borderRadius:"50%", background: dark ? "#2a3942" : "#dfe5e7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, border:`3px solid ${T.accent}`, boxShadow:`0 0 0 4px ${dark?"rgba(37,211,102,0.15)":"rgba(37,211,102,0.2)"}` }}>{activeChat.avatar}</div>
          <div style={{ fontSize:18, fontWeight:600, color:T.text, textAlign:"center" }}>{activeChat.name}</div>
          <div style={{ fontSize:13, color:T.textMuted }}>+92 300 ZAP TALK</div>
          <div style={{ display:"flex", gap:16, marginTop:4 }}>
            {["📞","📹","🔍"].map((ic,i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background: dark ? "#2a3942" : "#f0f2f5", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18 }}>{ic}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ fontSize:13, color:T.accent, marginBottom:6, fontWeight:600 }}>About</div>
          <div style={{ fontSize:14, color:T.textMuted }}>Hey there! I'm using ZapTalk ⚡</div>
        </div>

        {/* Media */}
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontSize:13, color:T.text, fontWeight:600 }}>Media, Links, Docs</span>
            <span style={{ fontSize:13, color:T.accent, cursor:"pointer" }}>›</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
            {["🏔️","🌆","🎵","📄","🖼️","📹"].map((m,i) => (
              <div key={i} style={{ aspectRatio:"1", borderRadius:4, background: dark ? "#2a3942" : "#f0f2f5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, cursor:"pointer" }}>{m}</div>
            ))}
          </div>
        </div>

        {/* Mute / Block / Report */}
        <div style={{ padding:"8px 0" }}>
          {[
            { icon:"🔇", label:"Mute Notifications", color:T.text },
            { icon:"👍", label:"Disappearing Messages", color:T.text },
            { icon:"🚫", label:"Block", color:"#ea0038" },
            { icon:"👎", label:"Report", color:"#ea0038" },
          ].map((a,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 20px", cursor:"pointer", color:a.color, fontSize:14 }}
              onMouseEnter={e => e.currentTarget.style.background = T.hoverBg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ fontSize:20 }}>{a.icon}</span>{a.label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes wpbounce {
          0%,60%,100% { transform:translateY(0); opacity:0.6; }
          30% { transform:translateY(-5px); opacity:1; }
        }
        textarea { scrollbar-width:none; }
        textarea::-webkit-scrollbar { display:none; }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(134,150,160,0.3); border-radius:3px; }
      `}</style>
    </div>
  );
}
