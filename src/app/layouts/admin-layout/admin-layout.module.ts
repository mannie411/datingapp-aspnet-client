import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { MemberListComponent } from 'src/app/pages/members/member-list/member-list.component';
import { MemberCardComponent } from 'src/app/pages/members/member-card/member-card.component';
import { MemberDetailComponent } from 'src/app/pages/members/member-detail/member-detail.component';
import { PhotosComponent } from 'src/app/pages/user-profile/photos/photos.component';
import { FileUploadModule } from 'ng2-file-upload';
import { DateAgoPipe } from 'src/app/core/pipes/date-ago.pipe';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FileUploadModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    PhotosComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    DateAgoPipe,
  ],
})
export class AdminLayoutModule {}
