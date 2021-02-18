import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { MemberListComponent } from 'src/app/pages/members/member-list/member-list.component';
import { ListComponent } from 'src/app/pages/list/list.component';
import { MessagesComponent } from 'src/app/pages/messages/messages.component';
import { MemberDetailComponent } from 'src/app/pages/members/member-detail/member-detail.component';
import { MemberDetailResolver } from 'src/app/core/resolvers/members-detail.resolver';
import { MemberListResolver } from 'src/app/core/resolvers/members-list.resolver';
import { MemberEditResolver } from 'src/app/core/resolvers/member-edit.resolver';
import { UnsavedGuardService } from 'src/app/core/guards/unsaved-guard.service';
import { ListsResolver } from 'src/app/core/resolvers/lists.resolver';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: { user: MemberEditResolver },
  },
  {
    path: 'profile/edit',
    component: UserProfileComponent,
    resolve: { user: MemberEditResolver },
    canDeactivate: [UnsavedGuardService],
  },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  {
    path: 'members',
    component: MemberListComponent,
    resolve: { users: MemberListResolver },
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent,
    resolve: { user: MemberDetailResolver },
  },
  { path: 'list', component: ListComponent, resolve: { user: ListsResolver } },
  { path: 'messages', component: MessagesComponent },
];
