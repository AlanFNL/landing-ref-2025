import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, rootId = "portal-root" }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if we need to create the portal root
    let portalRoot = document.getElementById(rootId);
    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.id = rootId;
      document.body.appendChild(portalRoot);
    }

    setMounted(true);

    // Cleanup
    return () => {
      // Only remove the portal root if it's empty
      if (portalRoot && portalRoot.childNodes.length === 0) {
        document.body.removeChild(portalRoot);
      }
    };
  }, [rootId]);

  return mounted
    ? createPortal(children, document.getElementById(rootId))
    : null;
};

export default Portal;
