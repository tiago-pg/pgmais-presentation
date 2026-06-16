function KpiRow() {
  const k = [
    {l:'Recuperação · MTD', v:'R$ 4.218k', d:'+48%', pos:true},
    {l:'Acordos fechados', v:'1.284', d:'+22%', pos:true},
    {l:'Ticket médio', v:'R$ 3.270', d:'+9%', pos:true},
    {l:'Custo por acordo', v:'R$ 18,40', d:'−37%', pos:true},
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, padding:'24px 28px'}}>
      {k.map(x => (
        <div key={x.l} style={{padding:18, background:'rgba(237,237,237,.04)', border:'1px solid rgba(237,237,237,.08)', borderRadius:16}}>
          <div style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.55)', textTransform:'uppercase', letterSpacing:'.12em'}}>{x.l}</div>
          <div style={{display:'flex', alignItems:'baseline', gap:10, marginTop:8}}>
            <div style={{fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:28, color:'#ededed', letterSpacing:'-.02em'}}>{x.v}</div>
            <div style={{fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:600, color:x.pos ? '#40eb4f' : '#ff6b88'}}>{x.d}</div>
          </div>
          {/* Mini sparkline */}
          <svg viewBox="0 0 100 24" style={{width:'100%', height:24, marginTop:8}}>
            <path d="M0 20 Q 20 8 40 14 T 80 8 L100 4" fill="none" stroke="#40eb4f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
window.KpiRow = KpiRow;
