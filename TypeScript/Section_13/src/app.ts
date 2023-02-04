import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCcDCxN58oKUjDK9V1KTuidXxNSBzOieLI";

declare var google: any;

type GeocodingResponce = {
  //型のエイリアス
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  //   Google APIに送信

  axios
    .get<GeocodingResponce>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=
    ${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("座標を取得できませんでした。");
      }
      const Latitude = res.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: Latitude,
        zoom: 16,
      });
      new google.maps.Marker({ position: Latitude, map: map });
    })
    .catch((err) => {
      err.message;
      console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
