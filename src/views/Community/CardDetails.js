import * as React from "react";
import {useParams} from "react-router-dom";




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
      <div>
      {proposals.map((proposal) => {
        if(proposal.id==CardId){
          return (
            <div key={proposal.id}>
              <h1>{proposal.title} </h1>
              <p>{proposal.description}</p>
              <p>Number of Yes Votes : {proposal.votes_yes}</p>
              <p>Number of No Votes : {proposal.votes_no}</p>
              <p>History of Yes Transactions : {proposal.history_yes}</p>
              <p>History of No Transaction : {proposal.history_no}</p>

            </div>
    )}
})}
</div>
)
}

export default CardDetails;