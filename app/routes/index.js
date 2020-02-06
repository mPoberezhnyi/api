const discussionRoutes = require('./discussion_routes');
module.exports = function(app, db) {
  discussionRoutes(app, db);
};