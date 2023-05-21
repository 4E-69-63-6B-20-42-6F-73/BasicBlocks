class TextInput extends BaseComponent {
  setup(){
    this._type= "text"
  }

  static get observedAttributes() {
    return ['valid', 'invalid', 'label'];
  }

  render() {
    const valid = this.hasAttribute('valid');
    const invalid = this.hasAttribute('invalid');
    const name = this.getAttribute('name');
    const value = this.getAttribute('value') || '';
    const label = this.getAttribute('label') || '';

    if (!name) {
      throw new Error('Attribute name is required!');
    }

    const classes = ['text-input'];

    if (valid) {
      classes.push('valid-input');
    }

    if (invalid) {
      classes.push('invalid-input');
    }

    this.innerHTML = `
      <div class="text-input-wrapper">
        <label class="label-text">${label}</label>
        <input class="${classes.join(' ')}" type="${this._type}" name="${name}" value="${value}" />
      </div>
    `;
  }
}

customElements.define('text-input', TextInput);

class PasswordInput extends TextInput {
  setup() {
    super.setup();

    this._type='password';
  }
}

customElements.define('password-input', PasswordInput);

class EmailInput extends TextInput {
  setup() {
    super.setup();

    this._type='email';
  }
}

customElements.define('email-input', EmailInput);

