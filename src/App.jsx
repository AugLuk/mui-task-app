import { DeleteOutline, DragIndicator } from '@mui/icons-material'
import { AppBar, Box, Checkbox, Paper, Stack, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [tasks, setTasks] = useState({
    '0': {
      id: '0',
      isComplete: false,
      title: 'Take out the garbage',
      description: '',
      mouseIsOver: false
    },
    '1': {
      id: '1',
      isComplete: false,
      title: 'Cook dinner',
      description: 'Before 8 PM',
      mouseIsOver: false
    },
  })

  const [taskOrder, setTaskOrder] = useState(['0', '1'])

  const handleCheckboxChange = (event, taskId) => {
    const {checked} = event.target
    
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      tasks[taskId].isComplete = checked
      return tasks
    })
  }

  const handleMouseOver = (taskId, isOver) => {
    setTasks(prevTasks => {
      const tasks = {...prevTasks}
      tasks[taskId].mouseIsOver = isOver
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
              const textSx = task.isComplete ? {textDecoration: 'line-through', color: 'gray'} : {}

              return (
                <Paper sx={{width: '400px', p: 1, m: 1}} key={taskId} onMouseEnter={() => handleMouseOver(taskId, true)} onMouseLeave={() => handleMouseOver(taskId, false)}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Checkbox checked={task.isComplete} onChange={event => handleCheckboxChange(event, taskId)} />
                    <Typography width='100%' fontWeight={500} noWrap={true} sx={textSx}>
                      {task.title}
                    </Typography>
                    {
                      task.mouseIsOver &&
                        <>
                          <DragIndicator />
                          <DeleteOutline />
                        </>
                    }
                    
                  </Stack>
                  <Typography width='100%' sx={{...textSx, m: 1}}>
                    {task.description}
                  </Typography>
                </Paper>
              )
            })
          }
        </Stack>
      </Box>
    </>
  )
}

export default App
