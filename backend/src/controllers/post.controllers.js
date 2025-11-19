import { Post } from "../models/post.model.js";

// Create a new post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({ name, description, age });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });

  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    // (name, description, age) = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );;

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createPost, getAllPosts, updatePost, deletePost };