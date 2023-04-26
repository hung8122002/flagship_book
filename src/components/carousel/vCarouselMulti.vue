<template>
  <div :id="idCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        hidden
        type="button"
        :data-bs-target="`#${idCarousel}`"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        hidden
        type="button"
        :data-bs-target="`#${idCarousel}`"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        hidden
        type="button"
        :data-bs-target="`#${idCarousel}`"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="row pc">
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[0] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[1] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[2] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[3] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[4] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[5] : {}"></v-item>
          </div>
        </div>
        <div class="row tablet">
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[0] : {}"></v-item>
          </div>
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[1] : {}"></v-item>
          </div>
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[2] : {}"></v-item>
          </div>
        </div>
        <div class="row mobile">
          <div class="col-6">
            <v-item :item="dataItem.length ? dataItem[0] : {}"></v-item>
          </div>
          <div class="col-6">
            <v-item :item="dataItem.length ? dataItem[1] : {}"></v-item>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="row pc">
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[2] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[3] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[4] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[5] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[6] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[7] : {}"></v-item>
          </div>
        </div>
        <div class="row tablet">
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[2] : {}"></v-item>
          </div>
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[3] : {}"></v-item>
          </div>
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[4] : {}"></v-item>
          </div>
        </div>
        <div class="row mobile">
          <div class="col-6">
            <v-item :item="dataItem.length ? dataItem[2] : {}"></v-item>
          </div>
          <div class="col-6">
            <v-item :item="dataItem.length ? dataItem[3] : {}"></v-item>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="row pc">
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[2] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[3] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[4] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[5] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[6] : {}"></v-item>
          </div>
          <div class="col-lg-2 col-sm-2">
            <v-item :item="dataItem.length ? dataItem[7] : {}"></v-item>
          </div>
        </div>
        <div class="row tablet">
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[4] : {}"></v-item>
          </div>
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[5] : {}"></v-item>
          </div>
          <div class="col-md-4">
            <v-item :item="dataItem.length ? dataItem[6] : {}"></v-item>
          </div>
        </div>
        <div class="row mobile">
          <div class="col-6">
            <v-item :item="dataItem.length ? dataItem[4] : {}"></v-item>
          </div>
          <div class="col-6">
            <v-item :item="dataItem.length ? dataItem[5] : {}"></v-item>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      :data-bs-target="`#${idCarousel}`"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      :data-bs-target="`#${idCarousel}`"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["idCarousel", "data"],
  data() {
    return {
      dataItem: {},
    };
  },
  watch: {
    data() {
      this.dataItem = this.data;
    },
  },
};
</script>

<style scoped>
.carousel img {
  height: 48vw;
}

.carousel-control-prev,
.carousel-control-next {
  background-color: red;
  width: 30px;
  height: 30px;
  top: 33%;
}

.mobile {
  display: none;
}

.tablet {
  display: none;
}

.carousel-inner {
  padding: 12px;
}

@media only screen and (min-width: 740px) and (max-width: 1024px) {
  .tablet {
    display: flex;
  }

  .pc {
    display: none;
  }
}

@media only screen and (max-width: 740px) {
  .mobile {
    display: flex;
  }

  .pc {
    display: none;
  }
}
</style>