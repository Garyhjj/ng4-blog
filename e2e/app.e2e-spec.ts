import { Test12Page } from './app.po';

describe('test12 App', () => {
  let page: Test12Page;

  beforeEach(() => {
    page = new Test12Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
