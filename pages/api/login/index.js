import {
  PostLogin,
  PostSignup,
} from "../../../backend/controllers/userController";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    return PostLogin(req, res);
  } else {
    res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
