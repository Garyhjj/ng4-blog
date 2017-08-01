export class BlogConfig {
  static baseUrl = 'http://localhost:7100/'

  static createArticle = BlogConfig.baseUrl + 'upload/article';

  static getArticles = BlogConfig.baseUrl + 'articles?page={num}';

  static getArticlesById = BlogConfig.baseUrl + 'articles/id?_id={id}';

  static getArticlesConclude = BlogConfig.baseUrl + 'articles/conclude';

  static getArticlesByType = BlogConfig.baseUrl + 'articles/type?type={str}&page={num}';

  static getArticlesByLabel = BlogConfig.baseUrl + 'articles/label?label={str}&page={num}';

  static getArticlesByDate = BlogConfig.baseUrl + 'articles/date?date={str}&page={num}';

  static getArticlesByKey = BlogConfig.baseUrl + 'articles/key?key={str}&page={num}';
}
