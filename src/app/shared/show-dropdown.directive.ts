import {
  Directive,
  HostListener,
  ElementRef,
  HostBinding,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appShowDropdown]',
})
export class ShowDropdownDirective /*implements OnInit*/ {
  // @HostBinding('class.open') isOpen = false;
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   if (this.elRef.nativeElement.contains(event.target)) {
  //     console.log('clicked event: ');
  //     console.log(this.elRef.nativeElement.children.namedItem('dropdown'));
  //   }
  //   this.isOpen = this.elRef.nativeElement.contains(event.target)
  //     ? !this.isOpen
  //     : false;
  // }

  state = false;
  @HostListener('document:click', ['$event']) toggleDropdown(eventData: Event) {
    if (this.state) {
      this.state = false;
      this.r2.removeClass(
        this.elRef.nativeElement.children.namedItem('dropdown'),
        'show'
      );
    } else {
      if (this.elRef.nativeElement.contains(eventData.target)) {
        this.state = true;
        this.r2.addClass(
          this.elRef.nativeElement.children.namedItem('dropdown'),
          'show'
        );
      }
      //this.r2.setAttribute(this.elRef.nativeElement, 'class', 'btn-group open') //close close dropdown using renderer2 and elementRef
      //this.hostClassAttr += ' open' //close dropdown using HostBinding
    }
  }
  constructor(private elRef: ElementRef, private r2: Renderer2) {}
}
