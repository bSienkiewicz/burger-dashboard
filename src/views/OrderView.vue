<template>
  <div
    id="CONTENT-CONTAINER"
    style="justify-content: center; align-items: center"
  >
    <button class="ok-loadpanel" @click="showApp">
      Wciśnij by załadować panel zamówień
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    showApp() {
      document.getElementById("orders-app").classList.remove("d-none");
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
