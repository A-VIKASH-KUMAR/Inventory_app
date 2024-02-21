import { access } from "fs";
import jwt from "jsonwebtoken";

interface UpdatedUser {
    id?: string;
    username?:string;
    password?:string
  }
  
  type Request = {
    user: UpdatedUser;
  };

export default function (req: Request, res: any, updatedUser: UpdatedUser) {
    let jwtSignValue: any = {
      id: updatedUser.id,
      username:updatedUser.username
    };
    delete updatedUser.password;
    let accessToken = jwt.sign(jwtSignValue, process.env.JWT_SECRET_KEY!, {
      expiresIn: "5m",
    });
  
    let refreshToken = jwt.sign(jwtSignValue, process.env.JWT_SECRET_KEY!, {
      expiresIn: "24h",
    });
    
    // Attach tokens to the response locals object for further use
    res.locals.access = accessToken;
    res.locals.refresh = refreshToken;
  
    req.user = jwtSignValue;
  }
  