let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 25.5941, lng: 85.1376 },
    zoom: 8,
  });

  
}

initMap();