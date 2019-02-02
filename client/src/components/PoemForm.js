import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as actions from "../actions";
import styles from "../css/CreatePoem.module.css";
import PoemSubject from "./PoemSubject";

class PoemForm extends Component {
  state = {
    id: this.props.id,
    user: this.props.user,
    title: this.props.title,
    content: this.props.content
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const { id, title, content } = this.props.poems;
      this.setState({
        id,
        title,
        content,
        token: this.props.auth.token
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      user: e.target.user || "chaewonkong"
    });
  };

  handleSubmit = () => {
    this.props.postPoem({
      id: this.props.id || undefined,
      token: this.props.auth.token,
      title: this.state.title,
      content: this.state.content.replace(/\n/g, "\n")
    });
  };

  render() {
    return (
      <div>
        <PoemSubject title="꽃" />
        <form>
          <TextField
            id="title"
            name="title"
            fullWidth
            label={this.props.poems.id ? "" : "시 제목"}
            multiline
            margin="normal"
            variant="outlined"
            placeholder="서시"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <TextField
            id="content"
            name="content"
            className="asdf"
            fullWidth
            label={this.props.poems.id ? "" : "시 내용"}
            multiline
            margin="normal"
            variant="outlined"
            rows="10"
            onChange={this.handleChange}
            value={this.state.content}
            placeholder={`
          죽는 날까지 하늘을 우러러
          한점 부끄럼이 없기를
          잎새에 이는 바람에도
          나는 괴로워했다
          별을 노래하는 마음으로
          모든 죽어가는 것을 사랑해야지
          그리고 나한테 주어진 길을
          걸어가야겠다.
          
          오늘 밤에도 별이 바람에 스치운다.`}
          />
        </form>
        <div className={styles.btnCreate}>
          <Button
            type="submit"
            onClick={this.handleSubmit}
            color="primary"
            variant="outlined"
          >
            작성완료
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button color="secondary" variant="outlined">
              작성취소
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  actions
)(PoemForm);
