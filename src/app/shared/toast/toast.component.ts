import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../service/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
      <div 
        *ngFor="let toast of toasts" 
        class="toast show" 
        [ngClass]="getToastClass(toast.type)"
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true">
        <div class="toast-header">
          <div class="d-flex align-items-center">
            <i [class]="getIconClass(toast.type)" [ngClass]="getIconColorClass(toast.type)"></i>
            <strong class="me-auto ms-2">{{ toast.title }}</strong>
          </div>
          <button 
            type="button" 
            class="btn-close" 
            data-bs-dismiss="toast" 
            aria-label="Close"
            (click)="removeToast(toast.id)">
          </button>
        </div>
        <div class="toast-body">
          {{ toast.message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast {
      min-width: 300px;
      max-width: 400px;
      margin-bottom: 10px;
    }

    .toast-header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .toast-success {
      border-left: 4px solid #28a745;
    }

    .toast-error {
      border-left: 4px solid #dc3545;
    }

    .toast-warning {
      border-left: 4px solid #ffc107;
    }

    .toast-info {
      border-left: 4px solid #17a2b8;
    }

    .icon-success {
      color: #28a745;
    }

    .icon-error {
      color: #dc3545;
    }

    .icon-warning {
      color: #ffc107;
    }

    .icon-info {
      color: #17a2b8;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.2em;
      cursor: pointer;
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: ToastMessage[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeToast(id: string): void {
    this.toastService.remove(id);
  }

  getToastClass(type: string): string {
    return `toast-${type}`;
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-bell';
    }
  }

  getIconColorClass(type: string): string {
    return `icon-${type}`;
  }
}
