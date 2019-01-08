import { Component, OnInit, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ObjselectorComponent),
  multi: true
};

@Component({
  selector: 'app-objselector',
  templateUrl: './objselector.component.html',
  styleUrls: ['./objselector.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})


export class ObjselectorComponent implements OnInit, ControlValueAccessor {

  @Input() options: Array<string>;
  @Input() selected: number;
  @Input() className: string;
  @Input() placeholder: string;
  @Input() isReadOnly = false;
  @Output() optSelect = new EventEmitter();
  isOpen = false;
  selectedOption;


  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  isSelectedValue: boolean;
  key: string;
  isFocused: boolean;


  types= [
        {
            "id": "1",
            "value": "Type 1"
        },
        {
             "id": "2",
             "value": "Type 2"
        },
        {
              "id": "3",
              "value": "Type 3"
        }] 
  /**
   *Creates an instance of ObjselectorComponent.
   * @memberof ObjselectorComponent
   */

  ngOnInit() {
    // Place default value in Objselector
    if (this.selected) {
      this.placeholder = '';
      this.isOpen = false;
    }
  }

  @HostListener('focus')
  focusHandler() {
    this.selected = 0;
    this.isFocused = true;
  }

  @HostListener('focusout')
  focusOutHandler() {
    this.isFocused = false;
  }

  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {

    if (this.isFocused) {
      this.key = event.code;
      switch (this.key) {
        case 'Space':
          this.isOpen = true;
          break;
        case 'ArrowDown':
          if (this.options.length - 1 > this.selected) {
            this.selected = this.selected + 1;
          }
          break;
        case 'ArrowUp':
          if (this.selected > 0) {
            this.selected = this.selected - 1;
          }
          break;
        case 'Enter':
          if (this.selected > 0) {
            this.isSelectedValue = true;
            this.isOpen = false;
            this.onChangeCallback(this.selected);
            this.optSelect.emit(this.options[this.selected]);
          }
          break;
      }
    }

  }

  /**
  * option selection
  * @param {string} selectedOption - text
  * @param {number} idx - current index of item
  * @param {any} event - object
  */
  optionSelect(selectedOption: string, idx, e: any) {
    e.stopPropagation();
    this.selected = idx;
    this.isSelectedValue = true;
    // this.placeholder = '';
    this.isOpen = false;
    this.onChangeCallback(this.selected);
    this.optSelect.emit(selectedOption);
  }

  /**
  * toggle the Objselector
  * @param {any} event object
  */
  toggle(e: any) {
    e.stopPropagation();
    // close all previously opened Objselectors, before open
    const allElems = document.querySelectorAll('.objselector-wrapper');
    for (let i = 0; i < allElems.length; i++) {
      allElems[i].classList.remove('is-open');
    }
    this.isOpen = !this.isOpen;
    if (this.selected >= 0) {
      document.querySelector('#li' + this.selected).scrollIntoView(true);
    }
  }

  /**
  * Objselector click on outside
  */
  @HostListener('document: click', ['$event'])
  onClick() {
    this.isOpen = false;
  }

  /**
   * Method implemented from ControlValueAccessor and set default selected value
   * @param {*} obj
   * @memberof ObjselectorComponent
   */
  writeValue(obj: any): void {
    if (obj && obj !== '') {
      this.isSelectedValue = true;
      this.selected = obj;
    } else {
      this.isSelectedValue = false;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

}