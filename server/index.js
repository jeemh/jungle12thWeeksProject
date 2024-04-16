const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");

let corsOptions = {
    origin: "http://localhost:3000", // 출처 허용 옵션 - 전체허용은 *
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rkdwndnjs123!",
    database: "bbs",
});

app.post("/api/signup", (req, res) => {
    const userId = req.body.user_id;
    const name = req.body.name;
    const userPw = req.body.user_pw;

    const sqlQuery = "INSERT INTO MEMBERS (user_id, name, user_pw) VALUES (?,?,?);";
    db.query(sqlQuery, [userId, name, userPw], (err, result) => {
        res.send({ sadfgasdf: result.insertId });
    });
});

app.post("/api/login", (req, res) => {
    const userId = req.body.email;
    const userPw = req.body.password;

    // 사용자 아이디와 비밀번호가 일치하는지 확인하는 SQL 쿼리
    const loginQuery = "SELECT * FROM MEMBERS WHERE user_id = ? AND user_pw = ?";

    // 데이터베이스에서 사용자 조회
    db.query(loginQuery, [userId, userPw], (err, result) => {
        if (err) {
            // 에러 처리
            console.error("Error checking login:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        if (result.length > 0) {
            // 사용자 아이디와 비밀번호가 일치하는 경우
            res.send({ name: result[0].name });
        } else {
            // 사용자 아이디 또는 비밀번호가 일치하지 않는 경우
            res.status(401).send("Incorrect user ID or password");
        }
    });
});

app.get("/list", (req, res) => {
    const sqlQuery =
        "SELECT BOARD_ID, BOARD_TITLE, BOARD_CONTENT, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

app.post("/detail", (req, res) => {
    const id = req.body.id;
    console.log("~~~~~~~~~~~~~detail, id=" + id);
    const sqlQuery = "SELECT BOARD_ID, BOARD_TITLE, BOARD_CONTENT FROM BOARD WHERE BOARD_ID = ?;";
    db.query(sqlQuery, [id], (err, result) => {
        res.send(result);
    });
});

app.post("/insert", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const sqlQuery = "INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?,?,'artistJay');";
    db.query(sqlQuery, [title, content], (err, result) => {
        res.send(result);
    });
});

app.post("/update", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;

    const sqlQuery =
        "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ?, UPDATER_ID = 'artistJay' WHERE BOARD_ID = ?;";
    db.query(sqlQuery, [title, content, id], (err, result) => {
        res.send(result);
    });
});

app.post("/delete", (req, res) => {
    const id = req.body.boardIdList;

    const sqlQuery = `DELETE FROM BOARD WHERE BOARD_ID IN (${id})`;
    db.query(sqlQuery, [id], (err, result) => {
        console.log(err);
        res.send(result);
    });
});

app.post("/login", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    const sqlQuery = `SELECT *FROM USER WHERE USER_ID = ? AND USER_PASSWORD = ?;`;
    db.query(sqlQuery, [id, pw], (err, result) => {
        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
