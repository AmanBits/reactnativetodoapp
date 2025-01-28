const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
    case 'CREATE_TASK_REQUEST':
    case 'UPDATE_TASK_REQUEST':
    case 'DELETE_TASK_REQUEST':
    case 'SEARCH_TASK_REQUEST':
      return {...state, loading: true};

    case 'FETCH_TASKS_SUCCESS':
      return {...state, loading: false, tasks: action.payload};

    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };

    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };

    case 'DELETE_TASK_SUCCESS':

      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(item => item.id !== action.payload.id),
      };

    case 'SEARCH_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };

    case 'FETCH_TASKS_FAILURE':
    case 'CREATE_TASK_FAILURE':
    case 'UPDATE_TASK_FAILURE':
    case 'DELETE_TASK_FAILURE':
    case 'SEARCH_TASK_FAILURE':
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
}
