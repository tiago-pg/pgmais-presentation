function Footer() {
  const cols = [
    { h:'Ecossistema', links:['Preventivo','Curativo','Autonegociação','ONE Collect','Analytics'] },
    { h:'Empresa', links:['Sobre','Cases','Blog','Carreiras','Imprensa'] },
    { h:'Legal', links:['Termos de uso','Privacidade','LGPD','Segurança'] },
  ];
  return (
    <footer style={{background:'#0d1b44', color:'#ededed', padding:'80px 40px 32px', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', inset:'auto -10% -40% auto', width:600, height:400, background:'radial-gradient(40% 60% at 30% 40%, rgba(64,235,79,.2), transparent 60%), radial-gradient(45% 60% at 75% 70%, rgba(1,32,235,.4), transparent 60%)', filter:'blur(40px)', opacity:.6, pointerEvents:'none'}}/>
      <div style={{position:'relative', maxWidth:1200, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr', gap:40, paddingBottom:48, borderBottom:'1px solid rgba(237,237,237,.12)'}}>
          <div>
            <img src="../../assets/logos/pgmais-horizontal-completa-dark.png" alt="PGMais" style={{height:40}}/>
            <p style={{fontFamily:'Poppins,sans-serif', fontSize:14, lineHeight:1.6, color:'rgba(237,237,237,.7)', marginTop:20, maxWidth:340}}>
              O mais completo ecossistema de relacionamento digital para cobrança do Brasil.
            </p>
            <div style={{fontFamily:'Lato,sans-serif', fontWeight:500, fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'#40eb4f', marginTop:24}}>
              tech, but people first.
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:13, letterSpacing:'.14em', textTransform:'uppercase', color:'#ededed', marginBottom:16}}>{c.h}</div>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10, fontFamily:'Poppins,sans-serif', fontSize:14, color:'rgba(237,237,237,.7)'}}>
                {c.links.map(l => <li key={l} style={{cursor:'pointer'}}>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:28, fontFamily:'Poppins,sans-serif', fontSize:12, color:'rgba(237,237,237,.55)'}}>
          <div>© 2026 PGMais · CNPJ 00.000.000/0001-00 · Todos os direitos reservados.</div>
          <div>comercial@pgmais.com.br · +55 (11) 0000-0000</div>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
