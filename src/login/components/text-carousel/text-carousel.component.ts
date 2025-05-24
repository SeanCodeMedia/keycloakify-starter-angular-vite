/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable prettier/prettier */

import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
    selector: 'app-text-carousel',
    imports: [CommonModule],
    templateUrl: './text-carousel.component.html',
    styleUrl: './text-carousel.component.css'
})

export class TextCarouselComponent {

  private destroy$ = new Subject<void>();


  carouselTexts: string[] = [
    "Simplifying Property Management for Everyone",
    "Manage Rentals, Leases, and Tenants Effortlessly",
    "Streamlined Solutions for Landlords and Tenants"
  ];

  currentIndex: number = 0;
  currentText: string = this.carouselTexts[0];
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = this.startCarousel();
  }

  ngOnDestroy(): void {

    clearInterval(this.intervalId);
    this.intervalId = null;
    console.log("Carousel interval cleared on destroy.");

  }

  startCarousel(): any {
    //   return setInterval(() => {
    //   this.nextSlide();
    //   console.log("CALLED...")
    // }, 5000); // Change text every 3 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselTexts.length;
    this.currentText = this.carouselTexts[this.currentIndex];
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.currentText = this.carouselTexts[this.currentIndex];
    this.resetInterval(); // Reset timer when manually navigating
  }

  resetInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.startCarousel();
    }
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
