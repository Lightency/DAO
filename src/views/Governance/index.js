import * as React from "react";
import "./style.module";

import axios from "axios";

function Governance() {
  const [governance, setGovernance] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.testnet.app.astrodao.com/api/v1/proposals?fields=id%2Ckind%2CcreatedAt%2Cdescription%2CdaoId%2Cstatus&filter=daoId%7C%7Ceq%7C%7Clightency-test.sputnikv2.testnet&accountId=ghada-am.testnet"
      );
      setGovernance(result.data.data);
      console.log(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    // map through the data and display the data
    <div className="container">
      <h1>Governance </h1>

      <button>
        <a href="https://testnet.app.astrodao.com/dao/lightency-test.sputnikv2.testnet/proposals/new">
          <span>Add proposal</span>
        </a>
      </button>

      <div className="Governance">
        {governance &&
          governance.map((governance) => (
            <div key={governance.id} className="govCard">
              <span>{governance.id}</span>
              <h2> Description : {governance.description.split("$")[0]}</h2>
              <h2> Kind : {governance.kind.type}</h2>
              <h2> Status : {governance.status}</h2>
              <button className="view">
                <a
                  href={`https://testnet.app.astrodao.com/dao/lightency-test.sputnikv2.testnet/proposals/${governance.id}`}
                >
                  <span>View</span>
                </a>
              </button>
            </div>
          ))}

        {/* <p> {governance.data} </p> */}
      </div>
    </div>
  );
}

export default Governance;
