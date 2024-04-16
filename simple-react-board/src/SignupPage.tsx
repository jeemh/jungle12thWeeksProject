import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const SignupPage = ({ onCancel }: { onCancel: () => void }) => {
  const [name, setUsername] = useState("");
  const [user_id, setEmail] = useState("");
  const [user_pw, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서버로 전송할 데이터
    const userData = {
      name: name,
      user_id: user_id,
      user_pw: user_pw,
    };
    // 서버로 회원가입 요청 보내기
    Axios.post("http://localhost:8000/api/signup", userData)
      .then((response) => {
        // 서버에서 받은 응답 확인
        console.log("Signup response:", response);
        // 회원가입 성공 시 취소 함수 호출하여 로그인 화면으로 돌아감
        onCancel();
        // 회원가입 성공 시 사용자에게 메시지 표시
        alert("회원가입에 성공했습니다.");
      })
      .catch((error) => {
        // 오류 발생 시 처리
        console.error("Signup error:", error);
        // 오류 메시지를 사용자에게 표시하는 등의 오류 처리 작업 수행
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <div>
      <h2>회원가입 페이지입니다</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>사용자명</Form.Label>
          <Form.Control
            type="text"
            placeholder="사용자명"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email 주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="id"
            value={user_id}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={user_pw}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          회원가입하기
        </Button>
        <Button variant="danger" onClick={onCancel}>
          취소
        </Button>
      </Form>
    </div>
  );
};

export default SignupPage;
