
import React, { useState } from 'react';
import { ChevronDown, Pill, Leaf, Pills, Stethoscope } from 'lucide-react';

const CategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const categories = [
    {
      title: 'Prescription',
      icon: Pill,
      links: ['Antibiotics', 'Pain Relievers', 'Heart Health']
    },
    {
      title: 'OTC & Wellness',
      icon: Leaf,
      links: ['Vitamins', 'Supplements', 'Cough & Cold']
    },
    {
      title: 'Vitamins & Supplements',
      icon: Pills,
      links: ['Vitamin D', 'Multivitamins', 'Herbal Supplements']
    },
    {
      title: 'Medical Devices',
      icon: Stethoscope,
      links: ['Glucose Monitors', 'Blood Pressure Cuffs', 'Thermometers']
    }
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-slate-800 hover:text-green-600 transition-colors group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span>Categories</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Mega Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl z-50 animate-fade-in"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="bg-white border-t-2 border-green-600 shadow-xl rounded-b-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-0">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.title}
                    className={`p-6 transition-all duration-200 ${
                      hoveredColumn === index 
                        ? 'bg-green-50' 
                        : hoveredColumn !== null 
                          ? 'bg-white opacity-80' 
                          : 'bg-white hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setHoveredColumn(index)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="text-center">
                      <IconComponent className="h-8 w-8 mx-auto mb-3 text-green-600" />
                      <h3 className="font-semibold text-lg text-slate-800 mb-4">
                        {category.title}
                      </h3>
                      <ul className="space-y-2">
                        {category.links.map((link) => (
                          <li key={link}>
                            <a 
                              href="#" 
                              className="text-sm text-slate-600 hover:text-green-600 transition-colors block"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
