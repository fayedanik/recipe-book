import { Directive,ElementRef,HostBinding,HostListener,Input,OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor:string = '#7a7a97';
  @Input() hoverColor:string = '#686882';

  @HostBinding('style.backgroundColor') backgroundColor:string;

  constructor(private elref:ElementRef,private renderer:Renderer2) { }

  ngOnInit() {
    //this.renderer.setStyle(this.elref.nativeElement,'background-color','#7a7a97');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover() {
    //this.renderer.setStyle(this.elref.nativeElement,'background-color','#686882');
    this.backgroundColor = this.hoverColor;
  }

  @HostListener('mouseleave') mouseleave() {
    //this.renderer.setStyle(this.elref.nativeElement,'background-color','#7a7a97');
    this.backgroundColor = this.defaultColor;
  }

}
