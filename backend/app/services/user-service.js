import User from "./../models/user.js";

export const save = async (newUser) => {
  console.log("inside save");
  const user = new User(newUser);
  return user.save();
};

export const validateLogin = async (userDetails) => {
  console.log("validate login");
  const emailFromUser = userDetails.email;
  const passwordFromUser = userDetails.password;

  const userLogin = await User.findOne(
    { email: emailFromUser, password: passwordFromUser, confirmedEmail: true },
    { email: 1, password: 1 }
  );
  return userLogin ? userLogin : null;
};

export const getUserByIdAndUpdate = async (id) => {
  console.log(id);
  const result = await User.updateOne(
    { _id: id },
    {
      $set: {
        confirmedEmail: true,
      },
    }
  );

  if (result.nModified === 0) {
    throw new Error(`User with id ${id} not found`);
  }

  const updatedUser = await User.findById(id);
  return updatedUser;
};

export const getUser = async (userData) => {
  console.log("inside get user based on email " + userData);
  const userEmail = userData;
  const user = User.findOne(
    { email: userEmail },
    { firstName: 1, lastName: 1, email: 1 }
  );
  return user;
};
