const { Schema, model } = require("mongoose");

const post_schema = new Schema(
  {
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "null",
    },
    price: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "USER_M",
      require: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    comments: {
      type: [Schema.Types.Mixed],
      default: [],
    },
  },
  { timestamps: true, collection: "posts" }
);
const POST = model("POST_M", post_schema);
module.exports = { POST };
