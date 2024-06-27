import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { IMember } from './../../_models/member';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUser } from 'src/app/_models/account.models';
import { AccountService } from 'src/app/_services/account.service';
import { Photo } from './../../_models/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css'],
})
export class PhotoEditComponent implements OnInit {
  @Input() member: IMember;
  private backendUrl: string = environment.baseUrl;
  user: IUser;

  uploader!: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      if (user) this.user = user;
    });

    this.InitializeUploader();
  }

  onSetMainPhoto(photoId: number) {
    this.memberService.setMainPhoto(photoId).subscribe({
      next: (response: Photo) => {
        this.updateUserAndMemberPhoto(response);
        this.toastr.success('Your main photo changed successfully');
      },
    });
  }

  private updateUserAndMemberPhoto(response: Photo) {
    this.user.photoUrl = response.url;
    this.accountService.setCurrentUser(this.user);

    this.member.photoUrl = response.url;
    this.member.photos.forEach((photo) => {
      if (photo.isMain) {
        photo.isMain = false;
      } else if (photo.id == response.id) {
        photo.isMain = true;
      }
    });
  }

  onDelete(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: (response) => {
        var index: number = this.member.photos.findIndex(
          (p) => p.id == photoId
        );
        this.member.photos.splice(index, 1);
        this.toastr.warning('Your photo deleted successfully');
      },
    });
  }

  //#region  photoupdate

  private InitializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.backendUrl}/User/add-photo`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      authToken: 'Bearer ' + this.user?.token,
    });
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        this.member.photos.push(res);
        if (this.member.photos.length === 1) {
          this.updateUserAndMemberPhoto(res);
        }
      }
    };
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  //#endregion
}
