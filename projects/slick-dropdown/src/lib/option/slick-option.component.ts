import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {SlickDropdownSelectedEvent} from '../interfaces';
import {BehaviorSubject} from 'rxjs';

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let uniqueIdCounter = 0;


@Component({
  selector: 'ngx-slick-option',
  templateUrl: './slick-option.component.html',
  styleUrls: ['./slick-option.component.scss'],
})
export class SlickOptionComponent implements AfterViewInit {
  private _selected = false;
  private _disabled = false;
  private _labelText = '';

  // tslint:disable-next-line:no-output-on-prefix
  @Output() readonly onSelectionChange = new EventEmitter<SlickDropdownSelectedEvent>();
  @ViewChild('option') private option: ElementRef;
  @HostBinding('tabindex') tabIndex = 0;
  @HostBinding('class') class = '';

  currentlySelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** Whether or not the option is currently selected. */
  get selected(): boolean {
    return this._selected;
  }

  /** The form value of the option. */
  @Input() value: any;

  /** The unique ID of the option. */
  @Input() id = `slick-option-${uniqueIdCounter++}`;

  /** Whether the option is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    if (`${value}` === 'true') {
      this._disabled = true;
      return;
    } else if (`${value}` === 'false') {
      this._disabled = false;
      return;
    }

    this._disabled = Boolean(value);
  }

  @HostListener('click') onClick(): void {
   this.select();
  }

  @HostListener('pointerdown') onPointerDown(): void {
    this.select();
  }

  constructor() {
    this.currentlySelected.subscribe(isSelected => {
      this.class = isSelected ? '' : 'hidden';
    });
  }


  ngAfterViewInit(): void {
    this._labelText = this.option.nativeElement.textContent;
  }

  get label(): string {
    return this._labelText;
  }

  /** Selects the option. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this.currentlySelected.next(false);
      this._emitSelectionChangeEvent();
    }
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(): void {
    this.onSelectionChange.emit({item: {value: this.value, title: this._labelText}, selected: this._selected});
  }
}
