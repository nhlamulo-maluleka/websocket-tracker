import { initMap } from "./maps.js";
import { Socket } from "./socket.js";

let webSocket = null;

if (!navigator.geolocation) {
  alert("Geolocation is not supported by this browser.");
} else {
  navigator.geolocation.watchPosition(
    ({ coords }) => {
      console.log(coords);
      const [map, marker] = initMap(coords);

      if (!webSocket) {
        webSocket = new Socket(window.ENV?.SOCKER_SERVER_URL, coords, marker);
      }
      webSocket?.sendPosition(coords, marker);
      webSocket?.listen(map);
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
