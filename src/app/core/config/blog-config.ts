export class BlogConfig {
  static baseUrl = 'http://localhost:7100/'

  static createArticle = BlogConfig.baseUrl + 'upload/article';

  static getArticles = BlogConfig.baseUrl + 'articles?page={num}';

  static getArticlesById = BlogConfig.baseUrl + 'articles/id?_id={id}';
}
