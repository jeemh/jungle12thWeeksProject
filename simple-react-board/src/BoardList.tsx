import { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Board = ({
  id,
  board_number,
  title,
  registerId,
  registerDate,
  props,
}: {
  id: number;
  board_number: number;
  title: string;
  registerId: string;
  registerDate: string;
  props: any;
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={id}
          onChange={(e) => {
            props.onCheckboxChange(
              e.currentTarget.checked,
              e.currentTarget.value
            );
          }}
        ></input>
      </td>
      <td>{board_number}</td>
      <td>{title}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

interface IProps {
  loginedMember: any;
  logoutHandler: any;
  isComplete: boolean;
  handleModify: any;
  handleRead: any;
  renderComplete: any;
  handleWriteButtonClick: any;
  handleReadButtonClick: any;
}

/**
 * BoardList class
 * @param {SS} e
 */
class BoardList extends Component<IProps> {
  /**
   * @param {SS} props
   */
  constructor(props: any) {
    super(props);
    this.state = {
      boardList: [],
      checkList: [],
    };
  }

  state = {
    boardList: [],
    checkList: [],
  };

  handleDelete = () => {
    if (this.state.checkList.length === 0) {
      alert("삭제할 게시글을 선택하세요.");
      return;
    }

    let boardIdList = "";

    this.state.checkList.forEach((v: any) => {
      boardIdList += `'${v}',`;
    });
    this.setState({
      checkList: [],
      handleRead: false,
    });

    Axios.post("http://localhost:8000/delete", {
      boardIdList: boardIdList.substring(0, boardIdList.length - 1),
    })
      .then(() => {
        this.getList();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  getList = () => {
    Axios.get("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({
          boardList: data,
        });
        this.props.renderComplete();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /**
   * @param {boolean} checked
   * @param {any} id
   */
  onCheckboxChange = (checked: boolean, id: any) => {
    const list: Array<string> = this.state.checkList.filter((v) => {
      return v !== id;
    });

    if (checked) {
      list.push(id);
    }

    this.setState({
      checkList: list,
    });
  };

  /**
   */
  componentDidMount() {
    this.getList();
  }

  /**
   */
  componentDidUpdate() {
    if (!this.props.isComplete) {
      this.getList();
    }
  }

  /**
   * @return {Component} Component
   */
  render() {
    const { boardList }: { boardList: any } = this.state;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((v: any, index: any) => {
              return (
                <Board
                  board_number={index + 1}
                  id={v.BOARD_ID}
                  title={v.BOARD_TITLE}
                  registerId={v.REGISTER_ID}
                  registerDate={v.REGISTER_DATE}
                  key={v.BOARD_ID}
                  props={this}
                />
              );
            })}
          </tbody>
        </Table>
        <Button
          variant="success"
          onClick={() => {
            this.props.handleReadButtonClick();
            this.props.handleRead(this.state.checkList);
          }}
        >
          글읽기
        </Button>
        <Button
          variant="info"
          onClick={() => {
            this.props.handleWriteButtonClick();
          }}
        >
          글쓰기
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            this.props.handleModify(this.state.checkList);
          }}
        >
          수정하기
        </Button>
        <Button variant="danger" onClick={this.handleDelete}>
          삭제하기
        </Button>
      </div>
    );
  }
}

export default BoardList;
