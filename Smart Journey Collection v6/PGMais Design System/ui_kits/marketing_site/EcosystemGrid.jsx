function EcosystemGrid() {
  const items = [
    { icon:'shield', title:'Preventivo', body:'Régua de lembrete antes do vencimento, com cadência adaptativa por perfil.' },
    { icon:'chat', title:'Curativo', body:'Campanhas omnichannel, IA conversacional e agentes digitais híbridos.' },
    { icon:'brain', title:'Inteligência', body:'IA proprietária que transforma dados em conhecimento aplicado à decisão.' },
    { icon:'grid', title:'ONE Collect', body:'Único sistema phygital do mercado — operação unificada em uma tela.' },
    { icon:'people', title:'Autonegociação', body:'Portais white-label que devolvem autonomia ao cliente final.' },
    { icon:'chart', title:'Analytics', body:'Rastreabilidade total de interações e performance em tempo real.' },
  ];
  return (
    <section style={{background:'#ededed', padding:'120px 40px'}}>
      <div style={{maxWidth:1200, margin:'0 auto'}}>
        <div style={{fontFamily:'Lato,sans-serif', fontWeight:500, fontSize:12, letterSpacing:'.22em', textTransform:'uppercase', color:'#4a4e5e', marginBottom:20}}>O ECOSSISTEMA · 6 FRENTES</div>
        <h2 style={{fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:56, lineHeight:1.05, letterSpacing:'-.02em', color:'#172c66', margin:'0 0 16px', maxWidth:820}}>
          Uma cobertura completa, da régua preventiva<br/>à gestão de <span style={{color:'#40eb4f'}}>acordos.</span>
        </h2>
        <p style={{fontFamily:'Poppins,sans-serif', fontSize:18, lineHeight:1.55, color:'#4a4e5e', maxWidth:660, margin:'0 0 48px'}}>
          Tecnologia proprietária + IA especializada + expertise humana construída em 15 anos. Modular para plugar onde faz sentido, full service quando a operação exige.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
          {items.map((it, i) => (
            <div key={it.title} style={{padding:28, background:'#fff', borderRadius:20, border:'1px solid rgba(23,44,102,.08)', display:'flex', flexDirection:'column', gap:14, position:'relative', overflow:'hidden'}}>
              <div style={{width:48, height:48, borderRadius:12, background:'rgba(64,235,79,.14)', color:'#172c66', display:'flex', alignItems:'center', justifyContent:'center'}}>
                {React.createElement(Icon[it.icon])}
              </div>
              <div style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:22, color:'#172c66'}}>{it.title}</div>
              <div style={{fontFamily:'Poppins,sans-serif', fontSize:14, lineHeight:1.55, color:'#4a4e5e'}}>{it.body}</div>
              <a style={{fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, color:'#0120eb', display:'inline-flex', alignItems:'center', gap:6, marginTop:8, cursor:'pointer'}}>Saiba mais <Icon.arrow/></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.EcosystemGrid = EcosystemGrid;
