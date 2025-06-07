import { mapPosition, newMarker } from "./maps.js";

export class Socket {
  connection = null;
  _connected = false;
  connectionId = null;
  userPositions = [];

  constructor(socketUrl, coords, marker) {
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
          this.sendPosition(coords, marker);
        });
      })
      .catch((err) => console.log("SignalR Connection Error:", err));
  }

  sendPosition = (position, marker) => {
    marker?.setPosition(mapPosition(position));
    this.connection?.invoke("UserPosition", {
      user: this.connectionId,
      coordinates: position,
    });
  };

  listen = (map) => {
    this.connection?.on("updatedpositions", (data) => {
      console.log(data);
      if (data) {
        this.userPositions.forEach((pos) => pos?.setMap(null));
        Object.keys(data).forEach((key) => {
          if (key !== this.connectionId) {
            this.userPositions.push(
              newMarker(mapPosition(data[key].coordinates))
            );
          }
        });
      }
    });
  };
}
