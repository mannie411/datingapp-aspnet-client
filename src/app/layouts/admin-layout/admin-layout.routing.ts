import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { MemberListComponent } from 'src/app/pages/member-list/member-list.component';
import { ListComponent } from 'src/app/pages/list/list.component';
import { MessagesComponent } from 'src/app/pages/messages/messages.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'member-list', component: MemberListComponent },
    { path: 'list', component: ListComponent },
    { path: 'messages', component: MessagesComponent },
];
