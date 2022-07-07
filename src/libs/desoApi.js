import axios from "axios";
const DEFAULT_NODE_URL = "https://node.deso.org/api";

let client = null;
class DesoApi {
  constructor() {
    this.client = null;
    this.baseUrl = DEFAULT_NODE_URL;
  }
  async sendDeso(publicKey) {
    const path = "/v0/send-deso";
    const data = {
      MinFeeRateNanosPerKB: 1000,
      AmountNanos: 100000,
      SenderPublicKeyBase58Check: publicKey,
      RecipientPublicKeyOrUsername:
        "BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2",
    };
    try {
      const result = await this.getClient().post(path, data);
      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async submitTransaction(signedTransactionHex) {
    if (!signedTransactionHex) {
      console.log("signedTransactionHex is required");
      return;
    }

    const path = "/v0/submit-transaction";
    const data = {
      TransactionHex: signedTransactionHex,
    };
    try {
      const result = await this.getClient().post(path, data);
      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUsersStateless(PublicKeysBase58Check) {
    const path = "/v0/get-users-stateless";
    const data = {
      PublicKeysBase58Check: PublicKeysBase58Check,
    };
    try {
      const result = await this.getClient().post(path, data);
      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getClient() {
    if (client) return client;
    client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return client;
  }
}

export default DesoApi;
