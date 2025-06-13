class ProductService {
    static fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=30');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };

    static fetchCategories = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products/categories');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    };
}

class ProductRenderer {
    static renderProducts = (products) => {
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';
        products.forEach(product => {
            const productCard = ProductRenderer.createProductCard(product);
            grid.appendChild(productCard);
        });
    };

    static createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const discountPercentage = Math.round(product.discountPercentage);
        const stars = ProductRenderer.generateStars(product.rating);

        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.thumbnail}" alt="${product.title}" class="product-image"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'">
                ${discountPercentage > 0 ? `<div class="product-badge">-${discountPercentage}%</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">(${product.rating})</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <button class="view-details-btn" onclick="viewProductDetails(${product.id})">
                    View Details
                </button>
            </div>
        `;
        return card;
    };

    static generateStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) stars += '★';
        if (hasHalfStar) stars += '☆';
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) stars += '☆';

        return stars;
    };

    static renderCategories = (categories) => {
        const filter = document.querySelector('.category-filter');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.slug;
            option.textContent = category.name;
            filter.appendChild(option);
        });
    };
}

class App {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.init();
    }

    init = async () => {
        try {
            await this.loadProducts();
            await this.loadCategories();
            this.setupEventListeners();
        } catch (error) {
            this.showError();
        }
    };

    loadProducts = async () => {
        try {
            this.showLoading();
            this.products = await ProductService.fetchProducts();
            this.filteredProducts = [...this.products];
            ProductRenderer.renderProducts(this.filteredProducts);
            this.hideLoading();
        } catch (error) {
            this.hideLoading();
            throw error;
        }
    };

    loadCategories = async () => {
        try {
            const categories = await ProductService.fetchCategories();
            ProductRenderer.renderCategories(categories);
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    setupEventListeners = () => {
        const categoryFilter = document.querySelector('.category-filter');
        categoryFilter.addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });
    };

    filterByCategory = (category) => {
        this.filteredProducts = category
            ? this.products.filter(product => product.category === category)
            : [...this.products];
        ProductRenderer.renderProducts(this.filteredProducts);
    };

    showLoading = () => {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('error').style.display = 'none';
    };

    hideLoading = () => {
        document.getElementById('loading').style.display = 'none';
    };

    showError = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    };
}

const viewProductDetails = (productId) => {
    window.location.href = `product-details.html?id=${productId}`;
};

document.addEventListener('DOMContentLoaded', () => new App());
