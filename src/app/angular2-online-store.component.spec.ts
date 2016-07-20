import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2OnlineStoreAppComponent } from '../app/angular2-online-store.component';

beforeEachProviders(() => [Angular2OnlineStoreAppComponent]);

describe('App: Angular2OnlineStore', () => {
  it('should create the app',
      inject([Angular2OnlineStoreAppComponent], (app: Angular2OnlineStoreAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2-online-store works!\'',
      inject([Angular2OnlineStoreAppComponent], (app: Angular2OnlineStoreAppComponent) => {
    expect(app.title).toEqual('angular2-online-store works!');
  }));
});
