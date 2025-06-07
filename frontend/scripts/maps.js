const [{ Map }, { Marker }, { LatLng }] = await Promise.all([
  google.maps.importLibrary("maps"),
  google.maps.importLibrary("marker"),
  google.maps.importLibrary("core"),
]);

let map = null;
let myMarker = null;

const initMap = ({ latitude, longitude }) => {
  if (!map) {
    map = new Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 17,
    });

    myMarker = new Marker({
      map: map,
      position: { lat: latitude, lng: longitude },
    });
  }
  map.panTo(mapPosition({ latitude, longitude }));
  return [map, myMarker];
};

const newMarker = (position) => {
  return new Marker({
    map: map,
    position: position,
  });
};

const mapPosition = ({ latitude, longitude }) => {
  return new LatLng(latitude, longitude);
};

export { initMap, newMarker, mapPosition };
