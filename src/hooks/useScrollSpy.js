import { useState, useEffect } from 'react';

const useScrollSpy = (sectionIds, options = {}) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Lower threshold and adjust root margin to detect sections earlier
    // A very small threshold means even a tiny bit of the element needs to be visible
    const { threshold = 0.05, rootMargin = '0px 0px -80% 0px' } = options;
    
    // Store all active entries to make a more informed decision
    const visibleSections = new Set();
    
    const observer = new IntersectionObserver(
      (entries) => {
        // First process all entries
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });
        
        // If we have visible sections, prioritize sections at the top
        if (visibleSections.size > 0) {
          // Find visible sections according to their order in the DOM
          const orderedSections = sectionIds.filter(id => visibleSections.has(id));
          
          if (orderedSections.length > 0) {
            // Take the first one based on document order, which is typically the top-most section
            setActiveSection(orderedSections[0]);
          }
        } else if (entries.length === 1) {
          // If only one section triggered the callback and it's not visible,
          // determine if we're above or below it
          const entry = entries[0];
          const currentY = entry.boundingClientRect.y;
          const currentRatio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting;
          
          // Find the section's index
          const targetIndex = sectionIds.indexOf(entry.target.id);
          
          if (targetIndex !== -1) {
            // If we scrolled up past a section
            if (!isIntersecting && currentY > 0 && currentRatio === 0) {
              // We're above this section, so activate the previous one
              if (targetIndex > 0) {
                setActiveSection(sectionIds[targetIndex - 1]);
              }
            }
            // If we scrolled down past a section
            else if (!isIntersecting && currentY < 0 && currentRatio === 0) {
              // We're below this section, so activate the next one
              if (targetIndex < sectionIds.length - 1) {
                setActiveSection(sectionIds[targetIndex + 1]);
              }
            }
          }
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const elements = sectionIds.map((id) => document.getElementById(id));
    
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Set the first section as active if no section is in view initially
    if (!activeSection && elements.length > 0 && elements[0]) {
      setActiveSection(sectionIds[0]);
    }

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [sectionIds, options, activeSection]);

  return activeSection;
};

export default useScrollSpy; 