import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/rootreducer"

const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
export const initStore = () => createStore(rootReducer, enhancer)


// export const initStore = () => createStore(rootReducer, compose(applyMiddleware(thunk)))
export const wrapper = createWrapper(initStore)
