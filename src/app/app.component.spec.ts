import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AppComponent } from '../app/app.component';

beforeEachProviders(() => [AppComponent]);

describe('App: Angular2OnlineStore', () => {
  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2-online-store works!\'',
      inject([AppComponent], (app: AppComponent) => {
    expect(app.title).toEqual('angular2-online-store works!');
  }));
});
