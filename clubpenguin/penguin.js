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
    const args = Array.prototype.join.call(arguments, '%')
    this.socket.write('%xt%' + args + '%' + '\0');
  }

  send_error(error) {
    this.socket.write('%xt%e%-1%' + error + '%' + '\0');
  }
}

module.exports = penguin