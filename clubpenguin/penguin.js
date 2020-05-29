class penguin {
    constructor(socket){
        this.socket = socket
  }

  disconnect() {
      this.socket.destroy()
  }

  send_xml() {

  }

  send_xt() {
      
  }
}

module.exports = penguin