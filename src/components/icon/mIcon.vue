<template>
  <div class="v-icon-m">
    <i :class="icon"></i>
  </div>
</template>
  <script>
export default {
  name: "v-icon",
  props: ["icon"],
};
</script>
  <style>
  @import url(./icon.css);
</style>