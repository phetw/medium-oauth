import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../component/login/login.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { PublicationsComponent } from '../component/publications/publications.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'publication/:userId', component: PublicationsComponent },
];

export const AppRouter = RouterModule.forRoot(appRoutes);
