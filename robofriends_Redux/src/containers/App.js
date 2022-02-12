import React, { Component } from 'react';
import { connect } from 'react-redux';                //將connect匯入以讓App與Redux進行連接
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField, requestRobots } from '../actions';        //將action匯入

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
  }
  //針對reducer建立store，其中包含所有描述App的state
  //searchRobots與requestRobots擁有各自的state，因此需明確指出state的位置，例如searchRobots.searchField
  //將所有state都放入，其將作為props被傳入下方的render()，即傳入App中
}
//mapStateToProps() is going to target the state which we want to listen to and send down as props. 以此例子來說，要追蹤的state爲搜尋欄位的變化(即searchField)
//state is an object
//"searchField" is a props name we can name it what ever we want
//當store發生改變，mapStateToProps()即會調用，回傳一個object，其中被追蹤的searchField更新為經過searchRobots這個reducer作用後的searchField，即action.payload(使用者在輸入欄位中輸入的任何text)

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
  //將所有event放入，其將作為props被傳入下方的render()，即傳入App中
  //需要將dispatch method傳入requestRobots method中，使可以dispatch其中不同type的動作
}
//dispatch is a function which sends an action to the reducer
//mapDispatchToProps()的目這個 event的是要指出要進行分派的action，將action傳給reducer，最終更新state
//"onSearchChange" is a props name we can name it what ever we want
//此例中event(即使用者在輸入欄位key in的動作)觸發setSearchField這個action，其接收argument-event.target.value(即text)，action回傳一個object，其中type及payload都會用在reducer中


class App extends Component {

  /*Redux store可以取代state，因此不再需要：
    constructor() {
      super()
      this.state = {
        robots: [],
        searchField: ""
      }
    }
  */

  componentDidMount() {
    this.props.onRequestRobots()
  }
  /* this.props.requestRobots()取代原本的async語法：
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }))
  */

  // onSearchChange = (event) => {
  //   this.setState({ searchField: event.target.value })
  // }
  //onSearchChange作為props被定義在mapDispatchToProps，因此不需額外宣稱，可移除

  render() {
    //不再有this.state，searchField及robots從this.state中移除，改作為props被定義在mapStateToProps中
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    //isPending取代!robots.length，作為判斷要return什麼畫面的依據
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className="tc" >
          <h1 className='f2'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    //onSearchChange已不作為method獨立宣告，因此移除<SearchBox searchChange={this.onSearchChange} />中的this.，加入上方this.props中
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
//connect() is a higher order function that returns another function. When connect() runs, it returns another function, which is going to run App
//connect()接受兩個parameter：mapStateToProps & mapDispatchToProps.兩個名稱可以任取，此爲Redux standard.
//此設定將App與Redux連結，讓App知道Redux store的存在，告訴App要追蹤store的變化。mapStateToProps告訴App要listen to哪個state，mapDispatchToProps告訴App要listen to哪個action(即要調用哪個reducer)