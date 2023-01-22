
 const { createApp } = Vue

createApp({
    data() {
      return {
        configHoras: 0,
        configMinutos: 0,
        configSegundos: 0,
        cronoMode: "",
        descripcionTarea: "",
        eligeCronoModeError: "",
        errorDescripcion: "",
        errorHoras: "",
        errorMinutos: "",
        errorSegundos: "",
        errorEnDatos: "",
        inputRadioCrono: "",
        inputRadioTempo: "",
        iteracionesHechas: 0,
        iteracionesARealizar: 0 ,
        listaTareas: [],
        mostrarHoras: 0,
        mostrarMinutos: 0,
        mostrarSegundos: 0,
        pausarCronometro: false,

        relojIniciado: false,
        resetearCronometro: false,
        selectCronoDef: "Elige",
        selectCronoMode: "",
        tareasHechas: [],
        tareaNueva: false,
        tareaSeleccionada: {},
        textoBotonPausar: "Pausar",
        
      }
    },

    created(){
      let obtenerTareasPendientesLocal = localStorage.getItem("tareasPendientesUsuario");
      let obtenerTareasHechasLocal = localStorage.getItem("tareasHechasUsuario");
      
      if(obtenerTareasPendientesLocal){
        this.listaTareas = JSON.parse(obtenerTareasPendientesLocal);
      }

      if(obtenerTareasHechasLocal){
        this.tareasHechas = JSON.parse(obtenerTareasHechasLocal);
      }


    },
    methods: {
      /******* Nueva Tarea *******/
      nuevaTarea(event){
        this.tareaNueva = true;
       

      },

       cerrarTarea(event){
        this.tareaNueva = false;
        this.configHoras = 0,
        this.configMinutos = 0,
        this.configSegundos = 0,
        this.descripcionTarea = "";
        
       },

       guardarTarea(){
        if(this.tareaNueva){

          Swal.fire({
            title: '¿Guardar Tarea?',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              const agregarTarea = {
                id: new Date(),
                descripcion: this.descripcionTarea,
                horas: this.configHoras,
                minutos: this.configMinutos,
                segundos: this.configSegundos,
                
              };
    
              this.listaTareas.push(agregarTarea);
              let almacenarLocal = JSON.stringify(this.listaTareas);
              localStorage.setItem("tareasPendientesUsuario", almacenarLocal);
    
    
              this.descripcionTarea = "";
              this.configHoras = 0;
              this.configMinutos = 0;
              this.configSegundos = 0;
             
              Swal.fire('Tarea guardada!', '', 'success')
            } 
          })
          

          
        }
       },

         /***** Ver tarea **********/

         verTarea(event){
           

            if(event.target.textContent == "Ver tarea"){
              event.target.textContent = "Ocultar tarea";
              event.target.parentElement.parentElement.childNodes[2].style.display = "flex";
            } else {
              event.target.textContent = "Ver tarea";
              event.target.parentElement.parentElement.childNodes[2].style.display = "none";
            }
            
         },


  /***** Hacer tarea **********/

       hacerTarea(objeto){
        this.tareaSeleccionada = objeto;
        window.scrollTo(0,0);
          
       },


       eliminarTareaFinalizada(objeto){
        
       

          Swal.fire({
            title: '¿Eliminar Tarea?',
            
            showCancelButton: true,
            confirmButtonText: 'Si',
            
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
  
           
              this.tareasHechas = this.tareasHechas.filter(tarea => tarea.id != objeto.id);
          
  
               let almacenarTareasHechas = JSON.stringify(this.tareasHechas);
               localStorage.setItem("tareasHechasUsuario", almacenarTareasHechas);
      
             
  
  
  
              Swal.fire('Tarea eliminada', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Cancelado', '', 'info')
            }
          })
  
      
          
         },
       

       eliminarTarea(objeto){

        Swal.fire({
          title: '¿Eliminar Tarea?',
          
          showCancelButton: true,
          confirmButtonText: 'Si',
          
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            this.listaTareas = this.listaTareas.filter(tarea => tarea.id != objeto.id);
        

            let almacenarTareasPendientes = JSON.stringify(this.listaTareas);
            localStorage.setItem("tareasPendientesUsuario", almacenarTareasPendientes);
    
            this.tareaSeleccionada = "";



            Swal.fire('Tarea eliminada', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Cancelado', '', 'info')
          }
        })

    
        
       },


       /***** Modo de cronómetro **********/

       modoSeleccionado(event){
    
        this.selectCronoMode = event;

        this.inputRadioCrono = event.target.parentElement.parentElement.childNodes[0].childNodes[1];
        this.inputRadioTempo= event.target.parentElement.parentElement.childNodes[1].childNodes[1];


        
       },
     
      /***** Borrar errores en los inputs **********/

      borrarErrorDescripcion(){
        this.errorDescripcion = "";
      },

      borrarErrorHoras(){
        this.errorHoras = "";
        this.errorEnDatos = "";
      },
      borrarErrorMinutos(){
        this.errorMinutos = "";
        this.errorEnDatos = "";
      },
      borrarErrorSegundos(){
        this.errorSegundos = "";
        this.errorEnDatos = "";
      },


      /***** Validación de tiempos **********/

      validarDescripcion(){
        if(this.descripcionTarea.length === 0){
          this.errorDescripcion = "Ingresa una descripción"
        }

      
      },

      validarHoras(){

       
        if(this.configHoras < 0 || typeof(this.configHoras) !== "number"){
     
          
          this.errorHoras = "Hora no válida"
        } else {
          this.errorHoras = "";
        }
      },
      validarMinutos(){
        if(this.configMinutos < 0 || typeof(this.configMinutos) !== "number"){
          this.errorMinutos = "Minutos no válidos"
        } else {
          this.errorMinutos = "";
        }

      },

      validarSegundos(){
        if(this.configSegundos < 0 || typeof(this.configSegundos) !== "number"){
          this.errorSegundos = "Segundos no válidos"
        } else {
          this.errorSegundos = "";
        }

      },


       /***** Validación de formulario de tiempo **********/
      validarCrono(event){
    
        if(this.cronoMode !== "Cronometro" && this.cronoMode !== "Temporizador"){
          this.eligeCronoModeError = "Elige un modo de tiempo correcto"
    
        }       

        else{
          //this.selectCronoMode.target.disabled = true;
          this.resetearCronometro = false;
          event.target.disabled = true;
          event.target.parentElement.childNodes[1].disabled = false;
          event.target.parentElement.childNodes[2].disabled = false;
          this.iteracionesARealizar = this.tareaSeleccionada.segundos + this.tareaSeleccionada.minutos * 60 + this.tareaSeleccionada.horas *60 *60;
          this.relojIniciado = true;
   
          this.inputRadioCrono.disabled = true;
          this.inputRadioTempo.disabled = true;

          if(this.cronoMode === "Cronometro"){
            this.iniciarCrono(event);
          } else {
            this.mostrarHoras = this.tareaSeleccionada.horas;
            this.mostrarMinutos = this.tareaSeleccionada.minutos;
            this.mostrarSegundos = this.tareaSeleccionada.segundos;
            this.iniciarTemporizador(event);
          }
         
          
        }

        
        
        
      },


      /***** Iniciar Temporizador **********/

      iniciarTemporizador(event){
        
        

      

        let timer = setInterval(function(global){
 


          if(!global.tareaSeleccionada.id){
     
            clearInterval(timer);
          }
   
        
          else if(global.resetearCronometro){
            clearInterval(timer);

            event.target.parentElement.childNodes[0].disabled = false;
            global.selectCronoMode.target.disabled = false;
           
          }
          
  
          else if(global.iteracionesARealizar === global.iteracionesHechas){
       
              // event.target.parentElement.childNodes[1].disabled = true;
              // global.selectCronoMode.target.disabled = true;
             
              clearInterval(timer);
              global.preguntaFinalizarTarea();
              
              
              }
  
          else if(global.pausarCronometro){
                clearInterval(timer);
              }
         
          else if(global.mostrarMinutos === 0 && global.mostrarSegundos === 0){
      
            if(global.mostrarHoras === 0){
              global.mostrarHoras = 0;
              global.mostrarMinutos = 59;
             
              
            } else if(global.mostrarHoras >= 1){
              global.mostrarHoras--;
              global.mostrarMinutos = 59;
         
              
            } else {
              global.mostrarHoras--;
              global.mostrarMinutos = 59;
         
            }
            

            
            global.mostrarSegundos = 59;
            global.iteracionesHechas++;
           
          }
  
          else if(global.mostrarSegundos === 0){
 
            global.mostrarMinutos--;
            global.mostrarSegundos = 59;
            global.iteracionesHechas++;
          } else {
    
            global.mostrarSegundos--
            global.iteracionesHechas++;
          }
  
        
  
  
          },1000, this);    

      },

       /***** Iniciar Cronómetro **********/


      iniciarCrono(event){
        
     
  

    
        let timer = setInterval(function(global){

     
        
          if(!global.tareaSeleccionada.id){
          
            clearInterval(timer);
          }
         
          else if(global.resetearCronometro){
            clearInterval(timer);
         
            event.target.parentElement.childNodes[0].disabled = false;
            global.selectCronoMode.target.disabled = false;
           
      

          
          
          }

        

         else if(global.iteracionesARealizar === global.iteracionesHechas){
 
            //event.target.parentElement.childNodes[1].disabled = true;
            //global.selectCronoMode.target.disabled = true;
          
            clearInterval(timer);
         
            global.preguntaFinalizarTarea();
            
            
            }

        else if(global.pausarCronometro){

   
              clearInterval(timer);
            }
       
        else if(global.mostrarMinutos === 59 && global.mostrarSegundos === 59){

          global.mostrarHoras++;
          global.mostrarMinutos = 0;
          global.mostrarSegundos = 0;
          global.iteracionesHechas++;
        }

        else if(global.mostrarSegundos === 59){

          global.mostrarMinutos++;
          global.mostrarSegundos = 0;
          global.iteracionesHechas++;
        } else {

          global.mostrarSegundos++
          global.iteracionesHechas++;
        }

      


        },1000, this);    

        
        
      
    },

    /***** Pausar / continuar Contador **********/

    pausarCrono(){

   if(this.textoBotonPausar === "Pausar"){
        this.textoBotonPausar = "Continuar";
        this.pausarCronometro = true;
      }
      
      else {
        this.textoBotonPausar = "Pausar",
        this.pausarCronometro = false;



 
      }

      if(this.cronoMode === "Cronometro"){
        this.iniciarCrono();
      } else {

        this.iniciarTemporizador();
      }


      
    },


    /***** Resetear Contador **********/
    resetearCrono(event){

      event.target.parentElement.childNodes[1].disabled = true;
      event.target.parentElement.childNodes[0].disabled = false;
      event.target.disabled = true;
      this.textoBotonPausar = "Pausar";
      this.iteracionesHechas = 0;
      this.mostrarHoras = 0;
      this.mostrarMinutos = 0;
      this.mostrarSegundos = 0;
      this.resetearCronometro = true;
      this.pausarCronometro = false;
      this.relojIniciado = false;
      this.inputRadioCrono.disabled = false;
      this.inputRadioTempo.disabled = false;
      this.hacerTarea(this.tareaSeleccionada);

    
    },


    /********** Finalizar Tarea */

    preguntaFinalizarTarea(){


      Swal.fire({
        title: '¿Finalizar tarea?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
         
            this.textoBotonPausar = "Pausar";
            this.inputRadioCrono.disabled = false;
            this.inputRadioTempo.disabled = false;
            let iteracionesRestantes = this.iteracionesARealizar - this.iteracionesHechas;
            let segundosRestantes = 0;
            let minutosRestantes = 0;
            let horasRestantes = 0;
    
            if(iteracionesRestantes < 60){
              segundosRestantes = iteracionesRestantes;
            } else {
              for(let i = 0; i<= iteracionesRestantes; i++){
                if(segundosRestantes === 59 && minutosRestantes === 59){
                  horasRestantes++;
                  minutosRestantes = 0;
                  segundosRestantes = 0;
                } else if(segundosRestantes === 59){
                  segundosRestantes = 0;
                  minutosRestantes++;
                } else {
                  segundosRestantes++;
                }
    
    
              }
            }
    
            if(this.iteracionesARealizar > 3600){
              this.tareaSeleccionada.pendiente = `${horasRestantes} h, ${minutosRestantes} m, ${segundosRestantes} s`;
            } else if(this.iteracionesARealizar > 59){
              this.tareaSeleccionada.pendiente = `${minutosRestantes} m, ${segundosRestantes} s`;
            } else {
              this.tareaSeleccionada.pendiente = `${segundosRestantes} s`;
            }
    
    
       
            this.listaTareas = this.listaTareas.filter(tarea => tarea.id != this.tareaSeleccionada.id);
            this.tareasHechas.push(this.tareaSeleccionada);
    
            let almacenarTareasHechas = JSON.stringify(this.tareasHechas);
            localStorage.setItem("tareasHechasUsuario", almacenarTareasHechas);
           
            let almacenarTareasPendientes = JSON.stringify(this.listaTareas);
            localStorage.setItem("tareasPendientesUsuario", almacenarTareasPendientes);
            this.tareaSeleccionada = {};
            this.mostrarHoras = 0;
            this.mostrarMinutos = 0;
            this.mostrarSegundos = 0;
            this.relojIniciado = false;
            this.iteracionesHechas = 0;
            Swal.fire('¡Tarea Finalizada!', '', 'success')
        
        
          } 
         
        })
      }

  },

    computed: {
      
  
    }
  
  }).mount('#app')