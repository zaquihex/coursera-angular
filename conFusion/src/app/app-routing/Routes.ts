import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent} from "../contact/contact.component";
import { DishdetailComponent } from "../dish-detail/dishdetail.component";
import { AboutComponent } from "../about/about.component";
import { CanActivateViaAuthGuard } from './CanActivateViaAuthGuard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'contactus', component: ContactComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'dishdetail/:id', component: DishdetailComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
