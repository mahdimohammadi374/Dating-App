import { LikeUser, UserLikeParams } from './../_enums/likeUser';
import { userParams, TypeSort } from './../_models/member';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IMember, IMemberUpdate, Photo } from '../_models/member';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { HubConnection } from '@microsoft/signalr';
import { IMessage } from '../_models/message';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl: string = environment.baseUrl;
  private userParams:userParams=new userParams();
  private cacheMember = new Map<string,PaginatedResult<IMember[]>>();
  members: IMember[] = [];
  paginationResult: PaginatedResult<IMember[]> = new PaginatedResult<
    IMember[]
  >();



  constructor(private http: HttpClient) {}

  getMembers(userParams: userParams) {
    const key=Object.values(userParams).join("-");
    var response=this.cacheMember.get(key);
    if(response) return of(response);
    // if(this.members.length>0) return of(this.members);
    let params = this.setParams(userParams);
    return this.http
      .get<PaginatedResult<IMember[]>>(`${this.baseUrl}/User/get-all-users`, {
        params,
      })
      .pipe(
        map((response) => {
          this.members = response.items;
          this.paginationResult = response;
          this.cacheMember.set(key,response);
          return response;
        })
      );
  }

  private setParams(userParams: userParams) {
    let params = new HttpParams();
    if (userParams.pageNumber && userParams.pageSize) {
      params = params.append('pageNumber', userParams.pageNumber.toString());
      params = params.append('pageSize', userParams.pageSize.toString());
      params = params.append('minAge', userParams.minAge.toString());
      params = params.append('maxAge', userParams.maxAge.toString());
      params = params.append('gender', userParams.gender.toString());
      params = params.append('orderBy', userParams.orderBy.toString());
      params = params.append('typeSort', userParams.typeSort.toString());
    }
    return params;
  }
  getMemberByUserName(userName: string) {
    let user=[...this.cacheMember].reduce((arr:IMember[],[key,value])=> arr.concat(value.items), [])
    .find(x=>x.userName===userName);

    if(user) return of(user);


    const member: IMember = this.members.find((m) => m.userName == userName)!;
    if (member) return of(member);
    return this.http.get<IMember>(
      `${this.baseUrl}/User/get-user-by-username/${userName}`
    );
  }

  getMemberById(id: number) {
    const member: IMember = this.members.find((m) => m.id == id)!;
    if (member) return of(member);
    return this.http.get<IMember>(`${this.baseUrl}/User/get-user-by-id/${id}`);
  }

  updateMember(model: IMemberUpdate) {
    return this.http
      .put<IMember>(`${this.baseUrl}/User/update-user`, model)
      .pipe(
        map((response: IMember) => {
          var index = this.members.findIndex((i) => i.id == response.id);
          this.members[index] = response;
          return response;
        })
      );
  }

  setMainPhoto(photoId: number) {
    return this.http.put<Photo>(
      `${this.baseUrl}/User/set-main-photo/${photoId}`,
      {}
    );
  }

  deletePhoto(photoId: number) {
    return this.http.delete<Photo>(
      `${this.baseUrl}/User/delete-photo/${photoId}`
    );
  }


  addLike(userName:string){
    var params=new HttpParams().append("targetUserName" , userName)
    return this.http.post(`${this.baseUrl}/UserLike/add-like`,{},{params })
  }

  getUserLikes(userParams:UserLikeParams){
    let params=new HttpParams();
    params=params.append("PredicateUserLike" , userParams.PredicateUserLike.toString());
    params=params.append("PageNumber" , userParams.pageNumber);
    params=params.append("PageSize" , userParams.pageSize);

    return this.http.get<PaginatedResult<IMember[]>>(`${this.baseUrl}/UserLike/get-likes`,{params});
    
  }
  setUserParams(up: userParams){
    this.userParams=up;
  }
  getUserParams(){
    return this.userParams;
  }
  resetUserParams(){
    this.userParams=new userParams();
    return this.userParams;
  }
}
