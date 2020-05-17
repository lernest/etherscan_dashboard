<template>
  <!-- When the card is clicked, flip to the other side -->
  <!-- Using click.native prevents the highlight/ripple effect -->
  <v-card
    outlined
    class="custom-card mx-auto my-1 pa-4"
    height="100%"
    @click.native="flipped = !flipped"
  >
    <div v-bind:class="flipped ? 'flip-container flipped' : 'flip-container'">
      <div class="flipper">
        <!-- Front of the card -->
        <div class="front">
          <slot name="front"></slot>
        </div>

        <!-- Back of the card -->
        <div class="back">
          <slot name="back"></slot>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
// https://github.com/andersponders/vue-flip-card/blob/master/FlipCard.vue

export default {
  name: "FlipCard",
  data: function() {
    return {
      flipped: false // Toggle on card click
    };
  }
};
</script>

<style type='text/css' scoped>
.custom-card {
  margin-bottom: 15px;
  overflow-y: auto;
}
.flip-container {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
}
.flip-container {
  height: 100%;
}
.flipper {
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.front {
  z-index: 2;
}
</style>