export const validateRegister = async (req: any, res: any, next: any) => {
    const { phoneNumber,  username, password } = req.body;
    if (
      !phoneNumber ||
      !username ||
      !password ||
      phoneNumber === "" ||
      username === "" ||
      password === ""
    ) {
      await res.status(403).json({
        error: "please provide phoneNumber,username, password to register the user",
      });
      return;
    }
    return next();
  };

  export const validateLogin = async (req: any, res: any, next: any) => {
    const { username, password } = req.body;
    if (
      !username ||
      !password ||
      username === "" ||
      password === ""
    ) {
      return await res.status(403).json({
        error: "please provide username, password to login the user",
      });
    
    }
    return next();
  };