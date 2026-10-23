import {
  AtSign,
  BedDouble,
  Briefcase,
  Building,
  ChefHat,
  ClipboardList,
  Coffee,
  ConciergeBell,
  Ear,
  FileCheck,
  FileText,
  Globe,
  Hammer,
  HandHelping,
  Handshake,
  Hotel,
  Layers,
  ListChecks,
  MessageSquareText,
  PaintRoller,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Utensils,
  UtensilsCrossed,
  Wallet,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Registry mapping icon names used in JSON data to Lucide components.
 * Add an entry here when a new icon name is introduced in the data files.
 */
const ICONS: Record<string, LucideIcon> = {
  "at-sign": AtSign,
  "bed-double": BedDouble,
  briefcase: Briefcase,
  building: Building,
  "building-2": Building,
  "chef-hat": ChefHat,
  "clipboard-list": ClipboardList,
  coffee: Coffee,
  "concierge-bell": ConciergeBell,
  ear: Ear,
  "file-check": FileCheck,
  "file-check-2": FileCheck,
  "file-text": FileText,
  globe: Globe,
  hammer: Hammer,
  "hand-helping": HandHelping,
  handshake: Handshake,
  hotel: Hotel,
  layers: Layers,
  "list-checks": ListChecks,
  "message-square-text": MessageSquareText,
  "paint-roller": PaintRoller,
  route: Route,
  search: Search,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  store: Store,
  users: Users,
  utensils: Utensils,
  "utensils-crossed": UtensilsCrossed,
  wallet: Wallet,
  warehouse: Warehouse,
  wrench: Wrench,
};

const FALLBACK_ICON: LucideIcon = Briefcase;

export function getIcon(name: string | undefined | null): LucideIcon {
  if (!name) return FALLBACK_ICON;
  return ICONS[name] ?? FALLBACK_ICON;
}
