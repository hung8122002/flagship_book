<template>
  <button :disabled="isDisabled" :style="addStyle" class="v-button">{{ label }}</button>
</template>
<script>
export default {
  name: "v-button",
  props: ["label", "addStyle", "isDisabled"],
};
</script>
<style>
@import url(./button.css);
</style>