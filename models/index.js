const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate:{
        isEmail: true
    }
  }
});

// User.hasMany(Page);
Page.belongsTo(User, { as: 'author' });

Page.addHook('beforeValidate', (page, options) => {
  page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
});

module.exports = { db, Page, User };
