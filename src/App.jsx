import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './TaskCard';
import { Add } from '@mui/icons-material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const LOCAL_STORAGE_KEY = "muiTaskApp"

function App() {
  const [tasks, setTasks] = useState({})

  const [taskOrder, setTaskOrder] = useState([])

  const [mouseIsOverTaskId, setMouseIsOverTaskId] = useState(undefined)

  const [editedTaskId, setEditedTaskId] = useState(undefined)

  useEffect(() => {
    if (taskOrder.length === 0) {
      const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

      if (storedData) {
        setTasks(() => storedData.tasks)
        setTaskOrder(() => storedData.taskOrder)
      } else {
        setTasks(() => {
          return {
            '0': {
              isCompleted: false,
              title: 'Take out the garbage',
              description: '',
            },
            '1': {
              isCompleted: false,
              title: 'Cook dinner',
              description: 'Before 8 PM',
            },
          }
        })
        setTaskOrder(() => ['0', '1'])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      tasks: tasks,
      taskOrder: taskOrder
    }))
  }, [tasks, taskOrder])

  const handleCheck = (event, taskId) => {
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      tasks[taskId].isCompleted = event.target.checked
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

    if (editedTaskId === taskId) {
      setEditedTaskId(undefined)
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

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    setTaskOrder(prevTaskOrder => {
      const taskOrder = [...prevTaskOrder]
      taskOrder.splice(source.index, 1)
      taskOrder.splice(destination.index, 0, draggableId)
      return taskOrder
    })
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography sx={{m: 'auto', fontSize: '1.5em', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.05em'}}>
            MyTasks
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box
        display='flex'
        justifyContent='center'
      >
        <Stack>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'main'}>
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    taskOrder.map((taskId, placeInColumn) => {
                      const task = tasks[taskId]

                      return (
                        <TaskCard
                          key={taskId}
                          task={task}
                          taskId={taskId}
                          placeInColumn={placeInColumn}
                          showButtons={editedTaskId === undefined && taskId === mouseIsOverTaskId}
                          editMode={editedTaskId === taskId}
                          allowSaving={task.title !== ''}
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
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
          {
            editedTaskId === undefined &&
              <Button
                onClick={handleAddClick}
                variant="contained"
                startIcon={<Add />}
                sx={{m: 1}}
              >
                New Task
              </Button>
          }
        </Stack>
      </Box>
    </>
  )
}

export default App
