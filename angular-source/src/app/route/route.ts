import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../component/login/login.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { PublicationsComponent } from '../component/publications/publications.component';

import { AuthGuard } from '../guard/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent },
    { path: 'publications', component: PublicationsComponent, canActivate: [AuthGuard] },
];

export const AppRouter = RouterModule.forRoot(appRoutes);
