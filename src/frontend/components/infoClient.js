const readInfo = async () => {
    const response = await fetch(getInfoUrl())

    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        throw new Error(response.statusText)
    }

    const json = await response.json()

    return {
        version: json.version,
        name: json.name,
        author: json.author,
        repository: json.repository.url,
        stage: json.stage,
        technologies: {
            go: json.technologies.go_version,
            parcel: json.technologies.parcel_version,
            litElement: json.technologies.lit_element_version,
        },
    }
}

const getInfoUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2))
        return contextPath + '/info'
    } else {
        return "http://localhost:8080/info"
    }
}

export {readInfo}