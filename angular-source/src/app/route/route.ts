import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../component/login/login.component';
import { PublicationsComponent } from '../component/publications/publications.component';

import { AuthGuard } from '../guard/auth.guard';

const appRoutes: Routes = [
    // 404
    { path: 'login', component: LoginComponent },
    { path: 'publications', component: PublicationsComponent, canActivate: [AuthGuard] },
];

export const AppRouter = RouterModule.forRoot(appRoutes);
