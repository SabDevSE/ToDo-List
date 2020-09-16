import React from 'react'
import { useState } from 'react';
import './Todo.css';
import { makeStyles } from '@material-ui/core/styles';
import db from './firebase';
import {List, ListItem, ListItemText, ListItemAvatar, Modal, Button} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
//import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

// for edit dialog box
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    textAlign: 'center',
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[9],
    padding: theme.spacing(2, 4, 3),
  },
}));

//props = todo list attributes
function Todo(props) //props = todo list attributes
{

  const classes = useStyles();

  const[open, setOpen] = useState(false);

  const[input, setInput] = useState('');

  

  const updateTodo = () =>{
    //update the todo with the new input text
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    },  {merge: true}) //merge prevents user from overwriting whats already in there (basically it only appends)

    setOpen(false);
  }
    return (
      <>
          <Modal
            open={open}
            onClose={e => setOpen(false)}
          >
          <div className={classes.paper}>
            <h1 style ={{color: "#24248f"}}>Edit Here</h1>
          {/* Every single time user edit todo it fires of an event and we r setting input to the targeted value*/}
            <input style ={{color: "#24248f"}} placeholder="Write here..." value={input} onChange={event => setInput(event.target.value)}/>
            <Button onClick={updateTodo}  color="Secondary">Update ToDo</Button>
          </div>
          </Modal>

        <List>
          <ListItem>
            <ListItemAvatar>
            <ListItemText primary={props.todo.todo} secondary="Don't Forget!" /> {/*(from app.js <Todo text={todo}/>)*/}
            </ListItemAvatar>
          </ListItem>
          <Button type="submit" onClick={e => setOpen(true)} variant="contained" color="primary" startIcon={<CreateIcon />}>Edit</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="submit" onClick={event => db.collection('todos').doc(props.todo.id).delete()}variant="contained" color="primary" startIcon={<DeleteIcon />}>Delete</Button>
        </List>

      </>
    )
}
//1st todo: text 2nd todo: object (Line 11)
export default Todo


//<DeleteForeverTwoToneIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
//<button onClick={e => setOpen(true)}>Edit</button>