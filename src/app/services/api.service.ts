import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Computer } from './../models/computer.model';

interface IApiResponse<T>{
  success: boolean;
  message: string;
  data: Array<T>;
}

interface IComputersApiService{
  getAllComputers(): IApiResponse <Computer>;
  getComputerById(id: string): IApiResponse <Computer>;
  getAllBrandNames(): IApiResponse <string>;
  findComputers(filters: any): IApiResponse <Computer>; //TODO add filters model
  removeComputer(id: string): IApiResponse <Computer>;
  createNewComputer(): IApiResponse <Computer>;
  updateComputer(updatedComputer: Computer): IApiResponse<Computer>;
}

@Injectable()
export class ApiService implements IComputersApiService{

  //TODO implement all methods properly
  getAllComputers():IApiResponse<Computer> {
    return undefined;
  }

  getComputerById(id:string):IApiResponse<Computer> {
    return undefined;
  }

  getAllBrandNames():IApiResponse<string> {
    return undefined;
  }

  findComputers(filters:any):IApiResponse<Computer> {
    return undefined;
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

  private apiUrl = 'http://localhost:7777/api/computers';

  constructor(private http: Http){}

  //just test for now
  public getData(){
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.apiUrl)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(response: Response){
    if(response.status < 200 || response.status >= 300){
      throw new Error(`Bad response status: ${response.status}`);
    }

    return response.json();
  }

  private handleError(error: any = 'Server Error'){
    console.error(error.message);
    console.log("Something went wrong while trying to access the url provided");
    return Observable.throw(error.message);
  }
}
