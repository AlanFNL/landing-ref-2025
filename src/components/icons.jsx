import { lazy } from "react";
import * as Icons from "lucide-react";

const isServer = typeof window === "undefined";

export const Linkedin = isServer
  ? Icons.Linkedin
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.Linkedin }))
    );
export const Instagram = isServer
  ? Icons.Instagram
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.Instagram }))
    );
export const Send = isServer
  ? Icons.Send
  : lazy(() => import("lucide-react").then((mod) => ({ default: mod.Send })));
export const Calendar = isServer
  ? Icons.Calendar
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.Calendar }))
    );
export const TrendingUp = isServer
  ? Icons.TrendingUp
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.TrendingUp }))
    );
export const Users = isServer
  ? Icons.Users
  : lazy(() => import("lucide-react").then((mod) => ({ default: mod.Users })));
export const MousePointerClick = isServer
  ? Icons.MousePointerClick
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.MousePointerClick }))
    );
export const BarChart3 = isServer
  ? Icons.BarChart3
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.BarChart3 }))
    );
export const Target = isServer
  ? Icons.Target
  : lazy(() => import("lucide-react").then((mod) => ({ default: mod.Target })));
export const ArrowRight = isServer
  ? Icons.ArrowRight
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.ArrowRight }))
    );
export const Clock = isServer
  ? Icons.Clock
  : lazy(() => import("lucide-react").then((mod) => ({ default: mod.Clock })));
export const Percent = isServer
  ? Icons.Percent
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.Percent }))
    );
export const ChevronRight = isServer
  ? Icons.ChevronRight
  : lazy(() =>
      import("lucide-react").then((mod) => ({ default: mod.ChevronRight }))
    );
export const Rocket = isServer
  ? Icons.Rocket
  : lazy(() => import("lucide-react").then((mod) => ({ default: mod.Rocket })));
export const Play = isServer
  ? Icons.Play
  : lazy(() => import("lucide-react").then((mod) => ({ default: mod.Play })));
export const X = isServer
  ? Icons.X
  : lazy(() => import("lucide-react").then((mod) => ({ default: mod.X })));
