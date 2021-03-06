import { Component } from '@angular/core';

import Perfume from 'perfume.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logCustom: string;
  logFibonacci: string;
  perfume: any;

  constructor() {
  	const perfume = new Perfume();
    perfume.googleAnalytics.enable = true;
    perfume.googleAnalytics.timingVar = "userId";
    this.perfume = perfume;
    this.perfume.firstPaint();
  }

  fibonacci(num, memo = {}) {
    if (memo[num]) {
      return memo[num];
    }
    if (num <= 1) {
      return 1;
    }
    return memo[num] = this.fibonacci(num - 1, memo) + this.fibonacci(num - 2, memo);
  }

  measureFibonacci() {
    this.perfume.start('fibonacci');
    this.fibonacci(400);
    const duration = this.perfume.end('fibonacci', true);
    this.logFibonacci = `⚡️ Perfume.js: fibonacci ${duration.toFixed(2)} ms`;
  }

  customLogging() {
    this.perfume.start('fibonacci');
    this.fibonacci(400);
    const duration = this.perfume.end('fibonacci');
    this.perfume.log('Custom logging', duration);
    this.logCustom = `⚡️ Perfume.js: Custom logging ${duration.toFixed(2)} ms`;
  }
}
