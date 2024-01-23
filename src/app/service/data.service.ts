import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'http://login.teletrack.in/api/api.php?api=user&ver=1.0&key=DD7598C8CEA5506BDB849BFBF18865C7&cmd=OBJECTS_ONLINE'

  getLocation(): Observable<any> {
    return this.http.get<any>(this.url);
  }


  getCustomer(data: any): Observable<any> {
    return this.http.post<any>('https://nika-gps.in/customer', data)
  }
}
