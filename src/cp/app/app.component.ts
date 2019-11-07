import {Component, OnInit} from '@angular/core';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  animateProgressBar: boolean = true;

  constructor(private router: Router) {
  }


  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.animateProgressBar = true;
      }
      if (event instanceof RouteConfigLoadEnd) {
          this.animateProgressBar = false;
      }
    });
  }
}
