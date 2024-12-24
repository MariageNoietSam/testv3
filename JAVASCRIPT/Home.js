// Remplacez ces variables par les informations Cloudinary de votre compte
const cloudName = 'dd7xkcume'; // Remplacez par votre Cloud Name
const uploadPreset = 'wedding Picture'; // Remplacez par votre preset

// Événement pour ouvrir la caméra
document.getElementById('btn-ouvrir-camera').addEventListener('click', () => {
    document.getElementById('input-camera').click(); // Ouvre la caméra
});

// Événement pour ouvrir la galerie
document.getElementById('btn-ouvrir-gallerie').addEventListener('click', () => {
    document.getElementById('input-gallery').click(); // Ouvre la galerie
});

// Gestion des fichiers sélectionnés (caméra ou galerie)
document.getElementById('input-camera').addEventListener('change', handleFileUpload);
document.getElementById('input-gallery').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadToCloudinary(file);
    }
}

// Fonction pour uploader un fichier sur Cloudinary
function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    // Uploader sur Cloudinary
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.secure_url) {
            console.log("Fichier uploadé avec succès sur Cloudinary:", data.secure_url);
            alert(`Fichier uploadé avec succès! URL: ${data.secure_url}`);
        } else {
            console.error("Erreur d'upload sur Cloudinary:", data);
            alert("Erreur lors de l'upload sur Cloudinary.");
        }
    })
    .catch(error => {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau lors de l'upload sur Cloudinary.");
    });
}


// Sélectionner le bouton avec la classe 'btn-text'
document.querySelector('.btn-text').addEventListener('click', function() {
    // Rediriger vers la nouvelle page
    window.location.href = "gallerie.html";
});

