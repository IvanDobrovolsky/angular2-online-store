export class Angular2OnlineStorePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-online-store-app h1')).getText();
  }
}
