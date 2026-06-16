function TopBar() {
  return (
    <div style={{display:'flex', alignItems:'center', gap:16, padding:'18px 28px', borderBottom:'1px solid rgba(237,237,237,.06)', background:'#0d1b44'}}>
      <div>
        <div style={{fontFamily:'Lato,sans-serif', fontWeight:700, fontSize:20, color:'#ededed'}}>Jornadas ativas</div>
        <div style={{fontFamily:'Poppins,sans-serif', fontSize:12, color:'rgba(237,237,237,.55)'}}>Outubro · 24 campanhas em execução</div>
      </div>
      <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:10}}>
        <div style={{display:'flex', alignItems:'center', gap:8, padding:'9px 14px', background:'rgba(237,237,237,.06)', border:'1px solid rgba(237,237,237,.1)', borderRadius:10, width:320, color:'rgba(237,237,237,.7)'}}>
          <OCIcon.search/>
          <input placeholder="Buscar cliente, CPF, contrato…" style={{all:'unset', flex:1, color:'#ededed', fontFamily:'Poppins,sans-serif', fontSize:13}}/>
          <span style={{fontFamily:'Poppins,sans-serif', fontSize:11, color:'rgba(237,237,237,.4)', padding:'2px 6px', border:'1px solid rgba(237,237,237,.15)', borderRadius:4}}>⌘K</span>
        </div>
        <button style={{all:'unset', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, padding:'10px 14px', border:'1px solid rgba(237,237,237,.14)', borderRadius:10, color:'#ededed', fontFamily:'Poppins,sans-serif', fontSize:13}}>
          <OCIcon.filter/> Filtros · 3
        </button>
        <button style={{all:'unset', cursor:'pointer', padding:10, borderRadius:10, color:'rgba(237,237,237,.7)', position:'relative'}}>
          <OCIcon.bell/>
          <span style={{position:'absolute', top:8, right:8, width:8, height:8, background:'#40eb4f', borderRadius:'50%', border:'2px solid #0d1b44'}}/>
        </button>
        <button style={{all:'unset', cursor:'pointer', background:'#40eb4f', color:'#172c66', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, padding:'11px 18px', borderRadius:10}}>+ Nova jornada</button>
      </div>
    </div>
  );
}
window.TopBar = TopBar;
