import * as React from "react";
import ProposalForm from "./ProposalForm.js";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import MultiActionAreaCard from "./MultiActionAreaCard";
import { Button } from "@material-ui/core";

function GovernanceCommunity() {
  function getModalStyle() {
    const top = 25;
    const left = 25;
    return {
      top: `${top}%`,
      margin: "auto",
      left: `${left}%`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "absolute",
      width: 1000,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [proposals, setProposals] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    contract.getProposals().then((proposals) => {
      proposals.forEach((proposal) => {
        setProposals((prevProposals) => [
          ...prevProposals,
          {
            title: proposal.title,
            description: proposal.description,
            id: proposal.id,
            url: proposal.url,
            votes_yes: proposal.votes_yes,
            votes_no: proposal.votes_no,
          },
        ]);
      });
    });
  }, []);

  return (
    <div>
      <h1>Governance</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a new proposal
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <ProposalForm />
        </div>
      </Modal>

      <Box display="grid" flexWrap="wrap" justifyContent="center">
        {proposals.map((proposal) => {
          console.log(proposal);
          return (
            <div className="cards_items" key={proposal.id}>
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
      </Box>
    </div>
  );
}

export default GovernanceCommunity;
