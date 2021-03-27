import {css, html, LitElement} from "lit-element";

import '@polymer/paper-spinner/paper-spinner.js'

class WaitingSpinner extends LitElement {

    render() {
        return html`
           <div class="spinner-container">
               <div>Waiting spinner demo</div>
               <paper-spinner class="spinner" active></paper-spinner>
           </div>`;
    }

    static get styles() {
        return css`
            :host .spinner {
                --paper-spinner-stroke-width: 10px;
                height: 70px;
                width: 70px;
            }
            :host .spinner-container {
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
        `
    }
}

customElements.define('waiting-spinner', WaitingSpinner)