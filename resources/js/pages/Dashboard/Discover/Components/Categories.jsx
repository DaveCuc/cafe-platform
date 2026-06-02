import React from "react";
import { CategoryItem } from "./CategoryItem";

export const Categories = ({ items }) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible md:flex-wrap pb-2 md:pb-0 scrollbar-hide shrink-0">
            <CategoryItem
                label="Todos"
                value={null}
            />
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    value={item.id}
                />
            ))}
        </div>
    );
};
