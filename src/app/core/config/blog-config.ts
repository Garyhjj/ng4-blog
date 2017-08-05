export class BlogConfig {
  // static baseUrl = 'http://localhost:7100/';
  static baseUrl = 'http://codeend.ngrok.cc/';

  static createArticle = BlogConfig.baseUrl + 'articles/create/';

  static deleteArticle = BlogConfig.baseUrl + 'articles?id={str}'

  static updateArticle = BlogConfig.baseUrl + 'articles/update/';

  static getArticles = BlogConfig.baseUrl + 'articles?page={num}';

  static getArticlesById = BlogConfig.baseUrl + 'articles/id?_id={id}';

  static getOriginalArticleById = BlogConfig.baseUrl + 'articles/original?_id={id}';

  static getArticlesConclude = BlogConfig.baseUrl + 'articles/conclude/';

  static getArticlesByType = BlogConfig.baseUrl + 'articles/type?type={str}&page={num}';

  static getArticlesByLabel = BlogConfig.baseUrl + 'articles/label?label={str}&page={num}';

  static getArticlesByDate = BlogConfig.baseUrl + 'articles/date?date={str}&page={num}';

  static getArticlesByKey = BlogConfig.baseUrl + 'articles/key?key={str}&page={num}';

  static getCommnetsByAritcleId = BlogConfig.baseUrl + 'comments?articleId={str}';

  static createComment = BlogConfig.baseUrl + 'comments/create/';

  static getNewCommentsCount = BlogConfig.baseUrl + 'comments/unreadCount/';

  static getNewComments = BlogConfig.baseUrl + 'comments/newComments/';

  static readNewCommentsByArticleId = BlogConfig.baseUrl + 'comments/readed?id={str}';

  static checkUser = BlogConfig.baseUrl + 'users/';
}
