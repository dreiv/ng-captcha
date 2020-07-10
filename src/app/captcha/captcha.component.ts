import { Component, OnInit, ViewChild, ElementRef, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, NgControl } from '@angular/forms';

function random() {
  return Math.floor(Math.random() * 10) + 1;
}

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CaptchaComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CaptchaComponent,
      multi: true
    }
  ]
})
export class CaptchaComponent implements OnInit, ControlValueAccessor {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  answer: number;
  valid = false;
  onChange = (value: any) => { };
  onTouched = () => { };

  ngOnInit(): void {
    this.createCaptcha();
  }

  writeValue(value: any) { }

  validate({ value }: FormControl) {
    const isNotValid = this.answer !== Number(value);

    return isNotValid && {
      invalid: true
    };
  }

  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  createCaptcha() {
    const ctx = this.canvas.nativeElement.getContext("2d");
    const [numOne, numTwo] = [random(), random()];
    this.answer = numOne + numTwo;

    if (ctx) {
      ctx.font = "30px Arial";
      ctx.fillText(`${numOne} + ${numTwo} = `, 10, 35);
    }
  }

  change(value: string) {
    this.onChange(value);
    this.onTouched();
  }

}
