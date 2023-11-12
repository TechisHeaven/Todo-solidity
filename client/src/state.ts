import { initialTodoContractState } from './state';
import {  Reducer, createContext, useContext } from "react";

// Define the types for your state and action
interface UserState {
  user: any; 
  loading: boolean;
  error: any; 
}

interface TodoState {
  todo: any[]; 
  loading: boolean;
  error: any; 
}

interface TodoContractState {
  contract:Object | null;
  error: any;
}

interface RootState {
  user: UserState;
  todo: TodoState;
  TodoContract: TodoContractState;
}

interface Action {
  type: string;
  payload?: any; 
}

export const initialUserState = {
  user: null,
  loading: false,
  error: null,
};

// Define initial state
export const initialTodoState = {
  todo: [],
  loading: false,
  error: null,
};
// intiial state of TodoContract
export const initialTodoContractState = {
  contract: null,
  error: null,
};



//Define the user reducer function
export const userReducer : Reducer<UserState, Action> = (state = initialUserState, action)=> {
  switch (action.type) {
    case "LOGIN_RESET":
      return {
        ...state,
        loading: false,
        user: null,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return initialUserState;

    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
}

export const TodoContractReducer: Reducer<TodoContractState, Action>  = (state = initialTodoContractState, action)=>{
  switch (action.type) {
    case "FETCH_CONTRACT_SUCCESS":
      return {
        ...state,
        contract: action.payload,
      };
    case "ADD_CONTRACT":
      return {
        ...state,
        TodoContract: action.payload,
      };
    case "RESET_CONTRACT":
      return {
       initialTodoContractState
      };
    default:
      return state;
    }
}
//Define the todo reducer function
export const todoReducer: Reducer<TodoState, Action> = (
  state: TodoState = initialTodoState,
  action: Action
): TodoState => {
  switch (action.type) {
    case "RESET_TODO":
      return initialTodoState;
    case "FETCH_TODO_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TODO_SUCCESS":
      return {
        ...state,
        loading: false,
        todo: action.payload,
      };
    case "FETCH_TODO_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };

    case "EDIT_TODO":
  const { index, data } = action.payload;
  const updatedTodos = state.todo.map((todo, i) => {
    if (i === index) {
      return data; // replace the item at the specified index
    } else {
      return todo; // keep other items unchanged
    }
  });

  return {
    ...state,
    todo: updatedTodos,
  };
    case "REMOVE_TODO":
      const TodoRemoveIndex = action.payload;
      const updatedTodo = state.todo.filter(
        (todo) => todo.index !== TodoRemoveIndex
      );
      return {
        ...state,
        loading: false,
        todo: updatedTodo,
      };
    default:
      return state;
  }
};



// Combine the reducers into a single reducer function
export function rootReducer(state: RootState | undefined, action: Action): RootState {
  return {
    user: userReducer(state?.user || initialUserState, action),
    todo: todoReducer(state?.todo || initialTodoState, action),
    TodoContract: TodoContractReducer(state?.TodoContract || initialTodoContractState, action),
  };
}

// Create context objects for the state and dispatch function
export const StateContext = createContext<RootState | undefined>(undefined);
export const DispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

// Define custom hooks to access the state and dispatch function from context
export function useStateContext() {
  return useContext(StateContext);
}

export function useDispatchContext() {
  return useContext(DispatchContext);
}