import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { HttpService } from './http';
import { Subject } from 'rxjs/Subject';
import { Headers } from '@angular/http';


@Injectable()
export class AnimalService {

  constructor(private http: HttpService) { }

  getAnimals(data): Observable<any> {
    return this.http.post(
      'getAnimals', data
    ).map((res: Response) => {
      return res.json();
    });
  }
  getAnimalById(data): Observable<any> {
    return this.http.post(
      'getAnimalById', data
    ).map((res: Response) => {
      return res.json();
    });
  }
  editAnimal(data): Observable<any> {
    return this.http.put(
      'editAnimal', data
    ).map((res: Response) => {
      return res.json();
    });
  }
  addAnimal(data): Observable<any> {
    return this.http.put(
      'addAnimal', data
    ).map((res: Response) => {
      return res.json();
    });
  }
  deleteAnimal(data): Observable<any> {
    return this.http.put(
      'deleteAnimal', data
    ).map((res: Response) => {
      return res.json();
    });
  }
}
