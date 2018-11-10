const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

Page.beforeValidate( async page=>{
  try{
    page.slug=page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    const slugCheck = await Page.findAll({
      attributes:['slug'],
      where:{
        slug:{
          $eq:page.slug,
        }
      }
    });
    if(slugCheck.length){
      const test =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      test.replace(/[0-9]/g,'');
      page.slug=test;
    }
  }
  catch(error){
    console.error(error.message);
  }
  // for random slug generator;
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      isEmail: true,
    }
  }
});

module.exports = {
  db,
  Page,
  User
};
