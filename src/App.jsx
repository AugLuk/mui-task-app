import { DragIndicator } from '@mui/icons-material'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', content: 'Take out the garbage'},
    'task-2': { id: 'task-2', content: 'Watch my favorite show'},
    'task-3': { id: 'task-3', content: 'Charge my phone'},
    'task-4': { id: 'task-4', content: 'Cook dinner'},
  })

  const [taskOrder, setTaskOrder] = useState(['task-1', 'task-2', 'task-3', 'task-4', ])

  const handleChange = event => {
    console.log(event.target)
    const value = event.target.innerText
    const id = event.target.attributes.name.value;

    setTasks(prevTasks => {
      const newTasks = {...prevTasks}
      newTasks[id].content = value
      return newTasks
    })
  }

  return (
    <Box className="App" width='100%'>
      <Stack>
        {
          taskOrder.map(taskId => {
            const task = tasks[taskId]

            return (
              <Paper sx={{width: '400px', padding: 1}} key={taskId}>
                <Stack direction='row' spacing={1}>
                  <DragIndicator />
                  <Typography width='100%'>
                    {task.content}
                  </Typography>
                </Stack>
              </Paper>
            )
          })
        }
      </Stack>
    </Box>
  )
}

export default App
