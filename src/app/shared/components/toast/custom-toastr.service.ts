import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export type ToastOptions = { msg: string, type: 'error' | 'success' | 'info' | 'warning', title?: string, autohide: boolean };

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  // https://stackoverflow.com/questions/72473119/place-toastr-toasts-in-container-in-specific-component
  // https://www.npmjs.com/package/ngx-toastr

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

  public showInfo(title: string, msg: string) {
    this.showToast({msg, type: 'info', title, autohide: true})
  }

  public showSuccess(title: string, msg: string) {
    this.showToast({msg, type: 'success', title, autohide: true})
  }

  public showWarning(title: string, msg: string) {
    this.showToast({msg, type: 'warning', title, autohide: true})
  }

  public showError(title: string, msg: string) {
    this.showToast({msg, type: 'error', title, autohide: false})
  }

}
