<template lang="html">
  <div :class="[{picked: selected, inactive}, 'item']" @click="toggleSelected">
    <img v-if="img" :src="'static/img/'+img">
    <div class="horizontal">
      <a class="imgSource" :href="imgSource" @click.stop target="_blank">Image Source</a>
      <p :class="['price', {cost: cost > 0, gain: cost < 0, neutral: !cost || cost === 0}]">
        {{ isNaN(cost) || cost === 0 ? 'No Cost' : Math.abs(cost)+' Points' }}
      </p>
    </div>
    <h1 class="title">{{ title }}</h1>
    <p class="description" v-html="description"></p>
  </div>
</template>

<script lang="js">
  export default {
    name: 'item',
    props: ['title', 'cost', 'description', 'img', 'imgSource', 'selected', 'inactive'],
    mounted () {

    },
    data () {
      return {
      }
    },
    methods: {
      toggleSelected () {
        this.$emit('select', !this.selected)
      }
    }
}
</script>

<style scoped lang="scss">
  .item {
    background-color: #99d8ff;
    /*max-width: 20em;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  .title {
    margin: 0;
  }
  .picked {
    outline: 1em solid #decd55;
  }
  .imgSource {
    color: #7aa1b9;
    text-decoration: none;
    align-self: left;
  }
  .price.gain::before {
    content: 'Gain:';
    color: #217f21;
  }
  .price.cost::before {
    content: 'Cost:';
    color: #842323;
  }
  .horizontal {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .horizontal > * {
    margin: 0.5em 0;
  }
</style>
