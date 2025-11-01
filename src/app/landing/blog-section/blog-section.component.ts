import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-section.component.html',
  styleUrl: './blog-section.component.scss'
})
export class BlogSectionComponent {
  blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Prime Aawas',
      excerpt: 'Learn how to manage your properties efficiently with our comprehensive platform.',
      date: 'January 15, 2024',
      category: 'Guide',
      image: 'assets/images/blog-1.jpg'
    },
    {
      id: 2,
      title: 'Tenant Management Best Practices',
      excerpt: 'Tips and tricks for managing tenants effectively and building strong relationships.',
      date: 'January 10, 2024',
      category: 'Tips',
      image: 'assets/images/blog-2.jpg'
    },
    {
      id: 3,
      title: 'Maximizing Property Revenue',
      excerpt: 'Strategies to increase your property revenue and optimize rental income.',
      date: 'January 5, 2024',
      category: 'Business',
      image: 'assets/images/blog-3.jpg'
    }
  ];
}

