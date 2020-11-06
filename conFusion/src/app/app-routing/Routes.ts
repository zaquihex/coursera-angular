import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent} from "../contact/contact.component";
import { DishDetailComponent } from "../dish-detail/dish-detail.component";
import { AboutComponent } from "../about/about.component";

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: 'dishdetail/:id',  component: DishDetailComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
