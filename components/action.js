import {ADD_TASK} from './constants';

export function addTask(task) {
  return {
    type: ADD_TASK,
    tasks: task,
  };
}
