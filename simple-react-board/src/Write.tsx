import { Component } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface IProps {
  isModifyMode: boolean;
  boardId: number;
  handleCancel: any;
  loginedMember: string;
  loginedMemberId: number;
}

/**
 * Write class
 * @param {SS} e
 */
class Write extends Component<IProps> {
  /**
   * @param {SS} props
   */

  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isRendered: false,
    };
  }

  state = {
    title: "",
    content: "",
    isRendered: false,
  };

  write = () => {
    Axios.post("http://localhost:8000/insert", {
      title: this.state.title,
      content: this.state.content,
      writer: this.props.loginedMember,
      writer_id: this.props.loginedMemberId,
    })
      .then((res) => {
        this.setState({
          title: "",
          content: "",
          writer: "",
          writer_id: 0,
        });
        this.props.handleCancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  update = () => {
    Axios.post("http://localhost:8000/update", {
      title: this.state.title,
      content: this.state.content,
      id: this.props.boardId,
      writer_id: this.props.loginedMemberId,
    })
      .then((res) => {
        this.setState({
          title: "",
          content: "",
          writer_id: 0,
        });
        if (res.data.affectedRows === 0) {
          alert("너는 게시글 쓴 사람이 아니야");
        }
        this.props.handleCancel();
      })
      .catch((e) => {
        console.log("err");
      });
  };

  detail = () => {
    Axios.post("http://localhost:8000/detail", {
      id: this.props.boardId,
    })
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            title: res.data[0].BOARD_TITLE,
            content: res.data[0].BOARD_CONTENT,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /**
   *
   * @param {any} prevProps
   */
  componentDidMount = () => {
    if (this.props.isModifyMode) {
      this.detail();
    }
    console.log("componentDidUpdate!\n");
  };

  /**
   * @return {Component} Component
   */
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder={this.state.title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder={this.state.content}
            />
          </Form.Group>
        </Form>
        <Button
          variant="info"
          onClick={this.props.isModifyMode ? this.update : this.write}
        >
          작성완료
        </Button>
        <Button variant="secondary" onClick={this.props.handleCancel}>
          취소
        </Button>
      </div>
    );
  }
}

export default Write;
