import {Component, EventEmitter, Host, Prop, Event, h} from '@stencil/core';

@Component({
  tag: 'input-field',
  styleUrl: 'input-field.scss',
  shadow: true,
})
export class InputField {
  private nativeInput?: HTMLInputElement;

  @Prop({mutable: true}) value: string = '';
  @Event() onInputEvent: EventEmitter<string>;

  private onKeyDown = (ev: KeyboardEvent) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    if(ev.key === 'Enter') {
      this.onBlur();
    }
  }

  private onBlur = () => {
    if(this.value && this.value !== '') {
      this.onInputEvent.emit(this.value);
    }
    this.value = '';

    /**
     * This is needed for clearOnEdit
     * Otherwise the value will not be cleared
     * if user is inside the input
     */
    if (this.nativeInput) {
      this.nativeInput.value = '';
    }
  }

  render() {
    return (
      <Host>
        <input
          ref={input => this.nativeInput = input}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}/>
      </Host>
    );
  }

}
