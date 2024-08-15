import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input,
  OnInit,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective /*implements OnInit*/ {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.elRef.nativeElement.contains(event.target)
      ? console.log('clicked')
      : console.log('not clicked');
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}

  // @HostBinding('class.open') isOpen = false;

  // @HostListener('click') toggleOpen(){
  //     this.isOpen = !this.isOpen;
  // }

  /**
   * Below is my solution for toggling drop down menu. above is instructors solotion
   */
  // @Input() state:boolean;//true=open, false=closed
  // @HostBinding('class') hostClassAttr:string = 'btn-group';

  // @HostListener('click') openDropdown(eventData:Event){
  //     if(this.state){
  //         this.state=false
  //         //this.r2.setAttribute(this.elRef.nativeElement, 'class', 'btn-group') //open close dropdown using renderer2 and elementRef
  //         this.hostClassAttr = this.hostClassAttr.replace(' open', '') //open dropdown using HostBinding
  //     }
  //     else{
  //         this.state=true
  //         //this.r2.setAttribute(this.elRef.nativeElement, 'class', 'btn-group open') //close close dropdown using renderer2 and elementRef
  //         this.hostClassAttr += ' open' //close dropdown using HostBinding
  //     }
  // }
  // constructor(private elRef: ElementRef, private r2: Renderer2){}

  // ngOnInit(): void {
  //     this.state=false;//true=open, false=closed
  // }
}
