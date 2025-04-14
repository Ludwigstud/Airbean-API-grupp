export const validateNewUser = (req, res, next) => {
    if (req.body && Object.keys(req.body).length !== 0) {
      return res.status(400).json({
        message: "Request body must be empty when registering a user.",
      });
    }
  
    next();
  };