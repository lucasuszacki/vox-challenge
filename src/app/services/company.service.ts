import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyRequest } from '../models/company.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private apiUrl = 'http://localhost:3000/empresas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CompanyRequest[]> {
    return this.http.get<CompanyRequest[]>(this.apiUrl);
  }

  getById(id: number): Observable<CompanyRequest> {
    return this.http.get<CompanyRequest>(`${this.apiUrl}/${id}`);
  }

  create(data: CompanyRequest): Observable<CompanyRequest> {
    return this.http.post<CompanyRequest>(this.apiUrl, data);
  }

  update(id: number, data: CompanyRequest): Observable<CompanyRequest> {
    return this.http.put<CompanyRequest>(`${this.apiUrl}/${id}`, data);
  }
}
