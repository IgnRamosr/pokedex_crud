import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, setDoc, doc, deleteDoc,query,where, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from 'firebase/storage';


/*const firebaseApp = initializeApp({
    Se debe colocar id del proyecto
    apiKey: 
    authDomain: 
    projectId: 
    storageBucket: 
    messagingSenderId: 
    appId: 
})*/

const db = getFirestore(firebaseApp);
const storage = getStorage();

/*Función para verificar la conexión a la base de datos*/
async function verificarConexion() {
    try {
        const listaColecciones = await getDocs(collection(db, 'pokemons'));
        console.log('Conexión exitosa. Colecciones disponibles:', listaColecciones.docs.map(doc => doc.data().nombre));
    } catch (error) {
        console.error('Error al verificar la conexión:', error);
    }
}
    /*verificarConexion();*/

/*Funciones para agregar pokemon*/ 
async function agregarPokemon(nombre, elemento, debilidad, imagenFile) {
        try {
            // Referencia a la colección 'pokemons'
            const pokemonsCollection = collection(db, 'pokemons');
            const imagenURL = await subirImagen(imagenFile);
    
            // Consulta para verificar si el Pokémon ya existe
            const consulta = await getDocs(query(pokemonsCollection, where('nombre', '==', nombre)));
    
            if (consulta.size === 0) {
                // El Pokémon no existe, podemos agregarlo
                await setDoc(doc(pokemonsCollection), { nombre, elemento, debilidad, imagenURL });
                console.log('Pokémon agregado correctamente:', nombre);
                location.reload();
            } else {
                // El Pokémon ya existe
                console.log('El Pokémon', nombre, 'ya existe en la base de datos. No se agregó.');
            }
        } catch (error) {
            console.error('Error al agregar Pokémon:', error);
        }
}
async function subirImagen(imagenFile) {
    try {
        // Generar un nombre único para la imagen
        const nombreImagen = Date.now().toString();

        // Obtener la referencia del archivo en Firebase Storage
        const storageRef = ref(storage, `imagenes/${nombreImagen}`);

        // Subir la imagen a Firebase Storage
        await uploadBytes(storageRef, imagenFile);

        // Obtener la URL de descarga de la imagen
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error; // Propagar el error para que pueda ser manejado en la función que llama a subirImagen
    }
}
function mostrarFormularioAgregar() {
    const agregarFormContainer = document.getElementById('agregar-form-container');

    // Comprobar si el elemento está presente en el documento
    if (!agregarFormContainer) {
        console.error('Elemento "agregar-form-container" no encontrado en el documento.');
        return;
    }

    // Limpiar el contenido actual
    agregarFormContainer.innerHTML = '';

    const fondoOscuro = document.querySelector('.fondo-oscuro');

        // Crear el contenedor para la pokebola y el div de agregar Pokémon
        const pokeballContainer = document.createElement('div');
        pokeballContainer.id = 'pokeball-container';

    // Crear el botón "Agregar Pokémon"
    const agregarPokemonButton = document.createElement('img');
    agregarPokemonButton.id = 'pokeball-img';
    agregarPokemonButton.src = 'img/pokeball.com.png';
    agregarPokemonButton.alt = 'Pokebola';
    agregarPokemonButton.classList.add('pokeball-img');

        // Crear el elemento del div
        const agregarPokemonDiv = document.createElement('div');
        agregarPokemonDiv.id = 'agregarPokemonDiv';
        agregarPokemonDiv.classList.add('agregar-pokemon-div');
        agregarPokemonDiv.innerText = 'Agregar Pokémon';


    // Añadir el botón al contenedor
    pokeballContainer.appendChild(agregarPokemonButton);
    pokeballContainer.appendChild(agregarPokemonDiv);
    agregarFormContainer.appendChild(pokeballContainer);

    agregarPokemonButton.addEventListener('mouseover', () => {
        agregarPokemonDiv.classList.add('hovered');
    });

    agregarPokemonButton.addEventListener('mouseout', () => {
        agregarPokemonDiv.classList.remove('hovered');
    });


    // Mostrar el formulario solo cuando se hace clic en "Agregar Pokémon"
    agregarPokemonButton.addEventListener('click', () => {
        agregarFormContainer.innerHTML = `
        <div id="agregar-form" class="agregar-form">
        <div class="form-header">
            <h1>Agregar Pokémon</h1>
        </div>
        <div class="form-body">
            <form id="pokemon-form">
                <div class="form-input">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" pattern="[A-Za-z]+" required>
                </div>
                <div class="form-input">
                    <label for="elemento">Elemento:</label>
                    <select id="elemento" name="elemento" required>
                option value="Bicho">Bicho</option>
                <option value="Dragón">Dragón</option>
                <option value="Eléctrico">Eléctrico</option>
                <option value="Hada">Hada</option>
                <option value="Lucha">Lucha</option>
                <option value="Fuego">Fuego</option>
                <option value="Volador">Volador</option>
                <option value="Fantasma">Fantasma</option>
                <option value="Planta">Planta</option>
                <option value="Tierra">Tierra</option>
                <option value="Hielo">Hielo</option>
                <option value="Normal">Normal</option>
                <option value="Veneno">Veneno</option>
                <option value="Psíquico">Psíquico</option>
                <option value="Roca">Roca</option>
                <option value="Acero">Acero </option>
                <option value="Agua">Agua</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="debilidad">Debilidad:</label>
                    <select id="debilidad" name="debilidad" required>
                                    <option value="Bicho">Bicho</option>
                <option value="Dragón">Dragón</option>
                <option value="Eléctrico">Eléctrico</option>
                <option value="Hada">Hada</option>
                <option value="Lucha">Lucha</option>
                <option value="Fuego">Fuego</option>
                <option value="Volador">Volador</option>
                <option value="Fantasma">Fantasma</option>
                <option value="Planta">Planta</option>
                <option value="Tierra">Tierra</option>
                <option value="Hielo">Hielo</option>
                <option value="Normal">Normal</option>
                <option value="Veneno">Veneno</option>
                <option value="Psíquico">Psíquico</option>
                <option value="Roca">Roca</option>
                <option value="Acero">Acero </option>
                <option value="Agua">Agua</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="imagen">Imagen:</label>
                    <input type="file" id="url" name="url" accept=".jpg, .jpeg, .png" required>
                </div>
                <div class="form-footer">
                    <img id="vistaPrevia" src="#" alt="Vista Previa" style="display: none;">
                    <button type="submit" id="submit-btn">Agregar Pokémon</button>
                    <button type="button" id="close-btn">Cerrar</button>
                    <button id="adding-btn" style="display: none;" disabled>Agregando Pokémon...</button>
                </div>
            </form>
        </div>
    </div>
        `;

        setTimeout(() => {
            const formulario = document.getElementById('agregar-form');
            formulario.classList.add('mostrar');
        }, 10);
        fondoOscuro.style.display = 'block';

        const formulario = document.getElementById('pokemon-form');
        const submitBtn = document.getElementById('submit-btn');
        const addingButton = document.getElementById('adding-btn');
        const urlInput = document.getElementById('url');
        const imagenPreview = document.getElementById('vistaPrevia');
        const cerrarButton = document.getElementById('close-btn');
        const formFooter = document.querySelector('.form-footer');


    // Añadir el botón al formulario
    formFooter.appendChild(cerrarButton);

    cerrarButton.addEventListener('click', () => {
        // Limpiar el contenido del formulario y ocultarlo
        agregarFormContainer.innerHTML = '';
        fondoOscuro.style.display = 'none';
    
        // Llamar a la función para mostrar/ocultar el formulario
        mostrarFormularioAgregar();
    });
    


        urlInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
        
            if (file) {
                // Crear un objeto FileReader
                const reader = new FileReader();
        
                // Configurar la función que se ejecutará cuando se cargue la imagen
                reader.onload = (e) => {
                    // Asignar la URL de la imagen cargada como src de la etiqueta img
                    imagenPreview.src = e.target.result;
        
                    // Mostrar la etiqueta img
                    imagenPreview.style.display = 'inline-block';
                };
        
                // Leer el contenido del archivo como una URL de datos
                reader.readAsDataURL(file);
            } else {
                // Limpiar la vista previa si no se selecciona ninguna imagen
                imagenPreview.src = '';
        
                // Ocultar la etiqueta img
                imagenPreview.style.display = 'none';
            }
        });
        

        // Manejador de eventos para el botón "Agregar Pokémon"
        formulario.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar la recarga de la página
            submitBtn.style.display = 'none';
            submitBtn.disabled = true;
            addingButton.style.display = 'inline-block';
        
            // Recopilar datos del formulario
            const nombre = document.getElementById('nombre').value;
            const elemento = document.getElementById('elemento').value;
            const debilidad = document.getElementById('debilidad').value;
            const imagenFile = document.getElementById('url').files[0]; // Obtener el archivo de imagen 
        
            // Llamar a la función agregarPokemon con los datos del formulario
            await agregarPokemon(nombre, elemento, debilidad, imagenFile);
        });

    });
}

