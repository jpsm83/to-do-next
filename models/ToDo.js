const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    dueDate: {
      type: Date, default: Date.now()
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
      trim: true,
      maxlength: [40, "Title cannot be more than 40 characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    priority: {
      type: Boolean, default: false
    },
    done: {
      type: Boolean, default: false
    },

    // we dont have an user model save in our database
    // users are signin through "Google" and we know with "to do" belongs to each
    // user comparing it by email - getSession.user.email / toDo.user
    user: ""
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;

        return ret;
      },
    },
  }
);

// Trying to get the existing model to avoid OverwriteModelError
module.exports = mongoose.models.ToDo || mongoose.model("ToDo", toDoSchema);
