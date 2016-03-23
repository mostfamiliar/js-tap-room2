import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'keg-display',
  inputs: ['keg'],
  template: `
  <h3>{{ keg.brand }} | {{keg.name}}</h3>
  `
})

export class KegComponent {
  public keg: Keg;
}

@Component({
  selector: 'keg-list'
  inputs: ['kegList'],
  outputs: ['onKegSelect'],
  directives: [KegComponent],
  template: `
  <keg-display *ngFor="#currentKeg of kegList" (click)="kegClicked(currentKeg)" [class.selected]="currentKeg === selectedKeg" [keg]="currentKeg"></keg-display>
  `
})

export class KegListComponent {
  public kegList: Keg[];
  public onKegSelect: EventEmitter<Keg>;
  public selectedKeg: Keg;
  constructor() {
    this.onKegSelect = new EventEmitter();
  }
  kegClicked(clickedKeg: Keg): void {
    console.log('click', clickedKeg);
    this.selectedKeg = clickedKeg;
    this.onKegSelect.emit(clickedKeg);
  }
}

@Component({
  selector: 'my-app'
  directives: [KegListComponent],
  template: `
  <div class="container">
  <h1>Kegs</h1>
  <keg-list [kegList]="kegs" (onKegSelect)="kegWasSelected($event)"></keg-list>
  </div>
  `
})

export class AppComponent {
  public kegs: Keg[];
  constructor() {
    this.kegs = [
      new Keg('Russian River', 'Pliny the Elder', 150, 5.7, 0),
      new Keg('Buoy Beer Co', 'Helles Lager', 100, 4.5, 1),
      new Keg('Hop Valley', 'Double-D Blonde', 85, 5, 2),
      new Keg('Pfriem', 'Saison Farmhouse Ale', 95, 6.2, 3),
      new Keg('Breakside', 'Breakside Stout', 130, 6.7, 4)
    ];
  }

  kegWasSelected(clickedKeg: Keg): void {
    console.log('parent', clickedKeg);
  }
}

export class Keg {
  public tapped: boolean = false;
  constructor(public brand: string, public name: string, public kegPrice: number, public alcoholContent: number, public id: number) {
  }
}