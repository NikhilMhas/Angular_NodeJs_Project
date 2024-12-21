import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { GetAPIComponent } from './components/get-api/get-api.component';
import { CrudComponent } from './components/crud/crud.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UserComponent,AdminComponent,RouterLink,GetAPIComponent,CrudComponent,DataBindingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}
