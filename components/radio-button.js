class RadioButton extends BaseComponent {
    static get observedAttributes() {
      return ['checked', 'disabled'];
    }
  
    setup() {
      this.classList.add('radio');
    }
  
    render() {
      const isChecked = this.hasAttribute('checked');
      const name = this.getAttribute('name');
      const isDisabled = this.hasAttribute('disabled');
      
      if (!name) {
        throw new Error('Attribute name is required!');
      }

      this.innerHTML = `
        <label class="radio-label ${isDisabled ? 'disabled' : ''}">
          <input name="${name}" class="radio-input" type="radio" value=""
            ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}> 
          ${this.textContent}
        </label>
      `;
    }
  }
  
  customElements.define('radio-button', RadioButton);
  