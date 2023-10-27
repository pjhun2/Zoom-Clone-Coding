const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log('Connected to Server  ')
})

socket.addEventListener("message", (message) => {
    console.log("Just Got This:", message)
})


socket.addEventListener("close", () => {
    console.log("DisConnected From Server")
})