<template>
  <div id="SPINNER" class="">
    <i class="fa-solid fa-circle-notch spinner-icon spinner-icon-anim"></i>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#SPINNER {
  position: absolute;
  width: 70px;
  height: 70px;
  background-color: #fde2e7;
  margin-left: auto;
  margin-right: auto;
  top: 0px;
  left: 0;
  right: 0;
  text-align: left;
  z-index: 30;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all cubic-bezier(0.23, 1, 0.32, 1) 600ms;
  opacity: 0;
}

.spinner-icon {
  position: absolute;
  transition: all cubic-bezier(0.23, 1, 0.32, 1) 500ms;
  color: #e50f33;
  font-size: 40px;
  opacity: 1;
}

.spinner-icon-anim {
  animation: 0.5s spin linear infinite;
}

#SPINNER.--hidden {
  transform: translateY(-80px);
  opacity: 0;
  transition: all cubic-bezier(0.23, 1, 0.32, 1) 500ms;
}

#SPINNER.--shown {
  transform: translateY(60px);
  opacity: 1;
  transition: all cubic-bezier(0.23, 1, 0.32, 1) 500ms;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
