import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(public http: HttpClient) { }
 
 
  handleError(): any {
    throw new Error("Method not implemented.");
  }
}
