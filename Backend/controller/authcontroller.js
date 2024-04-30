const usermodel = require("../modal/usermodel");
const bcrypt = require("bcrypt");
const ErrorHandle = require("../Utils/ErrorHandle");
const SetCookies = require("../Utils/generateToken");

const Signup = async (req, res, next) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body
        const user = usermodel.findOne({ username })
        if (!user) {
            return next(new ErrorHandle("user already exist ", 404))
        }
        if (password !== confirmPassword) {
            return next(new ErrorHandle("password is not matched ", 404))
        }
        const createuserdata = await  usermodel.create({
            fullname,
            username,
            password,
            gender
        });
        SetCookies(createuserdata, 201, res)
    } catch (error) {
        return next(new ErrorHandle("please enter proper details", 404))
    }
}
const Login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorHandle("Please fill email and password", 400));
    }

    const userinfo = await usermodel.findOne({ username });
    if (!userinfo) {
        return next(new ErrorHandle("Please enter correct credentials", 400));
    }
    const securedpassword = userinfo.password;

    const validPassword = await bcrypt.compare(password, securedpassword);
    if (!validPassword) {
        return next(new ErrorHandle("Please enter correct credentials", 400));
    }
    console.log(validPassword)
    console.log(password)
    console.log( securedpassword)
    if (!validPassword) {
        return next(new ErrorHandle("Please enter correct credentials", 400));
    }

    SetCookies(userinfo, 200, res);
    // } catch (error) {
    //     return next(new ErrorHandle("Internal Server Error", 500));
    // }
}
const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return next(new ErrorHandle("Internal server error in logout API", 500));
    }
};

module.exports = {
    Signup,
    Login,
    logout
}
