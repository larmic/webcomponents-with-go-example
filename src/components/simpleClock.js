import { LitElement, html, css } from "lit-element";
import {parseReadableDateTime} from "./readableDateTime.js"
import {readClock} from "./clockClient.js"

class SimpleClock extends LitElement {

    static get properties(){
        return {
            time: {type: String},
            date: {type: String}
        };
    }

    constructor() {
        super();

        this.time = 'Waiting for update...'
        this.date = ''
    }

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
        this.time = readableDateTime.time
        this.date = clock.dayOfTheWeek + ', ' + readableDateTime.date + '(CET)'
    }

    render() {
        return html`<div class="clock">
            <div class="time">${this.time}</div>
            <div class="date">${this.date}</div>
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
}

customElements.define('simple-clock', SimpleClock)