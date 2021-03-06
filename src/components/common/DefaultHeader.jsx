import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import * as actions from "../../actions";
import UserMenu from "../users/UserMenu";
import { Search, CustomHeader } from ".";
import { media, color } from "../../config/_mixin";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Bar position="fixed">
        <CustomHeader>
          <Toolbar className="toolbar">
            {this.props.nickname ? (
              <UserMenu />
            ) : (
              <Link to="/users/login">
                <Title size="1rem">로그인</Title>
              </Link>
            )}
            <Link to="/" className="brand-logo">
              <Title>하루시작</Title>
            </Link>
            <Button variant="text" onClick={this.handleOpen}>
              <img alt="search" src={search} />
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <SearchContainer>
                <Search />
              </SearchContainer>
            </Modal>
          </Toolbar>
        </CustomHeader>
      </Bar>
    );
  }
}

const search =
  "https://s3.ap-northeast-2.amazonaws.com/harusijak-static-manage/static_image/%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8+%E1%84%87%E1%85%A5%E1%84%90%E1%85%B3%E1%86%AB.svg";

const mapStateToProps = state => state.auth;

const Bar = styled(AppBar)`
  background: ${color.highlightColor};
  box-shadow: none;
  display: flex;
  ${media.desktop`.toolbar {
    width: 30vw;
    display: flex;
    justify-content: space-between
}`}
  ${media.mobile`.toolbar {
    padding: 0 !important;
    display: flex;
    justify-content: space-between;
    width: 100%
}`}
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1vh;
`;

const Title = styled.h1`
  color: ${color.darkGreyColor};
  font-size: ${props => (props.size ? props.size : "1.2rem")};
  margin: 0.5rem;
  padding: 0;
`;

export default connect(mapStateToProps, actions)(Header);
