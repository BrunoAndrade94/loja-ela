import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import { Icon, SettingsIcon, UserIcon } from "lucide-react";
import { GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";

import { cn } from "@/lib/utils";
import { SRC_HOME } from "@/features/auth/server/constant-routes";

const routes = [
  {
    label: "Conta",
    href: SRC_HOME,
    icon: UserIcon,
    activeIcon: UserIcon,
  }, {
    label: "Compras",
    href: SRC_HOME,
    icon: FaShoppingBag,
    activeIcon: FaShoppingBag,
  }, {
    label: "Fidalidade",
    href: SRC_HOME,
    icon: UserIcon,
    activeIcon: UserIcon,
  }, {
    label: "Configurações",
    href: SRC_HOME,
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div className={cn(
              "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
              isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
            )}>
              <Icon className="size-5 text-netrul-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};