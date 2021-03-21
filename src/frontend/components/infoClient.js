const readInfo = async () => {
    const response = await fetch('/info')

    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        throw new Error(response.statusText)
    }

    const json = await response.json()

    return {
        version: json.version,
        name: json.name,
        author: json.author,
        versions: {
            go: json.technologies.go_version,
            parcel: json.technologies.parcel_version,
            litElement: json.technologies.lit_element_version,
        },
    }
}

export {readInfo}