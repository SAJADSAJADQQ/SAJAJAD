// Product Data















































// بيانات المنتجات الأكثر مبيعاً (منفصلة تماماً)
const bestSellersData = [
    {
        id: 201,
        title: "ULTIMATE NUTRITION C4 Pre-Workout",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "sss1.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        sales: 2987,
        rating: 4.8,
        badge: "BEST SELLER"
    },
    {
        id: 202,
        title: "USN Professional Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "sss1.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        sales: 1987,
        rating: 4.5,
        badge: "TOP SELLER"
    },
    {
        id: 203,
        title: "DYMATIZE ISO 100 Hydrolyzed Protein",
        category: "amino",
        description: "100% hydrolyzed whey protein isolate",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "sss1.jpg",
        specifications: [
            "25g hydrolyzed whey protein isolate",
            "Zero fat and sugar",
            "Easy digestion and fast absorption",
            "71 servings per container"
        ],
        sales: 2210,
        rating: 4.7,
        badge: "HOT SELLER"
    },
    {
        id: 204,
        title: "ANIMAL PRE-WORKOUT",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "sss1.jpg",
        specifications: [
            "Boosts energy and focus within 20 minutes",
            "Enhances endurance and performance",
            "Supports nitric oxide production",
            "44 servings per container"
        ],
        sales: 2456,
        rating: 4.6,
        badge: "POPULAR"
    }
];

