<template lang="html">
  <div>
    <item-container-header
      v-if="title"
      :class="{inactive}"
      v-bind="{title,description,level,img,imgSource}"
    />
    <ul class="item-container">
      <li v-for="child in contains" :key="child.title" :class="{itemContainer: child.contains, item: !child.contains, inactive: child.inactive}">
        <item-container 
          v-if="child.contains"
          v-bind="child"
          :level="level+1"
          @select="select"
        />
        <item 
          v-else
          v-bind="child"
          @select="select(arguments[0], [child.title])"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="js">
  import Item from './Item.vue'
  import ItemContainerHeader from './ItemContainerHeader.vue'
  export default {
    name: 'item-container',
    props: ['title', 'description', 'img', 'imgSource', 'contains', 'level', 'inactive'],
    created () {
      // debugger
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      select (isSelected, path) {
        if (this.title) path.unshift(this.title)
        this.$emit('select', isSelected, path)
      }
    },
    components: {Item, ItemContainerHeader}
}
</script>

<style scoped lang="scss">
  ul {
    padding-left: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
</style>
