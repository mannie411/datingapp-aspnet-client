import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
