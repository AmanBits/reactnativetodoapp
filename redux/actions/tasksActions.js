// Action creators for crud operations

// operations for fetching tasks
export const fetchTasksRequest = () => ({type: 'FETCH_TASKS_REQUEST'});
export const fetchTasksSuccess = task => ({
  type: 'FETCH_TASKS_SUCCESS',
  payload: task,
});
export const fetchTasksFailure = error => ({
  type: 'FETCH_TASKS_FAILURE',
  payload: error,
});

// operations for creating tasks
export const createTaskRequest = task => ({
  type: 'CREATE_TASK_REQUEST',
  payload: task,
});
export const createTaskSuccess = task => ({
  type: 'CREATE_TASK_SUCCESS',
  payload: task,
});
export const createTaskFailure = error => ({
  type: 'CREATE_TASK_FAILURE',
  payload: error,
});

// operations for updating tasks
export const updateTaskRequest = task => ({
  type: 'UPDATE_TASK_REQUEST',
  payload: task,
});
export const updateTaskSuccess = task => ({
  type: 'UPDATE_TASK_SUCCESS',
  payload: task,
});
export const updateTaskFailure = error => ({
  type: 'UPDATE_TASK_FAILURE',
  payload: error,
});

// operations for deleting tasks
export const deleteTaskRequest = id => ({
  type: 'DELETE_TASK_REQUEST',
  payload: id,
});
export const deleteTaskSuccess = id => ({
  type: 'DELETE_TASK_SUCCESS',
  payload: id,
});
export const deleteTaskFailure = error => ({
  type: 'DELETE_TASK_FAILURE',
  payload: error,
});

// search operations
export const searchTaskRequest = task => ({
  type: 'SEARCH_TASK_REQUEST',
  payload: task,
});

export const searchTaskSuccess = task =>({
  type:"SEARCH_TASK_SUCCESS",
  payload:task
});


export const searchTaskFailure= error=>({
  type:"SEARCH_TASK_FAILURE",
  payload:error
})
