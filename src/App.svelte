<script lang="ts">
  import { Contract } from "./lib/app";
  import { isLoggedIn, userId } from "./stores/stores";

  import CreateUser from "./components/createUser.svelte";
  import Game from "./components/game.svelte";
  import Balance from "./components/balance.svelte";


  const app = new Contract();
  app.init();

  const login = () => app.login();

  let user: number = 0;
  let machine: number = 0;
  let userImage: string;
  let machineImage: string;

  const images = {
    rock: "https://www.svgrepo.com/show/352128/hand-rock.svg",
    paper: "https://www.svgrepo.com/show/89600/hand.svg",
    scissors: "https://www.svgrepo.com/show/352126/hand-scissors.svg",
  };

  $: {
    if (user === 3) {
      alert("Win user");
      user = 0;
      machine = 0;
    }

    if (machine === 3) {
      alert("Win Machine");
      user = 0;
      machine = 0;
    }
  }

  const game = (state: number) => {
    const machineOption: number = Math.floor(Math.random() * 3) + 1;
    if (state === 1 && machineOption === 3) {
      user = user + 1;
      userImage = images.rock;
      machineImage = images.scissors;
    } else if (state === 2 && machineOption === 1) {
      user = user + 1;
      userImage = images.paper;
      machineImage = images.rock;
    } else if (state === 3 && machineOption === 2) {
      user = user + 1;
      userImage = images.scissors;
      machineImage = images.paper;
    } else if (state === 1 && machineOption === 2) {
      machine = machine + 1;
      userImage = images.rock;
      machineImage = images.paper;
    } else if (state === 2 && machineOption === 3) {
      machine = machine + 1;
      userImage = images.paper;
      machineImage = images.scissors;
    } else if (state === 3 && machineOption === 1) {
      machine = machine + 1;
      userImage = images.scissors;
      machineImage = images.rock;
    } else {
      userImage = Object.values(images)[state - 1];
      machineImage = Object.values(images)[state - 1];
    }
  };

  const Rock = () => game(1);
  const Paper = () => game(2);
  const Scissors = () => game(3);
</script>

<div class="container mx-auto bg-black pb-12">
  <div class="p-8 text-center text-white">
    <h1 class="font-mono text-5xl">Rock, Paper & Scissors</h1>
  </div>

  <div class="flex items-stretch justify-center space-x-10">
    <div class="flex w-60 flex-wrap bg-green-400">
      <div class="py-4 pl-2">
        <h2 class="text-white">User: {$userId.slice(0, 15)}...</h2>
        <Balance/>
      </div>
      <div class="mx-auto bg-slate-600">
        <img class="w-52" src={userImage} alt="" />
      </div>
      <div class="flex space-x-1 py-2 px-2">
        <button
          on:click={Rock}
          class="rounded bg-slate-900 py-2 px-3 text-white transition-all hover:bg-red-400"
          >Rock</button
        >
        <button
          on:click={Paper}
          class="rounded bg-slate-900 py-2 px-3 text-white transition-all hover:bg-red-400"
          >Paper</button
        >
        <button
          on:click={Scissors}
          class="rounded bg-slate-900 py-2 px-3 text-white transition-all hover:bg-red-400"
          >Scissors</button
        >
      </div>
    </div>

    <div class="pt-28 text-center">
      <h2 class="text-3xl text-white">Stats</h2>
      <span class="text-white"><span>{user}</span> - {machine}</span>
    </div>

    <div class="h-80 w-60 bg-green-400">
      <h2 class="py-4 pl-2 text-white">Machine:</h2>
      <div class="mx-auto max-h-52 w-52 bg-slate-600">
        <img class="w-52" src={machineImage} alt="" />
      </div>
    </div>
  </div>


  {#if !$isLoggedIn}
    <div class="text-white mx-auto text-center">
      <button
        on:click={login}
        class="bg-orange-500 py-2 px-4 rounded-sm transition-all hover:bg-green-400"
        >Login</button
      >
    </div>
  {/if}


  <CreateUser/>
  <Game/>

</div>