// توليد النجوم للتقييم
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// عرض المنتجات الأكثر مبيعاً في السلايدر
function displayBestSellers() {
    const bestSellerSwiperWrapper = document.querySelector('.bestSellerSwiper .swiper-wrapper');
    if (!bestSellerSwiperWrapper) return;
    
    bestSellerSwiperWrapper.innerHTML = '';
    
    const sortedProducts = [...bestSellersData].sort((a, b) => b.sales - a.sales);
    
    sortedProducts.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="best-seller-badge">${product.badge}</div>
            <div class="sales-badge">
                <i class="fas fa-fire"></i>
                <span>${product.sales.toLocaleString()} sold</span>
            </div>
            
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            
            <div class="product-info">
                <span class="product-category">${categoryTranslations[product.category] || product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-text">${product.rating}/5</span>
                </div>
                
                <div class="product-price">
                    <span class="price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                
                <button class="view-details bestseller-view" data-id="${product.id}" data-type="bestseller">View Details</button>
            </div>
        `;
        
        bestSellerSwiperWrapper.appendChild(slide);
    });
    
    // إضافة event listeners
    document.querySelectorAll('.bestseller-view').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openBestSellerProductModal(productId);
        });
    });
}

// دالة لفتح نافذة المنتج الأكثر مبيعاً
function openBestSellerProductModal(productId) {
    const product = bestSellersData.find(p => p.id === productId);
    
    if (!product) {
        console.error('Best seller product not found:', productId);
        return;
    }
    
    // تعبئة البيانات
    const modalImg = document.getElementById('modal-product-img');
    const modalTitle = document.getElementById('modal-product-title');
    const modalCategory = document.getElementById('modal-product-category');
    const modalPrice = document.getElementById('modal-product-price');
    const modalOriginalPrice = document.getElementById('modal-product-original-price');
    const modalSpecs = document.getElementById('modal-product-specs');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (modalImg && modalTitle) {
        modalImg.src = product.image;
        modalImg.alt = product.title;
        modalTitle.textContent = product.title;
        modalCategory.textContent = categoryTranslations[product.category] || product.category;
        modalCategory.className = 'product-category';
        modalPrice.textContent = product.price;
        
        if (product.originalPrice) {
            modalOriginalPrice.textContent = product.originalPrice;
            modalOriginalPrice.style.display = 'inline';
        } else {
            modalOriginalPrice.style.display = 'none';
        }
        
        // المواصفات
        modalSpecs.innerHTML = '';
        product.specifications.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            modalSpecs.appendChild(li);
        });
        
        // تحديث رابط الواتساب
        const productName = encodeURIComponent(product.title);
        const price = encodeURIComponent(product.price);
        whatsappBtn.href = `https://wa.me/07800925175?text=I'm%20interested%20in%20${productName}%20(${price})`;
        
        // عرض النافذة
        const modal = document.querySelector('.product-modal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// تهيئة سلايدر المنتجات الأكثر مبيعاً
function initBestSellerSwiper() {
    if (document.querySelector('.bestSellerSwiper')) {
        window.bestSellerSwiper = new Swiper('.bestSellerSwiper', {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: '.best-seller-slider .swiper-button-next',
                prevEl: '.best-seller-slider .swiper-button-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                }
            },
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            speed: 800,
        });
        
        console.log('✅ Best seller slider initialized');
        return window.bestSellerSwiper;
    }
    return null;
}

// تهيئة الصفحة للمنتجات الأكثر مبيعاً
document.addEventListener('DOMContentLoaded', function() {
    displayBestSellers();
    initBestSellerSwiper();
    
    console.log('✅ Best sellers system loaded');
});



































const products = [
    // OPTIMUM NUTRION Products
    {
        id: 1,
        title: "Gold Standard 100% Whey Protein Powder",
        category: "protein",
        description: "Gold Standard 100% Whey - World's best-selling whey protein",
        price: "$79.99",
        originalPrice: "$89.99",
        image: "s1.jpg",
        specifications: [
            "24g of high-quality, fast-absorbing premium whey protein powder per serving",
            "5.5g of BCAA in each servings",
            "Mix one scoop with water, milk or into your favourite smoothie",
            "Gluten-free",
            "Mix one scoop with water, milk or into your favourite smoothie",
            "Low in sugars and less than 120 calories"
        ],
        featured: false
    },
    {
        id: 2,
        title: "Micronised Creatine Powder",
        category: "protein",
        description: "High-quality casein for sustained amino acid release",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s2.jpg",
        specifications: [
            "Made from 100% creatine monohydrate",
            "3g of creatine monohydrate per serving",
            "Ideal for nighttime use",
            "Mixes easily with no gritty taste or texture",
            "Available in flavoured and unflavoured options"
        ],
        featured: false
    },
    {
        id: 3,
        title: "Serious Mass Weight Gainer Protein Powder",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$34.99",
        originalPrice: "$39.99",
        image: "s3.jpg",
        specifications: [
            "24g sustained-release casein protein",
            "Provides over 1,250 kcal per serving to fuel your goals.",
            "Supports muscle growth and recovery",
            "3 g Creatine ",
            "250 g Carbs"
        ],
        featured: false
    },

    {
        id: 4,
        title: "OPTIMUM NUTRION AMINO ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$34.99",
        originalPrice: "$39.99",
        image: "s4.jpg",
        specifications: [
            "FULL AMINO ACID SPECTRUM ",
            "320 TABLETS ",
            "160 SERVINGS ",
            "DIETARY SUPPLEMNT ",
            "200 servings per container"
        ],
        featured: false
    },

    // NUTREX RESEARCH Products
    {
        id: 5,
        title: "IsoFit 2 lb",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s5.jpg",
        specifications: [
            "High Protein Purity - Low Fats, Carbs, Sugars",
            "Fast Absorbing – Easy to Digest",
            "Delicious Taste – Premium Dessert Flavors",
            "Supports Muscle Growth + Recovery",
            "Supports Muscle Growth + Recovery"
        ],
        featured: false
    },
     {
        id: 6,
        title: "Lipo-6 Hers UC",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s6.jpg",
        specifications: [
            "Accelerated Fat Loss & Boosted Metabolic Rate",
            "Advanced Appetite Control for Women",
            "Hair & Beauty Complex",
            "Liquid-Cap Technology for Quick Results",
           
        ],
        featured: false
    },
     {
        id: 7,
        title: "IsoFit 5 lb",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s7.jpg",
        specifications: [
            "High Protein Purity - Low Fats, Carbs, Sugars",
            "Fast Absorbing – Easy to Digest",
            "Delicious Taste – Premium Dessert Flavors",
            "Supports Muscle Growth + Recovery",
            "Clinician’s Choice Product"
        ],
        featured: false
    },
     {
        id: 8,
        title: "Mass Infusion - 12 lb",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s8.jpg",
        specifications: [
            "High-Calorie Formula for Rapid Mass Gain ",
            "Triple Protein Blend for Fast and Sustained Muscle Support ",
            "Supports Muscle Recovery and Growth ",
            "Ideal for Post-Workout or Meal Replacement ",
         
        ],
        featured: false
    },
    {
        id: 9,
        title: "T-Up Max",
        category: "creatine",
        description: "Branched-chain amino acids in 2:1:1 ratio",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s9.jpg",
        specifications: [
            "Naturally Boosts Testosterone Levels ",
            "Enhances Strength and Muscle Gains ",
            "Increases Stamina and Endurance ",
            "Supports Sexual Health and Vitality "
        ],
        featured: false
    },

     {
        id: 10,
        title: "L-Arginine",
        category: "creatine",
        description: "Branched-chain amino acids in 2:1:1 ratio",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s10.jpg",
        specifications: [
            "Enhances Blood Flow and Circulation ",
            "Supports Protein Synthesis for Muscle Growth ",
            "Boosts Nitric Oxide Production for Better Pumps ",
            "Promotes Hormone Release for Overall Performance "
        ],
        featured: false
    },


    // ANIMAL Products
    {
        id: 11,
        title: "Animal Pak",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s11.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond"
        ],
        featured: false
    },
      {
        id: 12,
        title: "Animal Stak",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s12.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond"
        ],
     
    },
      {
        id: 13,
        title: "ANIMAL PRE-WORKOUT",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s13.jpg",
        specifications: [
            "Boosts energy and focus within 20 minutes",
            "Enhances endurance and performance",
            "Supports nitric oxide production",
            "44 servings per container"
        ],
       
    },
      {
        id: 14,
        title: "Animal Cuts",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s14.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond"
        ],
     
    },
    {
        id: 15,
        title: "Animal Test",
        category: "energy",
        description: "Essential amino acids for athletes",
        price: "$39.99",
        originalPrice: "$44.99",
        image: "s15.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond"
        ],
        
    },

      {
        id: 16,
        title: "Animal Cuts",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s16.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond"
        ],
        featured: false
    },

    // DYMATIZ Products
    {
        id: 17,
        title: "Elite Casein®",
        category: "amino",
        description: "100% hydrolyzed whey protein isolate",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s17.jpg",
        specifications: [
            "Protein 25g",
            "Calories 130",
            "BCAAs5.3g",
            "Leucine 2.3g"
        ],
        featured: false
    },
     {
        id: 18,
        title: "ISO 100",
        category: "amino",
        description: "100% hydrolyzed whey protein isolate",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s18.jpg",
        specifications: [
            "Protein 25g",
            "Calories 120",
            "Sugar 1g",
            "BCAAs 5.5g"
        ],
        featured: false
    },
    {
        id: 19,
        title: "ISO 100",
        category: "amino",
        description: "Micronized creatine for fast dissolution",
        price: "$29.99",
        originalPrice: "$34.99",
        image: "s19.jpg",
        specifications: [
            "Protein 25g",
            "Calories 120",
            "Sugar 1g",
            "BCAAs 5.5g"
        ],
        featured: false
    },

    // MUSCLETECH Products
    {
        id: 20,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s20.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 21,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s21.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured:false
    },

     {
        id: 22,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s22.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 23,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s23.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured:false
    },

     {
        id: 24,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s24.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 25,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s25.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 26,
        title: "EXTRIFIT ",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s26.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 27,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s27.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 28,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s28.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 29,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s29.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 30,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s30.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 31,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s31.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 32,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s32.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 34,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s34.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 35,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s35.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id:36,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s36.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },



     {
        id: 37,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s37.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },
   
    // BSN Products
    {
        id: 38,
        title: "FLEXX EAAs",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s38.jpg",
        specifications: [
            "CALORIES 5",
            "CALCIUM 50 MG ",
            "MAGNESIUM 50 MG",
            "SODIUM 100 MG ",
            "FLEXX BCAA 6G"
        ],
        featured: false
    },
   {
        id:39,
        title: "Vitamin D3+K2",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s39.jpg",
        specifications: [
            "VITAMIN D3 125MCG",
            "VITAMIN K2 100MCG ",
            
        ],
        featured: false
    },

     {
        id: 40,
        title: "CREATINE MONOHYDRATE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s40.jpg",
        specifications: [
            "CREATINE 5 G",
            "MONOHYDRATE 5G",
            "CLINICALLY SHOWN TO IMPROVE MUSCLE STRENGTH",
            "PHOSPHOCREATINE / ATP SUPPORT ",
           
        ],
        featured: false
    },


     {
        id: 41,
        title: "Testrol Gold ES",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s41.jpg",
        specifications: [
            "VITAMIN B6 10MG",
            "FOLATE 500MCG",
            "VITAMIN B12 50MCG",
            "ZINC 15MG",
            "CELENIUM 50MCG "
        ],
        featured: false
    },



     {
        id: 42,
        title: "TRIBULUS",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s42.jpg",
        specifications: [
            "SERVING SIZE 1VEGETABLE ",
            "SERVING PER CONTAINER 90",
            "TRIBULUS FRUIT EXTRACT 750 MG",
            
        ],
        featured: false
    },


     {
        id: 43,
        title: "CAFFEINE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s43.jpg",
        specifications: [
            "CALCIUM 75MG",
            "CAFFEINE ANHYDROUS 200MG",
            "BOOST ENERGY & ENDURANCE ",
            "FASTER REACTION TIME ",
        
        ],
        featured: false
    },


     {
        id: 45,
        title: "CREATINE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s45.jpg",
        specifications: [
               "CREATINE 5 G",
            "MONOHYDRATE 5G",
            "CLINICALLY SHOWN TO IMPROVE MUSCLE STRENGTH",
            "PHOSPHOCREATINE / ATP SUPPORT ",
        ],
        featured: false
    },


     {
        id: 46,
        title: "L-CARNITINE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s46.jpg",
        specifications: [
            "HELPS CONVERT FOOD TO ENERGY",
            "FUELS FAT LOSS & SUPPORTS ENDURANCE ",
            "HELPS TO MAXIMIZE MUSCLE CARNITNE CONCENTATIONS ",
            "CARNITINE 500MG",
           
        ],
        featured: false
    },

    // ULTIMATE NUTRITION Products
    {
        id: 48,
        title: "CELLUCOR C4 Pre-Workout",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s48.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },


     {
        id: 49,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s49.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },

     {
        id: 50,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s50.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },

     {
        id: 51,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s51.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },

     {
        id: 52,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s52.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },



     {
        id: 53,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s53.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },


     {
        id: 54,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s54.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },




     {
        id: 56,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s56.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },





     {
        id: 57,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s57.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },





     {
        id: 58,
        title: "ULTIMATE NUTRITION",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "s58.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        featured: false
    },




   

    // JYM Supplement Science Products
    {
        id: 56,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s56.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 57,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s57.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },

      {
        id: 58,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s58.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },
      {
        id: 59,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s59.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },

      {
        id: 60,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s60.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },

      {
        id: 61,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s61.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },


      {
        id: 62,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s62.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },



      {
        id: 63,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s63.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },


      {
        id: 64,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s64.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },

      {
        id: 65,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s65.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },

      {
        id: 67,
        title: "USN Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s67.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        featured: false
    },


    

    // RSP Products
    {
        id: 68,
        title: "RSP TrueFit Protein Powder",
        category: "MUSCLETECH",
        description: "Complete protein and superfood blend",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s68.jpg",
        specifications: [
            "25g protein per serving",
            "Superfood and veggie blend",
            "Digestive enzymes",
            "Great taste and mixability",
            "28 servings per container"
        ],
        featured:false
    },
    {
        id: 69,
        title: "RSP AminoLean Energy Drink",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s69.jpg",
        specifications: [
            "5g amino acids",
            "Natural energy and focus",
            "Supports fat loss",
            "0 sugar, low calorie",
            "30 servings per container"
        ],
        featured: false
    },



    {
        id: 70,
        title: "RSP AminoLean Energy Drink",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s70.jpg",
        specifications: [
            "5g amino acids",
            "Natural energy and focus",
            "Supports fat loss",
            "0 sugar, low calorie",
            "30 servings per container"
        ],
        featured: false
    },


    {
        id: 71,
        title: "RSP AminoLean Energy Drink",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s71.jpg",
        specifications: [
            "5g amino acids",
            "Natural energy and focus",
            "Supports fat loss",
            "0 sugar, low calorie",
            "30 servings per container"
        ],
        featured: false
    },



    {
        id: 72,
        title: "RSP AminoLean Energy Drink",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s72.jpg",
        specifications: [
            "5g amino acids",
            "Natural energy and focus",
            "Supports fat loss",
            "0 sugar, low calorie",
            "30 servings per container"
        ],
        featured: false
    },



    {
        id: 73,
        title: "RSP AminoLean Energy Drink",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s73.jpg",
        specifications: [
            "5g amino acids",
            "Natural energy and focus",
            "Supports fat loss",
            "0 sugar, low calorie",
            "30 servings per container"
        ],
        featured: false
    },

    {
        id: 74,
        title: "RSP AminoLean Energy Drink",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s74.jpg",
        specifications: [
            "5g amino acids",
            "Natural energy and focus",
            "Supports fat loss",
            "0 sugar, low calorie",
            "30 servings per container"
        ],
        featured: false
    },
    // BPI Sports Products
    {
        id: 75,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "75.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 76,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "76.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 77,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "77.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 78,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "78.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 79,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "79.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 80,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "80.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 81,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "81.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 82,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "82.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 83,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "83.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 84,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "84.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 85,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "85.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 86,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "86.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 87,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "87.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 88,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "88.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 89,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "90.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 91,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "91.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 92,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "92.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     {
        id: 93,
        title: "BPI SPORTS Best Protein",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "93.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
    
    // EVOGEN Products
    {
        id: 94,
        title: "EVOGEN EVP Plus Pre-Workout",
        category: "INSANE LABZ",
        description: "Professional-grade pre-workout",
        price: "$64.99",
        originalPrice: "$74.99",
        image: "94.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Enhanced pumps and vascularity",
            "No artificial colors",
            "30 servings per container"
        ],
        featured: false
    },
    {
        id: 95,
        title: "EVOGEN IsoJect Protein",
        category: "INSANE LABZ",
        description: "Ultra-pure whey protein isolate",
        price: "$79.99",
        originalPrice: "$89.99",
        image: "95.jpg",
        specifications: [
            "26g pure whey isolate",
            "Zero fat and lactose",
            "Instant mixing formula",
            "Great tasting flavors",
            "27 servings per container"
        ],
        featured: false
    },
    {
        id: 96,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "96.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 97,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "97.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 98,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "98.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 99,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "99.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 100,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "100.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 101,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "101.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 102,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "102.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 103,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "103.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 104,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "104.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 105,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "105.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 106,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "106.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 107,
        title: "EVOGEN GlycoJect Carbs",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "107.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
    

    // REDCON1 Products
    {
        id: 108,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "108.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 109,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "109.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 110,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "110.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 111,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "111.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 112,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "112.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 113,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "113.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 114,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "114.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 115,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "115.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 116,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "116.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 117,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "117.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },
     {
        id: 118,
        title: "REDCON1 Total War Pre-Workout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "118.jpg",
        specifications: [
            "Extreme energy and focus",
            "Enhanced pumps and endurance",
            "No artificial flavors",
            "Military-inspired formula",
            "30 servings per container"
        ],
        featured: false
    },

    // KAGED MUSCLE Products
    {
        id: 45,
        title: "KAGED MUSCLE In-Kaged Pre-Workout",
        category: "kaged",
        description: "Clean, stimulant-based pre-workout",
        price: "$54.99",
        originalPrice: "$64.99",
        image: "s45.jpg",
        specifications: [
            "Sustained energy without crash",
            "Enhanced focus and endurance",
            "No artificial colors or dyes",
            "Third-party tested",
            "30 servings per container"
        ],
        featured: false
    },
    {
        id: 46,
        title: "KAGED MUSCLE Re-Kaged Protein",
        category: "kaged",
        description: "Ultra-clean protein powder",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s46.jpg",
        specifications: [
            "28g hydrolyzed protein",
            "Zero sugar and fat",
            "Fast absorption",
            "Excellent mixability",
            "20 servings per container"
        ],
        featured: false
    },
    {
        id: 47,
        title: "KAGED MUSCLE Creatine HCl",
        category: "kaged",
        description: "Highly soluble creatine",
        price: "$39.99",
        originalPrice: "$44.99",
        image: "s47.jpg",
        specifications: [
            "Creatine hydrochloride",
            "Increased solubility",
            "Reduced water retention",
            "Easy to mix",
            "120 servings per container"
        ],
        featured: false
    },

    // GHOST Products
    {
        id: 1000,
        title: "GHOST Whey Protein",
        category: "ghost",
        description: "Transparent label protein",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "sss1.jpg",
        specifications: [
            "Fully disclosed label",
            "Great tasting flavors",
            "No proprietary blends",
            "Transparent ingredient list",
            "25 servings per container"
        ],
        featured: true
    },
    {
        id: 1000,
        title: "GHOST Legend Pre-Workout",
        category: "ghost",
        description: "Fully transparent pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "sss1.jpg",
        specifications: [
            "Fully disclosed formula",
            "No proprietary blends",
            "Great energy and focus",
            "Awesome flavor collaborations",
            "30 servings per container"
        ],
        featured: true
    },
    {
        id: 1000,
        title: "GHOST BCAA",
        category: "ghost",
        description: "Transparent BCAA formula",
        price: "$34.99",
        originalPrice: "$39.99",
        image: "sss1.jpg",
        specifications: [
            "4.5g BCAA per serving",
            "Fully transparent label",
            "Great tasting flavors",
            "No artificial colors",
            "30 servings per container"
        ],
        featured: true
    }
];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const featuredSwiperWrapper = document.querySelector('.featuredSwiper .swiper-wrapper');
const modal = document.querySelector('.product-modal');
const closeModal = document.querySelector('.close-modal');
const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav-list');
const dropdowns = document.querySelectorAll('.dropdown');

