<template>
  <v-app>
    <v-content>
      <div class="sections-menu">
        <span
          class="menu-point"
          v-bind:class="{ active: activeSection == index }"
          v-on:click="scrollToSection(index)"
          v-for="(offset, index) in offsets"
          v-bind:key="index"
        >
        </span>
      </div>
      <section class="panel" v-for="(slide, i) in slides" :key="i">
        <div
          class="img"
          :style="`background-image:url(${slide.imageURL})`"
        ></div>
      </section>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "VueFullPageHorzScroller",
  props: {
    slides: {
      type: Array,
      required: true
    },    
  },
  data: () => ({
    inMove: false,
    activeSection: 0,
    offsets: [],
    touchStartX: 0,
  }),
  methods: {
    calculateSectionOffsets() {
      let sections = document.getElementsByTagName("section");
      let length = sections.length;

      for (let i = 0; i < length; i++) {
        let sectionOffset = sections[i].offsetRight;
        this.offsets.push(sectionOffset);
      }
    },
    handleMouseWheel: function(e) {
      if (e.wheelDelta < 30 && !this.inMove) {
        this.moveLeft();
      } else if (e.wheelDelta > 30 && !this.inMove) {
        this.moveRight();
      }

      e.preventDefault();
      return false;
    },
    handleMouseWheelDOM: function(e) {
      if (e.detail > 0 && !this.inMove) {
        this.moveLeft();
      } else if (e.detail < 0 && !this.inMove) {
        this.moveRight();
      }
      return false;
    },
    moveRight() {
      this.inMove = true;
      this.activeSection--;

      if (this.activeSection < 0) this.activeSection = this.offsets.length - 1;

      this.scrollToSection(this.activeSection, true);
    },
    moveLeft() {
      this.inMove = true;
      this.activeSection++;

      if (this.activeSection > this.offsets.length - 1) this.activeSection = 0;

      this.scrollToSection(this.activeSection, true);
    },
    scrollToSection(id, force = false) {
      let timeout;
      if (this.inMove && !force) return false;

      this.activeSection = id;
      this.inMove = true;

      document
        .getElementsByTagName("section")
        [id].scrollIntoView({ behavior: "smooth", inline: "nearest" });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.inMove = false;
      }, 400);
    },
    touchStart(e) {
      e.preventDefault();

      this.touchStartX = e.touches[0].clientX;
    },
    touchMove(e) {
      if (this.inMove) return false;
      e.preventDefault();

      const currentX = e.touches[0].clientX;

      if (this.touchStartX < currentX) {
        this.moveRight();
      } else {
        this.moveLeft();
      }

      this.touchStartX = 0;
      return false;
    },
  },
  mounted() {
    this.calculateSectionOffsets();

    window.addEventListener("DOMMouseScroll", this.handleMouseWheelDOM); // Mozilla Firefox
    window.addEventListener("mousewheel", this.handleMouseWheel, {
      passive: false,
    }); // Other browsers

    window.addEventListener("touchstart", this.touchStart, { passive: false }); // mobile devices
    window.addEventListener("touchmove", this.touchMove, { passive: false }); // mobile devices
  },
  destroyed() {
    window.removeEventListener("mousewheel", this.handleMouseWheel, {
      passive: false,
    }); // Other browsers
    window.removeEventListener("DOMMouseScroll", this.handleMouseWheelDOM); // Mozilla Firefox

    window.removeEventListener("touchstart", this.touchStart); // mobile devices
    window.removeEventListener("touchmove", this.touchMove); // mobile devices
  },
};
</script>

<style scoped lang="scss">
#app {
  background: #000;
  width: 500%;
  height: 100%;
  overflow: hidden;
  .sections-menu {
    position: fixed;
    z-index: 99;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    .menu-point {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #999;
      display: block;
      margin: 1rem 0;
      opacity: 0.6;
      transition: 0.4s ease all;
      cursor: pointer;
      &.active {
        opacity: 1;
        transform: scale(1.5);
      }
    }
  }
  section.panel {
    width: 20%;
    height: 100vh;
    display: inline-flex;
    float: left;
    justify-content: center;
    flex-direction: column;
    .img {
      background-size: 103% auto, cover;
      background-position: -5px center;
      width: 100%;
      height: 100vh;
      opacity: 0.6;
    }
  }
}
</style>
