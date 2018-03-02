$(document).ready(Inicio_Ajax);

function Inicio_Ajax() {
    // petición ajax del contenido a mostrar
     $(document).ajaxStart(
               function()
               {
                    $("#cargando").show();
                    
               }
      );
      $(document).ajaxStop(
               function()
               {
                   $("#cargando").hide();
               }
      );
      
      $.get("http://www.rtve.es/api/noticias.json", AjaxGet);

      //evento para ver más noticias
      var ver_mas = $("#ver-mas")
      ver_mas.click(function(){
         $.get("http://www.rtve.es/api/noticias.json", AjaxGet);
      });

      // evento para actualizar las noticias
      var actualizar = $("#actualizar");
      actualizar.click(function(){
        $.get("http://www.rtve.es/api/noticias.json", AjaxGet);
      });

      // Función para el botón de 'volver arriba' en la app
      $('#ir-arriba').click(function(){
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });
   
      $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
          $('#ir-arriba').slideDown(300);
        } else {
          $('#ir-arriba').slideUp(300);
        }
      });

}

var siguientes = 0;
var lista_noticias = [];

// Obtiene las noticias de la api de rtve
function AjaxGet(datos) {
  console.log("SIGUIENTES EN GET => "+siguientes)
  lista_noticias=datos["page"]["items"];
  console.log("LISTA EN GET => "+lista_noticias)
  var texto="";
  var titulo="";
  var imagen="";
  var enlace=""; 
  
  MostrarNoticias(lista_noticias,siguientes)
}

// Muestra las noticias en función de la posicion (siguientes) que lleva guardada o desde el principio si es 0
function MostrarNoticias() {

  var contador = 0;

  if (siguientes != 0) {
    siguientes += 1;
  }

  for(var i=siguientes;i<lista_noticias.length;i++) {

    titulo = lista_noticias[i]["longTitle"];
    texto = lista_noticias[i]["summary"];
    imagen = lista_noticias[i]["image"]
    enlace = lista_noticias[i]["htmlUrl"]

    $("#noticias").append("<div class='col-6'><div class='separador card'><img class='img-fluid' src='"+imagen+"'><div class='card-body'><h4 class='card-title'>"+titulo+"</h4><p class='card-text'>"+texto+"</p><a href='"+enlace+"' class='btn btn-default' target='_blank'>Ver la noticia completa</a></div></div></div>");

    if (contador == 3) {
      siguientes = i;
      contador = 0;
      i = lista_noticias.length
      console.log("Ya he mostrado 4 noticias, la última: "+siguientes)
    } else {
      contador++;
    }

  }
}




