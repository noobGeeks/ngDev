import React, { useState, useEffect, useRef } from 'react';
// Import only the Lucide React icons that are consistently available
import { Menu, X, Briefcase, Code, PenTool, Globe, Mail, Phone, MapPin, Linkedin, Github, Twitter, Moon, Sun, ArrowLeft } from 'lucide-react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Define project data outside components to be accessible by all relevant components
const allProjectsData = [
  {
    id: 1,
    title: 'GINO Nicotine Pouches',
    category: 'Project from scratch',
    imageUrl: 'https://i.postimg.cc/k5mydgSK/strawberry-Watermelon-open-Lid-render-camera-n3d2.png', // This image remains as provided by user
    description: 'This project was created by me from scratch meaning designing the logo, packaging labels, 3D viusals, animations and much more.',
    cost: '$300 ~ $500', // Added project cost
  },
  {
    id: 2,
    title: 'Box Design',
    category: 'Die Lines, Hot Stamping...',
    imageUrl: 'https://i.postimg.cc/2y0Wbn0N/final-delivery.png', // Updated dimensions
    description: 'Box design for a clothing brand combined with the 3D models of the box.',
    cost: '$150 ~ $250', // Added project cost
  },
  {
    id: 3,
    title: 'Product Render',
    category: '3D Modeling',
    imageUrl: 'https://i.postimg.cc/tCf1Kqfk/all-white-bg.png', // Updated dimensions
    description: 'High-fidelity 3D model and photorealistic rendering of a water bottle company.',
    cost: '$800 ~ $1800', // Added project cost
  },
  {
    id: 4,
    title: 'PEAK Nicotine Pouches',
    category: 'Project from scratch',
    imageUrl: 'https://i.postimg.cc/KYcRL1gZ/side-anglefinals-Camera.png', // Updated dimensions
    description: 'Intuitive and modern design created by me from scratch meaning designing the logo, packaging labels, 3D viusals, animations and much more.',
    cost: '$1200 ~ $2500', // Added project cost
  },
  {
    id: 5,
    title: 'P Nicotine Pouches',
    category: '3D Design + Packaging Labels',
    imageUrl: 'https://i.postimg.cc/zvTg79D5/1.png', // Updated dimensions
    description: 'Immersive 3D visualization and walkthrough of a contemporary snus brand.',
    cost: '$200 ~ $300', // Added project cost
  },
  {
    id: 6,
    title: 'Design for a cosmetics company',
    category: '3D Modeling + Labeling',
    imageUrl: 'https://i.postimg.cc/wT6vnt0D/final-delivery.png', // Updated dimensions
    description: 'Collection of optimized 3D models and textures for a professional brand.',
    cost: '$250 ~ $350', // Added project cost
  },
  {
    id: 7,
    title: 'Nootropic Pouches',
    category: 'Project from scratch',
    imageUrl: 'https://i.postimg.cc/90xj6fQB/all.png', // Updated dimensions
    description: 'Designing projects from scratch to perfectionism.',
    cost: '$400 ~ $500', // Added project cost
  },
  {
    id: 8,
    title: 'Zr0 Nicotine Pouches',
    category: 'Project from scratch',
    imageUrl: 'https://i.postimg.cc/RF45qt3R/color-4.png', // Updated dimensions
    description: 'Full project from scract designing from logos to the final product.',
    cost: '$5000 ~ $10000', // Added project cost
  },
    {
    id: 9,
    title: 'NIKO Nicotine Pouches',
    category: 'Project from scratch',
    imageUrl: 'https://i.postimg.cc/SRRPzfmW/4-Camera.png', // Updated dimensions
    description: 'Collection of illustrative + creative and 3d skill to achieve the final perfect product.',
    cost: '$350 ~ $500', // Added project cost
  },
      {
    id: 10,
    title: 'BLISS Nicotine Pouches',
    category: 'Touch up project',
    imageUrl: 'https://i.postimg.cc/G287LhKQ/1-Camera.png', // Updated dimensions
    description: 'Minor changes to the design combined with a 3D animation of the can opening.',
    cost: '$150 ~ $250', // Added project cost
  },
        {
    id: 11,
    title: 'VEX Nicotine Pouches',
    category: 'SNUS Project',
    imageUrl: 'https://i.postimg.cc/X738hgRx/side-angle.png', // Updated dimensions
    description: 'Minor changes to the design combined with a 3D animation of the can opening.',
    cost: '$150 ~ $250', // Added project cost
  },
          {
    id: 12,
    title: 'Relax Nicotine Pouches',
    category: 'Nicotine pouches project',
    imageUrl: 'https://i.postimg.cc/C1G8H3x0/side-angle-Camera.png', // Updated dimensions
    description: 'With its fuity touch this project was fun to create was as usuall this prject was finished in perfection',
    cost: '$150 ~ $250', // Added project cost
  },
            {
    id: 13,
    title: 'HEFE Nicotine Pouches prototype project',
    category: 'Prototype snus project',
    imageUrl: 'https://i.postimg.cc/GpktZkwJ/3-Camera.png', // Updated dimensions
    description: 'This project was created from scratch and completed with in 30 minutes as per client demand',
    cost: '$150 ~ $250', // Added project cost
  },
              {
    id: 14,
    title: 'Advertisment for Nicotine Pouches',
    category: 'Eye catching Commercial ads',
    imageUrl: 'https://i.postimg.cc/YSwqfhG4/1.png', // Updated dimensions
    description: 'This project was a commercial ad project which left the client utterly satisfied',
    cost: '$150 ~ $250', // Added project cost
  },
                {
    id: 15,
    title: 'Red Fox Nicotine Pouches',
    category: 'Snus Design from scratch',
    imageUrl: 'https://i.postimg.cc/9fpVd1HS/side-angle1-Camera-2-Copy.png', // Updated dimensions
    description: 'A project which ended in a very unique and minimal designs. In short words it was out of the box',
    cost: '$350 ~ $500', // Added project cost
  },
                  {
    id: 16,
    title: 'SNAU Nicotine Pouches',
    category: 'Snus Design from scratch',
    imageUrl: 'https://i.postimg.cc/RhjzSDw3/stager-Camera.png', // Updated dimensions
    description: 'A unique project with selected targeted audience where the client had very unique ideas to represent his brand',
    cost: '$350 ~ $500', // Added project cost
  },
                    {
    id: 17,
    title: 'VITNIC Nicotine Pouches',
    category: 'Vitamins Infused Snus',
    imageUrl: 'https://i.postimg.cc/gJj9vWDX/cherry-burst-Camera.png', // Updated dimensions
    description: 'A completely new idea of infusing vitamins in nicotine pouches as new idea to the market.',
    cost: '$500 ~ $900', // Added project cost
  },
];

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  const modalContentRef = useRef(null);

  // Close modal when clicking outside of the content
  const handleOverlayClick = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalContentRef}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl font-bold leading-none focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Project Image */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-auto rounded-lg mb-4 object-contain max-h-[70vh]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/1280x769/cccccc/333333?text=Image+Error`; // Fallback for modal
          }}
        />

        {/* Project Title */}
        <h3 className="text-3xl font-bold text-center text-orange-500 mb-2">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-2">
          {project.description}
        </p>
        {/* Project Cost */}
        {project.cost && (
          <p className="text-md text-gray-600 dark:text-gray-400 text-center font-semibold">
            Project Cost: {project.cost}
          </p>
        )}
      </div>
    </div>
  );
};


// Custom SVG Icons (defined here to be accessible and avoid re-declaration)
// Fiverr Icon
const FiverrIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
  >
    <path d="M2.139 20.299h2.002v-4.446h1.904v4.446h1.988v-6.091h-3.893v-0.377c-0-0.003-0-0.006-0-0.010 0-0.368 0.298-0.666 0.666-0.666 0.032 0 0.064 0.002 0.095 0.007l-0.004-0h1.147v-1.645h-1.48c-0.068-0.008-0.148-0.012-0.228-0.012-1.215 0-2.2 0.985-2.2 2.2 0 0.002 0 0.004 0 0.005v-0 0.5h-1.133v1.645h1.135v4.445zM10.387 20.299h1.769l2.208-6.091h-2.024l-1.075 3.545-1.097-3.545h-2.016l2.233 6.091zM18.074 16.549c-0.034-0.566-0.501-1.013-1.073-1.013-0.013 0-0.027 0-0.040 0.001l0.002-0c-0.030-0.003-0.065-0.005-0.101-0.005-0.565 0-1.024 0.453-1.034 1.016v0.001zM20.026 17.73h-4.198c0.048 0.604 0.55 1.076 1.163 1.076 0.033 0 0.066-0.001 0.099-0.004l-0.004 0c0.039 0.005 0.083 0.008 0.128 0.008 0.41 0 0.761-0.252 0.907-0.61l0.002-0.007 1.781 0.5c-0.474 1.017-1.488 1.709-2.663 1.709-0.055 0-0.109-0.002-0.163-0.004l0.008 0c-0.035 0.001-0.077 0.002-0.118 0.002-1.694 0-3.068-1.373-3.068-3.068 0-0.027 0-0.054 0.001-0.081l-0 0.004c-0.003-0.050-0.005-0.108-0.005-0.166 0-1.638 1.328-2.966 2.966-2.966 0.035 0 0.070 0.001 0.105 0.002l-0.005-0c0.060-0.004 0.13-0.007 0.2-0.007 1.596 0 2.89 1.294 2.89 2.89 0 0.044-0.001 0.088-0.003 0.132l0-0.006c0 0.28-0.012 0.462-0.025 0.596zM28.506 15.854h-1.062c-0.682 0-1.050 0.512-1.050 1.365v3.082h-2.012v-4.446h-0.855c-0.684 0-1.050 0.512-1.050 1.365v3.082h-2.012v-6.091h2.012v0.925c0.199-0.547 0.714-0.931 1.32-0.931 0.047 0 0.094 0.002 0.139 0.007l-0.006-0h2.464v0.925c0.198-0.547 0.714-0.931 1.319-0.931 0.047 0 0.093 0.002 0.139 0.007l-0.006-0h0.659zM29.751 20.484c0 0 0.001 0 0.001 0 0.687 0 1.243-0.557 1.243-1.243s-0.557-1.243-1.243-1.243c-0.687 0-1.243 0.557-1.243 1.243 0 0.228 0.062 0.443 0.169 0.627l-0.003-0.006c0.219 0.375 0.618 0.622 1.076 0.623h0z"></path>
  </svg>
);

// Upwork Icon
const UpworkIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
  >
    <path d="M24.75 17.542c-1.469 0-2.849-0.62-4.099-1.635l0.302-1.432 0.010-0.057c0.276-1.521 1.13-4.078 3.786-4.078 1.99 0 3.604 1.615 3.604 3.604 0 1.984-1.615 3.599-3.604 3.599zM24.75 6.693c-3.385 0-6.016 2.198-7.083 5.818-1.625-2.443-2.865-5.38-3.583-7.854h-3.646v9.484c-0.005 1.875-1.521 3.391-3.396 3.396-1.875-0.005-3.391-1.526-3.396-3.396v-9.484h-3.646v9.484c0 3.885 3.161 7.068 7.042 7.068 3.885 0 7.042-3.182 7.042-7.068v-1.589c0.708 1.474 1.578 2.974 2.635 4.297l-2.234 10.495h3.729l1.62-7.615c1.417 0.906 3.047 1.479 4.917 1.479 4 0 7.25-3.271 7.25-7.266 0-4-3.25-7.25-7.25-7.25z"></path>
  </svg>
);

// Behance Icon
const BehanceIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24" // Updated viewBox
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 19C1.67157 19 1 18.3284 1 17.5V6.5C1 5.67157 1.67157 5 2.5 5H8C13 5 13 11.5 10 11.5C13 11.5 14 19 8 19H2.5ZM4.5 11C4.22386 11 4 10.7761 4 10.5V7.5C4 7.22386 4.22386 7 4.5 7H7C7 7 9 7 9 9C9 11 7 11 7 11H4.5ZM4.5 13C4.22386 13 4 13.2239 4 13.5V16.5C4 16.7761 4.22386 17 4.5 17H8C8 17 9.5 17 9.5 15C9.5 13 8 13 8 13H4.5Z" fill="currentColor"></path>
    <path fillRule="evenodd" clipRule="evenodd" d="M21.499 14.0034C22.3279 14.0034 23.0212 13.3199 22.8522 12.5085C21.6065 6.52886 12.9128 7.08088 13 14.0034C13.0665 19.2762 20.4344 20.9671 22.6038 16.1898C22.9485 15.4308 22.1747 14.9997 21.5372 14.9997C20.9706 14.9997 20.5313 15.5223 20.1693 15.9582C19.1272 17.2132 15.9628 17.1221 15.5449 14.5142C15.5005 14.2375 15.7304 14.0034 16.0106 14.0034H21.499ZM15.8184 11.9997C15.671 11.9997 15.5758 11.8453 15.6545 11.7207C16.7141 10.0424 19.2614 10.0605 20.3398 11.7189C20.4207 11.8434 20.3257 11.9997 20.1772 11.9997H15.8184Z" fill="currentColor"></path>
    <path d="M16 6C15.4477 6 15 6.44772 15 7C15 7.55228 15.4477 8 16 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H16Z" fill="currentColor"></path>
  </svg>
);

// Dribbble Icon - Updated with provided SVG path
const DribbbleIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24" // Updated viewBox to match provided SVG
    fill="currentColor" // Ensures it inherits color
    className={className}
  >
    {/* Removed defs and style tags as they are not needed for inline SVG and can cause issues */}
    <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91px"></circle>
    <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91px" d="M8.12,2.24A32.47,32.47,0,0,1,12.8,9.13a33.23,33.23,0,0,1,1.58,3.56,36.16,36.16,0,0,1,2.15,8.79"></path>
    <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91px" d="M19.67,4.82A18.16,18.16,0,0,1,12.8,9.13,28,28,0,0,1,1.55,11"></path>
    <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91px" d="M22.42,13.21a16.66,16.66,0,0,0-8-.52A13,13,0,0,0,5.09,19.9"></path>
  </svg>
);

// LinkedIn Icon - Updated with provided SVG path
const LinkedinIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 552.77 552.77" // Updated viewBox to match provided SVG
    fill="currentColor" // Ensures it inherits color
    className={className}
  >
    {/* Removed g with id="SVGRepo_bgCarrier" and id="SVGRepo_tracerCarrier" as they are not needed for inline SVG */}
    {/* Removed defs and style tags as they are not needed for inline SVG and can cause issues */}
    <g>
      <path d="M17.95,528.854h71.861c9.914,0,17.95-8.037,17.95-17.951V196.8c0-9.915-8.036-17.95-17.95-17.95H17.95 C8.035,178.85,0,186.885,0,196.8v314.103C0,520.816,8.035,528.854,17.95,528.854z"></path>
      <path d="M17.95,123.629h71.861c9.914,0,17.95-8.036,17.95-17.95V41.866c0-9.914-8.036-17.95-17.95-17.95H17.95 C8.035,23.916,0,31.952,0,41.866v63.813C0,115.593,8.035,123.629,17.95,123.629z"></path>
      <path d="M525.732,215.282c-10.098-13.292-24.988-24.223-44.676-32.791c-19.688-8.562-41.42-12.846-65.197-12.846 c-48.268,0-89.168,18.421-122.699,55.27c-6.672,7.332-11.523,5.729-11.523-4.186V196.8c0-9.915-8.037-17.95-17.951-17.95h-64.192 c-9.915,0-17.95,8.035-17.95,17.95v314.103c0,9.914,8.036,17.951,17.95,17.951h71.861c9.915,0,17.95-8.037,17.95-17.951V401.666 c0-45.508,2.748-76.701,8.244-93.574c5.494-16.873,15.66-30.422,30.488-40.649c14.83-10.227,31.574-15.343,50.24-15.343 c14.572,0,27.037,3.58,37.393,10.741c10.355,7.16,17.834,17.19,22.436,30.104c4.604,12.912,6.904,41.354,6.904,85.33v132.627 c0,9.914,8.035,17.951,17.949,17.951h71.861c9.914,0,17.949-8.037,17.949-17.951V333.02c0-31.445-1.982-55.607-5.941-72.48 S535.836,228.581,525.732,215.282z"></path>
    </g>
  </svg>
);


// Crypto Payment Modal Component
const CryptoPaymentModal = ({ onClose }) => {
  const modalContentRef = useRef(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [selectedChain, setSelectedChain] = useState('');

  // Define QR code images based on currency and chain
  const qrCodes = {
    USDT: {
      'TRC20': 'https://placehold.co/200x200/FF5733/FFFFFF?text=USDT+TRC20+QR',
      'ERC20': 'https://placehold.co/200x200/3366FF/FFFFFF?text=USDT+ERC20+QR',
      'Arbitrum One': 'https://placehold.co/200x200/33FF57/FFFFFF?text=USDT+Arbitrum+QR',
      'SOL': 'https://placehold.co/200x200/FF33FF/FFFFFF?text=USDT+SOL+QR',
      'BSC (BEP20)': 'https://placehold.co/200x200/FFD700/000000?text=USDT+BSC+QR',
      'Polygon (PoS)': 'https://placehold.co/200x200/8A2BE2/FFFFFF?text=USDT+Polygon+QR',
    },
    ETHEREUM: {
      'ERC20': 'https://placehold.co/200x200/3366FF/FFFFFF?text=ETH+ERC20+QR',
      'Arbitrum One': 'https://placehold.co/200x200/33FF57/FFFFFF?text=ETH+Arbitrum+QR',
      'BSC (BEP20)': 'https://placehold.co/200x200/FFD700/000000?text=ETH+BSC+QR',
    },
    BTC: {
      'BTC': 'https://placehold.co/200x200/FFA500/FFFFFF?text=BTC+QR',
    },
  };

  // Set initial chain based on default currency
  useEffect(() => {
    if (selectedCurrency === 'USDT') {
      setSelectedChain('TRC20');
    } else if (selectedCurrency === 'ETHEREUM') {
      setSelectedChain('ERC20');
    } else if (selectedCurrency === 'BTC') {
      setSelectedChain('BTC');
    }
  }, [selectedCurrency]);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleChainChange = (e) => {
    setSelectedChain(e.target.value);
  };

  const currentQrCode = qrCodes[selectedCurrency]?.[selectedChain] || 'https://placehold.co/200x200/cccccc/333333?text=QR+Code+Error';

  // Close modal when clicking outside of the content
  const handleOverlayClick = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalContentRef}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-sm mx-auto
                   flex flex-col items-center text-center space-y-6" // Added flex-col and space-y for layout
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl font-bold leading-none focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Crypto Payment</h3>

        {/* Currency Dropdown */}
        <div className="w-full">
          <label htmlFor="currency-select" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Select Currency
          </label>
          <select
            id="currency-select"
            className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            {Object.keys(qrCodes).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Chain Dropdown (Conditional) */}
        {selectedCurrency && qrCodes[selectedCurrency] && Object.keys(qrCodes[selectedCurrency]).length > 0 && (
          <div className="w-full">
            <label htmlFor="chain-select" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Select Chain
            </label>
            <select
              id="chain-select"
              className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              value={selectedChain}
              onChange={handleChainChange}
            >
              {Object.keys(qrCodes[selectedCurrency]).map((chain) => (
                <option key={chain} value={chain}>
                  {chain}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* QR Code Image */}
        {currentQrCode && (
          <img
            src={currentQrCode}
            alt={`${selectedCurrency} ${selectedChain} QR Code`}
            className="w-48 h-48 bg-white p-2 rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/200x200/cccccc/333333?text=QR+Code+Error`;
            }}
          />
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Scan the QR code to make a payment.
        </p>
        <p className="text-xs text-red-500 dark:text-red-400">
          * This is a placeholder. Replace QR codes with your actual wallet addresses.
        </p>
      </div>
    </div>
  );
};

