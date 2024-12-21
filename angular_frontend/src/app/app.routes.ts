import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { GetAPIComponent } from './components/get-api/get-api.component';
import { CrudComponent } from './components/crud/crud.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "get-api",
        pathMatch: "full", // Ensures the redirect happens only for the root URL
       
    },
    {
        path:"user-page",
        component:UserComponent
    },
    {
        path:"admin",
        component:AdminComponent
    },{
        path:"data-binding",
        component:DataBindingComponent
    },{
    path:"get-api",
    component:GetAPIComponent
},{
    path:"crud",
    component:CrudComponent
},
];
