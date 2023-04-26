<template>
  <div class="error">
    <h1>404</h1>
    <span>Page not found</span>
    <p>
      The page you are looking for does not exist or an other error occurred.
    </p>
    <router-link to="/">
      <v-button style="background-color: #498374" label="Home"></v-button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.error {
  margin-top: 130px;
  text-align: center;
  padding: 40px;
}

.error h1 {
  font-size: 80px;
  margin: 0;
}

.error span {
  font-size: 30px;
  font-weight: bold;
}

.error p {
  margin-top: 20px;
  margin-bottom: 8px;
}

@media only screen and (max-width: 740px) {
  .error {
    margin-top: 60px;
  }
}
</style>