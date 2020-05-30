class penguin {
    constructor(socket){
        this.socket = socket
  }

  disconnect() {
      this.socket.destroy()
  }

  send_xml(data) {
      if(this.socket)  {
          this.socket.write(data + '\0')
      }
  }

  send_xt() {

  }

  send_error(error) {
    this.socket.write('%xt%e%-1%' + error + '%' + '\0');
  }
}

module.exports = penguin