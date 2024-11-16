import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { formatResponse } from "../util/responseUtil";
import { User } from "../models/User";

export const PostSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Email already in use. Please choose a different one."
          )
        );
    }

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Email and Password fields are required. both should be a string"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    return res
      .status(201)
      .json(
        formatResponse(201, "user successfully created.", { email: email })
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        formatResponse(500, "Error creating user.", null, {}, [error.message])
      );
  }
};

export const PostLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .json(formatResponse(401, "user is not signed up!"));
    }

    const enteredPasswordHashed = await bcrypt.compare(password, user.password);
    if (!enteredPasswordHashed) {
      return res.status(401).json(formatResponse(401, "Invalid password"));
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "365d",
    });

    res.json({ token });
  } catch (error) {
    return res
      .status(500)
      .json(
        formatResponse(500, "Error loging in user.", null, {}, [error.message])
      );
  }
};
