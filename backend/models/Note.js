const { DataTypes, Model } = require('sequelize');

class Note extends Model {
  static initModel(sequelize) {
    Note.init({
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    }, {
      sequelize,
      modelName: 'Note',
    });
  }
}

module.exports = Note;
