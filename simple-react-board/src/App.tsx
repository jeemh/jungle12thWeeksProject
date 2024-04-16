import { Component } from "react";
import { useState } from "react";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import BoardList from "./BoardList";
import Write from "./Write";
import Read from "./Read";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

/**
 * App class
 */
class App extends Component {
  state = {
    isWriteMode: false, // 글쓰기 모드인지 여부를 나타내는 상태
    isModifyMode: false,
    isReadMode: false,
    isComplete: true,
    isLogined: false,
    loginedMember: "",
    loginedMemberId: 0,
    boardId: 0,
    showSignup: false, // 회원가입 화면을 보여줄지 여부를 나타내는 상태
  };

  loginHandler = (logerInfo: any) => {
    this.setState({ isLogined: true });
    this.setState({ loginedMember: logerInfo.name });
    this.setState({ loginedMemberId: logerInfo.id });
  };

  logoutHandler = () => {
    this.setState({ isLogined: false });
    this.setState({ loginedMember: "" });
    this.setState({ loginedMemberId: 0 });
  };

  handleWriteButtonClick = () => {
    this.setState({ isWriteMode: true });
  };

  handleReadButtonClick = () => {
    this.setState({ isReadMode: true });
  };

  handleCancelWrite = () => {
    this.setState({
      isReadMode: false,
      isModifyMode: false,
      isComplete: false,
      boardId: 0,
      isWriteMode: false,
    });
  };

  /**
   * @param {any} checkList
   */

  handleModify = (checkList: any) => {
    if (checkList.length === 0) {
      alert("수정할 게시글을 선택하세요.");
    } else if (checkList.length > 1) {
      alert("하나의 게시글만 선택하세요.");
    }

    this.setState({
      isModifyMode: checkList.length === 1,
    });

    this.setState({
      boardId: checkList[0] || 0,
    });
  };

  handleRead = (checkList: any) => {
    if (checkList.length === 0) {
      alert("읽을 게시글을 선택하세요.");
    } else if (checkList.length > 1) {
      alert("하나의 게시글만 선택하세요.");
    }

    this.setState({
      isReadMode: checkList.length === 1,
    });

    this.setState({
      boardId: checkList[0] || 0,
    });
  };

  renderComplete = () => {
    this.setState({
      isComplete: true,
    });
  };

  // 회원가입 버튼 클릭 시 호출되는 함수
  handleSignupButtonClick = () => {
    this.setState({ showSignup: true }); // 회원가입 화면을 보이도록 설정
  };

  // 회원가입 취소 버튼 클릭 시 호출되는 함수
  handleSignupCancel = () => {
    this.setState({ showSignup: false }); // 회원가입 화면을 숨기도록 설정
  };

  /**
   * @return {Component} Component
   */

  render() {
    return (
      <div className="App">
        {this.state.isLogined && (
          <Button variant="danger" onClick={this.logoutHandler}>
            로그아웃
          </Button>
        )}
        {this.state.isLogined && (
          <div>지금 로그인되어있는 사람: {this.state.loginedMember}</div>
        )}

        {!this.state.isLogined && !this.state.showSignup && (
          <LoginPage loginHandler={this.loginHandler} />
        )}
        {!this.state.isLogined && this.state.showSignup && (
          <SignupPage onCancel={this.handleSignupCancel} />
        )}
        {this.state.isLogined &&
          !(
            this.state.isWriteMode ||
            this.state.isModifyMode ||
            this.state.isReadMode
          ) && (
            <BoardList
              loginedMember={this.state.loginedMember}
              loginedMemberId={this.state.loginedMemberId}
              logoutHandler={this.logoutHandler}
              isComplete={this.state.isComplete}
              handleModify={this.handleModify}
              handleRead={this.handleRead}
              renderComplete={this.renderComplete}
              handleWriteButtonClick={this.handleWriteButtonClick} //글쓰기 버튼 행들러 전달
              handleReadButtonClick={this.handleReadButtonClick} //글 버튼 행들러 전달
            ></BoardList>
          )}
        {this.state.isLogined &&
          this.state.isReadMode &&
          !this.state.isWriteMode &&
          !this.state.isModifyMode && (
            <Read
              isReadMode={this.state.isReadMode}
              boardId={this.state.boardId}
              handleCancel={this.handleCancelWrite}
            ></Read>
          )}
        {this.state.isLogined &&
          (this.state.isWriteMode || this.state.isModifyMode) && (
            <Write
              isModifyMode={this.state.isModifyMode}
              boardId={this.state.boardId}
              handleCancel={this.handleCancelWrite}
              loginedMember={this.state.loginedMember}
              loginedMemberId={this.state.loginedMemberId}
            ></Write>
          )}
        {/* 회원가입 버튼 */}
        {!this.state.isLogined && !this.state.showSignup && (
          <Button variant="link" onClick={this.handleSignupButtonClick}>
            회원가입하기
          </Button>
        )}
      </div>
    );
  }
}

export default App;
