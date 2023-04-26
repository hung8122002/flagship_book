<template>
  <div style="position: relative">
    <input
      :class="{ 'error-text': errorMessage !== undefined }"
      v-model="text"
      class="v-input"
      :style="addStyle"
      :type="inputType"
      :placeholder="label"
    />
    <div class="error">
      <div class="arrow"></div>
      {{ errorMessage }}
    </div>
  </div>
</template>
  <script>
export default {
  name: "v-Input",
  props: ["label", "inputType", "addStyle", "errorMessage", "modelValue"],
  data() {
    return {
      text: this.modelValue,
    };
  },
  watch: {
    text() {
      this.$emit("update:modelValue", this.text);
    },
  },
};
</script>
  <style>
@import url(./input.css);
</style>