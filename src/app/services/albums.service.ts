import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { APIData } from '../models/api-data.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  getAlbums(albumId: number): Observable<APIData[]>{
    return this.http.get<APIData[]>(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  }
}
