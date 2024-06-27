import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleMode() {
    this.registerMode = !this.registerMode;
  }
}
