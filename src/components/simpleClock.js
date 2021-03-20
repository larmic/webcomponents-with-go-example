import { LitElement, html, css } from "lit-element";
import {parseReadableDateTime} from "./readableDateTime.js"
import {readClock} from "./clockClient.js"

class SimpleClock extends LitElement {

    connectedCallback() {
        super.connectedCallback();

        // start after a few seconds -> show webcomponents default text
        setTimeout(() => {
            this.updateClockComponent()
        }, 1000)

        // worldclockapi.com is to the minute, so update clock all 60 seconds
        setInterval(() => {
            this.updateClockComponent()
        }, 60000)
    }

    async updateClockComponent() {
        let clock = await readClock()
        const readableDateTime = parseReadableDateTime(clock.currentDateTime)
        this._time = readableDateTime.time
        this._date = readableDateTime.date
        this._dayOfTheWeek = clock.dayOfTheWeek
        this._render()
    }

    render() {
        return html`<div class="clock">
            <div class="time">Waiting for update...</div>
            <div class="date"></div>
        </div>`;
    }

    static get styles() {
        return css`
            :host .clock {
                border: 2px solid lightgray;
                border-radius: 8px;
                background-color: #FFFFFF;
                margin: auto;
                width: 300px;
                padding: 10px;
            }
            :host .time {
                font-size: 32px;   
            }
            :host .date {
                color: rgb(135,135,135);
                font-size: 16px;   
            }
        `
    }

    _render() {
        this.shadowRoot.querySelector('.time').innerHTML = this._time
        this.shadowRoot.querySelector('.date').innerHTML = this._dayOfTheWeek + ', ' + this._date + '(CET)'
    }
}

customElements.define('simple-clock', SimpleClock)