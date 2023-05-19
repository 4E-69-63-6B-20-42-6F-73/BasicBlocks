class PrimaryButton extends BaseComponent {
  static get observedAttributes() {
    return ['outline', 'type', 'disabled'];
  }

  render() {
    const outline = this.hasAttribute('outline');
    const type = (this.getAttribute('type')?.toLowerCase()) || 'default';
    const disabled = this.hasAttribute('disabled');

    const validTypes = ['default', 'success', 'warning', 'danger'];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type attribute: ${type}`);
    }

    this.innerHTML = `
      <button class="primary-button ${type} ${outline ? 'outline' : ''} ${disabled ? 'disabled' : ''}"
        ${disabled ? 'disabled' : ''}>
        ${this.textContent}
      </button>
    `;
  }
}

customElements.define('primary-button', PrimaryButton);
