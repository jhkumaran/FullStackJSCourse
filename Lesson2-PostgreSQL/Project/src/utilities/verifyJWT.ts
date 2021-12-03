import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: express.NextFunction
  ): void => {
    try {
      const token = (req.headers.authorization as string);
      jwt.verify(token, process.env.WEB_TOKEN as jwt.Secret);
      next();
    } catch (error) {
      res.status(401);
      res.json(`Access denied, invalid token ${error}`);
      return;
    }
};