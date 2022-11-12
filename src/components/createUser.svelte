<script lang="ts">
  import { Contract } from "../lib/app";
  const app = new Contract();

  let amount: number;
  let address: unknown;

  async function createAccount(e: Event) {
    e.preventDefault();

    if (amount !== undefined && address !== undefined) {
      const contract = await app.getContract();
      await contract.methods
        .createUser(amount, address)
        .send({ from: await app.getAccount(), gas: 0 })
        .on("transactionHash", function (hash) {
          console.log("Approving", hash);
          // document.getElementById("web3_message").textContent = "Approving...";
        })
        .on("receipt", function (receipt) {
          console.log("Success", receipt);
          // document.getElementById("web3_message").textContent = "Success!";
        })
        .catch((revertReason) => {
          console.log(revertReason);
          // console.log("ERROR! Transaction reverted: " + revertReason.receipt.transactionHash)
        });
      amount = 0;
      address = "";
    }
  }
</script>

<div>
  <input bind:value={amount} type="number" min="1" name="" id="" required />
  <input
    bind:value={address}
    type="text"
    placeholder="0xkjh12876817263876"
    name=""
    id=""
    required
  />
  <button class="bg-green-400 text-white" on:click={createAccount}>Load</button>
</div>
