import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
//import ProgressBar from "./ProgressBar";
import ProgressBar from "./ProgressBar";
import Grid from "@material-ui/core/Grid";
import { CardActionArea } from "@mui/material";

export default function MultiActionAreaCard(prop) {
  return (
    <div className="card">
      <Card
        style={{
          width: 500,
          textAlign: "center",
          margin: 5,
          height: 275,
          backgroundColor: "#F4F1DE",
        }}
        sx={{ maxWidth: 1000 }}
      >
        <Link
          to={`community-governance/${prop.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardActionArea>
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
              <ProgressBar yes={prop.votes_yes} no={prop.votes_no} />
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Grid container justifyContent="center">
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
                contract.vote({ proposalID: prop.id, voteType: "1" });
              }}
              size="small"
            >
              Vote Yes
            </Button>
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
                contract.vote({ proposalID: prop.id, voteType: "0" });
              }}
              size="small"
            >
              Vote No
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
