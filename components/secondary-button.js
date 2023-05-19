class SecondaryButton extends BaseComponent {
  static get observedAttributes() {
    return ['type', 'disabled'];
  }


  render() {
    const type = (this.getAttribute('type') || 'default').toLowerCase();
    const disabled = this.hasAttribute('disabled');

    const validTypes = ['default', 'success', 'warning', 'danger'];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type attribute: ${type}`);
    }

    this.innerHTML = `
      <button class="secondary-button ${type} ${disabled ? 'disabled' : ''}"
        ${disabled ? 'disabled' : ''}>
        ${this.textContent}
      </button>
    `;
  }
}

customElements.define('secondary-button', SecondaryButton);
