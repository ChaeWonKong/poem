import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Footer } from "./";
import Header from "./Header";
import LoginForm from "./users/LoginForm";
import CreatePoem from "./poems/CreatePoem";
import UpdatePoem from "./poems/UpdatePoem";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
import PoemList from "./poems/PoemList";
import LinearProgressBar from "./LinearProgressBar";
import "../css/App.css";
import "../favicon.ico";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    if (token) this.props.fetchUser(token);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.auth !== this.props.auth) {
  //     const token = localStorage.getItem("TOKEN");
  //     if (token) this.props.fetchUser(token);
  //   }
  // }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />

            <div className="main">
              <Route exact path="/" component={PoemList} />
              <Route path="/poems/new" component={CreatePoem} />
              <Route path="/poems/update" component={UpdatePoem} />
              <Route path="/login" component={LoginForm} />
              <Route path="/create_user" component={CreateUser} />
              <Route path="/update_user" component={UpdateUser} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  actions
)(App);
