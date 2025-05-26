/* eslint-disable prettier/prettier */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable prettier/prettier */

import { CommonModule } from '@angular/common';
import { Component, HostListener, ChangeDetectorRef } from '@angular/core';
import { Subject , interval, Subscription} from 'rxjs';
@Component({
    selector: 'app-text-carousel',
    imports: [CommonModule],
    templateUrl: './text-carousel.component.html',
    styleUrl: './text-carousel.component.css'
})

export class TextCarouselComponent {

  private destroy$ = new Subject<void>();
  timerSub: Subscription | undefined;

  carouselTexts: string[] = [
    "Simplifying Property Management for Everyone",
    "Manage Rentals, Leases, and Tenants Effortlessly",
    "Streamlined Solutions for Landlords and Tenants"
  ];

  currentIndex: number = 0;
  currentText: string = this.carouselTexts[0];
  intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startCarousel();

  }

  ngOnDestroy(): void {

    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

  }

  startCarousel(): any {
    this.timerSub = interval(5000).subscribe(() => {
      this.nextSlide();
     });

  }

  nextSlide(): void {
    console.log("Next slide called");
    this.currentIndex = (this.currentIndex + 1) % this.carouselTexts.length;
    this.currentText = this.carouselTexts[this.currentIndex];
    this.cdr.detectChanges(); // Trigger change detection
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.currentText = this.carouselTexts[this.currentIndex];

  }

  resetInterval(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    this.startCarousel();
  }


  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event:any) {
    // ...
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event:any) {
    console.log("CLEAR TIMER...")
    console.log(this.intervalId)
    clearInterval(this.intervalId)
    this.intervalId = null;
    console.log(this.intervalId)
    location.reload();
  }


}
