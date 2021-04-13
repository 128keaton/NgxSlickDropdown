import {
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild, ElementRef
} from '@angular/core';
import {SlickDropdownSelectedEvent} from '../interfaces';

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let uniqueIdCounter = 0;


@Component({
  selector: 'ngx-slick-option',
  templateUrl: './slick-option.component.html',
  styleUrls: ['./slick-option.component.scss']
})
export class SlickOptionComponent implements AfterViewInit {
  private _selected = false;
  private _active = false;
  private _disabled = false;
  private _labelText: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() readonly onSelectionChange = new EventEmitter<SlickDropdownSelectedEvent>();
  @ViewChild('option') private option: ElementRef;

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
  set disabled(value: any) {
    if (value === 'true') {
      this._disabled = true;
      return;
    } else if (value === 'false') {
      this._disabled = false;
      return;
    }

    this._disabled = Boolean(value);
  }


  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._labelText = this.option.nativeElement.textContent;
  }

  /**
   * Whether or not the option is currently active and ready to be selected.
   * An active option displays styles as if it is focused, but the
   * focus is actually retained somewhere else. This comes in handy
   * for components like autocomplete where focus must remain on the input.
   */
  get active(): boolean {
    return this._active;
  }

  get label(): string {
    return this._labelText;
  }

  /** Selects the option. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }


  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(): void {
    this.onSelectionChange.emit({item: {value: this.value, title: this._labelText}});
  }
}
