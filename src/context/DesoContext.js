import { createContext, useState, useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import DesoApi from "../libs/desoApi";
import DesoIdentity from "../libs/desoIdentity";
const DesoContext = createContext();

export function DesoProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [desoIdentity, setDesoIdentity] = useState(null);
  const [desoApi, setDesoApi] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [loading2, setLoading2] = useState(false);
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
    console.log("user", user);
    setPublicKey(user.publicKey);
    toast.success("Login successful");
  };
  const desoLogout = async () => {
    localStorage.removeItem("identityUsersV2");
    setIsLoggedIn(false);
    window.location.reload();
  };
  const sendDeso = async (publicKey, amount) => {
    setLoading2(true);
    let createSend = await desoApi?.sendDeso(publicKey, 1000000 * amount);
    if (!createSend) {
      setLoading2(false);
    } else {
      let transactionHex = await createSend?.TransactionHex;
      let signedTransactionHex = await desoIdentity?.signTxAsync(
        transactionHex
      );
      let rtnSend = await desoApi?.submitTransaction(signedTransactionHex);
      console.log(rtnSend);
      setLoading2(false);
    }
  };

  const getSingleProfile = async (publicKey) => {
    let profileData = await desoApi?.getSingleProfile(publicKey);
    console.log("profiledata", profileData);
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
        loading2,
        setLoading2
      }}
    >
      {children}
    </DesoContext.Provider>
  );
}

export default DesoContext;
