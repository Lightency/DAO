import * as React from "react";
import ProposalForm from "./ProposalForm.js";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MultiActionAreaCard from "./MultiActionAreaCard";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import * as nearAPI from "near-api-js";
import "./ProposalForm.css";
import { async } from "regenerator-runtime";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  bgcolor: "transparent",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function GovernanceCommunity() {
  const [open, setOpen] = React.useState(false);

  const [proposals, setProposals] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // async function to get metadata from contract
  async function getMetadata() {
    var potatocontract = localStorage.getItem("potato");
    const contract = new nearAPI.Contract(
      window.walletConnection.account(), // the account object that is connecting
      "potato_token.testnet",
      {
        // name of contract you're connecting to
        viewMethods: ["ft_metadata"], // view methods do not change state but usually return a value
        changeMethods: ["ft_transfer"], // change methods modify state
        // account object to initialize and sign transactions.
      }
    );
    console.log(contract);
    console.log("dddd", window.walletConnection.account());

    contract.ft_metadata().then((metadata) => {
      console.log(metadata);
    });

    await contract.ft_transfer(
      {
        receiver_id: "lightency_staking_pool.testnet", // argument name and value - pass empty object if no args required
        amount: "100",
        memo: "test",
      },
      "300000000000000", // attached GAS (optional)
      "1" // attached deposit in yoctoNEAR (optional)
    );
  }
  async function meta() {}

  React.useEffect(() => {
    getMetadata();
    meta();
  }, []);

  React.useEffect(() => {
    contract.getProposals().then((proposals) => {
      proposals.forEach((proposal) => {
        setProposals((prevProposals) => [
          ...prevProposals,
          {
            title: proposal.title,
            description: proposal.description,
            id: proposal.id,
            votes_yes: proposal.votes_yes,
            votes_no: proposal.votes_no,
          },
        ]);
      });
    });
  }, []);

  return (
    <div className="container">
      <h1 style={{ color: "#c9c104" }}>Community</h1>
      <p align="right">
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "#c9c104",
            borderRadius: 5,
            border: "none",
            float: "left",
            marginRight: 20,
          }}
          onClick={handleOpen}
        >
          Add proposal
        </Button>
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProposalForm />
      </Modal>

      <Box justifyContent="center">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          style={{ marginTop: "80px" }}
        >
          {proposals.map((proposal) => {
            return (
              <div key={proposal.id}>
                <MultiActionAreaCard
                  title={proposal.title}
                  description={proposal.description}
                  url={proposal.url}
                  id={proposal.id}
                  votes_yes={proposal.votes_yes}
                  votes_no={proposal.votes_no}
                />
              </div>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default GovernanceCommunity;
