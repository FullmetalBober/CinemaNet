const mongoose = require('mongoose');
const { Transform } = require('stream');
const catchAsync = require('../utils/catchAsync');

const fileName = 'backup.json';

exports.getBackup = catchAsync(async (req, res, next) => {
  const models = Object.values(mongoose.connection.models);
  let counter = models.length;
  const transformStream = new Transform({
    objectMode: true,
    transform: async (model, encoding, callback) => {
      const data = await model.find({}).lean();
      const signature = {
        collection: model.collection.collectionName,
        timestamp: Date.now(),
      };
      const result = { data, signature };
      callback(null, JSON.stringify(result) + (counter-- > 1 ? ',' : ''));
    },
  });

  res.attachment(fileName);
  res.write('[');

  transformStream.pipe(res, { end: false });

  transformStream.on('end', () => {
    res.write(']');
    res.end();
  });

  models.forEach(model => {
    transformStream.write(model);
  });

  transformStream.end();
});