// Category Translations - Now showing brand names
const categoryTranslations = {
    protein: "OPTIMUM NUTRION",
    creatine: "NUTREX RESEARCH",
    energy: "ANIMAL",
    amino: "DYMATIZ",
    muscletech: "EXTRIFIT",
    bsn: "GAT SPORT",
    cellucor: "ULTIMATE NUTRITION",
    gnc: "USN",
    jym: "MUSCLETECH",
    rsp: "RONNIE COLEMAN",
    bpi: "INSANE LABZ",
    evogen: "DY NUTRITION",
    redcon: "REDCON1",
    kaged: "KAGED MUSCLE",
    ghost: "GHOST"
};

// Swiper instances
let featuredSwiper = null;
let categorySwiper = null;

// Initialize Swipers
function initSwipers() {
    // Featured Products Swiper
    if (document.querySelector('.featuredSwiper')) {
        featuredSwiper = new Swiper('.featuredSwiper', {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                }
            },
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
        });
    }
    
    // Category Swiper
    if (document.querySelector('.categorySwiper')) {
        categorySwiper = new Swiper('.categorySwiper', {
            slidesPerView: 2,
            spaceBetween: 15,
            navigation: {
                nextEl: '.cat-next',
                prevEl: '.cat-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 8,
                    spaceBetween: 20,
                }
            },
            centeredSlides: false,
            observer: true,
            observeParents: true,
        });
    }
}

