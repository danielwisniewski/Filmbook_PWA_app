import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTopBarElementContent]',
})
export class TopBarElementContentDirective implements OnInit {
  classes: string = 'container h-100 d-flex flex-column';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.classes.split(' ').forEach((className) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });
  }
}
