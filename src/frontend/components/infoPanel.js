import {css, html, LitElement} from "lit-element";
import {readInfo} from "./infoClient";
import './attribute'

class InfoPanel extends LitElement {

    static get properties() {
        return {
            name: {type: String},
            version: {type: String},
            author: {type: String},
            repository: {type: String},
            goVersion: {type: String},
            parcelVersion: {type: String},
            litElementVersion: {type: String},
            browserSize: {type: String},
        };
    }

    constructor() {
        super();

        this.name = 'Loading...'

        this._isLarge = window.matchMedia('(min-width: 1200px)');
        this._isMedium = window.matchMedia('(min-width: 990px)');
        this._isSmall = window.matchMedia('(min-width: 768px)');
        this._isTiny = window.matchMedia('(min-width: 560px)');

        window.addEventListener('load', () => this.browserSize = this._getBrowserSize());
        window.addEventListener('resize', () => this.browserSize = this._getBrowserSize());

        this.updateComponent()
    }

    async updateComponent() {
        let info = await readInfo()
        this.name = info.name
        this.version = info.version
        this.author = info.author
        this.repository = info.repository
        this.goVersion = info.technologies.go
        this.parcelVersion = info.technologies.parcel
        this.litElementVersion = info.technologies.litElement

        let attributes = this.shadowRoot.getElementById('attributes')

        for (let childNumber = 0; childNumber < attributes.children.length; childNumber++) {
            const isSecondIteration = (childNumber + 1) % 2 === 0;

            if (isSecondIteration) {
                let child = attributes.children.item(childNumber);
                child.setAttribute("straightElement", "true")
            }
        }
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
                    ${this.name}
                </div>
                <div id="attributes">
                    <attribute-line key="version" value="${this.version}"></attribute-line>
                    <attribute-line key="author" value="${this.author}"></attribute-line>
                    <attribute-line key="repository" value="${this.repository}"></attribute-line>
                    <attribute-line key="go" value="${this.goVersion}"></attribute-line>
                    <attribute-line key="parcel" value="${this.parcelVersion}"></attribute-line>
                    <attribute-line key="lit element" value="${this.litElementVersion}"></attribute-line>
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