$(document).ready(function () {
    // Contenedor donde se mostrarán las tarjetas de perros
    const dogsContainer = $('#dogs-container');
    
    // Clave de API para autenticación en The Dog API
    const apiKey = 'live_RgqDZx83N2FNePejVui8MK27TvmrwPUUCz5XTRn0J6wpxwlv6Frk0VhKYfEFOz1y';
    
    let page = 0; // Número de página para paginación de la API
    let isLoading = false; // Control para evitar múltiples llamadas simultáneas a la API

    // Función para cargar las razas de perros desde la API
    function loadDogs() {
        if (isLoading) return; // Evita que se realicen múltiples peticiones a la vez
        isLoading = true;

        $.ajax({
            url: `https://api.thedogapi.com/v1/breeds?limit=9&page=${page}`, // Petición de razas de perros
            headers: { 'x-api-key': apiKey }, // Se añade la API Key en la cabecera
            method: 'GET',
            success: function(data) {
                if (data.length === 0) return; // Si no hay más datos, detener la carga

                // Iterar sobre cada raza obtenida
                data.forEach(function (breed) {
                    // Solicitar una imagen de la raza en otra petición AJAX
                    $.ajax({
                        url: `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}`,
                        headers: { 'x-api-key': apiKey },
                        method: 'GET',
                        success: function(imageData) {
                            // Si no hay imagen, usar un placeholder
                            const imageUrl = imageData[0]?.url || 'https://via.placeholder.com/300';

                            // Crear una tarjeta con la información del perro
                            const dogCard = $(`
                                <div class="bg-white rounded-xl shadow-lg p-5 transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                                    <img src="${imageUrl}" alt="${breed.name}" class="w-full h-64 object-contain rounded-xl">
                                    <h3 class="text-2xl font-semibold mt-4 text-gray-800">${breed.name}</h3>
                                    <p class="text-gray-600 mt-2"><strong>Origen:</strong> ${breed.origin || 'Desconocido'}</p>
                                    <p class="text-gray-600 mt-1"><strong>Temperamento:</strong> ${breed.temperament}</p>
                                    <button class="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500" 
                                        onclick="openModal('${breed.name}', '${breed.origin || 'Desconocido'}', '${breed.temperament}', '${imageUrl}')">
                                        Ver más información
                                    </button>
                                </div>
                            `);

                            // Agregar la tarjeta al contenedor
                            dogsContainer.append(dogCard);
                        },
                        error: function(error) {
                            console.error('Error al obtener imagen:', error);
                        }
                    });
                });

                page++; // Incrementar la página para la siguiente carga
                isLoading = false; // Permitir nuevas cargas
            },
            error: function(error) {
                console.error('Error al obtener razas de perros:', error);
                isLoading = false;
            }
        });
    }

    // Cargar los primeros perros al inicio
    loadDogs();

    // Detectar el scroll y cargar más perros cuando el usuario se acerque al final de la página
    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop() + $(window).height();
        const documentHeight = $(document).height();

        if (scrollPosition >= documentHeight - 100) { // Si el usuario está cerca del final
            loadDogs();
        }
    });

    // Inicializar Flowbite después de cargar el DOM
    Flowbite.init();
});

// Función para abrir el Modal con la información del perro seleccionado
function openModal(name, origin, temperament, imageUrl) {
    const modal = $('#dogModal');
    modal.find('.modal-title').text(name); // Asignar el nombre del perro en el título del modal
    modal.find('.modal-body').html(`
        <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-contain rounded-xl mb-4">
        <p class="text-gray-900"><strong>Origen:</strong> ${origin}</p>
        <p class="text-gray-900"><strong>Temperamento:</strong> ${temperament}</p>
    `);
    modal.removeClass('hidden'); // Mostrar el modal
}

// Cerrar el Modal al hacer clic en el botón superior
$('#closeModalBtnTop').on('click', function() {
    $('#dogModal').addClass('hidden');
});

// Cerrar el Modal al hacer clic en el botón inferior
$('#closeModalBtnBottom').on('click', function() {
    $('#dogModal').addClass('hidden');
});
