async function locationDistance() {

       //HEADERS 
       const myHeaders = new Headers();
       myHeaders.append("Accept", "application/json");
       myHeaders.append("Authorization", `Bearer ${bearerToken}`);
   


       //PARAMETROS
       const formdata = new FormData();
       formdata.append("user_id", user_id);
       formdata.append("company", company);

       if(asset_id!=null){
        formdata.append("asset_id", asset_id);
       }
       
       
     
   
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
               showPositions(result.data);

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

        let customInventoryOne = L.icon({
            iconUrl: 'VERDE.gif', // Ruta a tu imagen de icono
            iconSize: [40, 40], // Tamaño del icono
            iconAnchor: [20, 40], // Punto del icono que se corresponderá con la posición del marcador
            popupAnchor: [0, -40] // Punto desde el cual se abrirá el popup relativo al icono
        });
    
        let customInventoryTwo = L.icon({
            iconUrl: 'AMARILLO.gif', // Ruta a tu imagen de icono
            iconSize: [40, 40], // Tamaño del icono
            iconAnchor: [20, 40], // Punto del icono que se corresponderá con la posición del marcador
            popupAnchor: [0, -40] // Punto desde el cual se abrirá el popup relativo al icono
        });
    
        let customInventoryThree = L.icon({
            iconUrl: 'ROJO.gif', // Ruta a tu imagen de icono
            iconSize: [40, 40], // Tamaño del icono
            iconAnchor: [20, 40], // Punto del icono que se corresponderá con la posición del marcador
            popupAnchor: [0, -40] // Punto desde el cual se abrirá el popup relativo al icono
        });
    
    
        let iconCustom = '';


        // Itera sobre las posiciones y agrega marcadores al LayerGroup
        result.forEach(position => {

            console.log(position.inventory);


            let latitude = position.latitude;
            let longitude = position.longitude;

            if(position.inventory==1){
                iconCustom=customInventoryOne;
            }else if(position.inventory==2){
                iconCustom=customInventoryTwo;
            }else{
                iconCustom=customInventoryThree;
            }
        
            console.log(iconCustom);


            let marker = L.marker([latitude, longitude], { icon: iconCustom })

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

        /*
        let bounds = markersLayer.getBounds();
        map.fitBounds(bounds);
        */

    } else {
        console.error('Map is not defined');
    }
    
}