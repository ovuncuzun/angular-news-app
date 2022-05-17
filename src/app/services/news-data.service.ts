import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';

const apiURL = environment.apiUrl;
const apiKey = environment.apiKey;


let params = new HttpParams()
  .set('apiKey', apiKey)
  .set('language', 'en')
  .set('page', 0);

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  constructor(private httpClient: HttpClient) { }

  getNewsDataFromAPI(pageIndex: number): Observable<News> {
    params = params.set('page', pageIndex.toString());
    return this.httpClient.get<News>(apiURL, { params });
  }
}
