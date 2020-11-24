import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './core/services/auth.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { UserService } from './core/services/user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailResolver } from './core/resolvers/members-detail.resolver';
import { MemberListResolver } from './core/resolvers/members-list.resolver';
import { MemberEditResolver } from './core/resolvers/member-edit.resolver';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    SnotifyModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const token = localStorage.getItem('token');
          if (token != null) { return token; }
          return '';

        },
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: [
          '//localhost:5000/api/auth'
        ],
        throwNoTokenError: true,

      },
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    AuthService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
