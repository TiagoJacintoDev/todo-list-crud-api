const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    googleId: String,
    picture: String,
  },
  {
    statics: {
      async findOneOrCreate(condition, doc) {
        const one = await this.findOne(condition);

        return one || this.create(doc);
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
