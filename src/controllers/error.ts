// THis is the error handling controller

// 404 errors
// authentication errors

import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "../helpers/server-response";

export const handle404Error = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorRes: ServerResponse = {
    error: true,
    errorInfo: {
      status: 404,
      message: "Page Not Found",
    },
    data: null,
  };
  res.status(404).send(errorRes);
};

export const handleAuthError = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorRes: ServerResponse = {
    error: true,
    errorInfo: {
      status: 401,
      message: "Authentication Falied",
    },
    data: null,
  };
  res.status(401).send(errorRes);
};

export const handlePermissionError = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorRes: ServerResponse = {
    error: true,
    errorInfo: {
      status: 403,
      message: "Authorization Falied. Permission not granted for user",
    },
    data: null,
  };
  res.status(403).send(errorRes);
};
