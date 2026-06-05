import { router } from "@inertiajs/react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/Components/ui/badge";

export const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Título
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
  },

  {
    accessorKey: "is_published",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Estado
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => {
        const isPublished = row.getValue("is_published") || false;
        return (
            <Badge className={cn(
                "bg-brand-ink",
                isPublished && "bg-emerald-600",
        )}>
                {isPublished ? "Publicado" : "Borrador"}
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const {id} = row.original;
        
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-4 w-8 p-0">    
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.visit(`/teacher/courses/${id}`)} className="cursor-pointer">
                        <Pencil className="h-4 w-4 mr-2"/>
                        Editar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }
]
