<template>
  <div class="todo__item" >
    <div class="todo__item-info">
      <md-checkbox v-model="completed" class="md-primary" @change="changedTodo()" />
      <p
      v-if="!edit"
      class="md-title title"
      :class="{'completed': completed}"
      @dblclick="editItem()">
        {{ title }}
      </p>
      <md-field v-else>
        <md-input
          v-model="editTitle"
          @keyup.enter="saveChange()"
          @keyup.esc="cancelChange()"
        />
      </md-field>
      <img class="todo__item-thumb" v-if="image" :src="image" alt="title" @click="getFullImage()">
    </div>
    <div @click="removeTodo()">
      <md-icon>highlight_off</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  watch: {
    index: function (val) {
      this.index = val;
    }
  },
  data () {
    return {
      edit: false,
      id: this.todo.id,
      title: this.todo.title,
      image: this.todo.image,
      completed: this.todo.completed,
      editTitle: '',
    }
  },
  methods: {
    editItem () {
      this.edit = true;
      this.editTitle = this.title;
    },
    cancelChange() {
      this.edit = false;
    },
    saveChange() {
      if(this.editTitle.trim() != 0) {
        this.title = this.editTitle
      }

      this.changedTodo();
      this.edit = false;
    },
    changedTodo() {
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
  .todo__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    &-info {
      display: flex;
      align-items: center;

      .completed {
        text-decoration: line-through;
      }
    }
    &-thumb {
      width: 35px;
      height: 35px;
      margin: 0 20px;
    }

    .md-icon {
      margin: 0;
    }
  }
</style>