document.addEventListener('DOMContentLoaded', function () {
    const dogsContainer = document.getElementById('dogs-container');
    const apiKey = 'live_RgqDZx83N2FNePejVui8MK27TvmrwPUUCz5XTRn0J6wpxwlv6Frk0VhKYfEFOz1y';
    let page = 0; // Número de página para la API
    let isLoading = false; // Evita múltiples solicitudes simultáneas

    function loadDogs() {
        if (isLoading) return; // Si ya se está cargando, evitar otra llamada
        isLoading = true;

        // Petición a la API para obtener una lista de razas con paginación
        fetch(`https://api.thedogapi.com/v1/breeds?limit=9&page=${page}`, {
            headers: { 'x-api-key': apiKey }
        })
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return; // Si no hay más datos, detener la carga

            // Iterar sobre cada raza obtenida
            data.forEach(breed => {
                // Obtener imagen asociada a la raza
                fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}`, {
                    headers: { 'x-api-key': apiKey }
                })
                .then(response => response.json())
                .then(imageData => {
                    // Si no hay imagen, usar un placeholder
                    const imageUrl = imageData[0]?.url || 'https://via.placeholder.com/300';

                    // Crear la tarjeta del perro
                    const dogCard = document.createElement('section');
                    dogCard.classList.add(
                        'bg-white', 'rounded-xl', 'shadow-lg', 'p-5',
                        'transition', 'duration-300', 'ease-in-out',
                        'hover:scale-105', 'hover:shadow-2xl'
                    );

                    // Contenido de la tarjeta con información del perro
                    dogCard.innerHTML = `
                        <img src="${imageUrl}" alt="${breed.name}" 
                            class="w-full h-64 object-contain rounded-xl">
                        <h3 class="text-2xl font-semibold mt-4 text-gray-800">${breed.name}</h3>
                        <p class="text-gray-600 mt-2"><strong>Origen:</strong> ${breed.origin || 'Desconocido'}</p>
                        <p class="text-gray-600 mt-1"><strong>Temperamento:</strong> ${breed.temperament}</p>
                        <button class="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500" 
                            onclick="openModal('${breed.name}', '${breed.origin || 'Desconocido'}', '${breed.temperament}', '${imageUrl}')">
                            Ver más información
                        </button>
                    `;

                    // Agregar la tarjeta al contenedor principal
                    dogsContainer.appendChild(dogCard);
                })
                .catch(error => console.error('Error al obtener imagen:', error));
            });

            page++; // Incrementar la página para la próxima carga
            isLoading = false; // Permitir nuevas cargas
        })
        .catch(error => {
            console.error('Error al obtener razas de perros:', error);
            isLoading = false;
        });
    }

    // Cargar los primeros perros al cargar la página
    loadDogs();

    // Detectar el scroll y cargar más datos cuando el usuario se acerque al final de la página
    window.addEventListener('scroll', function () {
        const scrollPosition = window.innerHeight + window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight - 100) { // Si el usuario está cerca del final
            loadDogs();
        }
    });

    // Inicializar Flowbite después de cargar el DOM
    Flowbite.init();
});

// Función para abrir el modal con la información del perro seleccionado
function openModal(name, origin, temperament, imageUrl) {
    const modal = document.getElementById('dogModal');
    
    // Insertar la información del perro en el modal
    modal.querySelector('.modal-title').textContent = name;
    modal.querySelector('.modal-body').innerHTML = `
        <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-contain rounded-xl mb-4">
        <p class="text-gray-900"><strong>Origen:</strong> ${origin}</p>
        <p class="text-gray-900"><strong>Temperamento:</strong> ${temperament}</p>
    `;

    // Mostrar el modal
    modal.classList.remove('hidden');
}

// Función para cerrar el modal desde el botón superior
document.getElementById('closeModalBtnTop').addEventListener('click', function () {
    document.getElementById('dogModal').classList.add('hidden');
});

// Función para cerrar el modal desde el botón inferior
document.getElementById('closeModalBtnBottom').addEventListener('click', function () {
    document.getElementById('dogModal').classList.add('hidden');
});
