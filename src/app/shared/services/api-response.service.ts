import { Injectable } from '@angular/core';
import { CustomToastrService } from '../components/toast/custom-toastr.service';

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
    this.toastrService.showCustomError(`Error ${apiError.status} (${apiError.error})`, apiError.message);
  }
  
}
