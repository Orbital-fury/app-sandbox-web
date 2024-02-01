import { Component } from '@angular/core';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss']
})
export class CustomToastComponent extends Toast {
}
