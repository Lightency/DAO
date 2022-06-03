import * as React from "react";
import ProposalForm from "./ProposalForm.js";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import MultiActionAreaCard from "./MultiActionAreaCard";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";




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
  //const [balance , setBalance] = React.useState(false) ;


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
            votes_yes: proposal.votes_yes,
            votes_no: proposal.votes_no,
          },
        ]);
      });
    });
  }, []);
  /*React.useEffect(() => {
    contract.myFirstCrossContractCall({accountId:"alaasouabni.testnet"}).then((test) => {
      setTimeout(function(){
        console.log(accountId);
    }, 2000);
      if(test!=0){
        setBalance(true);
        console.log(test);
      };
    });

  }
  );
*/

  return (
    <div className="container">
      <h1 style={{color:"#c9c104"}}>Community</h1>
      <p align="right">
      <Button variant="contained" style={{color:"#c9c104" ,backgroundColor:"#0c1424", fontFamily:"Halva", marginRight:20}} onClick={handleOpen}>
        Create a new proposal
      </Button>
      </p>
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
