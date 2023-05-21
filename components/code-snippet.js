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
