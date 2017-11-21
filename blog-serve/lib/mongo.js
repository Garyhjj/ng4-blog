var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var objectIdToTimestamp = require('objectid-to-timestamp');

mongolass.connect('mongodb://localhost:27017/ng4-blog');

mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.create_at = objectIdToTimestamp(item._id);
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.create_at = objectIdToTimestamp(result._id);
    }
    return result;
  }
})

exports.Scan = mongolass.model('Scan', {
  site: { type: 'string' },
  count: { type: 'number' },
  lastScan: {type: 'number'}
});
exports.Scan.index({ _id: 1 }).exec();

