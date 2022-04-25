<template>
  <div id="toast" v-if="show">
    <div class="toast-container">
      <h5 class="p-3" style="border-bottom: 2px solid #c6c6c6">
        {{ tytul }}
        <span style="float: right"><i class="fa-solid fa-xmark"></i></span>
      </h5>
      <p class="px-3 pb-3 m-0">{{ tresc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    tytul: String,
    tresc: String,
  },
};
</script>

<style>
#toast {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #00000020;
  backdrop-filter: blur(2px);
  z-index: 999;
}

.toast-container {
  background: #f6f6f6;
  color: black;
  margin: 0 auto;
  margin-top: 70px;
  min-width: 600px;
}
</style>
