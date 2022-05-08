import React, { useState, useEffect } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "./ApiCall";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

// To do :
// Sort due_date, creation_date, user, urgent
// Filter only urgent task, only this user, only this status
// When a task is completed, transfer it into a new gray table
// Create a READ ME

export default function List() {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [urgent, setUrgent] = useState("No");
  const [toDosArr, setToDosArr] = useState([]);
  const [todoUpdate, setTodoUpdate] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Waiting");

  const submitHandler = (event) => {
    event.preventDefault();
    if (title && user) {
      const newToDo = '{"title":"' + title + '","description":"' + description + '","due_date":"' + dueDate + '","status":"' + status + '","label":"' + urgent + '","user":"' + user + '"}';
      const newToDoParsed = JSON.parse(newToDo)
      createTodo(newToDoParsed).then(res => {
        setToDosArr([...toDosArr, res]);
      })
    }
  }

  const removeToDo = (idDatabase, id) => {
    if (toDosArr) {
      deleteTodo(idDatabase).then(() => {
      })
      const newArray = toDosArr.filter((toDo, toDoIndex) => {
        return toDoIndex !== id;
      });
      setToDosArr(newArray);
    }
  };

  useEffect(() => {
    getTodos().then(res => {
      setToDosArr(res)
      console.log(res)
    })
  }, []);

  const [show, setShow] = useState(false);
  const [data, setData] = useState("");

  const handleClose = () => {
    setShow(false);
  }

  return (
    <div>
      <form className="toDoForm" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="title">ToDo Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="toDo Title"
          maxLength="40"
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <label htmlFor="user">User</label>
        <input
          id="user"
          name="user"
          type="text"
          placeholder="user"
          maxLength="30"
          onChange={(e) => setUser(e.target.value)}
          required
        ></input>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="description"
          maxLength="30"
          onChange={(e) => setDescription(e.target.value)}
          required
        ></input>
        <label htmlFor="dueDate">Due on Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          required
        ></input>
        <label>Urgent</label>
        <select
          id="urgent"
          name="urgent"
          value={urgent}
          onChange={(e) => setUrgent(e.target.value)}
          required
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label>Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Waiting">Waiting</option>
          <option value="In Progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input id="submit" type="submit" value="ADD NEW TASK"></input>
      </form>
      <table>
        <tbody>
          <tr>
            <th>To Do</th>
            <th>For</th>
            <th>Description</th>
            <th>Due on</th>
            <th>Urgent</th>
            <th>Status</th>
            <th>Creation Date</th>
            <th>Settings</th>
          </tr>
          {toDosArr
            ? toDosArr.map((item, id) => {
              return (
                <tr key={id}>
                  <td>{item.title}</td>
                  <td>{item.user}</td>
                  <td>{item.description}</td>
                  <td>{item.due_date}</td>
                  <td>{item.label}</td>
                  <td>{item.status}</td>
                  <td>{item.creation_date}</td>
                  <td>
                    <>
                      <Button variant="primary" onClick={
                        () => {
                          setData(item);
                          setShow(true);
                        }
                      }>
                        Edit
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit your todo :</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form className="toDoForm">
                            <label htmlFor="title">Title</label>
                            <input id="title" placeholder={data.title} type="text" onChange={(e) => data.title = e.target.value} /><br></br>
                            <label htmlFor="user">user</label>
                            <input id="user" placeholder={data.user} type="text" onChange={(e) => data.user = e.target.value} /><br></br>
                            <label htmlFor="description">Description</label>
                            <input id="description" placeholder={data.description} type="text" onChange={(e) => data.description = e.target.value} /><br></br>
                            <label htmlFor="due_date">Due on</label>
                            <input id="due_date" placeholder={data.due_date.substring(0, 10)} type="date" onChange={(e) => data.due_date = e.target.value} /><br></br>
                            <label htmlFor="label">Urgent</label>
                            <select id="label" placeholder={data.label} onChange={(e) => data.label = e.target.value}>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select><br></br>
                            <label htmlFor="status">Status</label>
                            <select id="status" placeholder={data.status} onChange={(e) => data.status = e.target.value}>
                              <option value="Waiting">Waiting</option>
                              <option value="In Progress">In progress</option>
                              <option value="Completed">Completed</option>
                            </select><br></br>
                            <Button variant="primary" onClick={() => {
                              setTodoUpdate(!todoUpdate);
                              updateTodo(item);
                              setShow(false);
                            }}>
                              Save Changes
                            </Button>
                          </form>
                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                      </Modal>
                    </>
                    <Button onClick={() => removeToDo(item.id, id)}>Remove</Button>
                  </td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>

    </div>
  );
}