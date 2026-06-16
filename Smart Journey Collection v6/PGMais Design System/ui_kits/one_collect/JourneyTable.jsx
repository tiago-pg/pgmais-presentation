function JourneyTable() {
  const rows = [
    {c:'Banco Alpha · Cartão',ph:'Preventivo',ch:['SMS','WA','Voz'],st:'Em execução',hit:'94%',rec:'R$ 312k',wave:'2/5'},
    {c:'Varejo+ · Financiamento',ph:'Curativo',ch:['WA','Email','Voz'],st:'Em execução',hit:'71%',rec:'R$ 228k',wave:'4/6'},
    {c:'CRED.ON · Pessoal',ph:'Acordo',ch:['WA','Portal'],st:'Pausada',hit:'—',rec:'R$ 41k',wave:'—'},
    {c:'Telefonia BR · Pós-pago',ph:'Preventivo',ch:['SMS','WA'],st:'Em execução',hit:'88%',rec:'R$ 193k',wave:'1/3'},
    {c:'Segurus · Auto',ph:'Curativo',ch:['Voz IA','WA'],st:'Em execução',hit:'62%',rec:'R$ 127k',wave:'3/4'},
    {c:'Utilidades · Energia',ph:'Preventivo',ch:['SMS'],st:'Rascunho',hit:'—',rec:'—',wave:'—'},
  ];
  const chBg = {SMS:'rgba(1,32,235,.18)', WA:'rgba(64,235,79,.18)', Voz:'rgba(255,184,0,.18)','Voz IA':'rgba(255,184,0,.18)', Email:'rgba(237,237,237,.08)', Portal:'rgba(255,100,180,.18)'};
  const chFg = {SMS:'#7a8dff', WA:'#40eb4f', Voz:'#ffd16b','Voz IA':'#ffd16b', Email:'#ededed', Portal:'#ff9ec6'};
  const stBg = {'Em execução':'rgba(64,235,79,.14)','Pausada':'rgba(237,237,237,.08)','Rascunho':'rgba(255,184,0,.14)'};
  const stFg = {'Em execução':'#40eb4f','Pausada':'rgba(237,237,237,.65)','Rascunho':'#ffd16b'};

  return (
    <div style={{margin:'4px 28px 28px', background:'rgba(237,237,237,.04)', border:'1px solid rgba(237,237,237,.08)', borderRadius:18, overflow:'hidden'}}>
      <div style={{display:'grid', gridTemplateColumns:'2.6fr 1fr 1.6fr 1.1fr .8fr 1fr .7fr', padding:'14px 20px', fontFamily:'Poppins,sans-serif', fontSize:11, textTransform:'uppercase', letterSpacing:'.12em', color:'rgba(237,237,237,.5)', borderBottom:'1px solid rgba(237,237,237,.08)'}}>
        <div>Campanha</div><div>Fase</div><div>Canais</div><div>Status</div><div>Onda</div><div>Recuperado</div><div>Hit</div>
      </div>
      {rows.map((r,i) => (
        <div key={i} style={{display:'grid', gridTemplateColumns:'2.6fr 1fr 1.6fr 1.1fr .8fr 1fr .7fr', padding:'16px 20px', fontFamily:'Poppins,sans-serif', fontSize:13, color:'#ededed', borderBottom: i<rows.length-1 ? '1px solid rgba(237,237,237,.05)':'none', alignItems:'center'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:32, height:32, borderRadius:8, background:'rgba(64,235,79,.14)', color:'#40eb4f', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:12}}>{r.c.split(' ')[0].slice(0,2).toUpperCase()}</div>
            <div><div style={{fontWeight:600}}>{r.c.split(' · ')[0]}</div><div style={{fontSize:11, color:'rgba(237,237,237,.5)'}}>{r.c.split(' · ')[1]}</div></div>
          </div>
          <div>{r.ph}</div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>{r.ch.map(c => <span key={c} style={{background:chBg[c], color:chFg[c], fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:6}}>{c}</span>)}</div>
          <div><span style={{background:stBg[r.st], color:stFg[r.st], fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:9999}}>{r.st}</span></div>
          <div style={{fontFamily:'Lato,sans-serif', fontWeight:700}}>{r.wave}</div>
          <div style={{fontWeight:600}}>{r.rec}</div>
          <div style={{color:r.hit==='—' ? 'rgba(237,237,237,.4)' : '#40eb4f', fontWeight:700}}>{r.hit}</div>
        </div>
      ))}
    </div>
  );
}
window.JourneyTable = JourneyTable;
