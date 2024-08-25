document.getElementById('submitBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onloadend = async () => {
    const imageData = reader.result.split(',')[1]; // Get Base64 string
    try {
    const response = await fetch('http://localhost:3000/upload', {
    method: 'POST',
    mode: "no-cors",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageData })
    });
    const data = await response.json();
    document.getElementById('recommendations').innerText =
   data.recommendations;
    } catch (error) {
    console.error('Error:', error);
    }
    };
    reader.readAsDataURL(file);
    } else {
    alert('Please upload an image!');
    }
   });
   