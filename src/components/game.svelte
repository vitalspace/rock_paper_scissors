<script lang="ts">
  import { Contract } from "../lib/app";
  import { balance } from "../stores/stores";

  let state: number;

  const app = new Contract();

  async function Game(e: Event) {
    e.preventDefault();

    if (state !== undefined) {
      const contract = await app.getContract();
      await contract.methods
        .game(state)
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
      state = 0;
      $balance = await contract.methods.users(await app.getAccount()).call();
    }
  }
</script>

<div>
  <input bind:value={state} type="number" min="1" max="3" name="" id="" required />
  <button class="bg-green-400 text-white" on:click={Game}>Game</button>
</div>
