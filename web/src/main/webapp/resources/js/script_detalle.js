let map
let lng
let lat
let tipo
let flag
let dir
let direcciones = []

window.onload = function () {
    const imagenInicial = document.getElementById("imagenInicial")
    lng = document.getElementById("lng").value;
    lat = document.getElementById("lat").value;
    tipo = document.getElementById("tipo").value;
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaXRoZWNyZWF0b3IiLCJhIjoiY2tyMnZkbzd4MXJ1cDJ1bzdlNHpmdnNxYyJ9.789aY-Czm5oJfDpOtj-8eA';
    map = new mapboxgl.Map({
        container: "mapDetalleLugar",
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 14,
    });


    map.on("load", function () {
        marcadorPosActual();
        crearMarkerLugar(lng, lat, tipo, map);
    })


}

function marcadorPosActual() {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map)
        })
    }
}

function crearMarkerLugar(lng, lat, tipo, map) {
    console.log(tipo)
    let el = document.createElement('div');
    if (tipo === 'Bar') {
        el.className = 'markerBar'
    } else {
        if (tipo === 'Cafe') {
            el.className = 'markerCafe'
        } else {
            if (tipo === 'Hotel') {
                el.className = 'markerHotel'
            } else {
                el.className = 'markerRestaurante'
            }
        }
    }


    let m = new mapboxgl.Marker(el).setLngLat([lng, lat]).setPopup(new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    }).setHTML(
        `<div class="p-3"> 
                   <h5 class="mb-2 text-center">Aqui esta el lugar!</h5>
                   <button class="btn btnComoLlegar w-100" onclick="crearRutaLugar('${lng}',' ${lat}')">Como llegar</button>
             </div>`
    )).addTo(map)


}

function crearRutaLugar(lugarLng, lugarLat) {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude
            let lng = position.coords.longitude


            dir = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                language: 'es',
                interactive: false,
                zoom: 5,

            })
            dir.setOrigin([lng, lat])
            dir.setDestination([lugarLng, lugarLat])
            if (direcciones.length === 0) {
                console.log("Hola")
                map.addControl(dir, 'top-right')
                direcciones.push(dir)
            }
            console.log(dir.getOrigin())
            console.log(dir.getDestination())
        })
    }
}


function OcultarButton(btn) {
    $(btn).style.display = "none";
    document.getElementById("aprobado").style.display = "block";
    document.getElementById("denegar").style.display = "none";
}

function OcultarButtonD(btn) {
    $(btn).style.display = "none";
    document.getElementById("denegado").style.display = "block";
    document.getElementById("aprobar").style.display = "none";
}
