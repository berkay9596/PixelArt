import { createContext, useState, useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import DesoApi from "../libs/desoApi";
import DesoIdentity from "../libs/desoIdentity";
const DesoContext = createContext();

export function DesoProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [desoIdentity, setDesoIdentity] = useState(null);
  const [desoApi, setDesoApi] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  useEffect(() => {
    const di = new DesoIdentity();
    setDesoIdentity(di);
    const da = new DesoApi();
    setDesoApi(da);
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const desoLogin = async () => {
    const user = await desoIdentity.loginAsync(4);
    if (user) {
      setIsLoggedIn(true);
      setPublicKey(user.publicKey);
      toast.success("Login successful");
    }
  };
  const desoLogout = () => {
    localStorage.removeItem("identityUsersV2");
    setIsLoggedIn(false);
  };
  const sendDeso = async () => {
    let createSend = await desoApi?.sendDeso(1);
    let transactionHex = await createSend?.TransactionHex;
    let signedTransactionHex = await desoIdentity?.signTxAsync(transactionHex);
    let rtnSend = await desoApi?.submitTransaction(signedTransactionHex);
    if (rtnSend) console.log("Send deso successful");
  };

  return (
    <DesoContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        desoLogin,
        desoLogout,
        sendDeso,
        profilePicture,
        publicKey
      }}
    >
      {children}
    </DesoContext.Provider>
  );
}

export default DesoContext;
