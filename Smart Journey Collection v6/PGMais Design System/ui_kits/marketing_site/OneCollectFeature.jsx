function OneCollectFeature() {
  return (
    <section style={{background:'#ededed', padding:'120px 40px'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'.9fr 1.1fr', gap:64, alignItems:'center'}}>
        <div>
          <div style={{fontFamily:'Lato,sans-serif', fontWeight:500, fontSize:12, letterSpacing:'.22em', textTransform:'uppercase', color:'#0120eb', marginBottom:16}}>EXCLUSIVO · ONE COLLECT</div>
          <h2 style={{fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:52, lineHeight:1.05, letterSpacing:'-.02em', color:'#172c66', margin:'0 0 16px'}}>
            O único sistema <span style={{color:'#40eb4f'}}>phygital</span><br/>do mercado.
          </h2>
          <p style={{fontFamily:'Poppins,sans-serif', fontSize:17, lineHeight:1.55, color:'#4a4e5e', margin:'0 0 24px'}}>
            Integração omnichannel nativa, portais white-label de autonegociação e agentes digitais híbridos em uma operação só. Controle total da estratégia, transparência absoluta na rastreabilidade.
          </p>
          <ul style={{listStyle:'none', padding:0, margin:'0 0 32px', display:'flex', flexDirection:'column', gap:10, fontFamily:'Poppins,sans-serif', fontSize:14, color:'#172c66'}}>
            {['Omnichannel nativo — SMS, voz, e-mail, WhatsApp, portal','Smart Journey Collection com IA generativa','Cocriação consultiva no modelo full service','Rastreabilidade total das interações'].map(t => (
              <li key={t} style={{display:'flex', alignItems:'flex-start', gap:10}}>
                <span style={{width:20, height:20, borderRadius:'50%', background:'rgba(64,235,79,.2)', color:'#0a6614', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0}}><Icon.check/></span>
                {t}
              </li>
            ))}
          </ul>
          <button style={{all:'unset', cursor:'pointer', background:'#172c66', color:'#ededed', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, padding:'13px 24px', borderRadius:12, display:'inline-flex', alignItems:'center', gap:8}}>
            Conheça o ONE Collect <Icon.arrow/>
          </button>
        </div>
        <div style={{position:'relative', height:520, background:'#172c66', borderRadius:24, overflow:'hidden', padding:20, boxShadow:'0 24px 60px rgba(23,44,102,.22)'}}>
          <div style={{position:'absolute', inset:'-20% -10% auto auto', width:600, height:600, background:'radial-gradient(40% 60% at 30% 40%, rgba(64,235,79,.35), transparent 60%), radial-gradient(45% 60% at 75% 70%, rgba(1,32,235,.55), transparent 60%)', filter:'blur(40px)', opacity:.8, pointerEvents:'none'}}/>
          <div style={{position:'relative', height:'100%', display:'flex', flexDirection:'column', gap:12}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 4px'}}>
              <div style={{display:'flex', gap:6}}>
                <span style={{width:10,height:10,borderRadius:'50%',background:'#ff5f57'}}/>
                <span style={{width:10,height:10,borderRadius:'50%',background:'#ffbd2e'}}/>
                <span style={{width:10,height:10,borderRadius:'50%',background:'#28c940'}}/>
              </div>
              <div style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.6)'}}>app.onecollect.pgmais.com.br</div>
              <div style={{width:60}}/>
            </div>
            {/* Dashboard preview */}
            <div style={{background:'#0d1b44', borderRadius:14, border:'1px solid rgba(237,237,237,.08)', padding:18, display:'flex', flexDirection:'column', gap:14, flex:1}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div>
                  <div style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:18, color:'#ededed'}}>Dashboard · Outubro</div>
                  <div style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.55)'}}>Último refresh · há 2 min</div>
                </div>
                <span style={{background:'rgba(64,235,79,.14)', color:'#40eb4f', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:11, padding:'5px 10px', borderRadius:9999}}>AO VIVO</span>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10}}>
                {[['Recuperação','R$ 4,2M','+48%'],['Acordos','1.284','+22%'],['Ticket médio','R$ 3.270','+9%']].map(([l,v,d]) => (
                  <div key={l} style={{background:'rgba(237,237,237,.04)', border:'1px solid rgba(237,237,237,.08)', borderRadius:10, padding:12}}>
                    <div style={{fontFamily:'Poppins,sans-serif', fontSize:10, color:'rgba(237,237,237,.55)', textTransform:'uppercase', letterSpacing:'.1em'}}>{l}</div>
                    <div style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:20, color:'#ededed', marginTop:4}}>{v}</div>
                    <div style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'#40eb4f', fontWeight:600}}>{d}</div>
                  </div>
                ))}
              </div>
              {/* fake chart */}
              <div style={{flex:1, background:'rgba(237,237,237,.04)', border:'1px solid rgba(237,237,237,.08)', borderRadius:10, padding:14, position:'relative', overflow:'hidden'}}>
                <div style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.55)'}}>Performance por canal</div>
                <svg viewBox="0 0 400 160" style={{width:'100%', height:'calc(100% - 20px)'}}>
                  <defs>
                    <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#40eb4f" stopOpacity=".6"/>
                      <stop offset="100%" stopColor="#40eb4f" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,130 C40,80 80,110 120,60 C160,30 200,90 240,55 C280,25 320,70 400,30 L400,160 L0,160 Z" fill="url(#grad)"/>
                  <path d="M0,130 C40,80 80,110 120,60 C160,30 200,90 240,55 C280,25 320,70 400,30" fill="none" stroke="#40eb4f" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.OneCollectFeature = OneCollectFeature;
