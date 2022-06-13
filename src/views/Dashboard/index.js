import * as React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { initContract } from "../../utils";

function Dashboard() {
  const [balance, setBalance] = React.useState();

  React.useEffect(() => {
    contract.getBalance({ accountId: window.accountId }).then((balance) => {
      setBalance(balance);
      console.log(balance);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
