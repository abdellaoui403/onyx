// Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu__close');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(event.target) && 
          !mobileMenuToggle.contains(event.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Announcement bar close
  const announcementClose = document.querySelector('.announcement-bar__close');
  const announcementBar = document.querySelector('.announcement-bar');
  
  if (announcementClose && announcementBar) {
    announcementClose.addEventListener('click', function() {
      announcementBar.style.display = 'none';
      
      // Set cookie to remember closed state
      document.cookie = "announcement_closed=true; path=/; max-age=86400";
    });
  }
  
  // Check if announcement should be hidden based on cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  if (getCookie('announcement_closed') === 'true' && announcementBar) {
    announcementBar.style.display = 'none';
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
  }
  
  if (testimonials.length > 1) {
    // Initialize
    showTestimonial(currentTestimonial);
    
    // Auto rotate
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }
  
  // Product quantity selectors
  const quantityButtons = document.querySelectorAll('.product__quantity-button, .cart__quantity-button');
  
  if (quantityButtons.length) {
    quantityButtons.forEach(button => {
      button.addEventListener('click', function() {
        const input = this.parentNode.querySelector('input');
        const currentValue = parseInt(input.value);
        const isPlus = this.classList.contains('plus');
        
        if (isPlus) {
          input.value = currentValue + 1;
        } else if (currentValue > 1) {
          input.value = currentValue - 1;
        }
        
        // Trigger change event for cart updates
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
      });
    });
  }
  
  // Product variant selectors
  const variantOptions = document.querySelectorAll('.product__option-value');
  
  if (variantOptions.length) {
    variantOptions.forEach(option => {
      option.addEventListener('click', function() {
        const optionGroup = this.closest('.product__option-values');
        const options = optionGroup.querySelectorAll('.product__option-value');
        
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        
        // Update hidden input
        const variantInput = document.querySelector('#ProductSelect');
        if (variantInput) {
          // Logic to determine selected variant would go here
          // This is simplified and would need to be expanded based on your product structure
        }
      });
    });
  }
  
  // Product image gallery
  const productThumbnails = document.querySelectorAll('.product__image-thumbnail');
  const productMainImage = document.querySelector('#ProductPhotoImg');
  
  if (productThumbnails.length && productMainImage) {
    productThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-src');
        productMainImage.setAttribute('src', imgSrc);
        
        // Update zoom image if available
        if (productMainImage.hasAttribute('data-zoom-image')) {
          productMainImage.setAttribute('data-zoom-image', imgSrc.replace('large', 'master'));
        }
        
        // Update active state
        productThumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  
  // Product tabs
  const tabButtons = document.querySelectorAll('.product__tab-button');
  const tabContents = document.querySelectorAll('.product__tab-content');
  
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding tab content
        tabContents.forEach(content => content.classList.remove('active'));
        tabContents[index].classList.add('active');
      });
    });
  }
  
  // Add to cart functionality
  const addToCartForm = document.querySelector('#AddToCartForm');
  const cartNotification = document.querySelector('#cart-notification');
  
  if (addToCartForm) {
    addToCartForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate adding to cart
      if (cartNotification) {
        cartNotification.classList.add('active');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
          cartNotification.classList.remove('active');
        }, 5000);
      }
      
      // In a real implementation, you would use Shopify's AJAX API to add to cart
      // fetch('/cart/add.js', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     id: document.querySelector('#ProductSelect').value,
      //     quantity: document.querySelector('#Quantity').value
      //   })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Show notification
      //   cartNotification.classList.add('active');
      //   
      //   // Update cart count
      //   updateCartCount();
      // })
      // .catch(error => console.error('Error:', error));
    });
  }
  
  // Cart notification close
  const cartNotificationContinue = document.querySelector('.cart-notification__continue');
  
  if (cartNotificationContinue && cartNotification) {
    cartNotificationContinue.addEventListener('click', function() {
      cartNotification.classList.remove('active');
    });
  }
  
  // Wishlist functionality
  const wishlistButtons = document.querySelectorAll('.product-card__action.wishlist, .product__wishlist');
  const wishlistPopup = document.querySelector('#wishlist-popup');
  
  if (wishlistButtons.length && wishlistPopup) {
    wishlistButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle active state
        this.classList.toggle('active');
        
        // Show notification
        wishlistPopup.classList.add('active');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
          wishlistPopup.classList.remove('active');
        }, 3000);
      });
    });
  }
  
  // Wishlist popup close
  const wishlistPopupClose = document.querySelector('.wishlist-popup__close');
  
  if (wishlistPopupClose && wishlistPopup) {
    wishlistPopupClose.addEventListener('click', function() {
      wishlistPopup.classList.remove('active');
    });
  }
  
  // Collection filters toggle on mobile
  const filtersButton = document.querySelector('.collection__filters-button');
  const filters = document.querySelector('.collection__filters');
  
  if (filtersButton && filters) {
    filtersButton.addEventListener('click', function() {
      filters.classList.toggle('active');
    });
    
    // Close filters when clicking outside
    document.addEventListener('click', function(event) {
      if (filters.classList.contains('active') && 
          !filters.contains(event.target) && 
          !filtersButton.contains(event.target)) {
        filters.classList.remove('active');
      }
    });
  }
  
  // Collection sort functionality
  const sortSelect = document.querySelector('#SortBy');
  
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.href;
    });
    
    // Set initial value based on URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('sort_by')) {
      sortSelect.value = urlParams.get('sort_by');
    }
  }
  
  // Countdown timer for special offers
  const countdownElement = document.querySelector('.countdown-timer');
  
  if (countdownElement) {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24); // 24 hours from now
    
    function updateCountdown() {
      const now = new Date();
      const diff = endTime - now;
      
      if (diff <= 0) {
        countdownElement.innerHTML = 'Offer expired';
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Initial call
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
  }
  
  // Scroll down indicator
  const scrollIndicator = document.querySelector('.scroll-down-indicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const heroHeight = document.querySelector('.hero').offsetHeight;
      
      window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
      });
    });
    
    // Hide scroll indicator when scrolled past hero
    window.addEventListener('scroll', function() {
      const heroHeight = document.querySelector('.hero').offsetHeight;
      
      if (window.scrollY > heroHeight / 2) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    });
  }
});