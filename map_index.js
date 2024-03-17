

window.addEventListener("DOMContentLoaded", function() {
  const map = L.map("map_div").setView([55.763094, 37.658364], 15); 

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      // crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  let coworkingIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/4635/4635015.png",
      iconSize: [50,50],
  });

  let marker = L.marker([55.767431, 37.663771],{icon: coworkingIcon}).addTo(map);
  marker.bindPopup("<h3> Корпус на басманной </h3>");

  
  let foodIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/3935/3935499.png",
      iconSize: [50,50],
  });

  let food = L.marker([55.75826133531635, 37.657119480345294],{icon: foodIcon}).addTo(map);
  food.bindPopup("<h3> Бургер-Кинг </h3>");

  
  let metroIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/50/50724.png",
      iconSize: [50,50],
  });

  let metro = L.marker([55.758586, 37.658799],{icon: metroIcon}).addTo(map);
  metro.bindPopup("<h3> м. Курская </h3>");

  console.log('map script ended up its work!');
});



