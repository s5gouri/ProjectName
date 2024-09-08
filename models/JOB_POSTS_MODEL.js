const { Schema, model } = require("mongoose");
const job_post_schema = new Schema(
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
    organisation: {
      type: String,
      default: "null",
    },
    job_description: {
      type: String,
      default: "null",
    },
    photos: {
      type: String,
      default: "null",
    },
    job_type: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"],
    },
    employee_location: {
      type: String,
      default: "null",
    },
    workplace_type: {
      type: String,
      enum: ["REMOTE", "OFFICE"],
    },
    required_skills: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    salary_range: {
      type: String,
      default: "null",
    },
    experience_required: {
      type: String,
      default: "null",
    },
    post_deadline: {
      type: String,
      default: "null",
    },
    questions: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    view_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: "job_posts" }
);
const JOB_POST = model("JOB_POST_M", job_post_schema);
module.exports = { JOB_POST };
