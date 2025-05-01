const url = import.meta.env.VITE_SOCKET_URL

export class Socket {
    socket = null
    constructor() {
        this.is_alive = true
        this.socket = new WebSocket(`${url}`)
        this.socket.onopen = () => {
            console.log('Connected to WebSocket')
            this.socket.send(JSON.stringify({ message: 'Hello from frontend!' }));
        }
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    disconnectWebSocket = () => {
        if (this.socket) {
            this.socket.close();
            this.is_alive = false;
        }
    }

    sendMessage = (message) => {
        if (this.socket) {
            this.socket.send(JSON.stringify({ message: {message} }))
        }
    }
}
    
const socketInstance = new Socket() ;
export default socketInstance ;