import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
  onClick?: () => void;
  isActive?: boolean;
  subItems?: string[];
  onSubItemClick?: (subItem: string) => void;
  selectedSubItem?: string | null;
}

export function NavItem({ 
  icon, 
  text, 
  isOpen, 
  onClick, 
  isActive = false,
  subItems = [],
  onSubItemClick,
  selectedSubItem
}: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (subItems.length > 0) {
      setIsExpanded(!isExpanded);
    }
    onClick?.();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center p-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-accent-purple text-white' 
            : 'hover:bg-dark-700 text-gray-300 hover:text-accent-purple'
        }`}
      >
        <span className="flex items-center flex-1">
          <span className="w-5 h-5">{icon}</span>
          {isOpen && (
            <span className="ml-3 text-sm">{text}</span>
          )}
        </span>
        {isOpen && subItems.length > 0 && (
          <span className="ml-auto">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        )}
      </button>

      {isOpen && isExpanded && subItems.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
          {subItems.map((subItem) => (
            <button
              key={subItem}
              onClick={() => onSubItemClick?.(subItem)}
              className={`w-full text-left p-2 text-sm rounded-lg transition-colors ${
                selectedSubItem === subItem
                  ? 'bg-accent-purple/20 text-accent-purple'
                  : 'text-gray-400 hover:bg-dark-700 hover:text-accent-purple'
              }`}
            >
              {subItem}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}