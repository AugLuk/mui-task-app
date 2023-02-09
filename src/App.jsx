import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './TaskCard';
import { Add } from '@mui/icons-material';


function App() {
  const [tasks, setTasks] = useState({
    '0': {
      id: '0',
      isCompleted: false,
      title: 'Take out the garbage',
      description: '',
    },
    '1': {
      id: '1',
      isCompleted: false,
      title: 'Cook dinner',
      description: 'Before 8 PM',
    },
  })

  const [taskOrder, setTaskOrder] = useState(['0', '1'])

  const [mouseIsOverTaskId, setMouseIsOverTaskId] = useState(undefined)

  const [editedTaskId, setEditedTaskId] = useState(undefined)

  const handleCheck = (event, taskId) => {
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      tasks[taskId].isComplete = event.target.checked
      return tasks
    })
  }

  const handleMouseEnter = taskId => {
    setMouseIsOverTaskId(taskId)
  }

  const handleMouseLeave = taskId => {
    if (taskId === mouseIsOverTaskId) {
      setMouseIsOverTaskId(undefined)
    }
  }

  const handleEditClick = taskId => {
    setEditedTaskId(taskId)
  }

  const handleDeleteClick = (taskId, placeInColumn) => {
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      delete tasks[taskId]
      return tasks
    })

    setTaskOrder(prevTaskOrder => {
      const taskOrder = [...prevTaskOrder]
      taskOrder.splice(placeInColumn, 1) 
      return taskOrder
    })

    if (taskId === mouseIsOverTaskId) {
      setMouseIsOverTaskId(undefined)
    }
  }

  const handleSaveClick = () => {
    setEditedTaskId(undefined)
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

  const handleAddClick = () => {
    const taskId = uuidv4()

    setTasks(prevTasks => {
      return {
        ...prevTasks,
        [taskId]: {
          id: taskId,
          isCompleted: false,
          title: '',
          description: '',
        }
      }
    })

    setTaskOrder(prevTaskOrder => [
      ...prevTaskOrder,
      taskId
    ])

    setEditedTaskId(taskId)
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
            taskOrder.map((taskId, placeInColumn) => {
              const task = tasks[taskId]

              return (
                <TaskCard
                  task={task}
                  taskId={taskId}
                  placeInColumn={placeInColumn}
                  showButtons={editedTaskId === undefined && taskId === mouseIsOverTaskId}
                  editMode={editedTaskId === taskId}
                  key={taskId}
                  handleCheck={handleCheck}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  handleSaveClick={handleSaveClick}
                  handleTitleChange={handleTitleChange}
                  handleDescriptionChange={handleDescriptionChange}
                />
              )
            })
          }
          <Button
            onClick={handleAddClick}
            variant="contained"
            startIcon={<Add />}
            sx={{m: 1}}
          >
            New Task
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default App
