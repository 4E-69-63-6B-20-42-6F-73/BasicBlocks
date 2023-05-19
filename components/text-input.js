class TextInput extends BaseComponent {
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
        <input class="${classes.join(' ')}" name="${name}" value="${value}" />
      </div>
    `;
  }
}

customElements.define('text-input', TextInput);
