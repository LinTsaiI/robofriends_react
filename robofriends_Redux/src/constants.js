//將action type集中在constants.js中做變數宣告
//可以一目瞭然知道App中共有哪些action種類

export const CHANGE_SEARCH_FIELD = 'CHANGE_SEARCH_FIELD';

//REQUEST_ROBOTS action is a promise so it has three state: pending, success, failed
export const REQUEST_ROBOTS_PENDING = 'REQUEST_ROBOTS_PENDING';    //初始階段當send request，會先pending等待promise return結果
export const REQUEST_ROBOTS_SUCCESS = 'REQUEST_ROBOTS_SUCCESS';    //當promise return後success的action
export const REQUEST_ROBOTS_FAILED = 'REQUEST_ROBOTS_FAILED';      //當promise return後failed的action