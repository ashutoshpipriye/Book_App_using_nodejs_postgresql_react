const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./books.model")(sequelize, Sequelize);
db.user = require("./users.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.userBooks = require("./userBooks.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// db.books.belongsToMany(db.user, {
//   through: "userBooks",
//   foreignKey: "bookId",
//   otherKey: "userId",
// });

// db.user.belongsToMany(db.books, {
//   through: "userBooks",
//   foreignKey: "userId",
//   otherKey: "bookId",
// });

db.ROLES = ["user", "admin"];

module.exports = db;
