import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {

		console.log('front ssay anay wala data',req.body);
		
		const { fullName, email, password, confirmPassword, gender  } = req.body;

		// Validation for required fields
		if (!fullName || !email || !password || !confirmPassword || !gender) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		// Check for existing user by email (case insensitive)
		const existingUser = await User.findOne({ email: email.toLowerCase() });

		//yeah existing user woh hai jo db main mojood hai
		console.log('existingUser===>',existingUser);
		
		if (existingUser) {
			return res.status(400).json({ error: "email already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?email=${email}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?email=${email}`;

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		await newUser.save(); // Save the new user

		// Generate JWT token here
		generateTokenAndSetCookie(newUser._id, res);

		res.status(201).json({
			_id: newUser._id,
			fullName: newUser.fullName,
			email: newUser.email,
			profilePic: newUser.profilePic,
		});
		
	} catch (error) {
        // Improved error handling
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({ error: "email already exists" });
        }
        
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
