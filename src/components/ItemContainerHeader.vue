<template lang="html">
  <section class="groupHeader">
    <h1 v-if="title && level === 1">{{ title }}</h1>
    <h2 v-if="title && level === 2">{{ title }}</h2>
    <h3 v-if="title && level === 3">{{ title }}</h3>
    <h4 v-if="title && level === 4">{{ title }}</h4>
    <h5 v-if="title && level === 5">{{ title }}</h5>
    <p class="description" v-if="description" v-html="description"></p>
    <img v-if="img" :src="'static/img/'+img">
    <a v-if="imgSource" class="imgSource" :href="imgSource" @click.stop target="_blank">Image Source</a>
  </section>
</template>

<script lang="js">
  export default {
    name: 'item-container-header',
    props: ['title', 'description', 'level', 'img', 'imgSource'],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      spent (cost) {
        this.$emit('spent', cost)
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  h1 {
    font-size: 6em;
  }
  h2 {
    font-size: 4em;
  }
  h3 {
    font-size: 3em;
  }
  h4 {
    font-size: 2em;
  }
  h5 {
    font-size: 1em;
  }
  ul {
    padding-left: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .description {
    background-color: #99d8ff;
    padding: 1em;
    max-width: 40em;
    margin: auto;
  }
  img {
    padding: 3em;
    padding-bottom: 1em;
    max-width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 500px) {
    img {
      padding: 0;
      padding-bottom: 1em;
    }
    h1 {
      font-size: 3em;
    }
    h2 {
      font-size: 2.5em;
    }
    h3 {
      font-size: 2em;
    }
    h4 {
      font-size: 1.5em;
    }
    h5 {
      font-size: 1em;
    }
  }
  .imgSource {
    color: #234d67;
    text-decoration: none;
    align-self: left;
    display: block;
  }
</style>
