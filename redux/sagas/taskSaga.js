import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  searchTask,
} from '../api';

import {
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskSuccess,
  createTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
  searchTaskSuccess,
  searchTaskFailure,
} from '../actions/tasksActions';

// Fetch Tasks Saga
function* fetchTasksSaga() {
  try {
    const response = yield call(fetchTasks);
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

// Create Task Saga
function* createTaskSaga(action) {
  try {
    const response = yield call(createTask, action.payload);

    yield put(createTaskSuccess(response.data));
  } catch (error) {
    yield put(createTaskFailure(error.message));
  }
}

// Update Task Saga
function* updateTaskSaga(action) {
  try {
    const {id, task} = action.payload;
    const response = yield fetch(updateTask, id, task);
    yield put(updateTaskSuccess(response.data));
  } catch (error) {
    yield put(updateTaskFailure(error.message));
  }
}

// Delete Task Saga
function* deleteTaskSaga(action) {
  try {
    console.log(action.payload);
    const response = yield call(deleteTask, action.payload);

    yield put(deleteTaskSuccess(response.data));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

// Search Task Saga
function* searchTaskSaga(action) {
  try {
    const response = yield call(searchTask, action.payload);

    yield put(searchTaskSuccess(response.data));
  } catch (error) {
    yield put(searchTaskFailure(error.message));
  }
}

// Watcher Saga
export function* watchTaskActions() {
  yield takeEvery('FETCH_TASKS_REQUEST', fetchTasksSaga);
  yield takeEvery('CREATE_TASK_REQUEST', createTaskSaga);
  yield takeEvery('UPDATE_TASK_REQUEST', updateTaskSaga);
  yield takeEvery('DELETE_TASK_REQUEST', deleteTaskSaga);
  yield takeEvery('SEARCH_TASK_REQUEST', searchTaskSaga);
}
