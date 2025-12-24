import express from "express";
import routes from "./src/routes/routes.js"

export const app=express(); 
export const port = 3000;

// Routes
app.use("/", routes); 