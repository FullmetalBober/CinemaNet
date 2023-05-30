const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const CloudinaryStorage = require('../utils/cloudinary');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// exports.createOneWithUpload = (Model, options) =>
//   catchAsync(async (req, res, next) => {
//     console.log(req.body);
//     const session = await Model.startSession();
//     session.startTransaction();
//     const doc = await Model.create([{ ...req.body }], { session });
//     const upload = CloudinaryStorage.createSingle(
//       options.key,
//       Model.modelName.charAt(0).toUpperCase() + Model.modelName.slice(1),
//       doc[0]._id,
//       options.width,
//       options.height
//     );

//   upload(req, res, async err => {
//     if (err) return next(err);
//     console.log(req.file);
//     if (req.file) {
//       doc[0][key] = req.file.path;
//       await doc[0].save({ session });
//     }

//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json({
//       status: 'success',
//       data: {
//         data: doc[0],
//       },
//     });
//   });
// });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOneBySlug = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findOne({ slug: req.params.slug });
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that slug', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();

    if (popOptions) query = query.populate(popOptions);

    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.checkToDelete = (Models, key) =>
  catchAsync(async (req, res, next) => {
    const findByKey = (Model, key) => Model.findOne({ [key]: req.params.id });

    let promises = [];
    if (Array.isArray(Models))
      Models.forEach(Model => {
        promises.push(findByKey(Model, key));
      });
    else promises.push(findByKey(Models, key));

    promises = await Promise.all(promises);

    if (promises.some(promise => promise))
      return next(
        new AppError(
          `This ${key} has ${
            Array.isArray(Models)
              ? Models.map(Model => Model.collection.collectionName).join(', ')
              : Models.collection.collectionName
          }, you cannot delete it`,
          400
        )
      );

    next();
  });
