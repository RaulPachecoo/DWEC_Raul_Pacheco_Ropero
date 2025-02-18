$(document).ready(function () {
    const dogsContainer = $('#dogs-container');
    const apiKey = 'live_RgqDZx83N2FNePejVui8MK27TvmrwPUUCz5XTRn0J6wpxwlv6Frk0VhKYfEFOz1y'; //API Key

    $.ajax({
        url: 'https://api.thedogapi.com/v1/breeds',
        headers: { 'x-api-key': apiKey },
        method: 'GET',
        success: function(data) {
            const breeds = data.slice(0, 9); // Mostrar solo 9 razas

            breeds.forEach(function(breed) {
                // Obtener imagen de la raza
                $.ajax({
                    url: `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}`,
                    headers: { 'x-api-key': apiKey },
                    method: 'GET',
                    success: function(imageData) {
                        const imageUrl = imageData[0]?.url || 'https://via.placeholder.com/300';

                        const dogCard = $('<div class="bg-white rounded-xl shadow-lg p-5 transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"></div>');
                        dogCard.html(`
                            <img src="${imageUrl}" alt="${breed.name}" class="w-full h-64 object-contain rounded-xl">
                            <h3 class="text-2xl font-semibold mt-4 text-gray-800">${breed.name}</h3>
                            <p class="text-gray-600 mt-2"><strong>Origen:</strong> ${breed.origin || 'Desconocido'}</p>
                            <p class="text-gray-600 mt-1"><strong>Temperamento:</strong> ${breed.temperament}</p>
                            <button class="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500" onclick="openModal('${breed.name}', '${breed.origin || 'Desconocido'}', '${breed.temperament}', '${imageUrl}')">Ver más información</button>
                        `);

                        dogsContainer.append(dogCard);
                    },
                    error: function(error) {
                        console.error('Error al obtener imagen:', error);
                    }
                });
            });
        },
        error: function(error) {
            console.error('Error al obtener razas de perros:', error);
        }
    });

    Flowbite.init();
});

// Función para abrir el Modal con la información del perro
function openModal(name, origin, temperament, imageUrl) {
    const modal = $('#dogModal');
    modal.find('.modal-title').text(name);
    modal.find('.modal-body').html(`
        <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-contain rounded-xl mb-4">
        <p class="text-gray-900"><strong>Origen:</strong> ${origin}</p>
        <p class="text-gray-900"><strong>Temperamento:</strong> ${temperament}</p>
    `);
    modal.removeClass('hidden');
}

// Función para cerrar el Modal desde el botón superior
$('#closeModalBtnTop').on('click', function() {
    $('#dogModal').addClass('hidden');
});

// Función para cerrar el Modal desde el botón inferior
$('#closeModalBtnBottom').on('click', function() {
    $('#dogModal').addClass('hidden');
});
