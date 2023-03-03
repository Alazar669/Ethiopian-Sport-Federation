import User from "../models/user.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export const getUsers = async (req, res, next) => {
  
  const {...others} = req.query;
  try {
    const users = await User.find({
      ...others
    }).limit(req.query.limit);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const updateUserActionPlan = async (req, res, next) => {
  const todo = req.body.todos
  // console.log(todo)
  try {
   const updatedUser =  await User.findByIdAndUpdate(
     req.params.id ,
      {
        $push: {
          actionPlan: {
            todos: req.body.todos,
            dates: req.body.dates
          },
          // "actionPlan.$.todos": req.body.todos,
          // "actionPlan.$.dates": req.body.dates
        },
      }
    );
    console.log(updatedUser)
    res.status(200).json(updatedUser);
    // res.status(200).json("Users status has been updated.");
  } catch (err) {
    next(err);
  }
};
