import User from "../model/userModel.js";
import bcrypt from "bcrypt"
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRE_DATE,
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_EXPIRE_DATE,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
} from "../config/env.js";
import RefreshToken from "../models/refresh_token.model.js";

export const signUp = async (req,res,next) => {
    try{
        const {fullname,email,password} = req.body;
        if(!fullname || !email || !password){
            res.status(406);
            throw new Error("full_name,email,password required");
        }
        const emailExist = User.findOne({email});
        if(!emailExist){
            console.log("User not found");
            res.status(404);
            throw error;
        }

        if(password.length<8){
            throw new Error("Not Strong Password")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    const access_token = jwt.sign(
      { user_id: newUser._id },
      ACCESS_TOKEN_PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: ACCESS_TOKEN_EXPIRE_DATE,
      },
    );
    const refresh_token = jwt.sign(
      { user_id: newUser._id },
      REFRESH_TOKEN_PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: REFRESH_TOKEN_EXPIRE_DATE,
      },
    );
    res.cookie("access_token", access_token, {
      maxAge: 60000 * 15,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });
    res.cookie("refresh_token", refresh_token, {
      maxAge: 60000 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });
    const hashed_refresh_token = crypto
      .createHash("sha256")
      .update(refresh_token)
      .digest("hex");
    let expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 90);
    await RefreshToken.create({
      user_id: newUser._id,
      refresh_token:hashed_refresh_token,
      expires_at,
    });
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    res.status(201).json({
      success: true,
      data: {
        user: newUserObj,
        access_token,
        refresh_token
      },
    });
    }catch(Error){
        next(Error);
    }
};

export const signIN = async (req,res,next) => {
     try{
        const {fullname,email,password} = req.body;
        if(!fullname || !email || !password){
            res.status(406);
            throw new Error("full_name,email,password required");
        }
        const emailExist = User.findOne({email});
        if(!emailExist){
            console.log("User not found");
            res.status(404);
            throw error;
        }
    const validPassword = await bcrypt.compare(password, User.password);
    if (!validPassword) {
      const error = new Error("Invalid credential");
      error.statusCode = 401;
      throw error;
    }

    const access_token = jwt.sign(
      { user_id: User._id },
      ACCESS_TOKEN_PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: ACCESS_TOKEN_EXPIRE_DATE,
      },
    );
    const refresh_token = jwt.sign(
      { user_id: User._id },
      REFRESH_TOKEN_PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: REFRESH_TOKEN_EXPIRE_DATE,
      },
    );
    res.cookie("access_token", access_token, {
      maxAge: 60000 * 15,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });
    res.cookie("refresh_token", refresh_token, {
      maxAge: 60000 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });
    let expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 90);
    const hashed_refresh_token = crypto.createHash("sha256").update(refresh_token).digest("hex")
    await RefreshToken.create({
      user_id: User._id,
      refresh_token:hashed_refresh_token,
      expires_at,
    });
    const userObject = user.toObject();
    delete userObject.password
    res.status(200).json({
      success: true,
      data: {
        user:userObject,
        access_token,
        refresh_token,
      },
    });

    }catch(Error){
        next(Error);
    }
};
export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies?.refresh_token;
    if(!refresh_token){
      const error = new Error("Refresh token missing");
      error.statusCode = 401;
      throw error
    }
    
    const hashed_refresh_token = crypto.createHash("sha256").update(refresh_token).digest("hex");
    const db_refresh_token = await RefreshToken.findOne({refresh_token:hashed_refresh_token});
    if(!db_refresh_token){
      const error = new Error("Unauthorized");
      error.statusCode = 401
      throw error;
    }
    const decoded = jwt.verify(refresh_token,REFRESH_TOKEN_PUBLIC_KEY);
    const access_token = jwt.sign({user_id:decoded.user_id},ACCESS_TOKEN_PRIVATE_KEY,{
      expiresIn:ACCESS_TOKEN_EXPIRE_DATE,
      algorithm:"RS256"
    })
    res.cookie("access_token",access_token,{
      maxAge:60000 * 15,
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })
    res.status(201).json({success:true,data:{
      access_token
    }})
  } catch (err) {
    next(err);
  }
};