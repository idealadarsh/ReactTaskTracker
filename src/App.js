import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const db = 'DB';

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const res = localStorage.getItem(db)
    const tasksfromStorage = JSON.parse(res)
    if(tasksfromStorage !== null) setTasks(tasksfromStorage)
  }, [])

  const saveTasks = (updatedTasks) => {
    console.log(updatedTasks)
    localStorage.setItem(db, JSON.stringify(updatedTasks))
  }

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
    saveTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    saveTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
    saveTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show' }
          </>
        )}/>
        <Route path='/about' exact component={About} />
        <Footer/>
      </div>
    </Router>
  );
}

export default App;