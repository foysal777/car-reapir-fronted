const apiUrl = "https://car-repair-backend-drf.vercel.app/blog/gallery/"
const galleryGrid = document.getElementById("gallery-grid");
const filterButton = document.getElementById("filter-buttons");

let galleryData = []

async function GalleryData() {

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
    
        galleryData = data;
        console.log(galleryData);

        createFilterButtons(); 
        displayGallery(galleryData);
    } catch (error) {
        console.error("error", error)
    }

}


// Display Gallery Images
function displayGallery(data) {
    galleryGrid.innerHTML = "";
    data.forEach(item => {
      galleryGrid.innerHTML += `
        <div class="relative group">
          <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover rounded" />
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300 rounded">
            <p class="text-white text-lg font-semibold mb-2">${item.title}</p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded">READ MORE</button>
          </div>
        </div>
      `;
    });
  }

  function createFilterButtons() {
    const categories = ["All Galleries", ...new Set(galleryData.map(item => item.category))];
    filterButton.innerHTML = "";

    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category;
      button.className = category === "All Galleries"
        ? "bg-blue-600 text-white px-4 py-2 rounded"
        : "border border-blue-300 px-4 py-2 rounded hover:bg-gray-200";
      button.addEventListener("click", () => {
        if (category === "All Galleries") {
          displayGallery(galleryData);
        } else {
          const filteredData = galleryData.filter(item => item.category === category);
          displayGallery(filteredData);
        }
      });
      filterButton.appendChild(button);
    });
  }





GalleryData();