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