import React, { Component } from 'react';
//import ArticlePage from './articlePage'
import Home from './home'
//import TopicPage from './topicPage'
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  state = {
    user_station_type: 'home'
  }

  fetchAllArticles = () => {
    // Display all articles on first load
   
    fetch("http://localhost:3000/api/articles/")

      .then(res => {
        return res.json();
      })
      .then(body => {
        this.setState({ articleData: body })

      })
  }

  showArticle = (articleId) => {
    this.setState({
      showArticleId: articleId
    })
  }

  render() {
    return (
      < BrowserRouter>
        <div>
          <header>
            <h1>Personal Train App</h1>
          </header>


          <Route exact path="/" component={Home} />
          {/* <Route exact path="/articles/:articleid" component={ArticlePage} />
          <Route exact path="/topics/:topicid/articles" component={TopicPage } /> */}

          
        </div>
      </ BrowserRouter>
    );
  }
}

export default App;