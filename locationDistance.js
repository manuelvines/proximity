async function locationDistance() {

       //HEADERS 
       const myHeaders = new Headers();
       myHeaders.append("Accept", "application/json");
       myHeaders.append("Authorization", `Bearer ${bearerToken}`);
   
       //PARAMETROS
       const formdata = new FormData();
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
               const response = await fetch(apiLink + "location/distances", requestOptions);
               const result = await response.json();
              
               showPositions(result);

           } catch (error) {
               console.error('Error:', error);
           }



}


function showPositions(result) {
    if (typeof map !== 'undefined') {
        // Si el LayerGroup ya existe, elimínalo del mapa
        if (markersLayer) {
            map.removeLayer(markersLayer);
        }

        // Crea un nuevo LayerGroup
        markersLayer = L.layerGroup();

        // Itera sobre las posiciones y agrega marcadores al LayerGroup
        result.forEach(position => {


            let latitude = position.latitude;
            let longitude = position.longitude;

            let marker = L.marker([latitude, longitude])
                .bindPopup(`
                    Nombre:          ${position.name}<br>
                    Empresa:         ${position.company}<br>
                    Proyecto:        ${position.project_id}<br>
                    Periodo:         ${position.period_id}<br>
                    Marca:           ${position.brand}<br>
                    Departamento:    ${position.department}<br>
                    Subdepartamento: ${position.sub_department}<br>
                    Administración:  ${position.management}<br>
                    Inventario       ${position.inventory}<br>
                    Latitud:         ${position.latitude}<br>
                    Longitud:        ${position.longitude}<br> 
                    Distancia:       ${position.distance} metros`)
                   .openPopup();

            markersLayer.addLayer(marker);
        });

        // Añade el LayerGroup al mapa
        markersLayer.addTo(map);

        // Ajusta el mapa para mostrar todos los marcadores
        let bounds = markersLayer.getBounds();
        map.fitBounds(bounds);
    } else {
        console.error('Map is not defined');
    }
    
}