import {css, html, LitElement} from "lit-element";

class AttributeLine extends LitElement {

    static get properties() {
        return {
            key: {type: String},
            value: {type: String},
            straightElement: {type: Boolean},
        };
    }

    constructor() {
        super();

        this.straightElement = false
    }

    render() {
        const gray = this.straightElement ? 'gray' : ''
        return html`
            <div class="attribute ${gray}">
                <div class="key">${this.key}</div>
                <div class="value">${this.value}</div>
            </div>`;
    }

    static get styles() {
        return css`
            :host .attribute {
                color: #4e4e4e;
                font-size: 14px;
                border-bottom: 1px solid #ececec;
                position: relative;
                padding: 28px;
                display: flex;
            }
            :host .attribute.gray {
                background-color: #f6f6f6;
            }
            :host .key {
                min-width: 10%;
            }
            :host .value {
                flex-grow: 1;
            }
        `
    }
}

customElements.define('attribute-line', AttributeLine)