<template>
  <md-card>
    <md-card-media>
      <md-ripple>
        <img class="item-image" v-if="image" :src="image" alt="title" @click="getFullImage()">
        <img class="item-image completed" v-else-if="completed && !image" src="../assets/done.jpg" alt="title" @click="getFullImage()">
        <img class="item-image" v-else src="../assets/todo.png" alt="title" @click="getFullImage()">
      </md-ripple>
    </md-card-media>

    <md-card-content>
      <md-field v-if="edit">
        <md-input
          v-model="title"
          @keyup.enter="saveChange()"
          @keyup.esc="cancelChange()"
        />
      </md-field>
      <p
      v-else
      class="md-title title"
      :class="{'completed': completed}"
      @dblclick="editItem()">
        {{ title }}
      </p>
    </md-card-content>

    <md-card-actions class="item">
      <md-checkbox v-model="completed" class="md-primary" @change="changedTodo()" />

      <md-button class="md-icon-button" @click="removeTodo()">
        <md-icon>highlight_off</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'Item',
  props: {
    todo: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      edit: false,
      id: this.todo.id,
      title: this.todo.title,
      image: this.todo.image,
      completed: this.todo.completed,
    }
  },
  methods: {
    editItem () {
      this.edit = true;
    },
    cancelChange() {
      this.edit = false;
    },
    saveChange() {
      if(this.title.trim().length === 0) {
        this.title = this.todo.title;
      }

      this.changedTodo();
      this.edit = false;
    },
    changedTodo() {
      console.log(this.completed)
      this.$store.dispatch('updateItem', {
        'id': this.id,
        'title': this.title,
        'image': this.image,
        'completed': this.completed,
      })
    },
    getFullImage() {
      this.$emit('fullImage', this.image)
    },
    removeTodo() {
      this.$store.dispatch('removeTodo', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    overflow-wrap: anywhere;

    &.completed {
    text-decoration: line-through;
  }
  }
  .item-image {
    max-height: 235px;
    object-fit: cover;

    &.completed {
      object-fit: contain;
    }
  }
</style>