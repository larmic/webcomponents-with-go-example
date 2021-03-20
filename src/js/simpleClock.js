import {parseReadableDateTime} from "./readableDateTime.js";
import {readClock} from "./clockClient.js";

const template = document.createElement('template');
template.innerHTML = `
<div class="clock">
    <div class="time">Waiting for update...</div>
    <div class="date"></div>
</div>

<style>
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
</style>
`

class SimpleClock extends HTMLElement {

    static get observedAttributes() {
        return ['current-date-time', 'day-of-the-week'];
    }

    constructor() {
        super();

        // attach Shadow DOM to the parent element.
        // save the shadowRoot in a property because, if you create your shadow DOM in closed mode,
        // you have no access from outside
        this._shadowRoot = this.attachShadow({mode: 'closed'});
        // clone template content nodes to the shadow DOM
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // start after a few seconds -> show webcomponents default text
        setTimeout(() => {
            this.updateClockComponent();
        }, 1000);

        // worldclockapi.com is to the minute, so update clock all 60 seconds
        setInterval(() => {
            this.updateClockComponent();
        }, 60000);
    }

    async updateClockComponent() {
        let clock = await readClock()
        const readableDateTime = parseReadableDateTime(clock.currentDateTime)
        this._time = readableDateTime.time;
        this._date = readableDateTime.date;
        this._dayOfTheWeek = clock.dayOfTheWeek
        this._render();
    }

    _render() {
        this._shadowRoot.querySelector('.time').innerHTML = this._time;
        this._shadowRoot.querySelector('.date').innerHTML = this._dayOfTheWeek + ', ' + this._date + '(CET)';
    }
}

customElements.define('simple-clock', SimpleClock);