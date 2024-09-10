//dependencies
const { createHmac, randomBytes } = require("crypto");
const streamifier = require("streamifier");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dp2cgqs14",
  api_key: "397893488711772",
  api_secret: "EC7JVrlfh_I0DcHWcTi3w8psnFM",
});

//from files
const {JOB_POST } = require("../models/JOB_POSTS_MODEL");
const { USER } = require("../models/USER_MODEL");
const { POST } = require("../models/POSTS_MODEL");
// const { MSG } = require("../models/MESSAGE");
const { mail_for_password } = require("../services/mail");
const {
  validate_token,
  create_seperate_token,
  create_token_for_user,
} = require("../services/service");

//functions

// const user_profile = async (req, res) => {
//   try {
//     const user = req.user1.email;
//     const userid = req.user1.id;
//     const user_data = await USER.findOne({ email: user });
//     if (!user_data) {
//       return res.json(0);
//     }
//     const sell_posts = await SELL.find({ user: userid });
//     if (sell_posts !== null) {
//       res.json({ user: user_data, allpost: sell_posts });
//     }
//   } catch {
//     res.json(0);
//   }
// };

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     try {
//       const base64String = file.data.toString("base64");
//       resolve(`data:${file.mimetype};base64,${base64String}`);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// const post_for_sell = async (req, res) => {
//   const { TITLE, DESCRIPTION, PRICE } = req.body;

//   try {
//     const file = req.files.KABAD; // Accessing the uploaded file from req.files
//     const KABAD = await convertToBase64(file);

//     const new_sell = await SELL.create({
//       title: TITLE,
//       description: DESCRIPTION,
//       price: PRICE,
//       user: req.user1.id,
//       image: KABAD,
//     });

//     res.json(1);
//   } catch (e) {
//     console.log("error is --", e);
//     res.json(0);
//   }
// };

// const all_posts = async (req, res) => {
//   const user = req.user1.id;
//   try {
//     const sell_data = await SELL.find({
//       user: user,
//       $or: [{ status: "--under process--" }, { status: "--buyer selected--" }],
//     }).populate("user");
//     res.json(sell_data);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ message: "Error fetching posts" });
//   }
// };

// const user_history = async (req, res) => {
//   try {
//     const history = await SELL.find({
//       user: req.user1.id,
//       status: "--deal done--",
//     });
//     console.log(history);
//     res.json(history);
//   } catch (error) {
//     res.json(0);
//   }
// };

const check = async (req, res) => {
  res.json(req.user1).end();
};

// const logout = async (req, res) => {
//   res
//     .cookie("authToken", "", {
//       httpOnly: true,
//       secure: true,
//       maxAge: 24 * 60 * 60 * 1000,
//       sameSite: "None",
//     })
//     .json(1);
// };

// const feedback = async (req, res) => {
//   const { FEEDBACK_HERE } = req.body;

//   try {
//     await FEEDBACK.create({
//       feedback: FEEDBACK_HERE,
//       user_name: req.user1.name,
//       user_id: req.user1.id,
//       user_email: req.user1.email,
//     });
//     res.json(1);
//   } catch {
//     res.json(0);
//   }
// };

// //updating functions

// const updating = async (req, res) => {
//   const { FULLNAME, PHONE, ADDRESS, newbgno, NEWPROFILEIMG, ROLE } = req.body;
//   const check_for_registered = await USER.find({ email: req.user1.email });
//   if (check_for_registered.length === 1) {
//     const updated_data = {};
//     if (FULLNAME !== "") updated_data.name = FULLNAME;
//     if (PHONE !== "") updated_data.phone = PHONE;
//     if (ADDRESS !== "") updated_data.adderess = ADDRESS;
//     if (ROLE !== "") updated_data.role = ROLE;
//     if (req.files !== null) {
//       const file = req.files.NEWPROFILEIMG;
//       const result = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           file.tempFilePath,
//           (err, result) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(result);
//             }
//           }
//         );
//         streamifier.createReadStream(file.data).pipe(uploadStream);
//       });
//       updated_data.profileimg = result.url;
//     }
//     if (newbgno !== check_for_registered.background)
//       updated_data.background = newbgno;
//     if (updated_data !== null) {
//       const user = await USER.findOneAndUpdate(
//         { email: req.user1.email },
//         { $set: updated_data },
//         { new: true }
//       );

//       const posts = await SELL.find({
//         "final_buyer.0.email": req.user1.email,
//       });
//       posts.forEach(async (post) => {
//         await SELL.updateOne(
//           { _id: post._id },
//           { $set: { final_buyer: [user] } }
//         );
//       });
//       const up_posts = await SELL.find({ status: "--under process--" });
//       up_posts.forEach(async (up_post) => {
//         let new_list = [];
//         up_post.buyers.forEach(async (buyer) => {
//           if (buyer.email === req.user1.email) {
//             buyer = user;
//           }
//           new_list.push(buyer);
//         });
//         await SELL.updateOne(
//           { _id: up_post._id },
//           { $set: { buyers: new_list } }
//         );
//       });

//       const user_token = create_token_for_user(user);
//       return res
//         .cookie("authToken", user_token, {
//           httpOnly: true,
//           secure: true,
//           maxAge: 24 * 60 * 60 * 1000,
//           sameSite: "None",
//         })
//         .json(1);
//     }
//   }
// };

// const changebg = async (req, res) => {
//   const { bgno } = req.body;
//   const user = await USER.find({ email: req.user1.email });
//   if (user.length !== 0) {
//     if (bgno !== user.background) {
//       const updatedUser = await USER.findOneAndUpdate(
//         { email: req.user1.email },
//         { $set: { background: bgno } },
//         { new: true }
//       );
//       const user_token = create_token_for_user(updatedUser);
//       res
//         .cookie("authToken", user_token, {
//           httpOnly: true,
//           secure: true,
//           maxAge: 24 * 60 * 60 * 1000,
//           sameSite: "None",
//         })
//         .json(1);
//     }
//   }
// };

// const upd_password = async (req, res) => {
//   const { PASSWORD } = req.body;
//   if (PASSWORD !== "") {
//     try {
//       const user_old_data = await USER.findOne({ email: req.user1.email });
//       if (user_old_data.length !== 0) {
//         const salt = user_old_data.salt;
//         const provided_password = createHmac("sha256", salt)
//           .update(PASSWORD)
//           .digest("hex");
//         const new_data = {
//           EMAIL: req.user1.email,
//           PASSWORD: provided_password,
//         };
//         const user_token = create_seperate_token(new_data);
//         const mailResult = await mail_for_password(user_token, req.user1.email);

//         if (mailResult === 1) {
//           res.json(1); // Email sent successfully
//         } else {
//           res.json(0); // Email sending failed
//         }
//       } else {
//         res.json(0);
//       }
//     } catch (error) {
//       return res.json(0);
//     }
//   }
// };

// const forgot_pass = async (req, res) => {
//   const { PASSWORD, EMAIL } = req.body;
//   try {
//     const user_old_data = await USER.findOne({ email: EMAIL });
//     if (user_old_data) {
//       const salt = user_old_data.salt;
//       const provided_password = createHmac("sha256", salt)
//         .update(PASSWORD)
//         .digest("hex");
//       const new_data = {
//         EMAIL: EMAIL,
//         PASSWORD: provided_password,
//       };
//       const user_token = create_seperate_token(new_data);
//       const mailResult = await mail_for_password(user_token, EMAIL);
//       console.log("1--->", user_old_data);

//       if (mailResult === 1) {
//         res.json(1); // Email sent successfully
//       } else {
//         res.json(0); // Email sending failed
//       }
//     } else {
//       res.json(0);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json(0);
//   }
// };

// const pass_update = async (req, res) => {
//   const token = req.params.jwt;
//   try {
//     const user_data = validate_token(token);
//     if (user_data) {
//       const user = await USER.findOne({ email: user_data.EMAIL });
//       if (user.length !== 0) {
//         await USER.findOneAndUpdate(
//           { email: user.email },
//           { $set: { password: user_data.PASSWORD } }
//         );
//         res.render("Confirm", {
//           err: "PASSWORD CHANGED SUCCESFULLY U MAY CLOSE THIS TAB NOW!",
//         });
//       } else {
//         res.render("Confirm", {
//           err: "UNABLE TO CHANGE PASSWORD TRY AGAIN IN SOME TIME",
//         });
//       }
//     }
//   } catch (error) {
//     res.render("confirm", { err: error });
//   }
// };

// const view_full_post = async (req, res) => {
//   const { post_id } = req.body;
//   try {
//     const post = await SELL.findById(post_id);
//     res.json(post);
//   } catch (error) {
//     res.json(0);
//   }
// };

// const add_qrcode = async (req, res) => {
//   try {
//     const file = req.files.QRCODE;
//     const result = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         file.tempFilePath,
//         (err, result) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//       streamifier.createReadStream(file.data).pipe(uploadStream);
//     });
//     const user = await USER.findOneAndUpdate(
//       { email: req.user1.email },
//       { $set: { qrcode: result.url } },
//       { new: true }
//     );

//     const posts = await SELL.find({
//       "final_buyer.0.email": req.user1.email,
//     });
//     posts.forEach(async (post) => {
//       await SELL.updateOne(
//         { _id: post._id },
//         { $set: { final_buyer: [user] } }
//       );
//     });
//     const up_posts = await SELL.find({ status: "--under process--" });
//     up_posts.forEach(async (up_post) => {
//       let new_list = [];
//       up_post.buyers.forEach(async (buyer) => {
//         if (buyer.email === req.user1.email) {
//           buyer = user;
//         }
//         new_list.push(buyer);
//       });
//       await SELL.updateOne(
//         { _id: up_post._id },
//         { $set: { buyers: new_list } }
//       );
//     });

//     const new_token = create_token_for_user(user);
//     res
//       .cookie("authToken", new_token, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 24 * 60 * 60 * 1000,
//         sameSite: "None",
//       })
//       .json(1);
//   } catch {
//     res.json(0);
//   }
// };

// const message = async (req, res) => {
//   const { msg, email } = req.body;
//   try {
//     await MSG.create({
//       message: msg,
//       user_email: email,
//     });
//     res.json(1);
//   } catch {
//     res.json(0);
//   }
// };
module.exports = {
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
};
