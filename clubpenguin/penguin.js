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

  send_xt(...args) {
    let packet = args.join('%')
    this.socket.write('%xt%' + packet + '%' + '\0')
  }

  send_error(error) {
    this.socket.write('%xt%e%-1%' + error + '%' + '\0')
  }

  playerString(result) {
    let playerArray = [ 
    this.id = result.ID,
    this.username = result.Username,
    45,
    this.color = result.Color,
    this.head = result.Head,
    this.face = result.Face,
    this.neck = result.Neck,
    this.body = result.Body,
    this.hand = result.Hand,
    this.feet = result.Feet,
    this.flag = result.Flag,
    this.photo = result.photo,
    this.x = 0,
    this.y = 0,
    this.frame = 1,
    1
    // this.rank = rank
    ]
    return playerArray.join('|')
  }
}

module.exports = penguin