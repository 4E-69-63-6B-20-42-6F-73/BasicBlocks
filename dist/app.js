class BaseComponent extends HTMLElement {
    constructor() {
      super();

      this.initialized = false;
    }
  
    connectedCallback() {
      this.baseSetup();
      this.baseRender();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.baseRender();
      }
    }
  
    baseSetup(){
        this.setup();
        this.initialized = true;
    }
    
    baseRender(){
        if(this.initialized)
        {
            this.render();
        }
    }

    setup() {
        // Implemented in child
    }
  
    render() {
        // Implemented in child
    }
  }
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
  
class CodeSnippet extends BaseComponent {
    connectedCallback() {
        super.connectedCallback();
        this.querySelector(".copy-button").addEventListener("click", this.copyToClipboard.bind(this));
    }

    disconnectedCallback() {
        this.querySelector(".copy-button").removeEventListener("click", this.copyToClipboard.bind(this));
    }

    setup() {
        this.code = this.normalizeIndentation(this.textContent);
        this.textContent = "";
    }

    render() {
        // render specific to CodeSnippet
        this.innerHTML = `
            <div class="code-container">
                <button class="copy-button">Copy</button>
                <pre id="code">${this.code}</pre>
            </div>
        `;
    }

    copyToClipboard() {
        navigator.clipboard.writeText(this.querySelector('#code').innerText);
    }

    normalizeIndentation(str) {
        const lines = str.split('\n');
        const firstNonEmptyLineIndex = lines.findIndex(line => line.trim() !== '');
    
        if (firstNonEmptyLineIndex !== -1) {
            const leadingWhitespaceLength = lines[firstNonEmptyLineIndex].search(/\S|$/);
            return lines.map(line => line.slice(leadingWhitespaceLength)).join('\n');
        }
        
        return str;
    }
    
}

customElements.define('code-snippet', CodeSnippet);

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

