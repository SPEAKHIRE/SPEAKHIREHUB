import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class registerChampionService {

  constructor(private http: HttpClient) {}
  
  getChampion(data: any){
    return this.http.post<any>('http://localhost:3000/application/2', data)
  }

  getChampionUsername(username: any){
    return this.http.get<any>(`http://localhost:3000/application/2/${username}`)
  }
}
