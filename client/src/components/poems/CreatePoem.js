import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actions from "../../actions";
import ModalView from "../common/ModalView";
import PoemForm from "./PoemForm";
import PoemDetail from "./PoemDetail";
import "../../css/CreatePoem.css";

class CreatePoem extends Component {
  state = {
    user: "",
    title: "",
    content: "",
    value: 0,
    type: "form"
  };

  componentDidMount() {}

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleClick(type) {
    this.setState({ type });
  }

  renderForm = () => {
    if (this.props.auth.token === undefined) {
      return (
        <ModalView
          width="240px"
          centered
          cancelText="아니요"
          okText="네"
          handleOk={() => (window.location.href = "/users/login")}
          handleCancel={() => (window.location.href = "/")}
          visible={true}
          footer={null}
          message="로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
        />
      );
    } else {
      switch (this.state.type) {
        case "form":
          return (
            <PoemForm
              variant="create"
              handleClick={this.handleClick.bind(this)}
            />
          );
        case "detail":
          return <PoemDetail />;
        default:
          return (
            <PoemForm
              variant="create"
              handleClick={this.handleClick.bind(this)}
            />
          );
      }
    }
  };

  render() {
    console.log(this.state);
    return <Container>{this.renderForm()}</Container>;
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const mapStateToProps = state => {
  return { poems: state.poems, auth: state.auth, today: state.today };
};

export default connect(
  mapStateToProps,
  actions
)(CreatePoem);
