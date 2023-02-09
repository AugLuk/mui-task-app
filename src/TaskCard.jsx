import { Delete, Edit, Save } from '@mui/icons-material'
import { Checkbox, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function TaskCard({
  task,
  taskId,
  placeInColumn,
  showButtons,
  editMode,
  allowSaving,
  handleCheck,
  handleMouseEnter,
  handleMouseLeave,
  handleEditClick,
  handleDeleteClick,
  handleSaveClick,
  handleTitleChange,
  handleDescriptionChange,
}) {
  const textStyle = task.isCompleted ? {textDecoration: 'line-through', color: 'gray'} : {}

  const normalView = (
    <>
      <Stack direction='row' spacing={0.5} alignItems='center'>
        <Typography width='100%' fontWeight={500} noWrap={true} sx={{...textStyle, m: 1.2}}>
          {task.title}
        </Typography>
        {
          showButtons &&
            <>
              <Checkbox checked={task.isCompleted} onChange={event => handleCheck(event, taskId)} />
              <IconButton aria-label='edit' onClick={() => handleEditClick(taskId)}>
                <Edit />
              </IconButton>
              <IconButton aria-label='delete' onClick={() => handleDeleteClick(taskId, placeInColumn)}>
                <Delete />
              </IconButton>
            </>
        }
        
      </Stack>
      {
        task.description !== '' &&
          <Typography width='100%' sx={{...textStyle, m: 1, mt: 0}}>
            {task.description}
          </Typography>
      }
    </>
  )

  const editView = (
    <>
      <Stack direction='row' spacing={0.5} alignItems='center'>
        <TextField
          onChange={event => handleTitleChange(event, taskId)}
          value={task.title}
          placeholder='Title'
          sx={{width: '100%', mb: 1, mr: 0.5}}
        />
        <IconButton aria-label='save' disabled={!allowSaving} onClick={handleSaveClick}>
          <Save />
        </IconButton>
        <IconButton aria-label='delete' onClick={() => handleDeleteClick(taskId, placeInColumn)}>
          <Delete />
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
    <Draggable
      draggableId={taskId}
      index={placeInColumn}
    >
      {(provided, snapshot) => (
        <Paper
          sx={{width: '400px', p: 1, m: 1}}
          onMouseEnter={() => handleMouseEnter(taskId)}
          onMouseLeave={() => handleMouseLeave(taskId)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isdragging={'' + snapshot.isDragging}
        >
          {
            editMode ?
              editView
            :
              normalView
          }
        </Paper>
      )}
    </Draggable>
  )
}
