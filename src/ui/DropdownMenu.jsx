import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../css/DropdownMenu.css"; // Using the same CSS for consistent styles
import { Link } from "react-router-dom";

const DropdownMenu = ({ 
  icon, // Update to accept a React Icon component instead of an icon class
  menuItems, 
  selectText = "Select an option", // default parameter
  className = "", // default parameter
  onMenuItemClick 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleMenuItemClick = () => {
    if (onMenuItemClick) {
      onMenuItemClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      {/* Icon that toggles the dropdown */}
      <div className="dropdown-icon" onClick={toggleDropdown}>
        <span className="dropdown-text">{selectText}</span>
        {icon} {/* Render the icon component passed as a prop */}
      </div>

      {/* Dropdown menu with links */}
      {isOpen && (
        <ul className="dropdown-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link className="dropdown-link-item" to={item.link} onClick={handleMenuItemClick}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  icon: PropTypes.element.isRequired, // Icon component passed as a prop
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired, // link for dropdown with links
    })
  ).isRequired,
  selectText: PropTypes.string, // Default text for unselected state
  className: PropTypes.string, // Additional class names for styling
  onMenuItemClick: PropTypes.func,
};

export default DropdownMenu;