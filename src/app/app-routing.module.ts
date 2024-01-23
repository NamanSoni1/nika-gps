import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo:'login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }