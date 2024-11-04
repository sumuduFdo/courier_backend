import { ServerResponse } from "./server-response";
import crypto from "crypto";

export const handleError = function (
  err: any,
  message: string
): ServerResponse {
  const errStatus = err.status ? err.status : null;
  const errMessage = err.message && err.message !== "" ? err.message : message;
  const response: ServerResponse = {
    error: true,
    errorInfo: { status: errStatus, message: errMessage },
    data: null,
  };

  return response;
};

export const generateTrackingNumber = (length: number): string => {
  const str: string = crypto
    .randomBytes(length)
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
  return str;
};
