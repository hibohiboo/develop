
/**
 * 映画のモデルを作成する
 * @param  {Sequialize} sequelize sequelizeライブラリ
 * @param  {DataType} DataTypes データタイプのインターフェース
 * @return {Movie} Movieモデル
 */
function Movie(sequelize, DataTypes) {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    genre: DataTypes.STRING,
    price: DataTypes.INTEGER,
  });

  return Movie;
}

export default Movie;
