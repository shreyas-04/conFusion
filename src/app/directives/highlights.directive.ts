import { Directive, ElementRef, Renderer2 , HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlights]'
})
export class HighlightsDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener ('mouseenter') onmouseenter() {
    this.renderer.addClass(this.el.nativeElement, 'highlight');
  }

  @HostListener ('mouseleave') onmouseleave() {
    this.renderer.removeClass(this.el.nativeElement, 'highlight');
  }
}
