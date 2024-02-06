import { Injectable } from '@angular/core';
import { CustomToastrService } from '../shared/components/toast/custom-toastr.service';

export interface ApiError {
  status: number;
  error: string;
  message: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {

  constructor(private readonly toastrService: CustomToastrService) { }

  public launchApiSuccess(title: string, msg: string) {
    this.toastrService.showCustomSuccess(title, msg);
  }

  public launchApiError(apiError: ApiError) {
    if (apiError) {
      this.toastrService.showCustomError(`Error ${apiError.status} (${apiError.error})`, apiError.message);
    }
  }

  public launchConnectionRefusedApiError() {
    this.toastrService.showCustomError('Connection refused', 'No connection with the server. It may be offline/disconnected');
  }
  
}
