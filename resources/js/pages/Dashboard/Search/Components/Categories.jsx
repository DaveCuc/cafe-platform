import React from "react";
import { CategoryItem } from "./CategoryItem";
import {
  FcLandscape,
  FcBiomass,
  FcConferenceCall,
  FcLike,
  FcInspection,
  FcHome,
  FcGlobe,
} from "react-icons/fc";

const iconMap = {
  "Producción": FcBiomass,
  "Tostado": FcLandscape,
  "Barismo": FcConferenceCall,
  "Comercio Justo": FcLike,
  "Administración": FcInspection,
  "Agroecología": FcHome,
};

export const Categories = ({ items }) => {
    return ( 
        <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible md:flex-wrap pb-2 md:pb-0 scrollbar-hide shrink-0">
            <CategoryItem
                label="Todos"
                icon={FcGlobe}
                value={null}
            />
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name] || FcGlobe}
                    value={item.id}   
                />
            ))}
        </div>
    );
};
