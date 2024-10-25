/**Acceder a la localización del usario */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalización no es soportada por este navegador.");
    }
}


function showPosition(position){
 
    let latitude   = position.coords.latitude;
    let longitude  = position.coords.longitude;

    let customIcon = L.icon({
        iconUrl: 'AMARILLO.png', // Ruta a tu imagen de icono
        iconSize: [40, 40], // Tamaño del icono

    });

    /**Marcador del usuario */
    if (typeof map !== 'undefined') {
      
        // Centrar a la posición del usuario
        //map.setView([latitude, longitude], 10);
      
        if (userMarker) {
            // Si el marcador ya existe, actualiza su posición
            userMarker.setLatLng([latitude, longitude], { icon: customIcon });

        } else {
            // Si el marcador no existe, crea uno nuevo
            userMarker = L.marker([latitude, longitude], { icon: customIcon })
            .addTo(map)
            .bindPopup('Esta es la ubicación del usuario. :D').openPopup();
        }

        updateUserLocation(latitude, longitude);


    } else {
        console.error('Map is not defined');
    }

}



async function updateUserLocation(latitude, longitude) {

    //HEADERS 
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    //PARAMETROS
    const formdata = new FormData();
    formdata.append("latitude", latitude);
    formdata.append("longitude", longitude);
    formdata.append("user_id", user_id);
    formdata.append("company", company);


    //REQUEST
    const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
          };
        
        try {
            const response = await fetch(apiLink + "location", requestOptions);
            const result = await response.json();
            //console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario denegó la solicitud de geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud para obtener la ubicación ha caducado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Se ha producido un error desconocido.");
            break;
    }
}    


