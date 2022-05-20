import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MultiActionAreaCard(prop) {
  return (
    <div>
      <Card sx={{ maxWidth: 1000 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="insert image here !:)"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prop.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {prop.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {prop.url}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Yes = {prop.votes_yes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No = {prop.votes_no}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              contract.vote({ proposalID: prop.id, voteType: "1" });
            }}
            size="small"
          >
            Vote Yes
          </Button>
          <Button
            onClick={() => {
              contract.vote({ proposalID: prop.id, voteType: "0" });
            }}
            size="small"
          >
            Vote No
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
