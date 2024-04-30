const user = require("../modal/usermodel")
const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await user.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		return next(new ErrorHandle("Error in getUsersForSidebar: ",500))
	}
};

module.exports=getUsersForSidebar;