// Test Drive Tag Component (Moved to top for definition before App)
const TestDriveTag = ({ navigateTo }) => {
  return (
    <button
      onClick={() => navigateTo('testDrive')}
      className="fixed top-[90px] left-0 z-40
                 bg-gradient-to-br from-orange-500 to-orange-700 text-white
                 font-bold py-2 pr-6 pl-4 shadow-lg
                 transition-all duration-300 transform
                 hover:scale-110 hover:rotate-3
                 flex items-center space-x-2
                 dark:from-orange-700 dark:to-orange-900
                 relative overflow-hidden
                 test-drive-tag-custom" // Changed class name to avoid conflicts
      style={{
        transformOrigin: 'center left', // Rotate from the left edge
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)', // Removed inset border
      }}
    >
      <span className="text-sm md:text-base">Test Drive</span>
      {/* The "hole" element - NO LONGER PRESENT */}
    </button>
  );
};

// UnderConstructionPage Component (New page for under construction content)
const UnderConstructionPage = ({ navigateTo }) => {
    return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900 dark:to-orange-800 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => navigateTo('home')}
          className="mb-8 flex items-center text-yellow-700 hover:text-yellow-900 font-semibold text-lg transition-colors focus:outline-none dark:text-yellow-300 dark:hover:text-yellow-100"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </button>
        <h2 className="text-5xl font-bold text-yellow-800 mb-8 dark:text-yellow-200">
          Under <span className="text-orange-600">Construction!</span>
        </h2>
        <img
          src="https://placehold.co/300x200/FFD700/000000?text=Under+Construction"
          alt="Under Construction"
          className="mx-auto my-8 rounded-lg shadow-lg"
        />
        <p className="text-lg text-yellow-700 leading-relaxed dark:text-yellow-300 mb-8">
          This feature is currently under development. Please check back later!
        </p>
      </div>
    </section>
  );
};


