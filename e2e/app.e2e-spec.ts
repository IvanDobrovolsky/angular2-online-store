import { Ng2OnlineStorePage } from './app.po.ts';

describe('ng2-online-store App', function() {
  let page: Ng2OnlineStorePage;

  beforeEach(() => {
    page = new Ng2OnlineStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
