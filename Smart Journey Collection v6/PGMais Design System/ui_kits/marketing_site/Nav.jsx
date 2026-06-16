function Nav({ dark = false }) {
  const [open, setOpen] = React.useState(false);
  const logo = dark
    ? '../../assets/logos/pgmais-horizontal-reduzida-dark.png'
    : '../../assets/logos/pgmais-horizontal-reduzida-light.png';
  const links = ['Ecossistema', 'Soluções', 'ONE Collect', 'Cases', 'Blog', 'Sobre'];
  const bg = dark ? 'rgba(23,44,102,.65)' : 'rgba(255,255,255,.72)';
  const color = dark ? '#ededed' : '#172c66';
  const subColor = dark ? 'rgba(237,237,237,.7)' : '#4a4e5e';

  return (
    <header style={{position:'sticky', top:0, zIndex:50, padding:'18px 40px'}}>
      <nav style={{
        display:'flex', alignItems:'center', gap:24,
        padding:'14px 22px', background: bg, backdropFilter:'blur(16px)',
        WebkitBackdropFilter:'blur(16px)',
        border:`1px solid ${dark ? 'rgba(237,237,237,.1)' : 'rgba(23,44,102,.08)'}`,
        borderRadius:18, boxShadow:'0 8px 24px rgba(23,44,102,.08)'
      }}>
        <img src={logo} alt="PGMais" style={{height:24}} />
        <div style={{display:'flex', gap:22, marginLeft:12, fontFamily:'Poppins, sans-serif', fontSize:14}}>
          {links.map((l, i) => (
            <a key={l} style={{color: i===0 ? color : subColor, fontWeight: i===0 ? 600 : 400, position:'relative', textDecoration:'none', cursor:'pointer'}}>
              {l}
              {i===0 && <span style={{position:'absolute',left:0,right:0,bottom:-8,height:2,background:'#40eb4f',borderRadius:2}}/>}
            </a>
          ))}
        </div>
        <div style={{marginLeft:'auto', display:'flex', gap:8, alignItems:'center'}}>
          <button style={{all:'unset', cursor:'pointer', color, fontFamily:'Poppins,sans-serif', fontWeight:500, fontSize:13, padding:'8px 14px'}}>Entrar</button>
          <button style={{all:'unset', cursor:'pointer', background:'#40eb4f', color:'#172c66', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, padding:'11px 18px', borderRadius:10}}>
            Fale com nosso time
          </button>
        </div>
      </nav>
    </header>
  );
}
window.Nav = Nav;