// Display Featured Products in Slider
function displayFeaturedProducts() {
    if (!featuredSwiperWrapper) return;
    
    featuredSwiperWrapper.innerHTML = '';
    
    const featuredProducts = products.filter(product => product.featured);
    
    if (featuredProducts.length === 0) {
        featuredSwiperWrapper.innerHTML = '<div class="no-featured">No featured products available</div>';
        return;
    }
    
    featuredProducts.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${categoryTranslations[product.category] || product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <button class="view-details" data-id="${product.id}">View Details</button>
            </div>
        `;
        
        featuredSwiperWrapper.appendChild(slide);
    });
    
    // Update Swiper if it exists
    if (featuredSwiper) {
        featuredSwiper.update();
    }
    
    // Add event listeners to view details buttons in slider
    document.querySelectorAll('.featured-slider .view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductModal(productId);
        });
    });
}

// Display Products in Grid
function displayProducts(category = 'all') {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found in this category</div>';
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${categoryTranslations[product.category] || product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <button class="view-details" data-id="${product.id}">View Details</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
        
        // Animate each product card
        setTimeout(() => {
            productCard.style.transition = 'all 0.4s ease';
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, index * 80);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductModal(productId);
        });
    });
}

// Filter Products by Category (Brand)
function filterProducts(category) {
    // Remove active class from all slides
    document.querySelectorAll('.category-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Add active class to the appropriate slide
    const activeSlide = document.querySelector(`.category-slide[data-category="${category}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
        
        // Move swiper to active slide
        if (categorySwiper) {
            const slideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
            categorySwiper.slideTo(slideIndex);
        }
    }
    
    // Display filtered products
    displayProducts(category);
}

// Open Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Fill product data in modal
    const modalImg = document.getElementById('modal-product-img');
    const modalTitle = document.getElementById('modal-product-title');
    const modalCategory = document.getElementById('modal-product-category');
    const modalPrice = document.getElementById('modal-product-price');
    const modalOriginalPrice = document.getElementById('modal-product-original-price');
    const modalSpecs = document.getElementById('modal-product-specs');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (!modalImg || !modalTitle || !modalCategory || !modalPrice || !modalSpecs || !whatsappBtn) {
        console.error('Modal elements not found');
        return;
    }
    
    modalImg.src = product.image;
    modalImg.alt = product.title;
    modalTitle.textContent = product.title;
    modalCategory.textContent = categoryTranslations[product.category] || product.category;
    modalCategory.className = 'product-category';
    
    // Original price
    if (product.originalPrice) {
        modalOriginalPrice.textContent = product.originalPrice;
        modalOriginalPrice.style.display = 'inline';
    } else {
        modalOriginalPrice.style.display = 'none';
    }
    
    // Price
    modalPrice.textContent = product.price;
    
    // Specifications
    modalSpecs.innerHTML = '';
    product.specifications.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
    });
    
    // Update WhatsApp link
    const productName = encodeURIComponent(product.title);
    const price = encodeURIComponent(product.price);
    whatsappBtn.href = `https://wa.me/7800925175?text=I'm%20interested%20in%20${productName}%20(${price})`;
    
    // Show modal with animation
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
}

// Close Product Modal
function closeProductModal() {
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Mobile Menu Toggle
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
}

// Mobile Dropdowns
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    if (link) {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeProductModal();
    }
});

// Close modal with close button
closeModal.addEventListener('click', closeProductModal);

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
            
            // Close dropdowns on mobile
            if (window.innerWidth <= 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-toggle')) {
        navList.classList.remove('active');
    }
});

// Add active class to nav links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swipers
    initSwipers();
    
    // Display featured products in slider
    displayFeaturedProducts();
    
    // Display all products in grid
    displayProducts();
    
    // Add event listeners for category slides
    document.querySelectorAll('.category-slide').forEach(slide => {
        slide.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Touch events for better mobile experience
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    console.log('AMZON Premium Supplements website loaded successfully');
});