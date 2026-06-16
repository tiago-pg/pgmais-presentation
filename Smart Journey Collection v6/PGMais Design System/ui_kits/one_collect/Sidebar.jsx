function Sidebar({ active='journey' }) {
  const items = [
    ['home','Home'],['journey','Jornadas'],['clients','Clientes'],
    ['ai','IA · Agentes'],['analytics','Analytics'],['cfg','Configurações']
  ];
  return (
    <aside style={{width:76, background:'#0d1b44', borderRight:'1px solid rgba(237,237,237,.06)', padding:'22px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:8, position:'relative'}}>
      <div style={{marginBottom:18}}><OCIcon.logo/></div>
      {items.map(([k,l]) => {
        const on = k===active;
        return (
          <button key={k} title={l} style={{
            all:'unset', cursor:'pointer', width:48, height:44, borderRadius:12,
            display:'flex', alignItems:'center', justifyContent:'center',
            color: on ? '#40eb4f' : 'rgba(237,237,237,.5)',
            background: on ? 'rgba(64,235,79,.1)' : 'transparent',
            position:'relative'
          }}>
            {React.createElement(OCIcon.nav[k])}
            {on && <span style={{position:'absolute', left:-1, top:10, bottom:10, width:3, background:'#40eb4f', borderRadius:3}}/>}
          </button>
        );
      })}
      <div style={{marginTop:'auto', width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#40eb4f,#0120eb)', display:'flex', alignItems:'center', justifyContent:'center', color:'#172c66', fontFamily:'Lato,sans-serif', fontWeight:900, fontSize:14}}>MR</div>
    </aside>
  );
}
window.Sidebar = Sidebar;
