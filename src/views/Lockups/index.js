import * as React from "react";
import "./style.css";
function Lockups() {
  return (
    <div className="container">
      <iframe
        src="http://localhost:3000/#/lights.factory008.ft-lockup.testnet/admin/lockups"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Lockups;
