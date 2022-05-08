import axios from 'axios'

export async function getTodos() {
    const {data} = await axios.get(`http://localhost:8080/api/todos`)
    return data
}

export async function deleteTodo(id) {
    // We have to get the answer to check if everything was done correctly
    const {data} = await axios.delete(`http://localhost:8080/api/deleteTodo?id=${id}`)
    return data
}

export async function createTodo(data) {
    const answer = await axios.post(`http://localhost:8080/api/createTodo`, data)
    return answer.data
}

export async function updateTodo(data) {
    const id = data.id;
    const title = data.title;
    const user = data.user;
    const description = data.description;
    const due_date = data.due_date;
    const status = data.status;
    const label = data.label;
    await axios.patch(`http://localhost:8080/api/updateTodo?id=${id}&title=${title}&user=${user}&description=${description}&due_date=${due_date}&status=${status}&label=${label}`)

}