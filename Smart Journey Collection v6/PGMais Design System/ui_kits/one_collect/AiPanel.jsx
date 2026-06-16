function AiPanel() {
  const suggestions = [
    {t:'1.284 clientes elegíveis para oferta de 12x sem juros', why:'Clusterização por comportamento + scoring de propensão.'},
    {t:'Migrar 412 contratos de SMS → WhatsApp', why:'WhatsApp supera SMS em 2,3× no segmento analisado.'},
    {t:'Pausar onda 4 da campanha CRED.ON', why:'Saturação detectada. Risco de atrito alto.'},
  ];
  return (
    <aside style={{width:340, borderLeft:'1px solid rgba(237,237,237,.06)', padding:'24px 22px', display:'flex', flexDirection:'column', gap:16, background:'#0d1b44'}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:36, height:36, borderRadius:10, background:'rgba(64,235,79,.14)', color:'#40eb4f', display:'flex', alignItems:'center', justifyContent:'center'}}><OCIcon.sparkle/></div>
        <div><div style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:15, color:'#ededed'}}>IA · Copiloto</div><div style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.55)'}}>3 sugestões · há 2 min</div></div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {suggestions.map((s,i) => (
          <div key={i} style={{padding:14, background:'rgba(237,237,237,.04)', border:'1px solid rgba(237,237,237,.08)', borderRadius:12}}>
            <div style={{fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:600, color:'#ededed', lineHeight:1.45}}>{s.t}</div>
            <div style={{fontFamily:'Poppins,sans-serif', fontSize:12, color:'rgba(237,237,237,.6)', lineHeight:1.5, marginTop:6}}>{s.why}</div>
            <div style={{display:'flex', gap:8, marginTop:10}}>
              <button style={{all:'unset', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700, color:'#172c66', background:'#40eb4f', padding:'7px 12px', borderRadius:8}}>Aplicar</button>
              <button style={{all:'unset', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontSize:12, color:'rgba(237,237,237,.7)', padding:'7px 12px'}}>Adiar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat composer */}
      <div style={{marginTop:'auto', padding:12, background:'rgba(237,237,237,.04)', border:'1px solid rgba(237,237,237,.08)', borderRadius:12}}>
        <div style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.5)', marginBottom:8}}>Pergunte ao Copiloto</div>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <input placeholder="ex: quais ondas saturaram esta semana?" style={{all:'unset', flex:1, fontFamily:'Poppins,sans-serif', fontSize:13, color:'#ededed'}}/>
          <button style={{all:'unset', cursor:'pointer', width:32, height:32, borderRadius:8, background:'#40eb4f', color:'#172c66', display:'flex', alignItems:'center', justifyContent:'center'}}><OCIcon.send/></button>
        </div>
      </div>
    </aside>
  );
}
window.AiPanel = AiPanel;
