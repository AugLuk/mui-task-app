import { Delete, DragIndicator, Edit, Save } from '@mui/icons-material'
import { Checkbox, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function TaskCard({
  task,
  taskId,
  showButtons,
  editMode,
  handleCheck,
  handleMouseEnter,
  handleMouseLeave,
  handleEditClick,
  handleDeleteClick,
  handleSaveClick,
  handleTitleChange,
  handleDescriptionChange,
}) {
  const textStyle = task.isComplete ? {textDecoration: 'line-through', color: 'gray'} : {}

  const normalView = (
    <>
      <Stack direction='row' spacing={0.5} alignItems='center'>
        <Typography width='100%' fontWeight={500} noWrap={true} sx={{...textStyle, m: 1.2}}>
          {task.title}
        </Typography>
        {
          showButtons &&
            <>
              <DragIndicator />
              <Checkbox checked={task.isComplete} onChange={event => handleCheck(event, taskId)} />
              <IconButton aria-label='edit' onClick={event => handleEditClick(taskId)}>
                <Edit />
              </IconButton>
              <IconButton aria-label='delete' onClick={event => handleDeleteClick(taskId)}>
                <Delete />
              </IconButton>
            </>
        }
        
      </Stack>
      {
        task.description !== '' &&
          <Typography width='100%' sx={{...textStyle, m: 1}}>
            {task.description}
          </Typography>
      }
    </>
  )

  const editView = (
    <>
      <Stack direction='row' spacing={1} alignItems='center'>
        <TextField
          onChange={event => handleTitleChange(event, taskId)}
          value={task.title}
          placeholder='Title'
          sx={{width: '100%', mb: 1}}
        />
        <IconButton aria-label='save' onClick={event => handleSaveClick()}>
          <Save />
        </IconButton>
      </Stack>
      <TextField
        onChange={event => handleDescriptionChange(event, taskId)}
        value={task.description}
        multiline placeholder='Description (optional)'
        sx={{width: '100%'}}
      />
    </>
  )

  return (
    <Paper
      sx={{width: '400px', p: 1, m: 1}}
      onMouseEnter={event => handleMouseEnter(taskId)}
      onMouseLeave={event => handleMouseLeave(taskId)}
    >
      {
        editMode ?
          editView
        :
          normalView
      }
    </Paper>
  )
}
