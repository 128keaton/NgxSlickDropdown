import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import {SlickOptionComponent} from './option';
import {SlickDropdownSelectedEvent} from './interfaces';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'ngx-slick-dropdown',
  templateUrl: './slick-dropdown.component.html',
  styleUrls: ['./slick-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlickDropdownComponent implements AfterViewInit {

  @ViewChild('outerDiv') outerDiv: ElementRef<HTMLDivElement>;
  @ViewChild('innerDiv') innerDiv: ElementRef<HTMLDivElement>;
  @ContentChildren(SlickOptionComponent) entries: QueryList<SlickOptionComponent>;

  isOpen = false;
  ignoreFocus = false;

  @Input()
  placeholder = 'Placeholder...';

  @Input()
  ngModel: any | null;

  @Output()
  ngModelChange = new EventEmitter<any | null>();

  currentlySelected: SlickOptionComponent | null = null;

  showPlaceholder: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }


  ngAfterViewInit(): void {
    this.outerDiv.nativeElement.addEventListener('focusout', event => this.focusOut(event));
    this.outerDiv.nativeElement.addEventListener('focusin', event => this.focusIn(event));
    this.outerDiv.nativeElement.addEventListener('pointerdown', event => this.pointerDown(event));
    this.entries.forEach(elm => {
      elm.onSelectionChange.subscribe(ev => this.selectedItem(ev, elm));
    });

    if (!!this.ngModel) {
      const selected = this.entries.find(elm => elm.value === this.ngModel);
      if (!!selected) {

        this.currentlySelected = selected;
        setTimeout(() => {
          this.showPlaceholder.next(false);
          selected.currentlySelected.next(true);
        }, 0);
      }
    }

    this.close();
  }


  public clear(): void {
    this.entries.forEach(elm => elm.currentlySelected.next(false));
    this.currentlySelected = null;
    this.ngModelChange.emit(null);
    this.showPlaceholder.next(true);
  }

  private close(): void {

    // menu is now closed
    this.isOpen = false;

    // hide all elements that aren't this.selected
    this.entries.forEach(elm => elm.currentlySelected.next(elm.selected));
  }

  private open(): void {

    // menu is now open
    this.isOpen = true;

    this.showPlaceholder.next(false);

    // make all elements visible
    this.entries.forEach(elm => {
      elm.currentlySelected.next(true);
    });
  }

  private focusIn(_: any): void {
    // when one of the p elements inside gets focused, open the dropdown
    // unless this.ignoreFocus is true then do nothing
    if (!this.ignoreFocus) {
      this.open();
    }
  }


  private focusOut(_: any): void {

    // when one of the p elements inside loses focus, close the dropdown
    // unless this.ignoreFocus is true then do nothing
    if (!this.ignoreFocus) {
      this.close();
    }
  }

  private selectedItem(event: SlickDropdownSelectedEvent, selected: SlickOptionComponent): void {
    if (event.selected) {
      this.entries.filter(elm => elm !== selected).forEach(elm => elm.deselect());
      this.currentlySelected = selected;
      this.ngModelChange.emit(event.item.value);
    }
  }

  private pointerDown(_: any): void {
    // if the menu is closed open it or if it is open close it
    if (this.isOpen) {
      this.close();

      // need to ignore focus events while the menu is closing or it will re open
      this.ignoreFocusWhileClosing();
    } else {
      this.open();
    }
  }


  private ignoreFocusWhileClosing(): void {

    // set ignoreFocus to true and set it back to false after the time it takes
    // to close the dropdown
    this.ignoreFocus = true;
    setTimeout(() => this.ignoreFocus = false, 220);
  }
}
