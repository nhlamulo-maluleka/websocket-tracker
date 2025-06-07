import { mapPosition } from "./maps.js";

export class Socket {
  ws;
  _connected = false;

  constructor(wsocket) {
    this.ws = wsocket;

    if (this.ws) {
      this.ws.onopen = (socket) => {
        console.log(socket);
        this._connected = true;
      };
    }
  }

  sendPosition = (position, marker) => {
    if (this._connected && this.ws) {
      marker?.setPosition(mapPosition(position));
      this.ws.send(position);
    }
  };

  listen = (map) => {
    if (this._connected && this.ws) {
      this.ws.onmessage = (data) => {
        console.log("Received: ", data);
      };
    }
  };
}
