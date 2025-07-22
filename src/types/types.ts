// types.ts or at the top of your component
import type { LucideIcon } from "lucide-react";

export interface SubMenuItem {
  name: string;
  desc?: string;
  icon?: LucideIcon;
}

export interface NavMenu {
  name: string;
  gridcols?: number;
  submenu?: SubMenuItem[];
  subMenuHeading?: string[];
}
