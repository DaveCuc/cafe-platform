import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "w-full px-0 py-4 text-center text-sm font-medium",
  {
    variants: {
      variant: {
        warning: "bg-yellow-400 text-yellow-900",
        success: "bg-brand text-white",
        warningSolid: "bg-yellow-400 text-yellow-900",
        successSolid: "bg-brand text-white",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  return <div className={cn(bannerVariants({ variant }))}>{label}</div>;
};