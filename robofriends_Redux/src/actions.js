import { 
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants.js';

//建立一個action "setSearchField"，其接收一個text(使用者輸入的文字)，回傳一個object
// => ({}) 爲 => { return ...} 的簡化寫法。()直接return{}中的內容
export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    //定義事件類型，由type決定要執行的reducer()。全部大寫表示JavaScript中表示爲standard
    payload: text
    //定義要send給reducer的data
})

export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });     //爲pending故沒有payload
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    //此處data指fetch得到的user資訊
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
    //若沒有fetch成功則回傳error
}
//requestRobots爲一個higher order function，return另一個function，此例中爲return: (dispatch) => {...} 整個function，其中接收dispatch() method傳入其內的各個動作