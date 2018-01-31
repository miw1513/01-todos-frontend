import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    todos: [],
    visibility: 'all'
  },
  mutations: {
    ADD_TODO (state, title) {
      state.todos = state.todos || []
      state.todos.push({
        title,
        completed: false
      })
    },
    CHANGE_VISIBILITY (state, newVisibilityValue) {
      state.visibility = newVisibilityValue
    },
    REMOVE_TODO (state, index) {
      state.todos.splice(index, 1)
    },
    SORT_TABLE (state, index) {
      state.todos.splice(index.newIndex, 0, state.todos.splice(index.oldIndex, 1)[0])
    },
    REMOVE_COMPLETED_TODOS (state) {
      for (let i = state.todos.length - 1; i >= 0; i--) {
        if (state.todos[i].completed) {
          state.todos.splice(i, 1)
        }
      }
    },
    SETTODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    setTodos ({commit}, todos) {
      commit('SETTODOS', todos)
    },
    removeTodo ({commit, dispatch}, index) {
      commit('REMOVE_TODO', index)
      dispatch('saveTodos')
    },
    removeCompletedTodos ({commit, dispatch}) {
      commit('REMOVE_COMPLETED_TODOS')
      dispatch('saveTodos')
    },
    addTodo ({commit, dispatch}, title) {
      commit('ADD_TODO', title)
      dispatch('saveTodos')
    },
    changeVisibility ({commit}, newVisibilityValue) {
      commit('CHANGE_VISIBILITY', newVisibilityValue)
    },
    saveTodos ({state}) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    sortTable ({commit, dispatch}, index) {
      commit('SORT_TABLE', index)
      dispatch('saveTodos')
    }
  },
  getters: {
    todos: state => state.todos,
    visibility: state => state.visibility
  }
})
