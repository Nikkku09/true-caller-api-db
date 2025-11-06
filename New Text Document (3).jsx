import React from 'react';

// --- Product Data ---
const products = [
  {
    name: 'Watch',
    bgColor: 'bg-white-100', // Tailwind class
    imgSrc: 'https://inspireonline.in/cdn/shop/files/Apple_Watch_Ultra_2_49mm_Natural_Titanium_Ocean_Band_Navy_PDP_Image_Position_1__en-IN_3a507f25-c788-4a8c-8fd5-5a23d67e5af9.jpg?v=1727247515&width=1680'
  },
  {
    name: 'iphone',
    bgColor: 'bg-white-100',
    imgSrc: 'https://s3bg.cashify.in/gpro/uploads/2021/05/08095358/apple-iphone-14-pro-back-display.jpg?w=400'
  },
  {
    name: 'airpod',
    bgColor: 'bg-white-100',
    imgSrc: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-cto-hero-202503?wid=400&hei=400&fmt=jpeg&qlt=90&.v=Q2E5SzQzQ0daYWpuZGNscHpUSFFEZktybEU1S0RNR1JRamRyTlliVTJCd1ZOYmZXUnpWekhFcFdLRUF2UkJ6V3ZvdUZlR0V0VUdJSjBWaDVNVG95YkpXV0NKZlNobUJyZ1BoelRZL2FGamc'
  },
  {
    name: 'iPhone',
    bgColor: 'bg-white-100',
    imgSrc: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509?wid=976&hei=916&fmt=jpeg&qlt=90&.v=cmp4MmZ6OWxOeHNNTXh4SzlBNUpEb1RucE9zZTI5eEREaWZpY29lSld3eWVDYXovZDMyN1dXU211bjZoVlVUcWJGcXNRQnFCV0w3WVRjTExvdm1ic1YxRUxFRmRlWDBITzhnRmZ5OTRmaVdKTExiOEFsRmxtQ2Nua0tRSC83MkI'
  },
];

// --- Keyframes for the animation ---
// We inject this into the <head> or directly in the component.
// Each item is 8rem (h-32) + 0.9rem (mb-[0.9rem]) = 8.9rem
// 4 items = 35.6rem
const scrollAnimation = `
  @keyframes scroll {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-35.6rem); /* 8.9rem * 4 items */
    }
  }
  .animate-scroll {
    animation: scroll 12s linear infinite;
  }
`;

// --- Helper Components ---

// This is a helper component to keep the main App clean
const Product = ({ name, bgColor, imgSrc }) => (
  <div className={`h-32 w-32 ${bgColor} rounded-2xl flex items-center justify-center p-4 mb-[0.9rem]`}>
    <img
      src={imgSrc}
      alt={name}
      className="w-24 h-24 object-contain"
      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100?text=${name}`; }}
    />
  </div>
);

// The main component
export default function App() {
  // We duplicate the array for the seamless loop
  const seamlessProducts = [...products, ...products];
  
  return (
    // AppWrapper (replaces <body>)
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 font-sans">
      {/* We add the keyframes CSS via a <style> tag */}
      <style>{scrollAnimation}</style>
      
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full overflow-hidden">
        {/* ContentWrapper */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Side: Text Content */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Refer & Win
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              MacBook, iPhone, Apple Watch, Cash and more!
            </p>
            {/* ButtonWrapper */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#" 
                className="inline-block text-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
              >
                Refer now
              </a>
              <a 
                href="#" 
                className="inline-block text-center bg-transparent text-gray-800 font-semibold py-3 px-8 rounded-full ring-2 ring-gray-300 hover:bg-gray-100 transition-all duration-300"
              >
                Know more
              </a>
            </div>
          </div>
          {/* End Left Side */}

          {/* Right Side: Animated Image Scroller */}
          <div className="w-full md:w-36 flex items-center justify-center">
            {/* MaskContainer */}
            <div className="h-56 w-36 overflow-hidden rounded-2xl">
              {/* ScrollingContainer */}
              <div className="animate-scroll">
                {seamlessProducts.map((product, index) => (
                  <Product
                    key={index}
                    name={product.name}
                    bgColor={product.bgColor}
                    imgSrc={product.imgSrc}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}