class ProductDetailsService {
    static fetchProduct = async (id) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }
}

class ProductDetailsRenderer {
    static renderProduct = (product) => {
        ProductDetailsRenderer.updateBreadcrumb(product);
        ProductDetailsRenderer.renderImages(product);
        ProductDetailsRenderer.renderProductInfo(product);
        ProductDetailsRenderer.renderReviews(product);
    }

    static updateBreadcrumb = (product) => {
        document.getElementById('breadcrumb-category').textContent = 
            product.category.charAt(0).toUpperCase() + product.category.slice(1);
        document.getElementById('breadcrumb-title').textContent = product.title;
    }

    static renderImages = (product) => {
        const mainImage = document.getElementById('main-product-image');
        const thumbnailContainer = document.getElementById('thumbnail-images');
        
        const images = [product.thumbnail, ...(product.images || [])];
        const uniqueImages = [...new Set(images)];
        
        mainImage.src = uniqueImages[0];
        mainImage.alt = product.title;
        
        thumbnailContainer.innerHTML = '';
        uniqueImages.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="${product.title} ${index + 1}" 
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAzMkg0OFY0OEgzMlYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=='">`;
            
            thumbnail.addEventListener('click', () => {
                mainImage.src = image;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
    }

    static renderProductInfo = (product) => {
        document.getElementById('product-category').textContent = 
            product.category.charAt(0).toUpperCase() + product.category.slice(1);
        document.getElementById('product-title').textContent = product.title;

        const stars = ProductDetailsRenderer.generateStars(product.rating);
        document.getElementById('product-stars').textContent = stars;
        document.getElementById('product-rating-text').textContent = `(${product.rating})`;
        
        document.getElementById('current-price').textContent = `$${product.price}`;
        
        if (product.discountPercentage > 0) {
            const discountBadge = document.getElementById('discount-badge');
            discountBadge.textContent = `-${Math.round(product.discountPercentage)}%`;
            discountBadge.style.display = 'inline';
        }
        
        document.getElementById('product-description-text').textContent = product.description;
    }

    static renderReviews = (product) => {
        const reviewsContainer = document.getElementById('reviews-container');
        reviewsContainer.innerHTML = '';
        
        if (product.reviews && product.reviews.length > 0) {
            product.reviews.forEach(review => {
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';
                
                const reviewDate = new Date(review.date).toLocaleDateString();
                const stars = ProductDetailsRenderer.generateStars(review.rating);
                
                reviewItem.innerHTML = `
                    <div class="review-header">
                        <span class="review-author">${review.reviewerName}</span>
                        <span class="review-date">${reviewDate}</span>
                    </div>
                    <div class="review-rating">${stars}</div>
                    <div class="review-comment">${review.comment}</div>
                `;
                
                reviewsContainer.appendChild(reviewItem);
            });
        } else {
            reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to review this product!</p>';
        }
    }

    static generateStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (hasHalfStar) {
            stars += '☆';
        }
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            stars += '☆';
        }
        return stars;
    }
}

class ProductDetailsApp {
    constructor() {
        this.productId = this.getProductIdFromUrl();
        this.quantity = 1;
        this.init();
    }

    getProductIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    init = async () => {
        if (!this.productId) {
            this.showError();
            return;
        }

        try {
            await this.loadProduct();
            this.setupEventListeners();
        } catch (error) {
            this.showError();
        }
    }

    loadProduct = async () => {
        try {
            this.showLoading();
            const product = await ProductDetailsService.fetchProduct(this.productId);
            ProductDetailsRenderer.renderProduct(product);
            this.showProduct();
            this.product = product;
        } catch (error) {
            this.hideLoading();
            throw error;
        }
    }

    setupEventListeners = () => {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        const buyNowBtn = document.querySelector('.buy-now-btn');
        
        addToCartBtn.addEventListener('click', () => this.addToCart());
        buyNowBtn.addEventListener('click', () => this.buyNow());
    }

    addToCart = () => {
        const quantity = document.getElementById('quantity').value;
        // Add to cart logic here
    }

    buyNow = () => {
        const quantity = document.getElementById('quantity').value;
        // Buy now logic here
    }

    showLoading = () => {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('error').style.display = 'none';
        document.getElementById('product-details').style.display = 'none';
        document.getElementById('product-reviews').style.display = 'none';
    }

    hideLoading = () => {
        document.getElementById('loading').style.display = 'none';
    }

    showProduct = () => {
        this.hideLoading();
        document.getElementById('product-details').style.display = 'grid';
        document.getElementById('product-reviews').style.display = 'block';
    }

    showError = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('product-details').style.display = 'none';
        document.getElementById('product-reviews').style.display = 'none';
    }
}

// Arrow function version of changeQuantity
const changeQuantity = (delta) => {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = Math.max(1, Math.min(10, currentValue + delta));
    quantityInput.value = newValue;
}

// Arrow function for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => new ProductDetailsApp());
