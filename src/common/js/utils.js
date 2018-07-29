export function ajax (method, path, data, callback) {
    let r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
            // console.log(r.responseText)
            callback(r.responseText)
        }
    }
    if (data !== null) {
        let sentData = JSON.stringify(data)
        // console.log(sentData)
        r.send(sentData)
    } else {
        r.send()
    }
}
