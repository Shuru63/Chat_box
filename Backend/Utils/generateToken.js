const jwt = require("jsonwebtoken");

const SetCookies = (user, statusCode, res) => {
    const token = user.getJwTToken(); 

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 42 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user: user,
            token: token
        });
}

module.exports = SetCookies;
