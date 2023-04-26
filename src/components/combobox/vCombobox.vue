<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenu2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Sort : {{ title || 'default' }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <li>
        <button @click="sort('price','asc')" class="dropdown-item" :class="{active : title == 'Ascending'}" type="button">
          Ascending
        </button>
      </li>
      <li>
        <button @click="sort('price','desc')" class="dropdown-item" :class="{active : title == 'Descending'}" type="button">
          Descending
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    sort(type, order) {
      if (order == "asc") {
        this.title = type + " ascending";
      }
      if (order == "desc") {
        this.title = type + " descending";
      }
      this.$emit("sort", type, order);
    },
  },
};
</script>

<style>
</style>