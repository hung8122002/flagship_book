<template>
  <div class="qInput">
    <div @click="number--"><i class="fa-solid fa-minus fa-lg"></i></div>
    <input v-model="number" type="number" />
    <div @click="number++"><i class="fa-solid fa-plus fa-lg"></i></div>
  </div>
</template>

<script>
export default {
  props: ["modelValue"],
  data() {
    return {
      number: this.modelValue || 1,
    };
  },
  watch: {
    number() {
      if (this.number < 1) {
        this.number = 1;
      }
      this.$emit("update:modelValue", this.number);
    },
  },
};
</script>

<style scoped>
@import url(./quantityInput.css);
</style>