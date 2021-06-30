const Sequelize = require('sequelize')


let db;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL)
} else {
  db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/test.db'
  })
}


const Users = db.define('user', {
    /* id: COL_ID_DEF,
    username: COL_USERNAME_DEF */
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false,
    },
    password:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:false
    },
    followers:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false
    },
    email:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false
    },
    status:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:true
    }
});

const Posts = db.define('post', {
    /* id: COL_ID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
    } */
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false
    },
    body:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    },
    likes:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    keyword:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull:false
    },
    file:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:true,
    }
});

const Comments = db.define('comment', {
    /* id: COL_ID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: Sequelize.DataTypes.TEXT('tiny')
    } */
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false
    },
    body:{
        type:Sequelize.DataTypes.TEXT('tiny'),
        allowNull:false
    }
})
const likesmapper=db.define('likesmapper', {
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    }
});
const followersmapper=db.define('followersmapper',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    currentuser:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
    }
});

Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

Users.hasMany(likesmapper)
likesmapper.belongsTo(Users)

Posts.hasMany(likesmapper)
likesmapper.belongsTo(Posts)

Users.hasMany(followersmapper)
followersmapper.belongsTo(Users)



module.exports = {
    db,
    Users,
    Posts,
    Comments,
    likesmapper,
    followersmapper
}