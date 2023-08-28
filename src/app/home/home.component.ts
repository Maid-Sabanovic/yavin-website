import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Storing the reference to the scroll event listener function
  scrollEventListener: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.userScroll();
    this.incrementStats();

    // Attach event listener for scrollToTop
    const toTopBtn = this.el.nativeElement.querySelector('#to-top');
    toTopBtn.addEventListener('click', this.scrollToTop);
  }

  ngOnDestroy() {
    // Remove event listener when component is destroyed
    window.removeEventListener('scroll', this.scrollEventListener);
  }

  userScroll() {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    const toTopBtn = this.el.nativeElement.querySelector('#to-top');

    this.scrollEventListener = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-sticky');
        toTopBtn.classList.add('show');
      } else {
        navbar.classList.remove('navbar-sticky');
        toTopBtn.classList.remove('show');
      }
    };

    window.addEventListener('scroll', this.scrollEventListener);
  }

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  incrementStats() {
    const counters = this.el.nativeElement.querySelectorAll('.counter');

    counters.forEach((counter: any) => {
      counter.innerText = 0;

      const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;

        const increment = target / 200;

        if (c < target) {
          counter.innerText = Math.ceil(c + increment);
          setTimeout(updateCounter, 1);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
    });
  }
}
