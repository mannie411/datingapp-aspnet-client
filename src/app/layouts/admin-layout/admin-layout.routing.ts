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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
    { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
    { path: 'list', component: ListComponent },
    { path: 'messages', component: MessagesComponent },
];
