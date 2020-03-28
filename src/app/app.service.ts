
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  // https://opentdb.com/api_config.php
  constructor(private http: HttpClient) {}

  public getQuestions(): Observable<any> {
      return this.http.get<any>('https://opentdb.com/api.php?amount=1&category=23');
  }
}
