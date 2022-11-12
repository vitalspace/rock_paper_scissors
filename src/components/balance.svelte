<script lang="ts">
  import { Contract } from "../lib/app";
  import { balance } from "../stores/stores";
  const app = new Contract();

  (async () => {
    const contract = await app.getContract();
    $balance = await contract.methods.users(await app.getAccount()).call();
  })();
</script>

<div class="text-white">
  Balance: {$balance}
</div>

