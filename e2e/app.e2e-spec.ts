import { Ng4BlogPage } from './app.po';

describe('ng4-blog App', () => {
  let page: Ng4BlogPage;

  beforeEach(() => {
    page = new Ng4BlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
