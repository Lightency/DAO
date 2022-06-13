import * as React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Button from "@mui/material/Button";
import { sendTransactions } from "./batchTransactions";

function Dashboard() {
  return (
    <div>
      <h1>Dashborad</h1>
      <p> This is the dashboard page</p>
      <Button
                        variant="contained"
                        style={{
                          color: "#c9c104",
                          backgroundColor: "#0c1424",
                          flexDirection: "row",
                          marginLeft: 20,
                          justifyContent: "space-evenly",
                          fontFamily: "Halva",
                        }}
                        onClick={() => {
                          sendTransactions();
                        }}
                        size="small"
                      >
                        Batch
                      </Button>
    </div>
  );
}

export default Dashboard;
