import { lazy } from "react";

export const Linkedin = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Linkedin }))
);
export const Instagram = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Instagram }))
);
export const Send = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Send }))
);
export const Calendar = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Calendar }))
);
export const TrendingUp = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.TrendingUp }))
);
export const Users = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Users }))
);
export const MousePointerClick = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.MousePointerClick }))
);
export const BarChart3 = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.BarChart3 }))
);
export const Target = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Target }))
);
