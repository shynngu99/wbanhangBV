// import { createStore } from "redux";
// import rootReducer from "./reducers";

// const store = createStore(rootReducer)
// export default store;

//------------------

import { legacy_createStore as createStore } from 'redux';
import rootReducer from "./reducers/index"

const store = createStore(rootReducer)

export default store;


// import { legacy_createStore as createStore } from 'redux';
// import rootReducer from './reducers';

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default store;

// e có sử dụng lại redux toolkit
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/index';

// const store = configureStore({
//     reducer: rootReducer,
//     devTools: process.env.NODE_ENV !== 'production',
// });

// export default store;