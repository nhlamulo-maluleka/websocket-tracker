import { mapPosition } from "./maps.js";

export class Socket {
  connection = null;
  _connected = false;
  connectionId = null;

  constructor(socketUrl) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(socketUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Start the connection
    this.connection
      .start()
      .then(() => {
        this._connected = true;
        console.log("✅ Connected to SignalR");

        // Optionally send a message
        // connection.invoke("SendMessage", "Hello from JS!");
        this.connection.on("connection", (data) => {
          console.log(data);
          this.connectionId = data;
        });
      })
      .catch((err) => console.log("SignalR Connection Error:", err));
  }

  sendPosition = (position, marker) => {
    marker?.setPosition(mapPosition(position));
    if (this._connected && this.connection) {
      this.connection.invoke("UserPosition", {
        user: this.connectionId,
        coordinates: position,
      });
    }
  };

  listen = (map) => {
    if (this._connected && this.connection) {
      this.connection.on("UpdatedPositions", (data) => {
        console.log(data);
      });
    }
  };
}
