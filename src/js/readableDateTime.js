class ReadableDateTime {

    constructor(currentDateTime) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this._hours = ('0' + currentDateTime.getUTCHours()).slice(-2);
        this._minutes = ('0' + currentDateTime.getUTCMinutes()).slice(-2);
        this._day = currentDateTime.getUTCDay();
        this._month = monthNames[currentDateTime.getUTCMonth()];
        this._year = currentDateTime.getUTCFullYear();
    }

    get time() {
        return this._hours + ":" + this._minutes;
    }

    get date() {
        return this._day + ' ' + this._month + ' ' + this._year;
    }
}

const parseReadableDateTime = isoDate => {
    const currentDateTime = new Date(Date.parse(isoDate));
    return new ReadableDateTime(currentDateTime);
}

export {parseReadableDateTime}