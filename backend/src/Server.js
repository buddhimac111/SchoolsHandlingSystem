const express = require('express');
// const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

// const db = mysql.createConnection({
//   host: 'sql12.freemysqlhosting.net',
//   user: 'sql12600470',
//   password: 'spggp6iEPn',
//   database: 'sql12600470'

// });

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   }else
//   console.log('Connected to MySQL database');
// });

app.get('/', (req, res) => {
    res.send("<h1>Server is up and running</h1>");
  });

//login
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === 'admin' && password === 'admin') {
    res.send({ role:'admin' });
  }
  else if (username === 'teacher' && password === 'teacher') {
    res.send({ role:'teacher' });
  }
  else if (username === 'student' && password === 'student') {
    res.send({ role:'student' });
  }
  else {
    res.send({ message:"Wrong username/password combination!" });
  }

  // db.query(
  //   "SELECT * FROM users WHERE username = ? AND password = ?",
  //   [username, password],
  //   (err, result) => {
  //     if (err) {
  //      console.log("login error: ",err);
  //     }

  //     if (result.length > 0) {
  //       res.send(result);
  //       console.log(result);
  //     } else {
  //       res.send({ message: "Wrong username/password combination!" });
  //       console.log("Wrong username/password combination!");
  //     }
  //   }
  // );
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });