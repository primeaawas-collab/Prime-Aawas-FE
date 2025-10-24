import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
 isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  serviceCards = [
  {
    number: '1',
    title: 'Register Property',
    
    link: '/register-property',
    
  },
  {
    number: '2',
    title: 'Manage Services',
    
    link: '/service-section',
   
  },
  {
    number: '3',
    title: 'Register Tenant',
    
    link: '/register-tenant',
   
  },
  {
    number: '4',
    title: 'Manage Billing',
    
    link: '/billing-cost',
   
  },
  {
    number: '5',
    title: 'Billing',
    
    link: '/billing',
   
  },
  {
    number: '6',
    title: 'owner Dashboard',
    link: '/owner-dashboard',
  }
]
}
