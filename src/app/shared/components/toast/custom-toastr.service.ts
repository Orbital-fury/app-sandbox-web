import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastComponent } from './custom-toast/custom-toast.component';

export type ToastOptions = { msg: string, type: 'danger' | 'error' | 'success' | 'info' | 'warning', title?: string, autohide: boolean };

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  // https://stackoverflow.com/questions/72473119/place-toastr-toasts-in-container-in-specific-component
  // https://www.npmjs.com/package/ngx-toastr
  // custom toast : https://github.com/scttcper/ngx-toastr/blob/master/src/app/pink.toast.ts

  constructor(private toastrService: ToastrService) { }

  /* Show a toast as an overlay on the top and full-width */
  private showToast(options: ToastOptions) {
    const toastOptions = {
      toastClass: `ngx-toastr toast-${options.type}`,
      positionClass: 'toast-container-position',
      closeButton: true,
      timeOut: 5000,
      disableTimeOut: !options.autohide
    };
    this.toastrService.show(options.msg, options.title, toastOptions);
  }

  showInfo(title: string, msg: string) {
    this.showToast({ msg, type: 'info', title, autohide: true })
  }

  showSuccess(title: string, msg: string) {
    this.showToast({ msg, type: 'success', title, autohide: true })
  }

  showWarning(title: string, msg: string) {
    this.showToast({ msg, type: 'warning', title, autohide: true })
  }

  showError(title: string, msg: string) {
    this.showToast({ msg, type: 'error', title, autohide: false })
  }

  private showCustom(options: ToastOptions) {
    const toastOptions = {
      toastClass: `toast-custom-${options.type}`,
      titleClass: `text-${options.type} bg-${options.type} bg-opacity-25`,
      messageClass: `bg-${options.type} bg-opacity-25`,
      positionClass: 'toast-container-position',
      closeButton: true,
      timeOut: 5000,
      disableTimeOut: !options.autohide,
      toastComponent: CustomToastComponent
    };
    this.toastrService.show(options.msg, options.title, toastOptions);
  }

  showCustromInfo(title: string, msg: string) {
    this.showCustom({ msg, type: 'info', title, autohide: true })
  }

  showCustromSuccess(title: string, msg: string) {
    this.showCustom({ msg, type: 'success', title, autohide: true })
  }

  showCustromWarning(title: string, msg: string) {
    this.showCustom({ msg, type: 'warning', title, autohide: true })
  }

  showCustromError(title: string, msg: string) {
    this.showCustom({ msg, type: 'danger', title, autohide: false })
  }

}
