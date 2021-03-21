import {css, html, LitElement} from "lit-element";
import {readInfo} from "./infoClient";

class InfoPanel extends LitElement {

    static get properties() {
        return {
            version: {type: String},
            browserSize: {type: String},
        };
    }

    constructor() {
        super();

        this.version = 'Waiting for update...'

        this._isLarge = window.matchMedia('(min-width: 1200px)');
        this._isMedium = window.matchMedia('(min-width: 990px)');
        this._isSmall = window.matchMedia('(min-width: 768px)');
        this._isTiny = window.matchMedia('(min-width: 560px)');

        window.addEventListener('load', () => this.browserSize = this._getBrowserSize());
        window.addEventListener('resize', () => this.browserSize = this._getBrowserSize());
    }

    connectedCallback() {
        super.connectedCallback();

        setTimeout(() => {
            this.updateComponent()
        }, 1000)
    }

    async updateComponent() {
        let info = await readInfo()
        this.version = info.version
    }

    _getBrowserSize() {
        if (this._isLarge.matches) {
            return 'large'
        } else if (this._isMedium.matches) {
            return 'medium'
        } else if (this._isSmall.matches) {
            return 'small'
        } else if (this._isTiny.matches) {
            return 'tiny'
        } else {
            return 'xtiny'
        }
    }

    render() {
        return html`
            <div class="info-panel ${this.browserSize}">
                <div class="header">

                </div>
                <div class="attributes">
                    <div class="attribute">
                        <div class="icon">ICON</div>
                        <div class="value">${this.version}</div>
                    </div>
                    <div class="attribute">
                        <div class="icon">ICON</div>
                        <div class="value">${this.browserSize}</div>
                    </div>
                </div>
            </div>`;
    }

    static get styles() {
        return css`
            :host .info-panel {
                width: 100%;
                margin-right: auto;
                margin-left: auto;
                box-shadow: 0 6px 30px 0 rgb(0 0 0 / 12%);
            }
            :host .header {
                background: linear-gradient(to right,#2775ff,#7202bb);
                padding: 24px 40px;
                color: rgba(255,255,255,.9);
            }
            :host .attribute {
                color: #4e4e4e;
                font-size: 14px;
                border-bottom: 1px solid #ececec;
                position: relative;
                padding: 28px;
            }
            :host .info-panel.large {
                max-width: 1140px;
            }
            :host .info-panel.medium {
                max-width: 960px;
            }
            :host .info-panel.small {
                max-width: 720px;
            }
            :host .info-panel.tiny {
                max-width: 540px;
            }
            :host .info-panel.xtiny {
                max-width: 300px;
            }
        `
    }
}

customElements.define('info-panel', InfoPanel)