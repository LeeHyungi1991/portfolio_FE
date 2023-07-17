<template>
  <div class="vh-100 main" id="skill" ref="skill">
    <div v-if="components" class="skill-container pad-2-percent d-flex justify-content-center">
      <b-icon-arrow-left @click="$router.push({name: 'Main'})" class="back-arrow"></b-icon-arrow-left>
      <div class="d-flex w-100 h-100 justify-content-evenly align-items-center flex-wrap overflow-y-auto">
        <b-card @click="$router.push({name: component.name})" class="h-60 card-component card-hover" style="width: 23%; cursor: pointer;" v-for="component in components" :key="component.name">
          {{ component.koreanName }}
          <b-card-img :src="component.image" class="h-90" :alt="component.koreanName"></b-card-img>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/eventbus/EventBus";
import Scraper from "@/views/Skill/Scraper";
import Mail from "@/views/Skill/Mail";
import OpenMap from "@/views/Skill/OpenMap";
import OmokBoard from "@/views/Skill/Omok/OmokBoard";
/* eslint-disable */
export default {
  name: "Skill",
  mounted() {
    EventBus.$emit('showHeader');
  },
  data() {
    return {
      components: [OpenMap, OmokBoard, Mail, Scraper],
      slideIndex: 1
    }
  },
  methods: {
    showHeader() {
      EventBus.$emit('showHeader');
    },
    hideHeader() {
      EventBus.$emit('hideHeader');
    },
    // showSlides(n) {
    //   let i;
    //   const slides = document.getElementsByClassName("mySlides");
    //   const columns = document.getElementsByClassName("column");
    //   const captionText = document.getElementById("caption");
    //   if (n > slides.length) {
    //     this.slideIndex = 1
    //   }
    //   if (n < 1) {
    //     this.slideIndex = slides.length
    //   }
    //   for (i = 0; i < slides.length; i++) {
    //     slides[i].style.display = "none";
    //   }
    //   for (i = 0; i < columns.length; i++) {
    //     const dot = columns[i].getElementsByClassName("demo")[0];
    //     dot.className = dot.className.replace(" active", "");
    //     columns[i].style.width = 100 / slides.length + "%";
    //   }
    //   slides[this.slideIndex - 1].style.display = "block";
    //   columns[this.slideIndex - 1].getElementsByClassName("demo")[0].className += " active";
    //   captionText.innerHTML = columns[this.slideIndex - 1].getElementsByClassName("demo")[0].dataset.name;
    // },
    // plusSlides(n) {
    //   this.showSlides(this.slideIndex += n);
    // },
    // currentSlide(n) {
    //   this.showSlides(this.slideIndex = n);
    // }
  }
  // components: { 'virtual-list': VirtualList }
}
</script>

<style scoped>
.card-component {
  margin-top: 1%;
  margin-bottom: 1%;
}
#skill.main{
  /*padding: 1% 5%;*/
}
* {
  box-sizing: border-box;
}
#skill #caption {
  margin: 0;
}
/* Position the image container (needed to position the left and right arrows) */
.skill-container {
  height: calc(100vh - 70px);
  position: relative;
}

/* Hide the images by default */
.mySlides {
  height: 87%;
  /*display: none;*/
}

/* Add a pointer when hovering over the thumbnail images */
.cursor {
  cursor: pointer;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 48%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: black;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
}
.prev {
  left: 0;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* Container for image text */
.caption-container {
  text-align: center;
  background-color: #222;
  padding: 2px 16px;
  color: white;
  height: 5%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Six columns side by side */
.column {
  float: left;
  height: 5%;
}

/* Add a transparency effect for thumnbail images */
.demo {
  opacity: 0.6;
  font-size: 5vmin;
}

.active,
.demo:hover {
  opacity: 1;
}

.card-hover:hover {
 background-color: #f5f5f5;;
}
</style>
