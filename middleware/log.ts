import { Response, Request, NextFunction } from "express";

export const createLog = (req:Request, res:Response, next:NextFunction) => {
    res.on("finish", function() {
      console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage, "Request Body:",req.body);
    });
    next();
  };