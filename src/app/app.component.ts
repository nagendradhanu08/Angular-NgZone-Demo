import { Component, OnInit, NgZone, DoCheck, ChangeDetectionStrategy} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {
  public count: number;
  public counter: number;
  myData = [];
  constructor(private zone: NgZone) {
    this.count = 0;
    this.counter = 0;

  }

  ngOnInit() {
    this.useCaseWithSetTimeout();
    // this.useCaseWithSetInterval();
  }

  private useCaseWithSetTimeout() {

    /** Here using setTimeout to make it behave as async change detection will occur */
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        this.count++;
      });
    }

    /** Now we'll be using NgZone to make it run outside angular and once our execution is completed we
     * will use run method to update the view
     */

    // this.zone.runOutsideAngular(() => {
    //   for (let i = 0; i < 100; i++) {
    //     // setTimeout(() => {
    //       this.count++;
    //     // });
    //   }
    //   this.zone.run(() => {
    //     // setTimeout(() => {
    //       this.count = this.count;
    //     // }, 1000);
    //   });
    // });
  }

  private useCaseWithSetInterval() {
    /** Here change detection will occur */
    // setInterval(() => {
    //   console.log('Inside set interval');
    //   this.counter++;
    // }, 1000);

    /** As we are using NgZone here change detection will not occur */
    this.zone.runOutsideAngular(() => {
      const refreshData = setInterval(() => {
        for (let i = 0; i < 10; i++) {
          this.counter++;
          console.log('counter', this.counter);
          if (i === 9) {
            clearInterval(refreshData);
            this.zone.run(() => {
              this.counter = this.counter;
            });
          }
        }
      }, 1000);
    });
  }

  /** Called during every change detection run, immediately after ngOnChanges() and ngOnInit().  */
  ngDoCheck() {
    console.log('Change detection has been run');
  }

  public buttonClick(e) {
    // e.preventDefault();
    this.count = 7;
    console.log('Button Clicked');
  }


  getData() {
    //   this.zone.runOutsideAngular(() => {
    //     this.http.get('resource1').subscribe((data1:any) => {
    //       // First response came back, so its data can be used in consecutive request
    //       this.http.get(`resource2?id=${data1['id']}`).subscribe((data2:any) => {
    //         this.http.get(`resource3?id1=${data1['id']}&id2=${data2}`).subscribe((data3:any) => {
    //           this.zone.run(() => {
    //             this.data = [data1, data2, data3];
    //           });
    //         });
    //       });
    //     });
    //   });
  }
}
