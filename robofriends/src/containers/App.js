import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';


class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],         //一開始mounting，robots爲空array
      searchfield: ""     //一開始mounting<，搜尋欄位爲空值(均empty string)
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")   //fetch(): make a HTTP request
      .then(response => response.json())     //fetch完後會得到一個response，將其轉成JSON格式
      .then(users => this.setState({ robots: users }))     //將取得的資料(users)用於更新state
  }

  //自行定義的function要寫成arrow function形式，this才會指向原本App中的state，否則this指的是event
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state;     //使用destructuring簡化一直重複的this.state
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length ? 
    <h1>Loading</h1> : 
    (
      <div className="tc" >
        <h1 className='f2'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default App;