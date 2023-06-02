const mongoose = require('mongoose');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { Transform } = require('stream');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');

const fileName = 'temp/backup.json';

exports.createTemp = catchAsync(async (req, res, next) => {
  fsPromises.mkdir('temp');
  next();
});

exports.getBackup = catchAsync(async (req, res, next) => {
  const writeStream = fs.createWriteStream(fileName);
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

  writeStream.write('[');

  transformStream.pipe(writeStream, { end: false });

  transformStream.on('end', () => {
    writeStream.write(']');
    writeStream.end();
  });

  models.forEach(model => {
    transformStream.write(model);
  });

  transformStream.end();

  writeStream.on('finish', () => {
    res.download(fileName, 'backup.json', async () => {
      await promisify(fs.unlink)(fileName);
    });
  });
});
