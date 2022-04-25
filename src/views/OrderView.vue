<template>
  <div id="CONTENT-CONTAINER">
    <div
      class=""
      style="height: 100%; overflow-y: auto; padding: 40px; font-size: 1.1rem"
    >
      <button class="ok-loadpanel" @click="showApp()">
        Wciśnij by załadować panel zamówień
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showApp() {
      let panel = document.getElementById("OrderTest");
      panel.classList.toggle("hidden");
    },
  },
};
</script>

<style>
.ok-loadpanel {
  background: var(--basic-red);
  color: white;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 0;
  width: 30%;
  font-weight: bold;
  font-size: 1rem;
}
</style>
