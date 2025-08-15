import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.5)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000
    }}>
      <div style={{ background:"#222", color:"#fff", padding:20, borderRadius:12, minWidth:280 }}>
        {children}
        <div style={{ textAlign:"right", marginTop:12 }}>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
