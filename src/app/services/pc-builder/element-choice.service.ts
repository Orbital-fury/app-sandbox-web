import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PcElement } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementChoiceService {

  subject: Subject<Object> = new Subject<Object>();

}
