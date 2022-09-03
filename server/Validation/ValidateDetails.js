import joi from "joi";

const validation = joi.object({
  username: joi.string().alphanum().min(5).max(20).trim().required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().alphanum().min(10).trim(true).required(),
});

const ResetpasswordSchema = joi.object({
  password: joi.string().alphanum().min(10).trim(true).required(),
});



const userValidation = async (req, res, next) => {
  if (req.body.username == null) {
    const data = { password: req.body.password };
    const { error } = ResetpasswordSchema.validate(data);
    if (error) return res.status(400).json({ error: error.message });
    else next();
  }
  else {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const { error } = validation.validate(data);
    if (error) return res.status(400).json({ error: error.message });
    else next();
  }
};

export default userValidation;

