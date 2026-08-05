import React from "react";
import qs from "query-string";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { router, usePage } from "@inertiajs/react";

export const CategoryItem = ({ label, value, isSpecial }) => {
    const { filters } = usePage().props;
    const currentCategory = filters?.categoryId;
    const currentTitle = filters?.title;

    const isSelected = value === null 
        ? (!currentCategory || currentCategory === 'null')
        : currentCategory === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: "/discover",
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });
        
        router.visit(url, { preserveState: true, preserveScroll: true });    
    };

    return (
        <Button
            onClick={onClick}
            variant="outline"
            className={cn(
                "py-2 px-5 text-sm border-2 rounded-none flex items-center gap-x-1 transition-all duration-200 font-bold uppercase tracking-wider shadow-sm",
                isSpecial
                    ? (isSelected
                        ? "bg-brand-mint text-white border-brand-mint hover:bg-white hover:text-brand-mint hover:border-brand-mint"
                        : "bg-white text-brand-mint border-brand-mint hover:bg-brand-mint hover:text-white hover:border-brand-mint")
                    : (isSelected
                        ? "bg-brand text-white border-brand hover:bg-white hover:text-brand hover:border-brand"
                        : "bg-white text-brand border-brand hover:bg-brand hover:text-white hover:border-brand")
            )}
            type="button"
        >
            <div className="truncate">
                {label}
            </div>
        </Button>
    )
};
