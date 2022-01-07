import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from 'src/slices/calendar';
import { reducer as projectsBoardReducer } from 'src/slices/projects_board';
import { reducer as mailboxReducer } from 'src/slices/mailbox';
import { reducer as divisionReducer } from 'src/slices/division';
import { reducer as verticalReducer } from 'src/slices/vertical';
import { reducer as brandReducer } from 'src/slices/brand';
import { reducer as unitReducer } from 'src/slices/unit';
import { reducer as productReducer } from 'src/slices/product';
import { reducer as regionReducer} from 'src/slices/region'

export const rootReducer = combineReducers({
  calendar : calendarReducer,
  projectsBoard : projectsBoardReducer,
  mailbox : mailboxReducer,
  division : divisionReducer,
  vertical : verticalReducer,
  brand : brandReducer,
  unit : unitReducer,
  product : productReducer,
  region : regionReducer
});
