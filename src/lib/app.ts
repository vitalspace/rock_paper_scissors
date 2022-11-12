import Web3 from "web3";
import { isLoggedIn, userId } from "../stores/stores";

class Contract {
  //@ts-ignore
  web3 = new Web3(window.ethereum);
  netWorkId: number = 5777;
  contract_path = "/contract.json";
  contract_address: string = "0xED395Cb276235F0a65d2b884F2847a9Bf0c50353";

  init() {
    this.loadWeb3();
  }

  async loadWeb3() {
    //@ts-ignore

    if (window.ethereum) {
      //@ts-ignore
      this.web3 = new Web3(window.ethereum);
      await this.checkIfisLoggedIn();
      return;
    }
    alert("Please install Metamask");
  }

  async checkIfisLoggedIn() {
    //@ts-ignore
    const isloggedin = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (isloggedin.length > 0) {
      isLoggedIn.update((e) => (e = true));
      userId.update((e) => (e = isloggedin[0]));
    }
  }

  async login() {
    try {
      //@ts-ignore
      if (window.ethereum) {
        //@ts-ignore
        this.web3 = new Web3(window.ethereum);
        //@ts-ignore
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        isLoggedIn.update((e) => (e = true));
        userId.update((e) => (e = account[0]));
      } else {
        alert("Please Instal Metamask");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAccount() {
    //@ts-ignore
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    return account[0];
  }

  async getContract() {
    const request = await fetch(this.contract_path);
    const data = await request.json();
    const contract = new this.web3.eth.Contract(data, this.contract_address);
    return contract;
  }
}

export { Contract };
