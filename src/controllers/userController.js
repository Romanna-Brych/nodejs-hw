import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }
  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  );

  res.status(200).json({ url: user.avatar });
};

export const updateUser = async (req, res) => {
  const { username, email } = req.body;

  const updateData = {
    ...(username ? { username } : {}),
    ...(email ? { email } : {}),
  };

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
  });

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(updatedUser);
};

export const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
