const express = require("express");
const { check_for_user } = require("../middlewares/authentication");
const rt2 = express.Router();
const {
  //   post_for_sell,
  //   user_profile,
  //   all_posts,
  //   user_history,
  check,
  //   logout,
  //   updating,
  //   pass_update,
  //   changebg,
  //   feedback,
  //   view_full_post,
  //   add_qrcode,
  //   upd_password,
  //   message,
  //   forgot_pass,
} = require("../controllers/user_functions");
//for storing images

// rt2.get("/view/:id", check_for_user("authToken"), view_full_post);
rt2.post("/", check_for_user("authToken"), check);
// rt2.post("/profile", check_for_user("authToken"), user_profile);
// rt2.post("/allposts", check_for_user("authToken"), all_posts);
// rt2.post("/singlepost", check_for_user("authToken"), view_full_post);
// rt2.post("/history", check_for_user("authToken"), user_history);
// rt2.post("/logout", check_for_user("authToken"), logout);
// rt2.post("/bg", check_for_user("authToken"), changebg);
// rt2.post("/update/password", check_for_user("authToken"), upd_password);
// rt2.post("/forgot", forgot_pass);
// rt2.post("/feedback", check_for_user("authToken"), feedback);
// rt2.post("/message", message);
// rt2.get("/updatepass/:jwt", pass_update);

// rt2.post("/sell-post", check_for_user("authToken"), post_for_sell);

// rt2.post("/qrcode", check_for_user("authToken"), add_qrcode);

// rt2.post("/updating", check_for_user("authToken"), updating);

module.exports = { rt2 };
