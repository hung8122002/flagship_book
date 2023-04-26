<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions v-show="!showFooter">
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="dialog = false">
            {{ $t("action.disagree") }}
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="removeItem">
            {{ $t("action.agree") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  <script>
export default {
  props: ["modelValue", "showFooter"],
  data() {
    return {
      dialog: this.modelValue,
    };
  },
  watch: {
    modelValue() {
      this.dialog = this.modelValue;
    },
    dialog() {
      this.$emit("update:modelValue", this.dialog);
    },
  },
  methods: {
    removeItem() {
      this.dialog = false;
      this.$emit("removeItem");
    },
  },
};
</script>