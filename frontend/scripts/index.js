import { initMap } from "./maps.js";
import { Socket } from "./socket.js";

const webSocket = new Socket(new WebSocket(window.ENV?.SOCKER_SERVER_URL));

if (!navigator.geolocation) {
  alert("Geolocation is not supported by this browser.");
} else {
  navigator.geolocation.watchPosition(
    ({ coords }) => {
      console.log(coords);
      const [map, marker] = initMap(coords);
      webSocket.sendPosition(coords, marker);
      webSocket.listen(map);
    },
    (error) => {
      console.error("Geolocation Error", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000,
    }
  );
}
