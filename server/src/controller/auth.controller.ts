// import User from "../models/user.model";
import bcrypt from "bcryptjs";
import addNewToken from "../utils/token";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../utils/functions";
import { pgClient } from "../db";
import pg from "pg";
// controller to register new user
export const register = async (req: any, res: any) => {
  const { ...authBody } = req.body;
  const { username = "" } = authBody;
  const client = await pgClient();
  const password = authBody.password
    ? await bcrypt.hash(authBody.password, 10)
    : null;

  delete authBody.password;
  const insertQuery =
    "insert into users (id,username, password, created_at, modified_at) values ($1,$2,$3,$4,$4) on conflict (id) do nothing returning id, username;";
  const parameters = [uuidv4(), username, password, new Date()];
  const createUser:pg.QueryResult | undefined = await executeQuery(insertQuery, parameters, client);
console.log("craeteUser", createUser);

  if (!createUser) {
    return res
      .status(500)
      .json({ error: "unable to register user please try again later" });
  }
  res
    .status(200)
    .json({ message: "User Registered successfully", data: createUser.rows });
};

// Function to login
export const login = async (req: any, res: any) => {
  const { username, password } = req.body;
  
  const userQuery = "select id,username, password from users where username = $1"
  const userParameters = [username]
  const client = await pgClient();
  const userIfExists:any  = await executeQuery(userQuery, userParameters, client);

  if (!userIfExists) {
    return res.status(500).json({ error: "invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, userIfExists?.rows[0].password);
  if (!isMatch) {
    return res
      .status(409)
      .json({ status: "forbidden", message: "Password doesn't match!" });
  }

  if (userIfExists.rowcount === 0) {
    return res
      .status(404)
      .json({
        status: "error",
        message: `User not found please register to continue`,
      });
  }

  addNewToken(req, res, userIfExists.rows[0]);
  const { refresh = "", access = "" } = res.locals;
  return res.status(200).json({
    status: "success",
    message: "Login Successful.",
    data: userIfExists.rows,
    access,
    refresh,
  });
};
