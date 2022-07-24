import { createContext, useState, useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import DesoApi from "../libs/desoApi";
import DesoIdentity from "../libs/desoIdentity";
import { useNavigate } from "react-router-dom";
const DesoContext = createContext();

export function DesoProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [desoIdentity, setDesoIdentity] = useState(null);
  const [desoApi, setDesoApi] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [thxHex, setThxHex] = useState(null);

  useEffect(() => {
    const di = new DesoIdentity();
    setDesoIdentity(di);
    const da = new DesoApi();
    setDesoApi(da);
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const desoLogin = async () => {
    const user = await desoIdentity.loginAsync(4);
    setIsLoggedIn(true);
    setPublicKey(user.publicKey);
    toast.success("Login successful");
  };
  const desoLogout = async () => {
    localStorage.removeItem("identityUsersV2");
    setIsLoggedIn(false);
    // window.location.reload();
    navigate("/");
  };
  const sendDeso = async (publicKey, amount) => {
    let createSend = await desoApi?.sendDeso(publicKey, 1 * amount);
    console.log("createsend", createSend);
    let transactionHex = await createSend?.TransactionHex;
    setThxHex(transactionHex);
    console.log("transactionHex", transactionHex);
    let signedTransactionHex = await desoIdentity?.signTxAsync(transactionHex);
    console.log("signedTransactionHex", signedTransactionHex);
    let rtnSend = await desoApi?.submitTransaction(signedTransactionHex);
    console.log("rtnSend", rtnSend);
    console.log(rtnSend);
  };

  const getSingleProfile = async (publicKey) => {
    const profile = await desoApi?.getSingleProfile(publicKey);
    const username = profile?.Profile?.Username;
    return username;
  };

  return (
    <DesoContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        desoLogin,
        desoLogout,
        sendDeso,
        publicKey,
        getSingleProfile,
        thxHex
      }}
    >
      {children}
    </DesoContext.Provider>
  );
}

export default DesoContext;
