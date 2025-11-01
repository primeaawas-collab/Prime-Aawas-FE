import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { CoverageSectionComponent } from './coverage-section/coverage-section.component';
import { SolutionsSectionComponent } from './solutions-section/solutions-section.component';
import { ProtectionSectionComponent } from './protection-section/protection-section.component';
import { IntegrationSectionComponent } from './integration-section/integration-section.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    // CoverageSectionComponent,
    SolutionsSectionComponent,
    ProtectionSectionComponent,
    // IntegrationSectionComponent,
    BlogSectionComponent,
    FooterComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
}

