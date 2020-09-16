import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from "firebase";
import { Button, FormControl, Input, InputLabel} from '@material-ui/core';



function App() 
{
  
  const[todos, setTodos] = useState([]);
  const[input, setInput] = useState(''); //to remember what user inputs

  //console.log('!', input);
  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
   //this code here.. fires when the app.js loads. So like whenever we add a todo useEffect will work
    
   db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
     // console.log(snapshot.docs.map(doc => doc.data().todo));
     setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}))) 
      //go through every single doc, get the todo field with the id (it will bubble up into an array)and set it to Todos
    })
  }, []);

  const addTodo = (event) =>
  {
    //this will fire off when we click the todo button
    event.preventDefault(); //will stop the refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //as user inputs todo it goes to db then snapshots then updates our Todos

    console.log('*', 'I am Working!');
    setTodos([...todos, input]);
    setInput(''); //clear up the input after clicking add todo button
  }

  return (
    <div className="App">
      <h1 style ={{color: "#24248f"}}>Add Your Daily ToDo's! </h1>

      <form>
      <FormControl>
        <InputLabel>Write Here...</InputLabel>
        <Input value ={input}onChange={event => setInput(event.target.value)}/>
      </FormControl>

      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        Add ToDo
      </Button>
      </form>
      <ul>  
        {todos.map(todo => (
            <li>  <Todo todo={todo}/> </li>
              //<li>{todo}</li>
            ))}
      </ul>
    </div>

  );
}

export default App;
