import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../_models/account.models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get<IUser[]>(
      `${this.baseUrl}/Admin/get-users-with-username`
    );
  }

  editRoles(username: string, roles: string[]) {
    return this.http.post(
      `${this.baseUrl}/Admin/edit-roles/${username}?roles=${roles}`,
      {}
    );
  }
}
