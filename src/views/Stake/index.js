import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as nearAPI from "near-api-js";
import { async } from "regenerator-runtime";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";

const Stake = () => {
  const [amount, setAmount] = useState("");
  const [stake, setStake] = useState();
  const [balance, setBalance] = useState();
  const [deposited, setDeposit] = useState("");
  const [reward, setReward] = useState("");
  const [unstake, setUnstake] = useState("");
  const [dbDeposit, setDbdeposit] = useState("");
  const [user, setUser] = useState("");
  const [disable, setDisabled]= useState(false);

  const potato = new nearAPI.Contract(
    window.walletConnection.account(), // the account object that is connecting
    "potato_token.testnet",
    {
      // name of contract you're connecting to
      viewMethods: ["ft_metadata", "ft_balance_of"], // view methods do not change state but usually return a value
      changeMethods: ["ft_transfer"], // change methods modify state
      // account object to initialize and sign transactions.
    }
  );

  async function getMetadata(Amount) {
    await potato.ft_transfer(
      {
        receiver_id: "lightency_staking_pool.testnet", // argument name and value - pass empty object if no args required
        amount: Amount,
        memo: "test",
      },
      "300000000000000", // attached GAS (optional)
      "1" // attached deposit in yoctoNEAR (optional)
    );
  }

  React.useEffect(() => {
    contract.getStake({ accountId: window.accountId }).then((stake) => {
      setStake(stake);
    });
  });

  React.useEffect(() => {
    Axios.get(`http://localhost:3000/api/getFromId/${window.accountId}`, {
      userAddress: window.accountId,
    }).then((data) => {
      setDbdeposit(data.data[0].deposit);
    });
  }, []);

  React.useEffect(() => {
    Axios.get(`http://localhost:3000/api/get/${window.accountId}`, {userAddress:window.accountId}).then((data) => {
      setUser(data.data.length);
      
    });
  }, []);

  React.useEffect(() => {
    contract.checkReward({ accountId: window.accountId }).then((reward) => {
      setReward(reward);
    });
  });

  React.useEffect(() => {
    potato.ft_balance_of({ account_id: window.accountId }).then((balance) => {
      setBalance(balance);
    });
  });

  const handleStake = async (event) => {
    event.preventDefault();
    setDisabled(true);
    if (parseInt(amount) <= parseInt(dbDeposit)) {
      Axios.post(`http://localhost:3000/api/sub_deposit/${window.accountId}`, {
        userAddress: window.accountId,
        deposit: amount,
      });

      contract.stake({ amount: amount });
      //depositMap.set(window.accountId, depositMap.get(window.accountId)-amount)
    } else {
      alert("Not enough deposited tokens!!!!");
    }

    setAmount("");
  };

  const handleDeposit = (event) => {
    event.preventDefault();
    setDisabled(true);

    
    if (parseInt(deposited) <= parseInt(balance)) {
      if(user==0){
      Axios.post(`http://localhost:3000/api/create`, {
        userAddress: window.accountId,
        deposit: deposited,
      });}
      else{
        Axios.post(`http://localhost:3000/api/add_deposit/${window.accountId}`, {
        userAddress: window.accountId,
        deposit: deposited,
      });

      }

      /*
      if(depositMap.has(window.accountId)){
        depositMap.set(window.accountId, depositMap.get(window.accountId)+deposit)
      }
      else{
        depositMap.set(window.accountId, deposit)
      }  
      */
     
      getMetadata(deposited);
    } else {
      alert("Not enough balance!!!");
    }

    setDeposit("");
    //setDisabled(false);
  };

  const handleUnstake = async (event) => {
    event.preventDefault();
    setDisabled(true);
    if (parseInt(unstake) <= parseInt(stake)) {
      contract.unstake({ amount: unstake });
    } else {
      alert("Not enough staked tokens!!!!");
    }

    setUnstake("");
  };

  async function handleReward() {
    await contract.rewardFeeCalculation();
  }


  //console.log(dbDeposit);
  //console.log(depositMap.has(window.accountId))

  
  return (
    <div>
      <h1 style={{ color: "black", fontFamily: "Eloquia Display Extra Bold" }}>
        Staking
      </h1>
      <Typography
        variant="body1"
        color="#696969"
        align="center"
        style={{ fontFamily: "Eloquia Display Extra Bold" }}
      >
        Stake your Light tokens
      </Typography>
      <br></br>
      <Card
        variant="outlined"
        style={{
          width: 1000,
          textAlign: "center",
          height: 175,
          backgroundColor: "#ffffff",
          marginLeft: "35%",
          marginRight: "35%",
          width: "auto",
          align: "center",
          borderRadius: "20",
        }}
        sx={{ maxWidth: 1000, border: "1", borderColor: "#2596be" }}
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            align="left"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#191970",
              fontFamily: "Eloquia Display Extra Bold",
            }}
          >
            {window.accountId}
          </Typography>

          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                variant="subtitle1"
                align="left"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#197045",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                Available balance
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#197045",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                {balance}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                variant="subtitle1"
                align="left"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#701945",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                Deposited
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#701945",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                {dbDeposit}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                variant="subtitle1"
                align="left"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#707019",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                Staked
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#707019",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                {stake}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                variant="subtitle1"
                align="left"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#197070",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                Reward Estimation
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#197070",
                  fontFamily: "Eloquia Display Extra Bold",
                }}
              >
                {reward}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>
      <form
        onSubmit={handleDeposit}
        style={{
          width: 1000,
          textAlign: "center",
          marginLeft: "35%",
          marginRight: "35%",
          width: "auto",
          align: "center",
          borderRadius: "20",
        }}
      >
        <input
          id="Deposit"
          name="Deposit"
          type="text"
          onChange={(event) => setDeposit(event.target.value)}
          value={deposited}
          placeholder="0"
          style={{ backgroundColor: "#dbdbdb", color: "black" }}
        />
        <button
          type="submit"
          style={{ width: "130px", fontFamily: "Eloquia Display Extra Bold" }}
          disabled={disable}
        >
          Deposit
        </button>
      </form>
      <form
        onSubmit={handleStake}
        style={{
          width: 1000,
          textAlign: "center",
          marginLeft: "35%",
          marginRight: "35%",
          width: "auto",
          align: "center",
          borderRadius: "20",
        }}
      >
        <input
          id="Amount"
          name="Amount"
          type="text"
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
          placeholder="0"
          style={{ backgroundColor: "#dbdbdb", color: "black" }}
        />
        <button
          type="submit"
          style={{ width: "130px", fontFamily: "Eloquia Display Extra Bold" }} 
          disabled={disable}
        >
          Stake
        </button>
      </form>
      <form
        onSubmit={handleUnstake}
        style={{
          width: 1000,
          textAlign: "center",
          marginLeft: "35%",
          marginRight: "35%",
          width: "auto",
          align: "center",
          borderRadius: "20",
        }}
      >
        <input
          id="Unstake"
          name="Unstake"
          type="text"
          onChange={(event) => setUnstake(event.target.value)}
          value={unstake}
          placeholder="0"
          style={{ backgroundColor: "#dbdbdb", color: "black" }}
        />
        <button
          type="submit"
          style={{ width: "130px", fontFamily: "Eloquia Display Extra Bold" }}
          disabled={disable}
        >
          Unstake
        </button>
      </form>

      <button
        onClick={handleReward}
        style={{
          width: "300px",
          textAlign: "center",
          marginLeft: "41.5%",
          marginRight: "50%",
          align: "center",
          borderRadius: "20",
          fontFamily: "Eloquia Display Extra Bold",
        }}
      >
        Claim Rewards
      </button>
    </div>
  );
};

export default Stake;
