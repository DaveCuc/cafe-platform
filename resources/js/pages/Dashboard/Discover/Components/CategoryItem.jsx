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
                "py-2 px-5 text-sm border-2 rounded-none flex items-center gap-x-1 transition-colors font-bold uppercase tracking-wider shadow-sm",
                isSpecial ? "border-brand-mint text-brand-darker bg-brand-mint hover:bg-white hover:text-brand-darker hover:border-brand-darker" : "border-brand",
                !isSpecial && (isSelected ? "bg-brand text-white hover:bg-brand-darker hover:border-brand-darker" : "text-brand bg-white hover:bg-brand hover:text-white"),
                isSpecial && isSelected && "bg-brand-darker text-brand-mint border-brand-darker hover:bg-brand-darker hover:text-brand-mint"
            )}
            type="button"
        >
            <div className="truncate">
                {label}
            </div>
        </Button>
    )
};