/*Funciones para eliminar pokemon*/ 
function mostrarConfirmacionEliminar(nombre) {
    // Función para cerrar el modal
    function cerrarModal() {
        const fondoOscuro = document.querySelector('.fondo-oscuro');
        const modal = document.querySelector('.modal');

        // Oculta el fondo oscuro y el modal
        fondoOscuro.style.display = 'none';
        modal.style.display = 'none';

        // Elimina el modal del DOM para que no quede residual
        modal.remove();
    }

    // Mostrar el fondo oscuro y el modal
    const fondoOscuro = document.querySelector('.fondo-oscuro');

    // Crea el modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <!-- Contenido del modal -->
        <p>¿Desea eliminar a ${nombre}?</p>
        <br>
        <button id="siButton">Sí</button>
        <button id="noButton">No</button>
    `;

    // Añade el modal al fondo oscuro
    fondoOscuro.appendChild(modal);

    // Muestra el fondo oscuro y el modal
    fondoOscuro.style.display = 'flex';
    modal.style.display = 'block';

    // Manejadores de eventos para los botones
    const noButton = document.getElementById('noButton');
    const siButton = document.getElementById('siButton');

    noButton.addEventListener('click', cerrarModal);
    siButton.addEventListener('click', () => {
        eliminarPokemon(nombre);
        cerrarModal();
    });
}
async function eliminarPokemon(nombre) {
    try {
        // Referencia a la colección 'pokemons'
        const pokemonsCollection = collection(db, 'pokemons');

        // Consulta para obtener el documento con el nombre del Pokémon
        const consulta = await getDocs(query(pokemonsCollection, where('nombre', '==', nombre)));

        if (consulta.size > 0) {
            // El Pokémon existe, obtenemos su referencia y el nombre de la imagen
            const referenciaDelPokemon = doc(pokemonsCollection, consulta.docs[0].id);
            const imagen = consulta.docs[0].data().imagenURL; 

            // Llama a la función para borrar la imagen del almacenamiento
            await eliminarImagen(imagen);

            // Elimina el Pokémon de la base de datos
            await deleteDoc(referenciaDelPokemon);

            location.reload()

        } else {
            // El Pokémon no existe
            console.log('El Pokémon', nombre, 'no existe en la base de datos.');
        }
    } catch (error) {
        console.error('Error al eliminar Pokémon por nombre:', error);
    }

    // Volver a cargar los pokemones después de eliminar uno
    cargarPokemones();
}

/*Función que carga el contenido de las cartas de pokemon y utiliza las funciones de eliminar y editar*/
async function cargarPokemones() {
    const pokedexContainer = document.getElementById('pokedex-container');
    // const agregarFormContainer = document.getElementById('agregar-form-container');

    try {
        const pokemonesSnapshot = await getDocs(collection(db, 'pokemons'));
        
        // Limpiar el contenido actual
        pokedexContainer.innerHTML = '';

        if (pokemonesSnapshot.size === 0) {
            // No hay Pokémon registrados
            const noPokemonMessage = document.createElement('h2');
            noPokemonMessage.textContent = 'No hay Pokémon registrados en la Pokedex.';
            pokedexContainer.appendChild(noPokemonMessage);
        } else {
            // Hay Pokémon registrados
            pokemonesSnapshot.forEach((pokemonDoc) => {
                const pokemonData = pokemonDoc.data();

                const pokemonCard = document.createElement('div');
                pokemonCard.className = 'pokedex-card';
                // Lógica para asignar el color de sombra según el tipo de elemento
                switch (pokemonData.elemento.toLowerCase()) {
                    case 'fuego':
                        pokemonCard.classList.add('fuego-card');
                        break;
                    case 'agua':
                        pokemonCard.classList.add('agua-card');
                        break;
                    case 'planta':
                        pokemonCard.classList.add('planta-card');
                        break;
                    case 'bicho':
                        pokemonCard.classList.add('bicho-card');
                        break;
                    case 'dragón':
                        pokemonCard.classList.add('dragon-card');
                        break;
                    case 'eléctrico':
                        pokemonCard.classList.add('electrico-card');
                        break;
                    case 'hada':
                        pokemonCard.classList.add('hada-card');
                        break;
                    case 'lucha':
                        pokemonCard.classList.add('lucha-card');
                        break;
                    case 'volador':
                        pokemonCard.classList.add('volador-card');
                        break;
                    case 'fantasma':
                        pokemonCard.classList.add('fantasma-card');
                        break;
                    case 'tierra':
                        pokemonCard.classList.add('tierra-card');
                        break;
                    case 'hielo':
                        pokemonCard.classList.add('hielo-card');
                        break;
                    case 'normal':
                        pokemonCard.classList.add('normal-card');
                        break;
                    case 'veneno':
                        pokemonCard.classList.add('veneno-card');
                        break;
                    case 'psíquico':
                        pokemonCard.classList.add('psiquico-card');
                        break;
                    case 'roca':
                        pokemonCard.classList.add('roca-card');
                        break;
                    case 'acero':
                        pokemonCard.classList.add('acero-card');
                        break;
                    default:
                        // En caso de un elemento no reconocido, agregar la clase predeterminada
                        pokemonCard.classList.add('default-card');
                        break;
                }

                pokemonCard.innerHTML = `
                    <img src="${pokemonData.imagenURL}" alt="${pokemonData.nombre} Image">
                    <div class="info">
                        <h2>${pokemonData.nombre}</h2>
                        <p><strong>Elemento:</strong> ${pokemonData.elemento}</p>
                        <p><strong>Debilidad:</strong> ${pokemonData.debilidad}</p>
                    </div>
                    <div class="actions">
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn">Eliminar</button>
                        <button class="deleting-btn" style="display: none;">Eliminando...</button>
                    </div>
                `;

                const deleteButton = pokemonCard.querySelector('.delete-btn');
                const editButton = pokemonCard.querySelector('.edit-btn');

                deleteButton.addEventListener('click', async () => {
                    await mostrarConfirmacionEliminar(pokemonData.nombre);
                });

                editButton.addEventListener('click', async () => {
                    await formEditar(pokemonData);
                });

                pokedexContainer.appendChild(pokemonCard);
            });
        }
    } catch (error) {
        console.error('Error al cargar los pokemones:', error);
    }

    // Mostrar el formulario de agregar Pokémon y el botón correspondiente
    mostrarFormularioAgregar();
}

/*Funciones para actualizar pokemon*/ 
function formEditar(pokemonData) {
    const editarFormContainer = document.getElementById('editar-form-container');

    // Comprobar si el elemento está presente en el documento
    if (!editarFormContainer) {
        console.error('Elemento "editar-form-container" no encontrado en el documento.');
        return;
    }

    // Limpiar el contenido actual
    editarFormContainer.innerHTML = '';

    const fondoOscuro = document.querySelector('.fondo-oscuro');

    // Crear el formulario de edición
    const editarForm = document.createElement('div');
    editarForm.id = 'editar-form';
    editarForm.className = 'editar-form';
    editarForm.innerHTML =  `
    <div id="editar-form-container" class="editar-form-container">
    <div class="form-header">
        <h1>Editar Pokémon</h1>
    </div>
    <div class="form-body">
        <form id="editar-pokemon-form">
        <div class="form-input">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" pattern="[A-Za-z]+" value="${pokemonData.nombre}" required>
        </div>
        <div class="form-input">
            <label for="elemento">Elemento:</label>
            <select id="elemento" name="elemento" required>
            <option value="Bicho" ${pokemonData.elemento === 'Bicho' ? 'selected' : ''}>Bicho</option>
            <option value="Dragón" ${pokemonData.elemento === 'Dragón' ? 'selected' : ''}>Dragón</option>
            <option value="Eléctrico" ${pokemonData.elemento === 'Eléctrico' ? 'selected' : ''}>Eléctrico</option>
            <option value="Hada" ${pokemonData.elemento === 'Hada' ? 'selected' : ''}>Hada</option>
            <option value="Lucha" ${pokemonData.elemento === 'Lucha' ? 'selected' : ''}>Lucha</option>
            <option value="Fuego" ${pokemonData.elemento === 'Fuego' ? 'selected' : ''}>Fuego</option>
            <option value="Volador" ${pokemonData.elemento === 'Volador' ? 'selected' : ''}>Volador</option>
            <option value="Fantasma" ${pokemonData.elemento === 'Fantasma' ? 'selected' : ''}>Fantasma</option>
            <option value="Planta" ${pokemonData.elemento === 'Planta' ? 'selected' : ''}>Planta</option>
            <option value="Tierra" ${pokemonData.elemento === 'Tierra' ? 'selected' : ''}>Tierra</option>
            <option value="Hielo" ${pokemonData.elemento === 'Hielo' ? 'selected' : ''}>Hielo</option>
            <option value="Normal" ${pokemonData.elemento === 'Normal' ? 'selected' : ''}>Normal</option>
            <option value="Veneno" ${pokemonData.elemento === 'Veneno' ? 'selected' : ''}>Veneno</option>
            <option value="Psíquico" ${pokemonData.elemento === 'Psíquico' ? 'selected' : ''}>Psíquico</option>
            <option value="Roca" ${pokemonData.elemento === 'Roca' ? 'selected' : ''}>Roca</option>
            <option value="Acero" ${pokemonData.elemento === 'Acero' ? 'selected' : ''}>Acero </option>
            <option value="Agua" ${pokemonData.elemento === 'Agua' ? 'selected' : ''}>Agua</option>
            </select>
            </div>
            <div class="form-input">
            <label for="debilidadElemento">Debilidad Elemento:</label>
            <select id="debilidadElemento" name="debilidadElemento" required>
            <option value="Bicho" ${pokemonData.debilidad === 'Bicho' ? 'selected' : ''}>Bicho</option>
            <option value="Dragón" ${pokemonData.debilidad === 'Dragón' ? 'selected' : ''}>Dragón</option>
            <option value="Eléctrico" ${pokemonData.debilidad === 'Eléctrico' ? 'selected' : ''}>Eléctrico</option>
            <option value="Hada" ${pokemonData.debilidad === 'Hada' ? 'selected' : ''}>Hada</option>
            <option value="Lucha" ${pokemonData.debilidad === 'Lucha' ? 'selected' : ''}>Lucha</option>
            <option value="Fuego" ${pokemonData.debilidad === 'Fuego' ? 'selected' : ''}>Fuego</option>
            <option value="Volador" ${pokemonData.debilidad === 'Volador' ? 'selected' : ''}>Volador</option>
            <option value="Fantasma" ${pokemonData.debilidad === 'Fantasma' ? 'selected' : ''}>Fantasma</option>
            <option value="Planta" ${pokemonData.debilidad === 'Planta' ? 'selected' : ''}>Planta</option>
            <option value="Tierra" ${pokemonData.debilidad === 'Tierra' ? 'selected' : ''}>Tierra</option>
            <option value="Hielo" ${pokemonData.debilidad === 'Hielo' ? 'selected' : ''}>Hielo</option>
            <option value="Normal" ${pokemonData.debilidad === 'Normal' ? 'selected' : ''}>Normal</option>
            <option value="Veneno" ${pokemonData.debilidad === 'Veneno' ? 'selected' : ''}>Veneno</option>
            <option value="Psíquico" ${pokemonData.debilidad === 'Psíquico' ? 'selected' : ''}>Psíquico</option>
            <option value="Roca" ${pokemonData.debilidad === 'Roca' ? 'selected' : ''}>Roca</option>
            <option value="Acero" ${pokemonData.debilidad === 'Acero' ? 'selected' : ''}>Acero </option>
            <option value="Agua" ${pokemonData.debilidad === 'Agua' ? 'selected' : ''}>Agua</option>
            </select>
            </div>
            <div class="form-input">
            <label for="imagen">Imagen:</label>
            <input type="file" id="url" name="url" accept=".jpg, .jpeg, .png">
            </div>

            <div class="form-footer">
            <img id="imagen-preview" src="${pokemonData.imagenURL}" alt="Imagen del Pokémon">
            <button type="submit" id="submit-btn">Editar Pokémon</button>
            <button type="button" id="close-btn-ed">Cerrar</button>
            </div>
        </form>
        </div>
        </div>
    `;

    setTimeout(() => {
        const formulario = document.getElementById('editar-form');
        formulario.classList.add('mostrar');
    }, 10);
    fondoOscuro.style.display = 'block';

    // Añadir el formulario al contenedor
    editarFormContainer.appendChild(editarForm);
    

    const urlInput = document.getElementById('url');
    const imagenPreview = document.getElementById('imagen-preview');

    const editarFormElement = document.getElementById('editar-pokemon-form');
    const cerrarButton = document.getElementById('close-btn-ed');



    cerrarButton.addEventListener('click', () => {
        // Limpiar el contenido del formulario y ocultarlo
        editarFormContainer.innerHTML = '';
        fondoOscuro.style.display = 'none';
    });

    urlInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Mostrar la vista previa de la imagen seleccionada
            const reader = new FileReader();
            reader.onload = (e) => {
                imagenPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            // Limpiar la vista previa si no se selecciona ninguna imagen
            imagenPreview.src = '';
        }
    });

    // Manejador de eventos para el formulario de edición
    editarFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nuevosDatos = {
            nombre: document.getElementById('nombre').value,
            elemento: document.getElementById('elemento').value,
            debilidad: document.getElementById('debilidadElemento').value,
            imagenURL: document.getElementById('url').value,
        };

        const imagenAnteriorURL = pokemonData.imagenURL;

        const imagenInput = document.getElementById('url');
        if (imagenInput.files.length > 0) {
            // Se ha seleccionado un nuevo archivo, actualiza la imagenURL
            const imagenFile = imagenInput.files[0];
            const nuevaImagenURL = await subirImagen(imagenFile); // Ajusta según cómo estés manejando las imágenes
            nuevosDatos.imagenURL = nuevaImagenURL;
    
            // Elimina la imagen anterior de la base de datos y del almacenamiento
            eliminarImagen(imagenAnteriorURL);
        } else {
            // No se ha seleccionado un nuevo archivo, la imagen se mantiene igual
            nuevosDatos.imagenURL = pokemonData.imagenURL;
        }

        actualizarPokemon(pokemonData.nombre, nuevosDatos);

        // Limpiar el formulario después de la edición
        editarFormContainer.innerHTML = '';
    });
}
async function actualizarPokemon(nombrePokemon, nuevosDatos) {
    const querySnapshot = await getDocs(query(collection(db, 'pokemons'), where('nombre', '==', nombrePokemon)));

    if (querySnapshot.size === 1) {
        // Obtener el ID del documento
        const docID = querySnapshot.docs[0].id;

        // Actualizar el documento
        await updateDoc(doc(db, 'pokemons', docID), {
            nombre: nuevosDatos.nombre,
            elemento: nuevosDatos.elemento,
            debilidad: nuevosDatos.debilidad,
            imagenURL: nuevosDatos.imagenURL,
            // Agrega aquí otros campos que desees actualizar
        });
        
        console.log('Actualización exitosa');
        setTimeout(() => {
            // Recargar la página después de una actualización exitosa
            window.location.reload();
        }, 0);
    } else {
        console.error('Error: No se encontró o se encontraron múltiples documentos con el mismo nombre');
    }
}
async function eliminarImagen(imagenURL) {
    // Obtén una referencia al almacenamiento de Firebase
    const storage = getStorage();

    // Parsea la URL de la imagen para obtener la ruta en el almacenamiento
    const rutaAlmacenamiento = imagenURL.split('?')[0]; // Elimina cualquier parámetro de consulta de la URL
    const referenciaAlmacenamiento = ref(storage, rutaAlmacenamiento);

    try {
        // Elimina el objeto (imagen) del almacenamiento
        await deleteObject(referenciaAlmacenamiento);
        console.log('Imagen eliminada del almacenamiento con éxito');
    } catch (error) {
        console.error('Error al eliminar la imagen del almacenamiento:', error);
    }
}


// Cargar los pokemones al cargar la página
window.addEventListener('load', cargarPokemones);