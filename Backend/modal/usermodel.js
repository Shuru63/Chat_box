const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true }
);

// password incryption function
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})
// generate jwt tokens and store in cookie
userSchema.methods.getJwTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordToken = hashedToken;
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes expiration

    return resetToken;
};
// Create and export the User model based on the schema
const User = mongoose.model("User", userSchema);
module.exports = User;
