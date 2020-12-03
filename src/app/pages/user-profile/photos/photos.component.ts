import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SnotifyService, SnotifyToast } from 'ng-snotify';
import { FileUploader } from 'ng2-file-upload';
import { error } from 'protractor';
import { Photo } from 'src/app/core/models/Photo';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment as env } from 'src/environments/environment';
import * as _ from 'underscore';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  apiUrl = env.apiUrl;
  @Input() photos: Photo[];
  @Output() photoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currPhoto: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.initUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initUploader() {
    const id = this.authService.decodedToken.nameid;
    this.uploader = new FileUploader({
      url: `${this.apiUrl}users/${id}/photos`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      isHTML5: true,
    });

    this.uploader.onSuccessItem = (item, res, status, headers) => {
      if (res) {
        const p: Photo = JSON.parse(res);
        const photo = {
          id: p.id,
          description: p.description,
          url: p.url,
          createdAt: p.createdAt,
          isMain: p.isMain,
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changePhoto(photo.url);
          this.authService.currUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currUser)
          );
        }
      }
    };
  }

  deletePhoto(photo) {
    return this.snotifyService.confirm(
      'Are you sure, you want to delete this photo',
      {
        buttons: [
          {
            text: 'Yes',
            action: (toast: SnotifyToast) =>
              this.userService
                .deletePhoto(this.authService.currUser.id, photo)
                .subscribe(
                  (r) => {
                    this.photos.splice(
                      _.findIndex(this.photos, { id: photo }, 1)
                    );
                    this.snotifyService.remove(toast.id);
                    this.snotifyService.success(r);
                  },
                  (e) => {
                    this.snotifyService.remove(toast.id);
                    this.snotifyService.error(e);
                  }
                ),
            bold: false,
          },
          {
            text: 'No',
            action: (toast: SnotifyToast) => {
              this.snotifyService.remove(toast.id);
            },
          },
        ],
      }
    );
  }

  setMainPhoto(photo: Photo) {
    const userId = +this.authService.decodedToken.nameid;

    return this.userService.setMainPhoto(userId, photo.id).subscribe(
      () => {
        this.currPhoto = _.findWhere(this.photos, { isMain: true });
        this.currPhoto.isMain = false;
        photo.isMain = true;
        // this.photoChange.emit(photo.url);
        this.authService.changePhoto(photo.url);
        this.authService.currUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currUser));
      },
      (error) => this.snotifyService.error(error)
    );
  }
}
