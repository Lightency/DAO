import styled from "styled-components";
import * as React from "react";
import Wallet from "../../../Components/WalletConnect/wallet";
import axios from "axios";
import { async } from "regenerator-runtime";

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 4px 4px rgba(8, 19, 34, 0.2);
  background-color: #081322;
  img {
    width: 80px;
    height: auto;
  }
  label {
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    marign: 10px;
  }
`;

function Navbar() {
  const [balance, setBalance] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    
     axios
      .get(
        "https://testnet.nearblocks.io/api/account/balance?address=" +
          window.accountId +
          "&networkId=testnet"
      )
      .then((res) => {
        setBalance(res.data.balance);
        setLoading(false);
        console.log(res);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <NavbarContainer>
      <div className="content">
        <img
          src="data:image/png;base64,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"
          alt="logo"
          className="logo"
        />
        <label>{window.accountId}</label>
        <label>{balance}</label>
      </div>
      <Wallet />
    </NavbarContainer>
  );
}

export default Navbar;
