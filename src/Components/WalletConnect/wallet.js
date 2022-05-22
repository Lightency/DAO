import "regenerator-runtime/runtime";
import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useCallback,
} from "react";
import { login, logout } from "../../utils";
import { providers, utils } from "near-api-js";

import { useWalletSelector } from "../../contexts/WalletSelectorContext";

export default function Wallet() {
  const { selector, accountId } = useWalletSelector();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAccount = useCallback(async () => {
    if (!accountId) {
      return null;
    }

    const { nodeUrl } = selector.network;
    const provider = new providers.JsonRpcProvider({ url: nodeUrl });

    return provider
      .query({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.network]);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setIsLoading(true);

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
      setIsLoading(false);
    });
  }, [accountId, getAccount]);

  const handleSignIn = () => {
    selector.show();
  };

  React.useEffect(() => {
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()) {
      // window.contract is set by initContract in index.js
      console.log("window.contract", window.contract);
    }
  }, []);

  if (window.walletConnection.isSignedIn()) {
    //return logout button
    return (
      <button className="link" style={{ float: "right" }} onClick={logout}>
        Sign out
      </button>
    );
  }
  return (
    <button className="link" style={{ float: "right" }} onClick={handleSignIn}>
      Sign in
    </button>
  );
}
