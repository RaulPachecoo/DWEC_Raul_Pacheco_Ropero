document.addEventListener('DOMContentLoaded', function () {
    const dogsContainer = document.getElementById('dogs-container');
    const apiKey = 'live_RgqDZx83N2FNePejVui8MK27TvmrwPUUCz5XTRn0J6wpxwlv6Frk0VhKYfEFOz1y'; //API Key

    // Fetch de las razas
    fetch('https://api.thedogapi.com/v1/breeds', {
        headers: { 'x-api-key': apiKey }
    })
    .then(response => response.json())
    .then(data => {
        const breeds = data.slice(0, 9); // Mostrar solo 9 razas

        breeds.forEach(breed => {
            fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}`, {
                headers: { 'x-api-key': apiKey }
            })
            .then(response => response.json())
            .then(imageData => {
                const imageUrl = imageData[0]?.url || 'https://via.placeholder.com/300';

                const dogCard = document.createElement('div');
                dogCard.classList.add(
                    'bg-white', 'rounded-xl', 'shadow-lg', 'p-5',
                    'transition', 'duration-300', 'ease-in-out',
                    'hover:scale-105', 'hover:shadow-2xl'
                );

                dogCard.innerHTML = ` 
                    <img src="${imageUrl}" alt="${breed.name}" 
                        class="w-full h-64 object-contain rounded-xl">
                    <h3 class="text-2xl font-semibold mt-4 text-gray-800">${breed.name}</h3>
                    <p class="text-gray-600 mt-2"><strong>Origen:</strong> ${breed.origin || 'Desconocido'}</p>
                    <p class="text-gray-600 mt-1"><strong>Temperamento:</strong> ${breed.temperament}</p>
                    <button class="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500" onclick="openModal('${breed.name}', '${breed.origin || 'Desconocido'}', '${breed.temperament}', '${imageUrl}')">Ver más información</button>
                `;

                dogsContainer.appendChild(dogCard);
            })
            .catch(error => console.error('Error al obtener imagen:', error));
        });
    })
    .catch(error => console.error('Error al obtener razas de perros:', error));

    // Inicialización de Flowbite después de cargar todo el DOM
    Flowbite.init();
});

// Función para abrir el Modal con la información del perro
function openModal(name, origin, temperament, imageUrl) {
    const modal = document.getElementById('dogModal');
    modal.querySelector('.modal-title').textContent = name;
    modal.querySelector('.modal-body').innerHTML = `
        <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-contain rounded-xl mb-4">
        <p class="text-gray-900"><strong>Origen:</strong> ${origin}</p>
        <p class="text-gray-900"><strong>Temperamento:</strong> ${temperament}</p>
    `;
    modal.classList.remove('hidden');
}

// Función para cerrar el Modal desde el botón superior
document.getElementById('closeModalBtnTop').addEventListener('click', function () {
    document.getElementById('dogModal').classList.add('hidden');
});

// Función para cerrar el Modal desde el botón inferior
document.getElementById('closeModalBtnBottom').addEventListener('click', function () {
    document.getElementById('dogModal').classList.add('hidden');
});
