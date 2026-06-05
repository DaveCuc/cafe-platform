import React from "react";
import { cn } from "@/lib/utils";

export const CustomFileUpload = ({ id = "file-upload", onChange, file, accept = "*", isLoading, multiple = false, progress = 0 }) => {
    // Calculamos el offset del círculo: 380 es el perímetro de strokeDasharray
    const offset = 380 - (380 * (progress || 0)) / 100;

    return (
        <div className="w-full">
            {isLoading ? (
                <div className="flex w-full flex-col items-center justify-center gap-4 rounded-none border border-brand-soft bg-brand-pale p-6 shadow-sm">
                    <div className="relative h-[80px] w-[80px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            viewBox="0 0 124 124"
                            className="block h-full w-full"
                        >
                            <circle
                                cx={62}
                                cy={62}
                                r={59}
                                fill="none"
                                stroke="var(--brand-soft)"
                                strokeWidth="6px"
                            />
                            <circle
                                cx={62}
                                cy={62}
                                r={59}
                                fill="none"
                                stroke="var(--brand)"
                                strokeWidth="6px"
                                strokeLinecap="round"
                                className="origin-center -rotate-90 transition-all duration-300 ease-out"
                                style={{ strokeDasharray: 380, strokeDashoffset: offset }}
                            />
                            {progress >= 100 && (
                                <polyline
                                    points="73.56 48.63 57.88 72.69 49.38 62"
                                    fill="none"
                                    stroke="var(--brand)"
                                    strokeWidth="6px"
                                    strokeLinecap="round"
                                    className="animate-[check-loading_0.2s_ease-in-out_forwards]"
                                    style={{ strokeDasharray: 45, strokeDashoffset: 45 }}
                                />
                            )}
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-brand-ink">
                        {progress < 100 ? `Subiendo archivo... ${progress}%` : "Procesando..."}
                    </span>
                </div>
            ) : (
                <div className="relative flex items-center">
                    <input
                        id={id}
                        type="file"
                        accept={accept}
                        onChange={onChange}
                        className="hidden"
                        multiple={multiple}
                    />
                    <label
                        htmlFor={id}
                        className="cursor-pointer whitespace-nowrap rounded-none border border-brand bg-brand px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-darker"
                    >
                        {multiple ? "Escoger imágenes" : "Elegir archivo"}
                    </label>
                    <span className="ml-4 truncate text-sm text-brand-ink">
                        {file 
                            ? (Array.isArray(file) && file.length > 0)
                                ? `${file.length} archivo(s) seleccionado(s)`
                                : (file.name ? file.name : "Ningún archivo seleccionado")
                            : "Ningún archivo seleccionado"}
                    </span>
                </div>
            )}
        </div>
    );
};
