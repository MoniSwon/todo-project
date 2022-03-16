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