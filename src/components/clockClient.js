const readClock = async () => {
    const response = await fetch('http://worldclockapi.com/api/json/cet/now')

    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        throw new Error(response.statusText)
    }

    const json = await response.json()

    return {
        currentDateTime: json.currentDateTime,
        dayOfTheWeek: json.dayOfTheWeek,
    }
}

export {readClock}