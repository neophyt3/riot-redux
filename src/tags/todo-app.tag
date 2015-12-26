<todo-app>

  <task-list tasks={this.state.tasks}></task-list>

  <script>
    var actions = require('../actions.js')
    var store = this.opts.store

    store.subscribe(function(){
      this.state = store.getState()
      this.update()
    }.bind(this))
  </script>
</todo-app>