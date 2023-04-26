<template>
  <div class="about">
    <p class="about-title">Get to Flagships Book Online</p>
    <div :class="{ 'show-change': changeShow }" class="about-contain">
      <div class="about-item">
        <p class="item-title">
          Buy Books Online at FlagshipsBook.com, Vietnamese’s Favorite Bookstore
        </p>
        <p class="item-description">
          No matter what you’re a fan of, from <a>Fiction</a> to
          <a>Biography</a> , <a>Sci-Fi</a>, <a>Mystery</a>, <a>YA</a>,
          <a>Manga</a>, and more, Barnes & Noble has the perfect book for you.
          Shop bestselling books from the <a>NY Times Bestsellers list</a>, or
          get personalized recommendations to find something new and unique!
          Discover <a>kids books</a> for children of all ages including classics
          like <a>Dr. Seuss</a> to modern favorites like the
          <a>Dog Man series</a>.
        </p>
      </div>
      <div class="about-item">
        <p class="item-title">
          eBooks Delivered Straight to your NOOK Device or Mobile NOOK App.
        </p>
        <p class="item-description">
          Reading on the go has never been easier with our convenient NOOK
          eReaders and tablets. Download eBooks and read them on our
          <a>free NOOK app</a> for both Apple and Android devices. Browse
          millions of titles to read anywhere, anytime. Shop eBooks on a budget
          in our <a>eBooks Under $2.99</a> collection or current best sellers in
          our <a>Top 100 eBooks collection</a>. We also have a large selection
          of <a>books by indie authors</a>. Buy the <a>NOOK GlowLight 4</a> for
          seamless day-to-night reading, or the latest NOOK tablet for endless
          options at your fingertips.
        </p>
      </div>
      <div class="about-item">
        <p class="item-title">Find a Flagships Books Bookstore Near Me</p>
        <p class="item-description">
          Barnes & Noble has over 600 stores throughout the United States. Find
          a bookstore near you using our <a>store locator</a>. You can also find
          information on curbside pickup, store events (and virtual events),
          store hours, Barnes & Noble Café menus and more.
        </p>
      </div>
      <div class="about-item">
        <p class="item-title">
          Buy Audiobooks and Listen Anytime, Anywhere with our B&N NOOK App.
        </p>
        <p class="item-description">
          Listening to audiobooks has never been better with B&N Audiobooks.
          <a>Subscribe today</a> and get started with your free audiobook or
          purchase books anytime without a subscription. Browse over 300,000 new
          releases, bestsellers, classics and more! Discover
          <a>the best audiobooks to listen to now</a>, while you’re driving,
          walking, or for your next <a>family road trip</a>. Listen to
          audiobooks read by your favorite authors or popular
          <a>celebrity narrators</a> anytime, anywhere on the free Barnes &
          Noble <a>NOOK App</a>.
        </p>
      </div>
      <div class="about-item">
        <p class="item-title">
          Your Destination for Movies, Music, Toys and More!
        </p>
        <p class="item-description">
          We’re more than just a bookstore; find all of the best <a>toys</a>,
          <a>puzzles</a>, music, movies and collectibles at Barnes & Noble. From
          popular <a>LEGO sets</a> to the latest <a>board games</a>, we carry a
          wide selection of toys for the entire family. Music fans can enjoy our
          <a>vinyl store</a> including best-selling records, <a>turntables</a>,
          and <a>B&N exclusive vinyl</a>, while movie and TV fans can find all
          their favorites including <a>boxed sets</a> of the latest TV series,
          classics and new releases on Blu-Ray, or a variety of the greatest
          movies from around the world in the <a>Criterion collection</a>.
        </p>
      </div>
      <div class="about-item">
        <p class="item-title">
          Become a Flagships Book Member for Exclusive Deals and Free Shipping
          Online.
        </p>
        <p class="item-description">
          You love reading? We do too! Sign up to become a Barnes & Noble member
          for exclusive in-store discounts, free shipping, and more.
        </p>
      </div>
    </div>
    <button @click="showClick" class="show-btn">
      {{ title }} <i :class="icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Read more",
      icon: "fa-solid fa-angle-down",
      changeShow: false,
    };
  },
  methods: {
    showClick() {
      this.changeShow = !this.changeShow;
      if (this.changeShow) {
        this.title = "Read less";
        this.icon = "fa-solid fa-angle-up";
      } else {
        this.title = "Read more";
        this.icon = "fa-solid fa-angle-down";
      }
    },
  },
};
</script>

<style scoped>
@import url(./about.css);
</style>