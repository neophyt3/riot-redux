var riot = require('riot')
var redux = require('redux')
var thunk = require('redux-thunk')

require('./tags/todo-app.tag')
require('./tags/task-list.tag')
require('./tags/loading-indicator.tag')
require('./tags/task-form.tag')

var reducer = function(state={tasks:[]},action){
  console.log(action)
  switch(action.type){
    case 'TASKS_LOADED':
      return Object.assign({},state,{tasks:action.data})
    case 'TOGGLE_LOADING':
      return Object.assign({},state,{isLoading:action.data})
    case 'TASK_ADDED':
      return Object.assign({},state,{tasks:state.tasks.concat(action.data)})
    case 'TASK_COMPLETION_CHANGED':
      //TODO 1: Use the passed in id to get the task's index in the array
      var taskIndex = state.tasks.findIndex(function(task){
        return task.id == action.data.id
      })
      //TODO 2: Update the isComplete flag on the target task
      //TODO 3: Create a new array with the updated task and the original tasks
      var newTasks = state.tasks.slice(0,taskIndex)
        .concat(/*The updated task goes here*/)
      //TODO 4: Create a new state object that uses the updated tasks array
    default:
      return state
  }
}

// var reduxStore = redux.createStore(reducer)
var createStoreWithMiddleware = redux.compose(
  redux.applyMiddleware(thunk)
)(redux.createStore)

var reduxStore = createStoreWithMiddleware(reducer)

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('todo-app',{store:reduxStore})
})
