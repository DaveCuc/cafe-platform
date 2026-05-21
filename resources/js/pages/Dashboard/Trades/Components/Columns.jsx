import { router } from "@inertiajs/react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = [
    {
        accessorKey: "comercial_name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nombre comercial
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "giro",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Giro
                <ArrowUpDown className="ml-2 h-4 w-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const selectedGiros = row.original.giros || [];
            if (selectedGiros.length) {
                return selectedGiros.map((giro) => giro.name).join(', ');
            }

            const value = row.getValue("giro");
            return value ? value : "Sin definir";
        },
    },
    
{
    accessorKey: "created_at",
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Fecha de creación
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    // Agrega esto aquí abajo para transformar el "2026-05-21T15:31:14.000000Z"
    cell: ({ row }) => {
        const dateValue = row.getValue("created_at");
        if (!dateValue) return "";

        const date = new Date(dateValue);
        
        // Formato DD/MM/AA HH:MM
        return new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(date);
    },
},
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Estado
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") || "draft";

            if (status === "approved") {
                return <Badge className={cn("bg-emerald-600")}>Aprobado</Badge>;
            }

            if (status === "pending") {
                return <Badge className={cn("bg-amber-500")}>En solicitud</Badge>;
            }

            if (status === "rejected") {
                return <Badge className={cn("bg-rose-600")}>Rechazado</Badge>;
            }

            return (
                <Badge className={cn("bg-brand-ink")}>Borrador</Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => router.visit(`/directory/trades/${id}/edit`)}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
