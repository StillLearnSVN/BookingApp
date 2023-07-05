import { json } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Bookings from "../models/Bookings";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(500).json({
            message: "Unexpected Error Occured"
        });
    }

    return res.status(200).json({users});
};

export const signup = async (req, res, next) => {
    const {
        username,
        password,
        name,
        age
    } = req.body;
    if (!username && username.trim() === "" && !password && password.trim === "" && !name && name.trim() === "" && !age && age.trim() === "") {
        return res.status(422).json({
            message: "Invalid Inputs"
        });
    }

    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try{
        user = new User({username, password: hashedPassword, name, age});
        user = await user.save();
    } 
    catch (err){
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({
            message: "Unexpected Error Occured"
        });
    }

    return res.status(201).json({ id: user._id });
}

export const updateUser = async(req, res, next) => {
    const id = req.params.id;

    const {
        username,
        password,
        name,
        age
    } = req.body;
    if (!username && username.trim() === "" && !password && password.trim === "" && !name && name.trim() === "" && !age && age.trim() === "") {
        return res.status(422).json({
            message: "Invalid Inputs"
        });
    }

    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try {
        user = await User.findByIdAndUpdate(id,{username, password: hashedPassword, name, age})
    } catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message: "Something went Wrong!" });
    }

    return res.status(200).json({message: "Updated Successfully"});
};

export const deleteUser = async(req, res, next) => {
    const id = req.params.id;

    let user;
    try{
        user = await User.findByIdAndRemove(id);
    }
    catch(err){
        return console.log(err);
    }
    
    if(!user){
        return res.status(500).json({message: "Something went Wrong!" });
    }

    return res.status(200).json({message: "Deleted Successfully"});
}

export const login = async(req, res, next) => {
    const {
        username,
        password
    } = req.body;
    if (!username && username.trim === "" && !password && password.trim() === "") {
        return res.status(422).json({
            message: "Invalid Inputs"
        });
    }
    let existingUser;
    try{
        existingUser = await User.findOne({ username });
    } catch(err){
        console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: "Unable to find user from this Id"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"});
    }

    return res.status(200).json({message: "Login Successfully"})
};

export const getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
      bookings = await Bookings.find({ user: id })
        .populate("movie")
        .populate("user");
    } catch (err) {
      return console.log(err);
    }
    if (!bookings) {
      return res.status(500).json({ message: "Unable to get Bookings" });
    }
    return res.status(200).json({ bookings });
  };

  export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
  };