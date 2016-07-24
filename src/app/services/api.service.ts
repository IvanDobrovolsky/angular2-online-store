import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Computer } from './../models/computer.model';
import { IFilters } from './../models/filters.model';

interface IApiResponse<T>{
  success: boolean;
  message: string;
  data: Array<T>;
}

interface IComputersApiService{
  getAllComputers():                         Observable<IApiResponse<Computer>>;
  getComputerById(id: number):               Observable<IApiResponse<Computer>>;
  getAllBrandNames():                        Observable<IApiResponse<string>>;
  findComputers(filters: IFilters):          Observable<IApiResponse<Computer>>; //TODO add filters model
  removeComputer(id: string):                IApiResponse <Computer>;
  createNewComputer():                       IApiResponse <Computer>;
  updateComputer(updatedComputer: Computer): IApiResponse<Computer>;
}

@Injectable()
export class ApiService implements IComputersApiService{

  private apiResources = {
    getAll: 'http://localhost:7777/api/computers',
    brands: 'http://localhost:7777/api/brands',
    filters: 'http://localhost:7777/api/computers/filter',
  };

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

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

  getAllComputers(): Observable<IApiResponse<Computer>> {
    return this.http.get(this.apiResources.getAll)
        .map(this.extractData)
        .catch(this.handleError)
  }

  getComputerById(id: number): Observable<IApiResponse<Computer>> {
    return this.http.get(this.apiResources.getAll + '/' + id)
        .map(this.extractData)
        .catch(this.handleError)
  }


  getAllBrandNames(): Observable<IApiResponse<string>> {
    return this.http.get(this.apiResources.brands)
        .map(this.extractData)
        .catch(this.handleError)
  }


  findComputers(filters: IFilters): Observable<IApiResponse<Computer>> {
    console.log(filters);
    return this.http.post(this.apiResources.getAll + '/filter', JSON.stringify(filters), {headers: this.headers})
        .map(this.extractData)
        .catch(this.handleError)
  }

  removeComputer(id:string):IApiResponse<Computer> {
    return undefined;
  }

  createNewComputer():IApiResponse<Computer> {
    return undefined;
  }

  updateComputer(updatedComputer:Computer):IApiResponse<Computer> {
    return undefined;
  }


}
