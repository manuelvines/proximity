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


        //1 ROJO
        //2 VERDE
        //3 NARANJA
        
       
        let iconRed = L.icon({
            iconUrl: 'ROJO.png', // Ruta a tu imagen de icono
            iconSize: [50, 50], // Tamaño del icono
            iconAnchor: [25, 50], // Punto del icono que se corresponderá con la posición del marcador
            popupAnchor: [0, -50] 
 
        });
    
        let iconGreen = L.icon({
            iconUrl: 'VERDE.png', // Ruta a tu imagen de icono
            iconSize: [50, 50], // Tamaño del icono
            iconAnchor: [25, 50], // Punto del icono que se corresponderá con la posición del marcador
            popupAnchor: [0, -50] 
  
        });
    
        let iconOrange = L.icon({
            iconUrl: 'NARANJA.png', // Ruta a tu imagen de icono
            iconSize: [50, 50], // Tamaño del icono
            iconAnchor: [25, 50], // Punto del icono que se corresponderá con la posición del marcador
            popupAnchor: [0, -50] 
          
        });
    
    
        let iconCustom = '';
      


        // Itera sobre las posiciones y agrega marcadores al LayerGroup
        result.forEach(position => {



            let latitude = position.latitude;
            let longitude = position.longitude;

         
            if(position.inventory==1){
                iconCustom=iconRed;
            }else if(position.inventory==2){
                iconCustom=iconGreen;
            }else if(position.inventory==3){
                iconCustom=iconOrange;
            }
        
           
            let marker = L.marker([latitude, longitude], { icon: iconCustom }).bindPopup(`
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