import { Directive, Renderer2, ElementRef, Input, OnInit, OnChanges } from '@angular/core';

const currentDay: Date = new Date();
const TIME_FRAME: number = 14 * 86400000;

@Directive({
  selector: '[appBorderHighlighter]'
})


export class BorderHighlightDirective implements OnChanges {
  @Input() appBorderHighlighter: Date;

  private date: Date;
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  private borderHighlighterByDate() {
    const today: number =  currentDay.getTime();
    const creationDate: number =  new Date(this.date).getTime();
    const timeDiff: number = today - TIME_FRAME;

    if (creationDate < today && creationDate >= timeDiff) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid green');
    } else if (creationDate > today) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid blue');
    }
  }

  ngOnChanges() {
    this.date = this.appBorderHighlighter;
    this.borderHighlighterByDate();
  }
}
