import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowError]',
})
export class ShowErrorDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @Input() errorMsg!: string;

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.element.nativeElement,
      'title',
      this.errorMsg
    );
  }
}