// Main App Component
const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('ngdev-theme');
    return savedTheme === 'light' ? false : true;
  });
  // State for current page view ('home', 'allProjects', or 'testDrive')
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false); // State for crypto modal

  // Firebase state and initialization
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [viewerCount, setViewerCount] = useState(0);
  const hasIncrementedView = useRef(false); // Ref to ensure view count increments only once per session

  useEffect(() => {
    // Initialize Firebase
    try {
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      if (Object.keys(firebaseConfig).length > 0) {
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const authInstance = getAuth(app);
        setDb(firestore);
        setAuth(authInstance);

        // Sign in anonymously if no token, otherwise use custom token
        onAuthStateChanged(authInstance, async (user) => {
          if (!user) {
            try {
              if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                await signInWithCustomToken(authInstance, __initial_auth_token);
              } else {
                await signInAnonymously(authInstance);
              }
            } catch (error) {
              console.error("Firebase authentication error:", error);
            }
          }
        });
      } else {
        console.warn("Firebase config not found. Viewer count will not be tracked.");
      }
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
    }
  }, []);

  // Effect to handle viewer count logic
  useEffect(() => {
    if (db && auth && auth.currentUser && !hasIncrementedView.current) {
      const viewerCountRef = doc(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}/public/data/viewer_counts/main_count`);

      const unsubscribe = onSnapshot(viewerCountRef, async (docSnap) => {
        let currentCount = 0;
        if (docSnap.exists()) {
          currentCount = docSnap.data().count || 0;
        }

        // Only increment if it hasn't been incremented in this session
        if (!hasIncrementedView.current) {
          const newCount = currentCount + 1;
          try {
            await setDoc(viewerCountRef, { count: newCount });
            hasIncrementedView.current = true; // Mark as incremented for this session
          } catch (error) {
            console.error("Error updating viewer count:", error);
          }
        }
        setViewerCount(currentCount); // Update local state with the latest count from Firestore
      }, (error) => {
        console.error("Error listening to viewer count:", error);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [db, auth]);


  useEffect(() => {
    if (isNavOpen || selectedProject || isCryptoModalOpen) { // Disable scroll if nav or ANY modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isNavOpen, selectedProject, isCryptoModalOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ngdev-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ngdev-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const openCryptoModal = () => {
    setIsCryptoModalOpen(true);
  };

  const closeCryptoModal = () => {
    setIsCryptoModalOpen(false);
  };

  return (
    <div className={`min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-blinker antialiased transition-colors duration-300`}>
      <div className={`content-wrapper ${selectedProject || isCryptoModalOpen ? 'filter blur-sm' : ''} transition-filter duration-300`}>
        <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} isDarkMode={isDarkMode} toggleTheme={toggleTheme} navigateTo={navigateTo} currentPage={currentPage} />

        {/* Test Drive Tag Component */}
        <TestDriveTag navigateTo={navigateTo} />

        {currentPage === 'home' && (
          <>
            <Hero openCryptoModal={openCryptoModal} viewerCount={viewerCount} /> {/* Pass openCryptoModal and viewerCount */}
            <About />
            <Services />
            <Portfolio projects={allProjectsData.slice(0, 3)} navigateTo={navigateTo} openProjectModal={openProjectModal} />
            <Contact />
            <Footer />
          </>
        )}

        {currentPage === 'allProjects' && (
          <AllProjectsPage projects={allProjectsData} navigateTo={navigateTo} openProjectModal={openProjectModal} />
        )}

        {currentPage === 'testDrive' && (
          <UnderConstructionPage navigateTo={navigateTo} />
        )}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      )}

      {isCryptoModalOpen && (
        <CryptoPaymentModal onClose={closeCryptoModal} />
      )}
    </div>
  );
};

// Navbar Component
const Navbar = ({ isNavOpen, setIsNavOpen, isDarkMode, toggleTheme, navigateTo, currentPage }) => {
  return (
    <nav className="fixed w-full bg-white bg-opacity-90 shadow-md backdrop-blur-sm z-50 py-4 px-6 md:px-12 dark:bg-gray-900 dark:bg-opacity-90 dark:shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="text-3xl font-extrabold text-orange-500 hover:text-orange-400 transition-colors" onClick={() => navigateTo('home')}>
          ngDev
        </a>

        <div className="hidden md:flex space-x-8 items-center">
          {currentPage === 'home' ? (
            <NavLink href="#portfolio" text="Portfolio" />
          ) : (
            <button onClick={() => navigateTo('home')} className="text-gray-700 hover:text-orange-500 text-lg font-medium transition-colors dark:text-gray-300">
              Home
            </button>
          )}
          <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 hover:text-orange-500 transition-colors focus:outline-none dark:text-gray-300">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <a
            href="#contact"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Let's Talk
          </a>
        </div>

        <div
          className={`fixed inset-0 bg-white bg-opacity-95 z-40 transform transition-transform duration-300 ease-in-out ${
            isNavOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col items-center justify-center space-y-8 dark:bg-gray-900`}
        >
          <button onClick={() => setIsNavOpen(false)} className="absolute top-6 right-6 text-gray-700 focus:outline-none dark:text-gray-100">
            <X size={32} />
          </button>
          {currentPage === 'home' ? (
            <NavLink href="#portfolio" text="Portfolio" onClick={() => setIsNavOpen(false)} />
          ) : (
            <button onClick={() => { navigateTo('home'); setIsNavOpen(false); }} className="text-gray-700 hover:text-orange-500 text-lg font-medium transition-colors dark:text-gray-300">
              Home
            </button>
          )}
          <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => setIsNavOpen(false)}>
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ href, text, onClick }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-orange-500 text-lg font-medium transition-colors dark:text-gray-300 dark:hover:text-orange-500"
    onClick={onClick}
  >
    {text}
  </a>
);

// Animated Counter Component
const AnimatedCounter = ({ targetNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (typeof targetNumber !== 'number' || isNaN(targetNumber)) {
      setCurrentNumber(0);
      return;
    }

    const duration = 1000; // milliseconds
    let startTimestamp = null;
    const startNumber = currentNumber; // Start from current displayed number

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress); // Easing function
      setCurrentNumber(Math.floor(easedProgress * (targetNumber - startNumber) + startNumber));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentNumber(targetNumber); // Ensure it lands on the exact target
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [targetNumber]);

  return <span className="font-bold text-orange-500">{currentNumber}</span>;
};


// Hero Section Component
const Hero = ({ openCryptoModal, viewerCount }) => { // Receive openCryptoModal and viewerCount
  const [typedText, setTypedText] = useState('');
  const fullText = "I bring creative visions to life with precision and passion, specializing in all things design.";

  useEffect(() => {
    let index = 0;
    const typingSpeed = 50; // milliseconds per character

    const typeCharacter = () => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
        setTimeout(typeCharacter, typingSpeed);
      }
    };

    typeCharacter();
  }, []);

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-24 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

        <div className="absolute top-1/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent filter blur-xl opacity-70 animate-line-sweep animation-delay-0"></div>
        <div className="absolute top-1/2 right-0 w-full h-2 bg-gradient-to-l from-transparent via-blue-500 to-transparent filter blur-xl opacity-70 animate-line-sweep animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent filter blur-xl opacity-70 animate-line-sweep animation-delay-4000"></div>
        <div className="absolute top-1/3 left-0 w-full h-2 bg-gradient-to-r from-transparent via-emerald-500 to-transparent filter blur-xl opacity-70 animate-line-sweep animation-delay-1000"></div>
        <div className="absolute bottom-1/3 right-0 w-full h-2 bg-gradient-to-l from-transparent via-red-500 to-transparent filter blur-xl opacity-70 animate-line-sweep animation-delay-3000"></div>
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center relative z-10 gap-12">
        <div className="flex-1 max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900 tracking-tight dark:text-gray-100">
            Hi, I'm <span className="text-orange-500">ngDev</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed dark:text-gray-300">
            A Freelance <span className="font-bold text-orange-400">Designer</span>,{' '}
            <span className="font-bold text-orange-400">3D Animator</span>, and{' '}
            <span className="font-bold text-orange-400">3D Modeler</span>.
          </p>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed dark:text-gray-400">
            <span className="inline-block">{typedText}</span><span className="animate-console-cursor inline-block w-3 h-6 bg-gray-600 dark:bg-gray-400"></span>
          </p>
          <div className="flex justify-center space-x-4 mt-8"> {/* Container for buttons */}
            <a
              href="#contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Hire Me
            </a>
            <button
              onClick={openCryptoModal} // Changed from <a> to <button> and added onClick
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl
                         dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Buy Me a Coffee
            </button>
          </div>
          {/* Viewers Count Section */}
          <div className="mt-8 text-lg text-gray-700 dark:text-gray-300">
            Total Site Views: <AnimatedCounter targetNumber={viewerCount} />
          </div>
        </div>
      </div>
      <BrandCard />
    </section>
  );
};

// Brand Card Component with hanging strip
const BrandCard = () => {
  return (
    <div className="absolute top-16 right-8 md:top-20 md:right-16 z-20 perspective-1000">
      <div className="relative animate-swing" style={{ transformOrigin: 'top center' }}>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1.5 h-10 bg-gradient-to-b from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700 shadow-md rounded-t-full rounded-b-sm"></div>

        <div className="relative w-40 h-24 md:w-48 md:h-28 rounded-lg shadow-xl dark:shadow-2xl transform-style-preserve-3d transition-transform duration-500 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-center p-2">
          <img
            src="https://i.postimg.cc/7fPT7SPy/visiting-card.png" // Updated image URL
            alt="ngDev Brand Logo"
            className="w-full h-full object-contain rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/120x60/cccccc/333333?text=Logo+Error`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

// About Section Component
const About = () => {
  const aboutRef = useRef(null);
  const [yearsAnimated, setYearsAnimated] = useState(0);
  const [projectsAnimated, setProjectsAnimated] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    let animationFrameYears;
    let animationFrameProjects;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              setYearsAnimated(0);
              setProjectsAnimated(0);

              const endYears = 5;
              const durationYears = 1000;
              let startTimeYears = null;

              const animateYears = (currentTime) => {
                if (!startTimeYears) startTimeYears = currentTime;
                const progress = (currentTime - startTimeYears) / durationYears;
                const currentCount = Math.min(Math.floor(progress * endYears), endYears);
                setYearsAnimated(currentCount);

                if (progress < 1) {
                  requestAnimationFrame(animateYears);
                }
              };
              animationFrameYears = requestAnimationFrame(animateYears);

              const endProjects = 50;
              const durationProjects = 1500;
              let startTimeProjects = null;

              const animateProjects = (currentTime) => {
                if (!startTimeProjects) startTimeProjects = currentTime;
                const progress = (currentTime - startTimeProjects) / durationProjects;
                const currentCount = Math.min(Math.floor(progress * endProjects), endProjects);
                setProjectsAnimated(currentCount);

                if (progress < 1) {
                  requestAnimationFrame(animateProjects);
                }
              };
              animationFrameProjects = requestAnimationFrame(animateProjects);
            }
          } else {
            if (hasAnimatedRef.current) {
              hasAnimatedRef.current = false;
              setYearsAnimated(0);
              setProjectsAnimated(0);
              cancelAnimationFrame(animationFrameYears);
              cancelAnimationFrame(animationFrameProjects);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      cancelAnimationFrame(animationFrameYears);
      cancelAnimationFrame(animationFrameProjects);
    };
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 px-6 md:px-12 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          About <span className="text-orange-500">Me</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-2xl border-4 border-gray-300 dark:border-gray-700">
              <img
                src="https://i.postimg.cc/XpPwQ77q/about-me.png" // Updated image URL
                alt="About ngDev"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/400x400/cccccc/333333?text=Image+Error`;
                }}
              />
            </div>
            {/* Social Icons for About section - using custom SVGs */}
            <div className="flex justify-center space-x-6 mt-8">
              <SocialLink icon={<LinkedinIcon size={32} />} href="https://www.linkedin.com/" label="LinkedIn Profile" /> {/* LinkedIn first */}
              <SocialLink icon={<UpworkIcon size={32} />} href="https://www.upwork.com/" label="Upwork Profile" />
              <SocialLink icon={<FiverrIcon size={32} />} href="https://www.fiverr.com/" label="Fiverr Profile" />
              <SocialLink icon={<BehanceIcon size={32} />} href="https://www.behance.net/" label="Behance Profile" />
              <SocialLink icon={<DribbbleIcon size={32} />} href="https://dribbble.com/" label="Dribbble Profile" />
            </div>
          </div>

          <div className="flex-1 w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Transforming Ideas into Visual Realities
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Hello! I'm ngDev, a passionate freelance designer, 3D animator, and 3D modeler with a knack for bringing imaginative concepts to life. With years of experience in the creative industry, I specialize in crafting compelling visuals that captivate audiences and communicate powerful messages.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              My expertise spans across various design disciplines, from intricate 3D modeling for games and products to fluid 3D animations for cinematic experiences. I thrive on challenging projects and am dedicated to delivering high-quality, innovative solutions tailored to your unique needs.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-300 p-4 rounded-lg shadow-md text-center dark:bg-gray-700">
                <p className="text-orange-500 text-4xl font-bold mb-1">{yearsAnimated}+</p>
                <p className="text-gray-700 text-sm dark:text-gray-300">Projects Completed</p>
              </div>
              <div className="bg-gray-300 p-4 rounded-lg shadow-md text-center dark:bg-gray-700">
                <p className="text-orange-500 text-4xl font-bold mb-1">{projectsAnimated}+</p>
                <p className="text-gray-700 text-sm dark:text-gray-300">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const Services = () => {
  const services = [
    {
      icon: <PenTool size={48} className="text-orange-500" />,
      title: 'UI/UX Design',
      description: 'Crafting intuitive and visually appealing user interfaces for exceptional user experiences.',
    },
    {
      icon: <Code size={48} className="text-orange-500" />,
      title: '3D Modeling',
      description: 'Creating high-fidelity 3D models for various applications, from products to characters.',
    },
    {
      icon: <Globe size={48} className="text-orange-500" />,
      title: '3D Animation',
      description: 'Bringing objects and characters to life with dynamic and expressive animations.',
    },
    {
      icon: <Briefcase size={48} className="text-orange-500" />,
      title: 'Brand Identity',
      description: 'Developing cohesive brand identities that resonate with your target audience.',
    },
  ];

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          My <span className="text-orange-500">Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                         flex flex-col items-center text-center border border-gray-300 dark:border-gray-700
                         dark:bg-gray-800"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section Component
const Portfolio = ({ projects, navigateTo, openProjectModal }) => {
  return (
    <section id="portfolio" className="py-20 px-6 md:px-12 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          My <span className="text-orange-500">Portfolio</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                         border border-gray-300 dark:border-gray-700
                         dark:bg-gray-900 group perspective-1000 cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              <div className="relative w-full aspect-[1280/769] overflow-hidden"> {/* Updated aspect ratio */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/1280x769/cccccc/333333?text=Image+Error`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
                <p className="text-orange-400 text-sm font-medium">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-12">
          <button
            onClick={() => navigateTo('allProjects')}
            className="text-orange-500 hover:text-orange-600 font-semibold text-lg underline transition-colors focus:outline-none"
          >
            See More Projects &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

// AllProjectsPage Component
const AllProjectsPage = ({ navigateTo }) => { // Removed projects and openProjectModal as they are not used here
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => navigateTo('home')}
          className="mb-8 flex items-center text-blue-700 hover:text-blue-900 font-semibold text-lg transition-colors focus:outline-none dark:text-blue-300 dark:hover:text-blue-100"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </button>
        <h2 className="text-5xl font-bold text-blue-800 mb-8 dark:text-blue-200">
          All My <span className="text-blue-600">Projects</span>
        </h2>
        <p className="text-lg text-blue-700 leading-relaxed dark:text-blue-300 mb-8">
          This page displays all of your projects. You can customize this section to show more details, filter options, or different layouts for your extensive portfolio.
        </p>
        {/* Example of how you might display all projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjectsData.map((project) => ( // Using allProjectsData directly
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                         border border-gray-300 dark:border-gray-700
                         dark:bg-gray-900 group"
            >
              <div className="relative w-full aspect-[1280/769] overflow-hidden"> {/* Updated aspect ratio */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/1280x769/cccccc/333333?text=Image+Error`;
                  }}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{project.title}</h3>
                <p className="text-orange-400 text-sm">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Sending message...');

    console.log('Form Data:', formData);

    try {
      // Use your Formspree endpoint here
      const response = await fetch('https://formspree.io/f/xldnkbwn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Important for Formspree to return JSON response
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        // Handle Formspree errors (e.g., rate limiting, invalid fields)
        const result = await response.json();
        const errorMessage = result.errors ? result.errors.map(err => err.message).join(', ') : 'Unknown error';
        setStatusMessage(`Failed to send message: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatusMessage('An error occurred. Please try again.');
    } finally {
      // Clear status message after a few seconds
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          Contact <span className="text-orange-500">Me</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-4 text-center md:text-left"> {/* Adjusted space-y */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Get in Touch</h3>
              <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                Have a project in mind or just want to say hello? Feel free to reach out!
              </p>
            </div>
            <div className="space-y-4">
              <ContactInfoItem icon={<Mail size={24} className="text-orange-500" />} text="rogfolio@gmail.com" />
              <ContactInfoItem icon={<Phone size={24} className="text-orange-500" />} text="+7 (901) 557-9824" />
              <ContactInfoItem icon={<MapPin size={24} className="text-orange-500" />} text="Moscow, Remote" />
            </div>
            {/* Removed all SocialLink components from Contact section */}
            <div className="flex justify-center md:justify-start space-x-6 pt-4">
              {/* Social media icons removed from here */}
            </div>
          </div>

          <div className="flex-1 p-8 rounded-lg shadow-xl border bg-white dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-md border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-md border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-3 rounded-md border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-y bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
              {statusMessage && (
                <p className={`text-center mt-4 text-sm font-medium ${statusMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Contact Info Item
const ContactInfoItem = ({ icon, text }) => (
  <div className="flex items-center justify-center md:justify-start space-x-3">
    {icon}
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </div>
);

// Reusable Social Link (now accepts icon prop again)
const SocialLink = ({ icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-orange-500 hover:text-orange-600 transition-colors transform hover:scale-110
               dark:text-orange-400 dark:hover:text-orange-500"
    aria-label={label}
  >
    {icon}
  </a>
);

// Footer Component
const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-12 text-center text-sm border-t
                       bg-gray-200 text-gray-600 border-gray-300
                       dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} ngDev. All rights reserved.</p>
        <p className="mt-2">Designed with <span className="text-orange-500">&hearts;</span> by ngDev</p>
      </div>
    </footer>
  );
};

// Custom CSS for animations and fonts
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Blinker:wght@400;600;700;800&display=swap');

  body {
    font-family: 'Blinker', sans-serif;
  }

  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob { animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9); }
  .animation-delay-0 { animation-delay: 0s; }
  .animation-delay-1000 { animation-delay: 1s; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-3000 { animation-delay: 3s; }
  .animation-delay-4000 { animation-delay: 4s; }
  .animation-delay-5000 { animation-delay: 5s; }

  .perspective-1000 { perspective: 1000px; }
  .transform-style-preserve-3d { transform-style: preserve-3d; }
  .rotate-y-6 { transform: rotateY(6deg); }
  .rotate-x-3 { transform: rotateX(3deg); }
  .group:hover .rotate-y-6 { transform: rotateY(6deg); }
  .group:hover .rotate-x-3 { transform: rotateX(3deg); }

  @keyframes swing {
    0%, 100% { transform: translateY(0px) rotateZ(3deg); }
    50% { transform: translateY(-5px) rotateZ(-3deg); }
  }
  .animate-swing { animation: swing 3s ease-in-out infinite; transform-origin: top center; }

  @keyframes line-sweep {
    0% { transform: translateX(-100%); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.7; }
    100% { transform: translateX(100%); opacity: 0; }
  }
  .animate-line-sweep { animation: line-sweep 12s linear infinite; }

  @keyframes console-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .animate-console-cursor { animation: console-blink 0.7s step-end infinite; }

  /* Styles for the Test Drive Tag */
  .test-drive-tag-custom {
    /* Base shape: rectangle with a sharp point on the right */
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%); /* Sharp right point */
    border-radius: 0; /* No rounded corners on any side */
    padding-right: 20px; /* Space for the point */
    padding-left: 0.5rem; /* Reduced left padding to make it tighter */
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: fit-content; /* Make width fit content */
    
    position: fixed;
    top: 90px; /* Adjusted to be below the navbar */
    left: 0; /* Attach to the left side */
    z-index: 40;

    background-image: linear-gradient(to right, #f97316, #ea580c); /* Orange gradient */
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3); /* Removed inset border */
    transition: all 0.3s ease-in-out;
    transform-origin: center left; /* Rotate from the left edge */
    transform: rotate(0deg); /* Initial rotation */
    text-align: left; /* Align text to the left */
  }

  .test-drive-hole-custom {
    display: none; /* Hide the hole element */
  }

  /* Adjustments for hover effects to maintain 3D feel */
  .test-drive-tag-custom:hover {
    transform: scale(1.1) rotate(3deg) translateZ(10px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.4), 0 0 0 4px rgba(255,255,255,0.3) inset;
  }
`;
document.head.appendChild(style);

export default App;
