import { Component } from '@angular/core';
import {SlickDropdownItem} from '../../projects/slick-dropdown/src/lib/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgxSlickDropdown';
  selectedOne = 'exponential';
  selectedTwo = null;
  items: SlickDropdownItem[] = [
    {
      title: 'linear fit',
      value: 'linear fit'
    },
    {
      title: 'polynomial fit',
      value: 'polynomial fit'
    },
    {
      title: 'power law',
      value: 'power law'
    },
    {
      title: 'bell curve',
      value: 'bell curve'
    },
    {
      title: 'exponential',
      value: 'exponential'
    },
    {
      title: 'fourier series',
      value: 'fourier series'
    }
  ];
}
