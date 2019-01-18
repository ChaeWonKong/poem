import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Header, Footer } from "./";
import CreatePoem from "./CreatePoem";
import PoemList from "./PoemList";
import styles from "../css/App.module.css";
import "../favicon.ico";

class App extends Component {
  componentDidMount() {
    this.props.fetchPoems();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className={styles.main}>
              <Route exact path="/" component={PoemList} />
              <Route path="/poems/new" component={CreatePoem} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = ({ poems }) => {
  return poems;
};
export default connect(
  mapStateToProps,
  actions
)(App);
