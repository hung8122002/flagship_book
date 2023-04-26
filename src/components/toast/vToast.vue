<template>
  <div
    :class="item.status"
    class="toast show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header">
      <div class="toast-icon">
        <i :class="resource.icon[item.status]"></i>
      </div>
      <strong class="me-auto" style="text-transform: capitalize">{{
        item.status
      }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">
      {{
        item.error
          ? `${item.error} ${item.component}`
          : `${item.action} ${item.component} ${item.status}`
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: "vToast",
  props: ["item"],
};
</script>

<style scoped>
.toast[data-v-637d6bc9] {
  transition: all linear 0.3s;
  animation: show ease-in-out 0.3s, hide linear 1s 2s forwards;
}

@keyframes show {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes hide {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
.toast-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 8px;
}
.success .toast-icon,
.success strong {
  color: green;
}
.error .toast-icon,
.error strong {
  color: red;
}

.warning .toast-icon,
.warning strong {
  color: orange;
}
</style>