import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './TaskCard';


function App() {
  const [tasks, setTasks] = useState({
    '0': {
      id: '0',
      isComplete: false,
      title: 'Take out the garbage',
      description: '',
    },
    '1': {
      id: '1',
      isComplete: false,
      title: 'Cook dinner',
      description: 'Before 8 PM',
    },
  })

  const [taskOrder, setTaskOrder] = useState(['0', '1'])

  const [mouseIsOverId, setMouseIsOverId] = useState(undefined)

  const [editingId, setEditingId] = useState(undefined)

  const handleCheck = (event, taskId) => {
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      tasks[taskId].isComplete = event.target.checked
      return tasks
    })
  }

  const handleMouseEnter = taskId => {
    setMouseIsOverId(taskId)
  }

  const handleMouseLeave = taskId => {
    if (taskId === mouseIsOverId) {
      setMouseIsOverId(undefined)
    }
  }

  const handleEditClick = taskId => {
    setEditingId(taskId)
  }

  const handleDeleteClick = taskId => {
    console.log('Delete Click')
  }

  const handleSaveClick = () => {
    setEditingId(undefined)
  }

  const handleTitleChange = (event, taskId) => {
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      tasks[taskId].title = event.target.value
      return tasks
    })
  }

  const handleDescriptionChange = (event, taskId) => {
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      tasks[taskId].description = event.target.value
      return tasks
    })
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant='h4'>
            Hi
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box
        display="flex"
        justifyContent="center"
      >
        <Stack >
          {
            taskOrder.map(taskId => {
              const task = tasks[taskId]

              return (
                <TaskCard
                  task={task}
                  taskId={taskId}
                  showButtons={editingId === undefined && taskId === mouseIsOverId}
                  editMode={editingId === taskId}
                  key={taskId}
                  handleCheck={handleCheck}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  handleSaveClick={handleSaveClick}
                  handleTitleChange={handleTitleChange}
                  handleDescriptionChange={handleDescriptionChange}
                >

                </TaskCard>
              )
            })
          }
        </Stack>
      </Box>
    </>
  )
}

export default App
