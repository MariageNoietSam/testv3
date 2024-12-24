// Remplacez par votre Cloud Name
const cloudName = 'dd7xkcume';  // Remplacez avec votre Cloud Name
const apiKey = '241353293792647';  // Remplacez avec votre API Key (si nécessaire pour l'accès)

const imageContainer = document.getElementById('image-container');

// Fonction pour récupérer et afficher les images/vidéos de Cloudinary
async function fetchCloudinaryResources() {
    try {
        const response = await axios.get(`https://api.cloudinary.com/v1_1/${cloudName}/resources`);

        const data = response.data;

        if (data.resources && data.resources.length > 0) {
            data.resources.forEach(resource => {
                // Affichage d'images
                if (resource.resource_type === 'image') {
                    createImageItem(resource.secure_url, 'image');
                }
                // Affichage de vidéos
                if (resource.resource_type === 'video') {
                    createImageItem(resource.secure_url, 'video');
                }
            });
        } else {
            imageContainer.innerHTML = '<p>Aucune image ou vidéo trouvée.</p>';
        }
    } catch (error) {
        console.error('Erreur de récupération des ressources:', error);
    }
}

// Créer un élément pour chaque image ou vidéo
function createImageItem(url, type) {
    const item = document.createElement('div');
    item.classList.add('image-item');
    
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    const overlayText = document.createElement('p');
    overlayText.textContent = type.charAt(0).toUpperCase() + type.slice(1); // "Image" ou "Video"
    overlay.appendChild(overlayText);

    if (type === 'image') {
        const img = document.createElement('img');
        img.src = url;
        item.appendChild(img);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        item.appendChild(video);
    }

    item.appendChild(overlay);
    imageContainer.appendChild(item);
}

// Charger les ressources au chargement de la page
window.onload = fetchCloudinaryResources;
