import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        'id': 1,
        'title': 'First todo',
        'completed': false,
        'image': ''
      }
    ]
  },
  plugins: [createPersistedState()],
  getters: {
    filterTodos(state) {
      if(state.filter === 'all') {
        return state.todos;
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed);
      } else {
        return state.todos
      }
    },
    showClearButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addNewItem(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        image: todo.image,
        completed: false,
      })
    },
    updateItem(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      if(index) {
        state.todos.splice(index, 1, {
          'id': todo.id,
          'title': todo.title,
          'image': todo.image,
          'completed': todo.completed,
        })
      }
    },
    removeTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      if(index) {
        state.todos.splice(index, 1);
      }
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    }
  },
  actions: {
    addNewItem(context, todo) {
      context.commit('addNewItem', todo)
    },
    updateItem(context, todo) {
      context.commit('updateItem', todo)
    },
    removeTodo(context, id) {
      context.commit('removeTodo', id)
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    clearCompleted(context) {
      context.commit('clearCompleted')
    }
  }
})