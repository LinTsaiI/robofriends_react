//將App中所有處理action的pure function集中放在reducers.js中
//reducer的作用爲判斷action type，回傳一個新的state object

import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants.js';

//定義search field state的初始狀態
const initialStateSearch = {
  searchField: ''
}

//建立一個reducer(pure function)
//reducer function接收state及action，在指定的action情況下回傳一個新的state object
//預設state爲尚未被改變的初始狀態
export const searchRobots = (state=initialStateSearch, action={}) => {
  switch(action.type) {            //判斷action的type決定執行的動作
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, { searchField: action.payload });
      //回傳一個object，包含state初始狀態，更新其中searchField的部分(覆寫過去)
      //簡化寫法：return {...state, {searchField: action.payload}}
    default:
      return state;
      //若不屬於以上case，則return初始state
  }
}

//建立requestRobots reducer中state的初始狀態
const initialStateRobots = {
  isPending: false,
  robots: [],
  error: ''
}

//建立一個請求Robots API data的function
export const requestRobots = (state = initialStateRobots, action = {}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return Object.assign({}, state, { isPending: true })     //建立一個isPending state
    case REQUEST_ROBOTS_SUCCESS:
      return Object.assign({}, state, { robots: action.payload, isPending: false })    //建立一個robots state，並將isPending改為false，因已取得promise的response
    case REQUEST_ROBOTS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false })     //建立一個error state
    default:
      return state;
  }
}