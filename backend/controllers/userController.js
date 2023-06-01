const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const CloudinaryStorage = require('../utils/cloudinary');

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const uploadUserPhoto = publicId => (req, res, next) => {
  const upload = CloudinaryStorage.createSingle(
    'photo',
    'User',
    publicId,
    500,
    500
  );

  upload(req, res, err => {
    if (err) return next(err);

    if (req.file) req.body.photo = req.file.path;
    next();
  });
};

const deleteUserPhoto = publicId => (req, res, next) => {
  CloudinaryStorage.deleteSingle('User', publicId);
  next();
};

exports.uploadUserPhoto = (req, res, next) =>
  uploadUserPhoto(req.params.id)(req, res, next);

exports.deleteUserPhoto = (req, res, next) =>
  deleteUserPhoto(req.params.id)(req, res, next);

exports.uploadMyPhoto = (req, res, next) =>
  uploadUserPhoto(req.user.id)(req, res, next);

exports.deleteMyPhoto = (req, res, next) =>
  deleteUserPhoto(req.user.id)(req, res, next);
