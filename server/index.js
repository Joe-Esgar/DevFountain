const express = require("express");
const app = express();
const massive = require("massive");
require("dotenv").config();
app.use(express.json());
const session = require("express-session");
const nodemailer = require("nodemailer");

const {
  login,
  register,
  userInfo,
  logout,
  edit
} = require("./controllers/userController");

const {
  getPosts,
  createPost,
  changePost,
  removePost
} = require("./controllers/postController");

const { getLikes, like, unlike } = require("./controllers/likeController");

const {
  getMySkills,
  addSkills,
  removeSkills
} = require("./controllers/skillsController");

const {
  SERVER_PORT,
  EMAIL,
  EMAIL_PASSWORD,
  SESSION_SECRET,
  CONNECTION_STRING
} = process.env;

app.use(express.json());
app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1209600000 // 2week cookie
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

// user EndPoints
app.post("/api/login", login);
app.post("/api/register", register);
app.put("/api/edit", edit);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// skills endpoints
app.get("/api/skills", getMySkills);
app.post("/api/skills", addSkills);
app.delete("/api/skills", removeSkills);

// post endpoints
app.get("/api/post/:email", getPosts);
app.post("/api/post", createPost);
app.put("/api/post/:id/", changePost);
app.delete("/api/post/:id", removePost);

// likes endpoints
app.get("/api/likes/:id", getLikes);
app.post("/api/likes/:id", like);
app.delete("/api/likes/:id", unlike);

// Nodemailer
app.post("/api/send", (req, res, next) => {
  const { name, email, title, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `${EMAIL}`,
    to: `${email}`,
    subject: `${title} by ${name}`,
    text: `${message}`,
    replyTo: ``
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error("there was an error ", err);
    } else {
      console.log("here is the email", res);
    }
  });
});
// Becasue of browser router, we will eventually need the below lines.
// app.use(express.static(__dirname + "/../build"));
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

const port = SERVER_PORT || 4000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}`));
