import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../css/PoemList.css";
import { PoemCard } from "./";

class PoemList extends Component {
  componentDidMount() {
    this.props.fetchPoems();
    const token = localStorage.getItem("TOKEN");
    if (token) this.props.fetchUser(token);
  }
  renderPoems() {
    const poems = Array.from(this.props.poems);
    if (poems !== null) {
      return poems.map(poem => {
        return (
          <PoemCard
            image={poem.writer.image}
            title={poem.title}
            content={poem.content}
            key={poem.id}
            writer={poem.writer.nickname}
            date={poem.written_date}
            id={poem.id}
            poemDelete={this.props.deletePoem}
          />
        );
      });
    }
  }
  render() {
    return (
      <div className="mainContainer">
        {this.renderPoems()}
        <Link to="/poems/new" className="btn-floating">
          <Fab color="secondary" aria-label="Edit">
            <Icon>edit_icon</Icon>
          </Fab>
        </Link>
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
)(PoemList);
