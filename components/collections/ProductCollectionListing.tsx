'use client';

import { ChevronDown, CircleX, Settings2 } from 'lucide-react';
// Removed unused X and Image imports
import { useState, useRef, useEffect } from 'react';
import ProductGrid from '../products/ProductGrid';
import { ProductCardProps } from '../products/ProductCard';

// Import data from JSON file
import productsData from '@/public/data/combinedProducts.json';
import ButtonLink from '../ui/ButtonLink';

type FilterKey = 'availability' | 'price' | 'sort';
type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'newest';

interface ProductCollectionListingProps {
  category?: string;
}

const ProductCollectionListing = ({ category }: ProductCollectionListingProps) => {  
  // Filter products by category if specified
  const initialProducts = category 
    ? productsData.products.filter(product => product.category === category)
    : productsData.products;
    
  // Changed to readonly state since setProducts is never used
  const [products] = useState<ProductCardProps[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>(products);
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState({ from: '', to: '' });
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileExpandedSections, setMobileExpandedSections] = useState({
    sort: false,
    availability: false,
    price: false
  });
  
  // Toggle mobile filter section
  const toggleMobileSection = (section: 'sort' | 'availability' | 'price') => {
    setMobileExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply price filter if set
    if (priceRange.from !== '' || priceRange.to !== '') {
      const minPrice = priceRange.from !== '' ? parseFloat(priceRange.from) : 0;
      const maxPrice = priceRange.to !== '' ? parseFloat(priceRange.to) : Infinity;
      result = result.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }
    
    // Apply sorting
    switch (selectedSort) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming newer products have higher IDs or are later in the array
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default: // 'featured' - no sorting or custom sorting logic
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedSort, priceRange, availability]);
  
  const [openFilters, setOpenFilters] = useState({
    availability: false,
    price: false,
    sort: false
  });

  // Create refs for each dropdown
  const availabilityRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (filterName: FilterKey) => {
    setOpenFilters(prev => {
      // Create a new object with all filters closed
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key as FilterKey] = false;
        return acc;
      }, {} as Record<FilterKey, boolean>);
      
      // Toggle the selected filter (if it was open, it will be closed; if closed, it will be opened)
      return {
        ...allClosed,
        [filterName]: !prev[filterName]
      };
    });
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close availability dropdown if clicked outside
      if (openFilters.availability && 
          availabilityRef.current && 
          !availabilityRef.current.contains(event.target as Node)) {
        setOpenFilters(prev => ({ ...prev, availability: false }));
      }
      
      // Close price dropdown if clicked outside
      if (openFilters.price && 
          priceRef.current && 
          !priceRef.current.contains(event.target as Node)) {
        setOpenFilters(prev => ({ ...prev, price: false }));
      }
      
      // Close sort dropdown if clicked outside
      if (openFilters.sort && 
          sortRef.current && 
          !sortRef.current.contains(event.target as Node)) {
        setOpenFilters(prev => ({ ...prev, sort: false }));
      }
      
      // Close mobile filter sidebar if clicked outside
      if (mobileFilterOpen && 
          mobileFilterRef.current && 
          !mobileFilterRef.current.contains(event.target as Node)) {
        setMobileFilterOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openFilters, mobileFilterOpen]); // Re-run effect when openFilters changes

  return (
    <section className='my-10'>
      <section>
        {/* Desktop filters */}
        <div className='hidden md:flex justify-between items-center mb-10'>
          <div className='flex gap-4'>
            <p>Filter:</p>
            {/* Availability filter */}
            <div className="relative" ref={availabilityRef}>
              <p className='flex items-center gap-2'>
                Availability <ChevronDown className='cursor-pointer' onClick={() => toggleFilter('availability')} />
              </p>
              {openFilters.availability && (
                <div className='absolute top-full left-0 mt-1 shadow-lg w-[300px] p-4 space-y-8 bg-white z-10'>
                  <div className='flex justify-between'>
                    <p>0 selected</p>
                    <p className='underline'>Reset</p>
                  </div>
                  <label className='cursor-pointer'>
                    <input type='checkbox' className='checkbox checkbox-sm' />
                    <span className='ml-2'>In Stock (10)</span>
                  </label>{' '}
                  <br />
                  <label className='cursor-pointer'>
                    <input type='checkbox' className='checkbox checkbox-sm' />
                    <span className='ml-2'>Out of Stock (18)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="relative" ref={priceRef}>
              <p className='flex items-center gap-2'>
                {' '}
                Price <ChevronDown className='cursor-pointer' onClick={() => toggleFilter('price')} />
              </p>
              {openFilters.price && (
                <div className='absolute top-full left-0 mt-1 shadow-lg w-[300px] p-4 space-y-8 bg-white z-10'>
                  <div className='flex justify-between'>
                    <p>The height price is &#8358;</p>
                    <p className='underline'>Reset</p>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex items-center gap-2'>
                      <p>&#8358;</p>
                      <input 
                        type='text' 
                        placeholder='From' 
                        className='input'
                        value={priceRange.from}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, from: e.target.value }))
                        }
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <p>&#8358;</p>
                      <input 
                        type='text' 
                        placeholder='To' 
                        className='input'
                        value={priceRange.to}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, to: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sort By dropdown */}
          <div className="relative" ref={sortRef}>
            <p className='flex items-center gap-2'>
              Sort By <ChevronDown className='cursor-pointer' onClick={() => toggleFilter('sort')} />
            </p>
            {openFilters.sort && (
              <div className='absolute top-full right-0 mt-1 shadow-lg w-[250px] p-4 space-y-4 bg-white z-10'>
                <label className='cursor-pointer block'>
                  <input 
                    type='radio' 
                    name='sort' 
                    className='radio radio-sm' 
                    checked={selectedSort === 'featured'} 
                    onChange={() => setSelectedSort('featured')}
                  />
                  <span className='ml-2'>Featured</span>
                </label>
                <label className='cursor-pointer block'>
                  <input 
                    type='radio' 
                    name='sort' 
                    className='radio radio-sm' 
                    checked={selectedSort === 'price-low-high'} 
                    onChange={() => setSelectedSort('price-low-high')}
                  />
                  <span className='ml-2'>Price: Low to High</span>
                </label>
                <label className='cursor-pointer block'>
                  <input 
                    type='radio' 
                    name='sort' 
                    className='radio radio-sm' 
                    checked={selectedSort === 'price-high-low'} 
                    onChange={() => setSelectedSort('price-high-low')}
                  />
                  <span className='ml-2'>Price: High to Low</span>
                </label>
                <label className='cursor-pointer block'>
                  <input 
                    type='radio' 
                    name='sort' 
                    className='radio radio-sm' 
                    checked={selectedSort === 'newest'} 
                    onChange={() => setSelectedSort('newest')}
                  />
                  <span className='ml-2'>Newest First</span>
                </label>
              </div>
            )}
          </div>

          {/* Total products count */}
          <div>
            <p className='text-gray-600'>{filteredProducts.length} Products</p>
          </div>
        </div>
        
        {/* Mobile filter button */}
        <div className='flex justify-between items-center mb-6 md:hidden'>
          <div className='flex items-center gap-2'>
            <Settings2 className='cursor-pointer' onClick={() => setMobileFilterOpen(true)} />
            <span>Filter & Sort</span>
          </div>
          <div>
            <p className='text-gray-600'>{filteredProducts.length} Products</p>
          </div>
        </div>
        
        {/* Mobile filter sidebar overlay */}
        {mobileFilterOpen && (
          <div className='fixed inset-0 bg-black/50 z-40' onClick={() => setMobileFilterOpen(false)}></div>
        )}
        
        {/* Mobile filter sidebar */}
        <div 
          ref={mobileFilterRef}
          className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out p-4 overflow-y-auto ${
            mobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-lg font-medium'>Filter & Sort</h3>
              <CircleX className='cursor-pointer' onClick={() => setMobileFilterOpen(false)} />
          </div>
          
          <div className='space-y-6'>
            <div className='pb-4'>
              <div className='flex justify-between items-center mb-3 cursor-pointer' onClick={() => toggleMobileSection('sort')}>
                <h4 className='font-medium'>Sort By</h4>
                <ChevronDown className={`transition-transform ${mobileExpandedSections.sort ? 'rotate-180' : ''}`} />
              </div>
              {mobileExpandedSections.sort && (
                <div className='space-y-2'>
                  <label className='cursor-pointer block'>
                    <input 
                      type='radio' 
                      name='mobile-sort' 
                      className='radio radio-sm' 
                      checked={selectedSort === 'featured'} 
                      onChange={() => setSelectedSort('featured')}
                    />
                    <span className='ml-2'>Featured</span>
                  </label>
                  <label className='cursor-pointer block'>
                    <input 
                      type='radio' 
                      name='mobile-sort' 
                      className='radio radio-sm' 
                      checked={selectedSort === 'price-low-high'} 
                      onChange={() => setSelectedSort('price-low-high')}
                    />
                    <span className='ml-2'>Price: Low to High</span>
                  </label>
                  <label className='cursor-pointer block'>
                    <input 
                      type='radio' 
                      name='mobile-sort' 
                      className='radio radio-sm' 
                      checked={selectedSort === 'price-high-low'} 
                      onChange={() => setSelectedSort('price-high-low')}
                    />
                    <span className='ml-2'>Price: High to Low</span>
                  </label>
                  <label className='cursor-pointer block'>
                    <input 
                      type='radio' 
                      name='mobile-sort' 
                      className='radio radio-sm' 
                      checked={selectedSort === 'newest'} 
                      onChange={() => setSelectedSort('newest')}
                    />
                    <span className='ml-2'>Newest First</span>
                  </label>
                </div>
              )}
            </div>
            
            <div className='pb-4'>
              <div className='flex justify-between items-center mb-3 cursor-pointer' onClick={() => toggleMobileSection('availability')}>
                <h4 className='font-medium'>Availability</h4>
                <ChevronDown className={`transition-transform ${mobileExpandedSections.availability ? 'rotate-180' : ''}`} />
              </div>
              {mobileExpandedSections.availability && (
                <div className='space-y-2'>
                  <label className='cursor-pointer block'>
                    <input 
                      type='checkbox' 
                      className='checkbox checkbox-sm' 
                      checked={availability.inStock}
                      onChange={() => setAvailability(prev => ({ ...prev, inStock: !prev.inStock }))
                      }
                    />
                    <span className='ml-2'>In Stock (10)</span>
                  </label>
                  <label className='cursor-pointer block'>
                    <input 
                      type='checkbox' 
                      className='checkbox checkbox-sm' 
                      checked={availability.outOfStock}
                      onChange={() => setAvailability(prev => ({ ...prev, outOfStock: !prev.outOfStock }))
                      }
                    />
                    <span className='ml-2'>Out of Stock (18)</span>
                  </label>
                </div>
              )}
            </div>
            
            <div className=' pb-4'>
              <div className='flex justify-between items-center mb-3 cursor-pointer' onClick={() => toggleMobileSection('price')}>
                <h4 className='font-medium'>Price Range</h4>
                <ChevronDown className={`transition-transform ${mobileExpandedSections.price ? 'rotate-180' : ''}`} />
              </div>
              {mobileExpandedSections.price && (
                <div className='flex gap-4'>
                  <div className='flex items-center gap-2'>
                    <p>&#8358;</p>
                    <input 
                      type='text' 
                      placeholder='From' 
                      className='input input-sm w-full'
                      value={priceRange.from}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, from: e.target.value }))
                      }
                    />
                  </div>
                  <div className='flex items-center gap-2'>
                    <p>&#8358;</p>
                    <input 
                      type='text' 
                      placeholder='To' 
                      className='input input-sm w-full'
                      value={priceRange.to}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, to: e.target.value }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            
            <ButtonLink onClick={() => setMobileFilterOpen(false)} > Apply Filters </ButtonLink>
          </div>
        </div>
        
        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </section>
    </section>
  );
};

export default ProductCollectionListing;
