import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppNavigationService } from '../utils/app-navigation.service';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  phoneNumber = '1-888-422-0101';
  
  constructor(private appNavigation: AppNavigationService) {}
  
  startJourney(): void {
    this.appNavigation.navigateToApp();
  }
}

