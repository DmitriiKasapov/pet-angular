import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.html',
})
export class AppFooterComponent {
  readonly year = new Date().getFullYear();
}
