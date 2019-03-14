import { fromEvent } from 'rxjs';
import { Directive, Input, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appValidatedInput]'
})
export class ValidatedInputDirective {

  @Input() formGroup: FormGroup;
  @Input() formControlName: string;

  constructor(private el: ElementRef) {
    fromEvent(this.el.nativeElement, 'input').subscribe(() => {
      console.log('changes');
      this.el.nativeElement.classList.remove('invalid');
      if (!this.formGroup.get(this.formControlName).valid) {
        this.el.nativeElement.classList.add('invalid');
      }
    });
  }

}
