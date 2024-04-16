import { Component } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";

interface IProps {
  isReadMode: boolean;
  boardId: number;
  handleCancel: any;
}

interface IState {
  title: string;
  content: string;
}

class Read extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.boardId !== this.props.boardId) {
      this.fetchData();
    }
  }

  fetchData() {
    Axios.get(`http://localhost:8000/list`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log("this.props.boardId: ", this.props.boardId);
        const post = data.find(
          (item: any) => item.BOARD_ID == this.props.boardId
        );
        if (post) {
          const { BOARD_TITLE: title, BOARD_CONTENT: content } = post;
          this.setState({ title, content });
        } else {
          console.error(`Post with BOARD_ID ${this.props.boardId} not found.`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  render() {
    const { title, content } = this.state;

    return (
      <div>
        <h2>글 제목: {title}</h2>
        <p>글 내용: {content}</p>
        <Button variant="secondary" onClick={this.props.handleCancel}>
          취소
        </Button>
      </div>
    );
  }
}

export default Read;
