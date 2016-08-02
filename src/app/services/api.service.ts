import { Injectable }                             from '@angular/core';
import { Http, Response, Headers, RequestMethod } from '@angular/http';
import { Observable }                             from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Computer } from './../models/computer.model';
import { IFilters } from './../models/filters.model';

interface IApiResponse<T> extends Response{
  success: boolean;
  message: string;
  data: Array<T>;
}

interface IComputersApiService{
  getAllComputers():                                     Observable<IApiResponse<Computer>>;
  getComputerById(id: number):                           Observable<IApiResponse<Computer>>;
  getAllBrandNames():                                    Observable<IApiResponse<string>>;
  findComputers(filters: IFilters):                      Observable<IApiResponse<Computer>>;
  removeComputer(id: number):                            Observable<IApiResponse<Computer>>;
  createNewComputer(newComputer: Computer):              Observable<IApiResponse<Computer>>;
  updateComputer(id: number, updatedComputer: Computer): Observable<IApiResponse<Computer>>;
}

@Injectable()
export class ApiService implements IComputersApiService{

  private apiResources = {
    getAll:  'http://localhost:7777/api/computers',
    brands:  'http://localhost:7777/api/brands',
    filters: 'http://localhost:7777/api/computers/filter',
  };

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){

  }

  //Success handler
  private extractData(response: Response){
    if(response.status < 200 || response.status >= 300){
      throw new Error(`Bad response status: ${response.status}`);
    }
    return response.json();
  }

  //Error handler
  private handleError(error: any = 'Server Error'){
    console.error(error.message);
    console.log("Something went wrong while trying to access the url provided");
    return Observable.throw(error.message);
  }

  private makeApiRequest(method: RequestMethod, resource: string, body: any): Observable<Response> {
    //noinspection TypeScriptUnresolvedFunction
    return this.http.request(resource, {body, method, headers: this.headers})
        .map(this.extractData)
        .catch(this.handleError)
  }

  public getAllComputers(): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Get, this.apiResources.getAll, null);
  }

  public getComputerById(id: number): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Get, this.apiResources.getAll + '/' + id, null);
  }

  public getAllBrandNames(): Observable<IApiResponse<string>> {
    return <Observable<IApiResponse<string>>> this.makeApiRequest(RequestMethod.Get, this.apiResources.brands, null);
  }

  public findComputers(filters: IFilters): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Post, this.apiResources.getAll + '/filter', JSON.stringify(filters));
  }

  public removeComputer(id: number): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Delete, this.apiResources.getAll + '/' + id, null);
  }
  
  public createNewComputer(newComputer: Computer): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Post, this.apiResources.getAll, JSON.stringify(newComputer));
  }

  public updateComputer(id: number, updatedComputer: Computer): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Put, this.apiResources.getAll + '/' + id, JSON.stringify(updatedComputer));
  }
}
