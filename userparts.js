document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://car-repair-backend-drf.vercel.app/parts/partsadd/";
  const productGrid = document.getElementById("product-grid");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  let products = []; // Store fetched products

  // Fetch and render
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts(products);
    })
    .catch(err => {
      console.error("Error loading products:", err);
      productGrid.innerHTML = `<p class="text-center col-span-4 text-red-500">Failed to load products.</p>`;
    });

  // Render products to the DOM
  function renderProducts(items) {
    productGrid.innerHTML = "";
    items.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow p-4 relative";
      card.innerHTML = `
        <div class="absolute top-2 left-2 space-y-1 text-white text-xs font-bold">
      
          <span class="bg-red-600 px-2 py-1 rounded">NEW</span>
         
        </div>
        <img src="${product.image_url}" alt="${product.title}" class="w-full h-36 object-contain mb-4">
        <p class="text-sm text-gray-700">${product.title}</p>
        <div class="text-yellow-500 text-sm">★★★★☆ <span class="text-gray-500 ml-2">Rating TBD</span></div>
        <div class="text-lg font-semibold mt-2">$${product.price}</div>
        <button class="add-to-cart mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
          Add to Cart
        </button>
      `;

      productGrid.appendChild(card);
    });
  }

  // Search function
  searchInput.addEventListener("input", () => {
    filterAndRender();
  });

  // Sort function
  sortSelect.addEventListener("change", () => {
    filterAndRender();
  });

  function filterAndRender() {
    const keyword = searchInput.value.toLowerCase();
    let filtered = products.filter(p => p.title.toLowerCase().includes(keyword));

    const sortOption = sortSelect.value;
    if (sortOption === "low-high") {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    renderProducts(filtered);
  }
});
