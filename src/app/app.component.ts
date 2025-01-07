import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./components/layout/layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent],
  template: `
    <layout><router-outlet></router-outlet></layout>
  `,
  styles: [],
})
export class AppComponent {
  title = 'talks.corneresc';
}
