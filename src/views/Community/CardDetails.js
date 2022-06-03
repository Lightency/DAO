import * as React from "react";
import {useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardHeader } from '@mui/material';
import { Divider } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";







function CardDetails() {
    const [proposals, setProposals] = React.useState([]);
    const {CardId} = useParams();
    React.useEffect(() => {
        contract.getProposals().then((proposals) => {
          proposals.forEach((proposal) => {
            setProposals((prevProposals) => [
              ...prevProposals,
              {
                title: proposal.title,
                description: proposal.description,
                id: proposal.id,
                votes_yes:proposal.votes_yes,
                votes_no:proposal.votes_no,
                history_yes:proposal.history_yes,
                history_no:proposal.history_no,

              },
            ]);
          });
        });
      }, []);
      const thisCard = proposals[CardId];
      return(
      <div className="container">
      <div>
      {proposals.map((proposal) => {
        if(proposal.id==CardId){
          return (
            <div key={proposal.id}>
              <Card style={{backgroundColor:"#020613"}}>
                <CardHeader style={{color:"#c9c104"}} title={proposal.title}/>
                <Divider style={{background:"#c9c104"}}/>
                <CardContent>
                  <Typography variant="body1" color="#D9DBF1">
                    {proposal.description}
                  </Typography>
                  <Typography style={{color:"#D9DBF1"}} variant="subtitle2">
                    Yes Votes : {proposal.votes_yes}
                  </Typography>
                  <Typography style={{color:"#D9DBF1"}} variant="subtitle2">
                    No Votes : {proposal.votes_no}
                  </Typography>
                  <Typography style={{color:"#D9DBF1"}} variant="subtitle2">
                    History of Yes Transactions : {proposal.history_yes}
                  </Typography>
                  <Typography style={{color:"#D9DBF1"}} variant="subtitle2">
                    History of No Transaction : {proposal.history_no}
                  </Typography>
              </CardContent>
              <CardActions>
                <Grid container justifyContent="center">
          
                  <Button variant="contained" style={{color:"#c9c104" ,backgroundColor:"#0c1424", flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly', fontFamily:"Halva"}}
                    onClick={() => {
                      contract.vote({ proposalID: proposal.id, voteType: "1" });
                    }}
                  size="small"
                  >
                    Vote Yes
                  </Button>
                  <Button variant="contained" style={{color:"#c9c104" ,backgroundColor:"#0c1424", flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly', fontFamily:"Halva"}}
                    onClick={() => {
                      contract.vote({ proposalID: proposal.id, voteType: "0" });
                    }}
                  size="small"
                  >
                  Vote No
                  </Button>
                </Grid>
              </CardActions>
            </Card>
            </div>
    )}
})}
</div>
</div>
)
}

export default CardDetails;