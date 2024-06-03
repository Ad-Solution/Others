// Dummy data for other items
const otherItemsData = [
    {
        id: 1,
        name: 'Bicycle',
        category: 'Sports',
        price: 8000,
        location: 'Colombo',
        images: ['img2.jpg', 'img2.jpg', 'img2.jpg'],
        postedDate: '2023-05-01',
        description: 'A high-quality bicycle suitable for city commuting and mountain biking. Barely used and in excellent condition.'
    },
    // Add more items here
];

let filteredItems = [...otherItemsData];

function handleSearch() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const itemLocation = document.getElementById('itemLocation').value;
    const itemCategory = document.getElementById('itemCategory').value;

    filteredItems = otherItemsData.filter(item => {
        return (!minPrice || item.price >= minPrice) &&
               (!maxPrice || item.price <= maxPrice) &&
               (!itemLocation || item.location.toLowerCase().includes(itemLocation.toLowerCase())) &&
               (!itemCategory || item.category.toLowerCase().includes(itemCategory.toLowerCase()));
    });

    displayItems();
}

function displayItems() {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 item-card">
                <div id="carousel${item.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${item.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${img}" alt="Item image">
                            </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carousel${item.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${item.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Category: ${item.category}</p>
                    <p class="card-text">Price: Rs.${item.price}</p>
                    <p class="card-text">Location: ${item.location}</p>
                    <p class="card-text">Posted: ${item.postedDate}</p>
                    <p class="card-text">${item.description.slice(0, 100)}... <a href="#" onclick="handleViewDetails(${item.id})">View More</a></p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${item.id})">View Details</button>
                </div>
            </div>`;
        itemsContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const item = filteredItems.find(e => e.id === id);
    const modal = new bootstrap.Modal(document.getElementById('itemModal'));

    document.getElementById('itemModalLabel').innerText = item.name;
    document.getElementById('carouselInner').innerHTML = item.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Item image">
        </div>`).join('');
    document.getElementById('modalCategory').innerText = `Category: ${item.category}`;
    document.getElementById('modalPrice').innerText = `Price: Rs.${item.price}`;
    document.getElementById('modalLocation').innerText = `Location: ${item.location}`;
    document.getElementById('modalPostedDate').innerText = `Posted: ${item.postedDate}`;
    document.getElementById('modalDescription').innerText = item.description;

    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    displayItems();
});
