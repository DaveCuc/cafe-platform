import React, { useState, useEffect, useRef } from "react";
import qs from "query-string";
import { Search } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
    const { filters } = usePage().props;
    const currentCategoryId = filters?.categoryId || "";
    const currentTitle = filters?.title || "";
    
    const [value, setValue] = useState(currentTitle);
    const debouncedValue = useDebounce(value);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query: {
                title: debouncedValue,
                categoryId: currentCategoryId,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.visit(url, { preserveState: true, preserveScroll: true, replace: true });
    }, [debouncedValue, currentCategoryId]);

    return (
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-brand-ink" />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-[300px] pl-9 rounded-none bg-brand-pale focus-visible:ring-brand-ring"
                placeholder="Buscar artículos o cursos..."
            />
        </div>
    );
};
