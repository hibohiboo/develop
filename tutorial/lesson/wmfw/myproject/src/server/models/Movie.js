/**
 * @file movie
 *
 * @module Movie
 *
 * @author hibohiboo
 */

/** Class 映画モデル. */
class Movie {
  /**
   * Create a point.
   * @param {number} id - ID.
   * @param {string} title - タイトル.
   * @param {datetime} releaseDate 公開日
   * @param {string} genre - ジャンル
   * @param {number} price - 価格
   */
  constructor({ id, title, releaseDate, genre, price }) {
    this.id = id;
    this.title = title;
    this.releaseDate = releaseDate;
    this.genre = genre;
    this.price = price;
  }
}

export default Movie;
