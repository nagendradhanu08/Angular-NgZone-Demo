import {
    Directive, OnInit, Input, Output, EventEmitter, NgZone, ElementRef
} from '@angular/core';

@Directive({
    selector: '[myDirective]'
})
export class EventHandlerDirective implements OnInit {

    // @Input() event: string = 'click';
    @Input() event: string;
    private nativeElement;

    @Output() eventHandler = new EventEmitter();
    // tslint:disable-next-line: ban-types
    private handler: Function;
    constructor(private zone: NgZone, private el: ElementRef) { }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.nativeElement = this.el.nativeElement;
            this.handler = $event => {
                this.eventHandler.emit($event);
            };


            this.nativeElement.addEventListener(this.event, this.handler);
        });
    }

    ngOnDestory() {
        this.el.nativeElement.removeEventListener(this.event, this.handler);
    }
}
