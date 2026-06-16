function Hero() {
  return (
    <section style={{position:'relative', padding:'60px 40px 120px', overflow:'hidden'}}>
      {/* gradient blob */}
      <div style={{position:'absolute', inset:'-10% -20% auto auto', width:900, height:900,
        background:'radial-gradient(40% 60% at 30% 40%, rgba(64,235,79,.35) 0%, transparent 60%), radial-gradient(45% 60% at 75% 70%, rgba(1,32,235,.55) 0%, transparent 60%)',
        filter:'blur(30px)', opacity:.85, pointerEvents:'none'}}/>
      <div style={{position:'relative', maxWidth:1200, margin:'0 auto', padding:'60px 40px 40px', display:'grid', gridTemplateColumns:'1.1fr .9fr', gap:48, alignItems:'center'}}>
        <div>
          <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'7px 14px', background:'rgba(237,237,237,.08)', border:'1px solid rgba(237,237,237,.18)', borderRadius:999, color:'#40eb4f', fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:500, letterSpacing:'.14em', textTransform:'uppercase'}}>
            <span style={{width:6, height:6, borderRadius:'50%', background:'#40eb4f'}}/>
            NOVO · ECOSSISTEMA PGMAIS 2026
          </div>
          <h1 style={{fontFamily:'Lato, sans-serif', fontWeight:900, fontSize:76, lineHeight:1, letterSpacing:'-.025em', color:'#ededed', margin:'24px 0 20px'}}>
            Transformando <span style={{color:'#40eb4f'}}>dados</span><br/>em sabedoria estratégica.
          </h1>
          <p style={{fontFamily:'Poppins, sans-serif', fontSize:19, lineHeight:1.55, color:'rgba(237,237,237,.78)', maxWidth:560, margin:0}}>
            O mais completo ecossistema de relacionamento digital para cobrança do Brasil. Tecnologia proprietária, inteligência aplicada e experiência humana — do adimplente ao inadimplente.
          </p>
          <div style={{display:'flex', gap:12, marginTop:36, alignItems:'center'}}>
            <button style={{all:'unset', cursor:'pointer', background:'#40eb4f', color:'#172c66', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, padding:'15px 26px', borderRadius:12, display:'inline-flex', alignItems:'center', gap:10}}>
              Quero entender o ecossistema <Icon.arrow/>
            </button>
            <button style={{all:'unset', cursor:'pointer', color:'#ededed', fontFamily:'Poppins,sans-serif', fontWeight:500, fontSize:15, padding:'15px 18px'}}>
              Ver cases reais
            </button>
          </div>
          <div style={{display:'flex', gap:32, marginTop:48, paddingTop:28, borderTop:'1px solid rgba(237,237,237,.12)', fontFamily:'Poppins,sans-serif'}}>
            <div><div style={{fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:28, color:'#ededed'}}>+48%</div><div style={{fontSize:12, color:'rgba(237,237,237,.6)'}}>Recuperação</div></div>
            <div><div style={{fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:28, color:'#ededed'}}>37%</div><div style={{fontSize:12, color:'rgba(237,237,237,.6)'}}>Redução de custo</div></div>
            <div><div style={{fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:28, color:'#ededed'}}>70%</div><div style={{fontSize:12, color:'rgba(237,237,237,.6)'}}>Interação IA</div></div>
          </div>
        </div>
        <div style={{position:'relative', height:480}}>
          {/* Floating product mock */}
          <div style={{position:'absolute', top:20, left:30, right:30, bottom:20, borderRadius:24, background:'rgba(237,237,237,.08)', border:'1px solid rgba(237,237,237,.14)', backdropFilter:'blur(12px)', padding:20, display:'flex', flexDirection:'column', gap:12}}>
            <div style={{display:'flex', alignItems:'center', gap:8, fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.6)'}}>
              <span style={{width:8, height:8, borderRadius:'50%', background:'#40eb4f'}}/>
              ONE COLLECT · CAMPANHA · PREVENTIVO
            </div>
            <div style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:18, color:'#ededed'}}>Jornada Smart Collection</div>
            {[
              {ch:'SMS', status:'Entregue', hit:'94%'},
              {ch:'WhatsApp', status:'Lido', hit:'71%'},
              {ch:'Voz IA', status:'Interação', hit:'70%'},
              {ch:'Portal', status:'Negociação', hit:'38%'},
            ].map((c, i) => (
              <div key={c.ch} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'rgba(237,237,237,.05)', borderRadius:12, border:'1px solid rgba(237,237,237,.08)', fontFamily:'Poppins,sans-serif', fontSize:12}}>
                <div style={{width:32, height:32, borderRadius:8, background:'rgba(64,235,79,.12)', color:'#40eb4f', display:'flex',alignItems:'center',justifyContent:'center', fontWeight:700, fontSize:10}}>{c.ch.slice(0,2)}</div>
                <div style={{flex:1, color:'#ededed', fontWeight:500}}>{c.ch}</div>
                <div style={{color:'rgba(237,237,237,.6)'}}>{c.status}</div>
                <div style={{color:'#40eb4f', fontWeight:700}}>{c.hit}</div>
              </div>
            ))}
            <div style={{marginTop:'auto', padding:14, background:'#0d1b44', borderRadius:12, border:'1px solid rgba(64,235,79,.25)', display:'flex', alignItems:'center', gap:10, fontFamily:'Poppins,sans-serif', fontSize:12, color:'rgba(237,237,237,.8)'}}>
              <Icon.sparkle style={{color:'#40eb4f'}}/>
              <div><b style={{color:'#ededed'}}>IA em ação</b> — 1.284 clientes priorizados para a próxima onda.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
