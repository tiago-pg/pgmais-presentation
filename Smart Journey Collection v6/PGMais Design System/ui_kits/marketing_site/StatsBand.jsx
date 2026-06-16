function StatsBand() {
  const stats = [
    {n:'+48%', l:'recuperação média nos clientes PGMais'},
    {n:'37%', l:'redução de custos operacionais'},
    {n:'70%', l:'interação em IA conversacional'},
    {n:'15+', l:'anos dominando a ciência da cobrança'},
  ];
  return (
    <section style={{background:'#172c66', padding:'80px 40px', color:'#ededed'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32}}>
        {stats.map(s => (
          <div key={s.n}>
            <div style={{height:3, width:40, background:'linear-gradient(90deg,#40eb4f,#0120eb)', borderRadius:3, marginBottom:14}}/>
            <div style={{fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:64, lineHeight:1, letterSpacing:'-.03em'}}>{s.n}</div>
            <div style={{fontFamily:'Poppins,sans-serif', fontSize:14, lineHeight:1.45, color:'rgba(237,237,237,.75)', marginTop:10, maxWidth:220}}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.StatsBand = StatsBand;
