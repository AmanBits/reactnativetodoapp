import axios from 'axios';

const apiClient = axios.create({
    baseURL:"http://localhost:3000",
    timeout:10000
});



// Crud operations
export const fetchTasks = () => apiClient.get("/tasks");
export const createTask = (data) => apiClient.post("/tasks",data);
export const updateTask = (id,data) => apiClient.put("/tasks");
export const deleteTask = (id) => apiClient.delete(`/tasks/${id}`);
export const searchTask = (task)=> apiClient.get(`/tasks?title=${task}`)
