import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService{

  private apiUrl = 'http://localhost:7777/api/computers';

  constructor(private http: Http){}

  //just test for now
  public getPosts(){
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
