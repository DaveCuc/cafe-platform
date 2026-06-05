import React from "react";
import { ArticleCard } from "./ArticleCard";

export const ArticlesList = ({ items }) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <ArticleCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.image_url}
                        cardImageUrl={item.card_image_url}
                        category={item.category}
                        user={item.user}
                        publishedAt={item.published_at}
                        shortDescription={item.short_description}
                    />
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center text-sm text-brand-ink mt-10">
                    No se encontraron enlaces
                </div>
            )}
        </div>
    );
};
