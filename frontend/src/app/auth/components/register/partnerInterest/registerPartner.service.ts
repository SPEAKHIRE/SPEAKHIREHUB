import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class registerPartnerService {

  constructor(private http: HttpClient) {}
  
  getPartner(data: any){
    return this.http.post<any>('http://localhost:3000/application/2', data)
  }

  getPartnerUsername(username: any){
    return this.http.get<any>(`http://localhost:3000/application/2/${username}`)
  }
}
