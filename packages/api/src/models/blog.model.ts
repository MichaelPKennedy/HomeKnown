import { DataTypes, Model, Sequelize } from 'sequelize'

export class BlogPost extends Model {}

export const BlogPostModel = (sequelize: Sequelize) => {
  BlogPost.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      author: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      tableName: 'BlogPosts',
      timestamps: false
    }
  )
}
