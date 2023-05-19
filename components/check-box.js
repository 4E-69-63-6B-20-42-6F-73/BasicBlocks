class CustomCheckbox extends BaseComponent {
    static get observedAttributes() {
      return ['checked', 'disabled'];
    }
  
    setup() {
      this.classList.add('check');
    }
  
    render() {
      const isChecked = this.hasAttribute('checked');
      const name = this.getAttribute('name') || '';
      const isDisabled = this.hasAttribute('disabled');
  
      this.innerHTML = `
        <label class="check-label ${isDisabled ? 'disabled' : ''}">
          <input name="${name}" class="check-input" type="checkbox" value=""
            ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}> 
          ${this.textContent}
        </label>
      `;
    }
  }
  
  customElements.define('check-box', CustomCheckbox);
  