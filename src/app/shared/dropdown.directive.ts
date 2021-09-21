import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor() { }

  @HostBinding('class.open') isopen = false;
  
  @HostListener('click') toggleopen() {
    this.isopen = !this.isopen;
  }
}
