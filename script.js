const BACKEND_URL = "https://your-backend-url.onrender.com"; // Replace with your Render URL

document.getElementById('download-btn').addEventListener('click', async function () {
  const videoUrl = document.getElementById('video-url').value;

  if (!videoUrl) {
    alert("Please enter a video URL!");
    return;
  }

  const response = await fetch(`${BACKEND_URL}/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: videoUrl })
  });

  const data = await response.json();

  if (data.error) {
    document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
  } else {
    const formats = data.formats.map(format =>
      `<button onclick="downloadVideo('${format.url}')">${format.format}</button>`
    ).join('<br>');

    document.getElementById('result').innerHTML = `
      <h3>${data.title}</h3>
      <img src="${data.thumbnail}" alt="Thumbnail" width="200">
      <div>${formats}</div>
    `;
  }
});

function downloadVideo(url) {
  window.location.href = url;

  const encodedURL = encodeURIComponent(url);
  const shareHTML = `
    <h4>Share This Video:</h4>
    <a href="https://api.whatsapp.com/send?text=Watch%20this%20video:%20${encodedURL}" target="_blank">
      <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" />
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedURL}" target="_blank">
      <img src="https://img.icons8.com/color/48/000000/facebook-new.png" />
    </a>
    <a href="https://twitter.com/intent/tweet?url=${encodedURL}&text=Check%20out%20this%20video!" target="_blank">
      <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" />
    </a>
    <a href="https://t.me/share/url?url=${encodedURL}&text=Try%20this%20video!" target="_blank">
      <img src="https://img.icons8.com/color/48/000000/telegram-app--v1.png" />
    </a>
  `;

  document.getElementById('share-buttons').innerHTML = shareHTML;
}