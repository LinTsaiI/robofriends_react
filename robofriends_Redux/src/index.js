import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';         //讓store可以作為props傳給整個App component
import { createStore, applyMiddleware, combineReducers } from 'redux';
//將createStore()匯入，其為Redux中的package
//欲使用middleware，需將applyMiddleware method匯入
//使用combineReducers將多個reducer合併成一個rootReducer
import { createLogger } from 'redux-logger';    //將logger(一個middleware)匯入
import thunkMiddleware from 'redux-thunk';      //將redux-thunk(一個middleware)匯入
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { searchRobots, requestRobots } from './reducers';
import "tachyons";

const logger = createLogger();     //logger爲一個middleware，createLogger爲來自redux-logger中的一個function

const rootReducer = combineReducers({ searchRobots, requestRobots })   //以object形式放入要合併的reducer
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))
//正常情況下一個App會有許多reducer，會將其合併成一個rootReducer，作為argument傳給createStore()，建立單一個store
//we create a store from the rootReducer. the reducer function returns the next state tree
//reducer本身為一個function，其判斷action type並回傳一個新的state object，因此createStore()將所有新的state object合併成單一個store
//store會作為props傳入<App />中
//store的第二個parameter可以放入middleware，使用applyMiddleware method在括號中放入指定要使用的middleware
//依順序先執行thunkMiddleware再執行logger

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

//將<Provider>放在最外層，可將store傳入包裹在其內的App，使所有component tree都可以access store

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
