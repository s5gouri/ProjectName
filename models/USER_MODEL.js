const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {
  create_token_for_user,
  create_token_for_user_for_submition,
} = require("../services/service");
const user_schema = new Schema(
  {
    googleId: {
      type: String,
      default: "null",
    },
    name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["N_USER", "COMPANY", "ADMIN"],
      default: "N_USER",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "Add Phone Number",
    },
    address: {
      type: String,
      default: "Add Address",
    },
    password: {
      type: String,
      default: "null",
    },
    profileimg: {
      type: String,
      default: "/images/defaultprofile.png",
    },
    custom_link: {
      type: String,
      default: "null",
    },
    tagline: {
      type: String,
      default: "null",
    },
    location: {
      type: String,
      default: "null",
    },
    about: {
      type: String,
      default: "null",
    },
    industry: {
      type: String,
      default: "null",
    },
    user_links: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    followers: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    following: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    posts: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    education: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    projects: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    certificates: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    experience: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    salt: {
      type: String,
      default: "null",
    },
  },
  { collection: "users", timestamps: true }
);

user_schema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  if (user.password !== "null") {
    const salt = randomBytes(16).toString();
    const hash_password = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
    this.salt = salt;
    this.password = hash_password;
  } else if (user.password === "null") {
    const salt = randomBytes(16).toString();
    this.salt = salt;
  }
  next();
});

user_schema.static(
  "match_password_and_generate_token",
  async function (EMAIL, PASSWORD) {
    const user = await this.findOne({ email: EMAIL });
    if (!user) {
      throw new Error("USER NOT FOUND!!");
    }
    let salt = user.salt;
    const hashed_password = user.password;
    const provided_password = createHmac("sha256", salt)
      .update(PASSWORD)
      .digest("hex");
    if (provided_password !== hashed_password) {
      throw new Error("USER NOT FOUND!!");
    }
    const token = create_token_for_user(user);
    return token;
  }
);

const USER = model("USER_M", user_schema);
module.exports = { USER };
