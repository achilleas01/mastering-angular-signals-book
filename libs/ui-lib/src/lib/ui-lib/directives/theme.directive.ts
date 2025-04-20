import { Directive, input, OnInit } from '@angular/core';

@Directive({
  selector: '[libTheme]',
})
export class ThemeDirective implements OnInit {
  theme = input('synthwave');

  ngOnInit() {
    document.documentElement.setAttribute('data-theme', this.theme());
  }
}
