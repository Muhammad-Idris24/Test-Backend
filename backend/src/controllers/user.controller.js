import { User } from "../models/user.model.js";

 const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password,
        loggedIn: false
    });
    res.status(201).json({ 
        message: "User created successfully", 
        user: { id: user._id, username: user.username, email: user.email } 
    });


} catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ 
        message: "Server error", 
        error: error.message });
  }
};
 const loginUser = async (req, res) => {
  // Implementation for user login
  try {
    // Checking if the user exists
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }  

    // compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ 
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createUser, loginUser, logoutUser };