<template>
  <div id="page" :class="{hideInactive}">
    <item-container-header
      v-if="title"
      v-bind="{title,level: 1,description: 'To share what you picked simply copy the current page address'}"
    />
    <div v-if="flatView" class="itemContainerFlatView">
      <item-container-flat-view
        v-if="flatView"
        :contains="contains"
      />
    </div>
    <item-container
      v-if="!flatView"
      :contains="contains"
      :level="1"
    />
    <footer>
      <div>
        <button @click="toggleFlatView">
          {{this.flatView ? 'Card' : 'Flat'}} View
        </button>
        <button @click="toggleHideInactive">
          {{this.hideInactive ? 'Show' : 'Hide'}} Unchoosen
        </button>
      </div>
      <div>
        <button @click="editChoices">
          Edit
        </button>
      </div>
    </footer>
  </div>  
</template>

<script>
import ItemContainerFlatView from './ItemContainerFlatView.vue'
import ItemContainer from './ItemContainer.vue'
import ItemContainerHeader from './ItemContainerHeader.vue'
import data from '../../static/json/data.json'
require.context('../../static/img', true, /\.(png|jpe?g|gif|svg)(\?.*)?$/)
export default {
  name: 'Share',
  props: ['hash'],
  created () {
    function setInitSelection (items) {
      items.forEach(item => {
        if (!item.contains && item.selected === undefined) return this.$set(item, 'selected', false)
        setInitSelection.bind(this)(item.contains)
      })
    }
    if (this.$route.params.hash) {
      this.restoreStatusHash(this.$route.params.hash)
    } else {
      setInitSelection.bind(this)(this.contains)
    }
  },
  data () {
    return {
      ...data,
      inactive: false,
      hideInactive: true,
      flatView: false
    }
  },
  components: {ItemContainer, ItemContainerHeader, ItemContainerFlatView},
  methods: {
    select (isSelected, path) {
      this.getSelected(path).selected = isSelected
    },
    getStatusHash () {
      function traverse (data, i) {
        if (data.contains) {
          var path = [i]
          for (var j = 0; j < data.contains.length; j++) {
            var subPath = traverse.bind(this)(data.contains[j], j)
            if (subPath !== false) {
              path.push(subPath)
            }
          }
          return path.length > 1 ? path : false
        }
        return !data.inactive ? i : false
      }
      var selectionTree = traverse.bind(this)(this, 0)
      return btoa(JSON.stringify(selectionTree))
    },
    restoreStatusHash (hash) {
      var selectionTree = JSON.parse(atob(hash))
      function traverse (data, status) {
        this.$set(data, 'inactive', status === undefined)
        if (!data.contains) {
          this.$set(data, 'selected', false)
        } else {
          for (var i = 0; i < data.contains.length; i++) {
            var newStatus = typeof status === 'object' ? status.slice(1).find(s => {
              if (s[0] === i) return s
              if (s === i) return true
              return false
            }) : undefined
            traverse.bind(this)(data.contains[i], newStatus)
          }
        }
        /*
        if (!data.contains) return
        for (var i = 0; i < data.contains.length; i++) {
          var newStatus = typeof status === 'object' ? status.slice(1).find(s => {
            if (s[0] === i) return s
            if (s === i) return true
            return false
          }) : undefined
          if (newStatus === undefined) {
            data.contains.splice(i, 1)
            i--
          } else {
            traverse.bind(this)(data.contains[i], newStatus)
          }
        }
        */
      }
      traverse.bind(this)(this, selectionTree)
    },
    getSelected (path) {
      var pathCopy = path.slice() // copy so as not to mod original
      var selected = {contains: Object.assign(this.contains)}
      while (selected.contains) {
        selected = selected.contains
        var title = pathCopy.shift()
        selected = selected.find(item => item.title === title)
      }
      return selected
    },
    removeSelection (path) {
      const parent = this.getSelectedParent(path)
      const index = parent.findIndex(
        item => item.title === path[path.length - 1]
      )
      parent.splice(index, 1)
    },
    getSelectedParent (path) {
      path = path.splice() // copy so as not to mod original
      var selected = this.selected
      while (path.length > 1) {
        selected = selected[path.shift()]
      }
      path = path.shift()
      return selected.find(s => s.title === path)
    },
    toggleHideInactive () {
      this.hideInactive = !this.hideInactive
    },
    toggleFlatView () {
      this.flatView = !this.flatView
    },
    editChoices () {
      this.$router.push({name: 'Index', params: { hash: this.getStatusHash() }})
    }
  }
}
</script>

<style lang="scss">
  #page.hideInactive .inactive {
    display: none;
  }
  .inactive {
    opacity: 0.7;
  }
</style>
<style scoped lang="scss">
  #page {
    margin-bottom: 8em;
  }
  .itemContainerFlatView {
    background-color: #99d8ff;
    padding: 0.5em;
    margin: 1em;
  }
  footer {
    position: fixed;
    bottom: 0;
    background-color: #d6e3ea;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    font-weight: bold;
    flex-wrap: wrap;
    padding: 0.5em;
    justify-content: space-between;
  }
  @media (max-width: 40em) {
    footer {
      justify-content: center;
    }
  }
  footer div > * {
    margin: 0.5em;
    padding-top: 0.2em;
  }
  footer button {
    background-color: #99d8ff;
    color: #2c3e4f;
    font-weight: bold;
    font-size: 1.2em;
    padding-bottom: 0.2em;
  }
  footer button:focus {
    outline: none;
    /*box-shadow: 0 0 3pt 2pt #ffffff;*/
  }
  footer.overBudget .remaining {
    color: #a01111;
  }
  footer.overBudget button {
    color: #bfbfbf;
    background-color: #d4d4d4;
  }
</style>
