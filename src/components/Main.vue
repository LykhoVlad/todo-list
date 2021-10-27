<template>
  <div class="main container">
    <h1>ToDo List</h1>
    <div class="new-item">
      <md-field>
        <label>New Item</label>
        <md-input v-model="newItem" @keyup.enter="addNewItem" />
      </md-field>
      <img class="new-item__thumb" v-if="image" :src="image" alt="new item">
      <div
      v-if="draw"
      class="new-item__draw fixed"
      @click.self="newImage()">
        <VueDraw
        class="new-item__draw-canvas absolute-center"
        @getImage="newImage($event)"/>
      </div>
      <div class="new-item__buttons">
        <md-button class="md-raised" @click="draw = true">Add image</md-button>
        <md-button class="md-raised md-primary" @click="addNewItem()">Add New</md-button>
      </div>
    </div>
    <div class="todo">
      <p>Total: {{ filterTodos.length }}</p>
      <div class="todo__filter">
        <md-button class="md-raised md-primary" :disabled="filter === 'all'" @click="changedFilter('all')">All</md-button>
        <md-button class="md-raised md-primary" :disabled="filter === 'active'" @click="changedFilter('active')">Active</md-button>
        <md-button class="md-raised md-primary" :disabled="filter === 'completed'" @click="changedFilter('completed')">Completed</md-button>
      </div>
      <div class="todo__content">
        <template v-if="filterTodos.length > 0">
          <Item
            v-for="item of filterTodos"
            :key="item.id"
            :todo="item"
            @fullImage="setFullImage($event)"
          />
        </template>
        <template v-else>
          <h2>No items in this category</h2>
        </template>
      </div>
      <md-button v-if="showClearButton && (filter == 'all' || filter == 'completed' )" class="md-raised md-accent" @click="clearCompleted()">Clear Completed</md-button>
    </div>
    <div v-if="fullImage" class="fixed" @click.self="fullImage = ''">
      <img class="absolute-center" :src="fullImage" alt="full">
    </div>
  </div>
</template>

<script>
import Item from './Item.vue';
import VueDraw from './Vue-draw.vue'

export default {
  name: 'Main',
  components: {
    Item,
    VueDraw
  },
  data () {
    return {
      newItem: '',
      idForNew: 0,
      draw: false,
      image: '',
      fullImage: '',
    }
  },
  created() {
    const stateVuex = localStorage.getItem('vuex');
    if(stateVuex) {
      const getStateObj = JSON.parse(stateVuex);
      this.$store.state.todos = getStateObj.todos;
    } else {
      this.$store.state.todos = [];
    }
    this.idForNew = this.$store.state.todos.length + 1;
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    },
    filterTodos() {
      return this.$store.getters.filterTodos;
    },
    showClearButton() {
      return this.$store.getters.showClearButton
    }
  },
  methods: {
    addNewItem () {
      if(this.newItem.trim().length === 0) {
        return
      }

      this.$store.dispatch('addNewItem', {
        id: this.idForNew,
        title: this.newItem,
        image: this.image
      })

      this.newItem = '';
      this.image = '';
      this.idForNew++;
    },
    newImage(image) {
      this.image = image;
      this.draw = false;
    },
    changedFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    },
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    },
    setFullImage(image) {
      this.fullImage = image;
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    @media only screen and (min-width: 768px) {
      max-width: 720px;
    }
    @media only screen and (min-width: 992px) {
      max-width: 960px;
    }
    @media only screen and (min-width: 1200px) {
      max-width: 1140px;
    }
    @media only screen and (min-width: 1400px) {
      max-width: 1320px;
    }
  }

  .fixed {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.8);
    z-index: 9;
  }

  .absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  .new-item {
    display: flex;
    align-items: center;

    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      @media only screen and (min-width: 768px) {
        flex-direction: row;
      }
    }
    &__thumb {
      width: 40px;
      height: 40px;
    }
  }
  .todo {
    &__filter {
      md-button {
        &.active {
          background: blue;
        }
      }
    }
    &__content {
      width: 100%;
      margin-top: 20px;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr;
      grid-gap: 20px;

      @media only screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
      @media only screen and (min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
</style>
