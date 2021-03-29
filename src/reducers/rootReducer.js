import { combineReducers } from "redux";

import { authReducer } from './authReducer';
import { uiReducer } from './uiReducer';
import { notesReducer } from './notesReducer';

const rootReducer = combineReducers({
    authReducer,
    uiReducer,
    notesReducer,
  });
  
  export default rootReducer;