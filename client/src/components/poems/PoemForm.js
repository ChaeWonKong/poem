import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as actions from "../../actions";
import "../../css/PoemForm.css";

class PoemForm extends Component {
  state = {
    id: "",
    user: "",
    title: "",
    content: ""
  };

  componentDidMount() {
    this.setState({
      id: this.props.id,
      user: this.props.user,
      title: this.props.title,
      content: this.props.content
    });
  }

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
    if (this.props.variant === "create") {
      this.props.postPoem({
        token: this.props.auth.token,
        title: this.state.title,
        content: this.state.content.replace(/\n/g, "\n")
      });
    } else if (this.props.variant === "update") {
      this.props.updatePoem({
        id: this.props.poems.id || undefined,
        token: this.props.auth.token,
        title: this.state.title,
        content: this.state.content.replace(/\n/g, "\n")
      });
    }
  };

  render() {
    return (
      <Container>
        {this.props.showTheme ? <Typography variant="h6">꽃</Typography> : null}
        <Form>
          <p># 제목</p>
          <StyledInput name="title" onChange={this.handleChange} />
          <p># 본문</p>
          <TextArea name="content" rows={16} onChange={this.handleChange} />
        </Form>
        <ButtonContainer>
          <Button
            type="submit"
            onClick={this.handleSubmit}
            color="primary"
            variant="outlined"
          >
            작성완료
          </Button>
          <Link to="/">
            <Button color="secondary" variant="outlined">
              작성취소
            </Button>
          </Link>
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  margin: 0;
`;

const Form = styled.form`
  width: 100%;
`;

const StyledInput = styled(Input)`
  background-color: ${props => props.theme.lightGreyColor} !important;
  border: none;
  outline: none;
`;

const TextArea = styled(Input.TextArea)`
  background-color: ${props => props.theme.lightGreyColor} !important;
  border: none;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  actions
)(PoemForm);
