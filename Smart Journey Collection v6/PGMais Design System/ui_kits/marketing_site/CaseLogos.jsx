function CaseLogos() {
  const fakes = ['BANCO ALPHA', 'Varejo+', 'CRED.ON', 'SEGURUS', 'Telefonia BR', 'Utilidades', 'CorpFin', 'PayUp'];
  return (
    <section style={{background:'#fff', padding:'80px 40px', borderTop:'1px solid rgba(23,44,102,.06)', borderBottom:'1px solid rgba(23,44,102,.06)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', textAlign:'center'}}>
        <div style={{fontFamily:'Lato,sans-serif', fontWeight:500, fontSize:12, letterSpacing:'.22em', textTransform:'uppercase', color:'#4a4e5e', marginBottom:28}}>CONFIADA POR EMPRESAS LÍDERES</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:24, alignItems:'center'}}>
          {fakes.map(n => (
            <div key={n} style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:14, color:'#172c66', opacity:.5, letterSpacing:'.02em', textAlign:'center', padding:8}}>{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.CaseLogos = CaseLogos;
