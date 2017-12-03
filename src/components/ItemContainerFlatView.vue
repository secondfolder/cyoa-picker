<template lang="html">
  <div :class="{inactive}">
    <h1 class="groupTitle" v-if="title">{{ title }}</h1>
    <ul class="item-container">
      <li v-for="child in contains" :key="child.title" :class="{selected: child.selected}">
        <item-container-flat-view
          v-if="child.contains"
          v-bind="child"
          @select="select"
        />
        <h1 
          :class="{inactive: child.inactive}" 
          @click="select(!child.selected, [child.title])"
          v-else
        >
          {{child.title}}
        </h1>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
  export default {
    name: 'item-container-flat-view',
    props: ['title', 'contains', 'inactive'],
    data () {
      return {
      }
    },
    methods: {
      select (isSelected, path) {
        if (this.title) path.unshift(this.title)
        this.$emit('select', isSelected, path)
      }
    }
}
</script>

<style scoped lang="scss">
  ul {
    //padding-left: 0px;
    text-align: initial;
    padding-left: 0;
  }  
  li {
    list-style-type: none;
    margin: 30px;
    max-width: 100%;
  }
  li.itemContainer {
    flex: 0 1 auto;
  }
  li.item {
    flex: 0 1 15em;
  }
  h1 {
    font-size: 1.2em;
    font-weight: normal;
  }
  h1.groupTitle {
    font-weight: bold;
  }
  li.selected {
    position: relative;
  }
  li.selected::before {
    color: #decd55;
    content: "\2022";
    position: absolute;
    left: -0.7em;
    font-size: 3em;
    line-height: 0.6em;
  }
</style>
