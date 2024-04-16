import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const LoginPage = ({
  loginHandler,
}: {
  loginHandler: (name: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서버로 전송할 데이터
    const userData = {
      email: email,
      password: password,
    };
    // 서버로 로그인 요청 보내기
    Axios.post("http://localhost:8000/api/login", userData)
      .then((response) => {
        // 서버에서 받은 응답 확인
        loginHandler(response.data); // 로그인 성공 시 부모 컴포넌트의 loginHandler 함수 호출
        // 예를 들어, 사용자를 다른 페이지로 리디렉션하거나 상태를 업데이트하는 등의 작업 수행
      })
      .catch((error) => {
        // 오류 발생 시 처리
        console.error("Login error:", error);
        // 오류 메시지를 사용자에게 표시하는 등의 오류 처리 작업 수행
      });
  };

  return (
    <div>
      <h2>로그인페이지입니다</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
