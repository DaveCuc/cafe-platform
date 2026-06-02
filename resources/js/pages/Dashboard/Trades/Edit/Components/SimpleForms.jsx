import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { MapContainer } from 'react-leaflet'




import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Editor } from "@/Components/Editor";
import { Preview } from "@/Components/Preview";

export function BaseCard({ title, isEditing, onToggle, children, preview, isCompleted }) {
    return (
        <div className="mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm relative">
            <div className="flex items-center justify-between font-medium">
                <div className="flex items-center gap-x-2">
                    {title}
                    {isCompleted && (
                        <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                            Completado
                        </div>
                    )}
                </div>
                <Button
                    onClick={onToggle}
                    variant={isEditing ? "destructive" : "outline"}
                    className={isEditing 
                        ? "rounded-none font-bold uppercase tracking-wider" 
                        : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}
                >
                    {isEditing ? (
                        "Cancelar"
                    ) : (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? preview : children}
        </div>
    );
}

export function ComercialNameForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.comercial_name || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { comercial_name: value },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Nombre comercial"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            isCompleted={!!initialData.comercial_name}
            preview={
                <p className="mt-2 text-sm text-brand-text">
                    {initialData.comercial_name || "Sin definir"}
                </p>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Input
                    disabled={isLoading}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ej. Mercado Artesanal Los Pinos"
                    className="bg-white"
                    required
                />
                <Button type="submit" disabled={!value || isLoading} className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function ShortDescriptionForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.descripcion_corta || "");
    const [isLoading, setIsLoading] = useState(false);
    const maxCharacters = 200;
    const characterCount = value.length;

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { descripcion_corta: value },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Descripción corta"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            isCompleted={!!initialData.descripcion_corta}
            preview={
                <p className={`mt-2 text-sm ${initialData.descripcion_corta ? "text-brand-text" : "italic text-brand-ink"}`}>
                    {initialData.descripcion_corta || "Sin descripción corta"}
                </p>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Textarea
                    disabled={isLoading}
                    value={value}
                    onChange={(e) => setValue(e.target.value.slice(0, maxCharacters))}
                    maxLength={maxCharacters}
                    placeholder="Describe brevemente tu negocio"
                    className="min-h-24 bg-white"
                />
                <p className="text-xs text-brand-ink">{characterCount}/{maxCharacters}</p>
                <Button type="submit" disabled={!value || isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function LongDescriptionForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.descripcion_larga || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { descripcion_larga: value },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Descripción larga"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            isCompleted={!!initialData.descripcion_larga}
            preview={
                <div className="mt-2 text-sm">
                    {initialData.descripcion_larga ? (
                        <Preview value={initialData.descripcion_larga} />
                    ) : (
                        <p className="italic text-brand-ink">Sin descripción larga</p>
                    )}
                </div>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Editor
                    value={value}
                    onChange={(val) => setValue(val)}
                />
                <p className="text-xs text-brand-ink">
                    Puedes agregar títulos, subtítulos, negritas y viñetas.
                </p>
                <Button type="submit" disabled={isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function ActivitiesForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newActivity, setNewActivity] = useState("");
    const [activities, setActivities] = useState(initialData.activities || []);
    const [isLoading, setIsLoading] = useState(false);

    const saveActivities = (nextActivities) => {
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { activities: nextActivities },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setActivities(nextActivities);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    const addActivity = (e) => {
        e.preventDefault();
        if (!newActivity.trim()) {
            return;
        }

        const next = [...activities, newActivity.trim()];
        setNewActivity("");
        setIsCreating(false);
        saveActivities(next);
    };

    const updateActivity = (index, value) => {
        setActivities((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
    };

    const removeActivity = (index) => {
        const next = activities.filter((_, itemIndex) => itemIndex !== index);
        saveActivities(next);
    };

    const onSubmitInline = (e) => {
        e.preventDefault();
        saveActivities(activities.filter((item) => item?.trim()));
        setIsEditing(false);
    };

    return (
        <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between font-medium">
                <div className="flex items-center gap-x-2">
                    Lista de actividades
                    {activities.length > 0 && (
                        <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                            Completado
                        </div>
                    )}
                </div>
                <Button
                    onClick={() => setIsCreating((current) => !current)}
                    variant={isCreating ? "destructive" : "outline"}
                    className={isCreating 
                        ? "rounded-none font-bold uppercase tracking-wider" 
                        : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}
                >
                    {isCreating ? "Cancelar" : <><PlusCircle className="mr-2 h-4 w-4" />Agregar actividad</>}
                </Button>
            </div>

            {isCreating && (
                <form onSubmit={addActivity} className="mt-4 space-y-4">
                    <Input
                        disabled={isLoading}
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        placeholder="Ej. Recorrido guiado, taller artesanal"
                        className="bg-white"
                    />
                    <Button type="submit" disabled={!newActivity || isLoading} className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar</Button>
                </form>
            )}

            {!isCreating && !isEditing && (
                <div className="mt-3 space-y-2 text-sm">
                    {activities.length ? (
                        activities.map((activity, index) => (
                            <div key={`${activity}-${index}`} className="rounded-none bg-white px-3 py-2 text-brand-text">
                                {activity}
                            </div>
                        ))
                    ) : (
                        <p className="italic text-brand-ink">Sin actividades registradas</p>
                    )}
                    <Button
                        onClick={() => setIsEditing(true)}
                        variant="ghost"
                        className="mt-2 bg-white hover:bg-brand-soft hover:text-white"
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar lista
                    </Button>
                </div>
            )}

            {isEditing && (
                <form onSubmit={onSubmitInline} className="mt-4 space-y-3">
                    {activities.length ? (
                        activities.map((activity, index) => (
                            <div key={`${index}-${activity}`} className="flex items-center gap-2">
                                <Input
                                    value={activity}
                                    onChange={(e) => updateActivity(index, e.target.value)}
                                    className="bg-white"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeActivity(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="italic text-brand-ink">Sin actividades registradas</p>
                    )}
                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={isLoading} className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar cambios</Button>
                        <Button type="button" variant="destructive" className="rounded-none font-bold uppercase tracking-wider" onClick={() => setIsEditing(false)}>Cancelar</Button>
                    </div>
                </form>
            )}
        </div>
    );
}



export function BusinessContactForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState(initialData.phone || "");
    const [website, setWebsite] = useState(initialData.website || "");
    const [email, setEmail] = useState(initialData.email || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            { phone, website, email },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Contacto Negocio"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            isCompleted={!!initialData.phone}
            preview={
                <div className="mt-2 space-y-1 text-sm">
                    <p className={initialData.phone ? "text-brand-text" : "italic text-brand-ink"}>Teléfono: {initialData.phone || "Sin definir"}</p>
                    <p className={initialData.website ? "text-brand-text" : "italic text-brand-ink"}>Página web: {initialData.website || "Sin definir"}</p>
                    <p className={initialData.email ? "text-brand-text" : "italic text-brand-ink"}>Correo: {initialData.email || "Sin definir"}</p>
                </div>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Input
                    disabled={isLoading}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Número de teléfono del negocio"
                    className="bg-white"
                />
                <Input
                    disabled={isLoading}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://sitio-negocio.com (opcional)"
                    className="bg-white"
                />
                <Input
                    disabled={isLoading}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo del negocio (opcional)"
                    className="bg-white"
                />
                <Button type="submit" disabled={isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}

export function PersonalContactForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialData.personal_name || "");
    const [cargo, setCargo] = useState(initialData.personal_cargo || "");
    const [phone, setPhone] = useState(initialData.personal_phone || "");
    const [email, setEmail] = useState(initialData.personal_email || "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            {
                personal_name: name,
                personal_cargo: cargo,
                personal_phone: phone,
                personal_email: email,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <BaseCard
            title="Contacto personal"
            isEditing={isEditing}
            onToggle={() => setIsEditing((current) => !current)}
            isCompleted={!!initialData.personal_name}
            preview={
                <div className="mt-2 space-y-1 text-sm">
                    <p className={initialData.personal_name ? "text-brand-text" : "italic text-brand-ink"}>
                        Nombre completo: {initialData.personal_name || "Sin definir"}
                    </p>
                    <p className={initialData.personal_cargo ? "text-brand-text" : "italic text-brand-ink"}>
                        Cargo: {initialData.personal_cargo || "Sin definir"}
                    </p>
                    <p className={initialData.personal_phone ? "text-brand-text" : "italic text-brand-ink"}>
                        Teléfono personal: {initialData.personal_phone || "Sin definir"}
                    </p>
                    <p className={initialData.personal_email ? "text-brand-text" : "italic text-brand-ink"}>
                        Correo personal: {initialData.personal_email || "Sin definir"}
                    </p>
                </div>
            }
        >
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <Input
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo"
                    className="bg-white"
                />
                {/* Cargo */}
                <Input
                    disabled={isLoading}
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Cargo"
                    className="bg-white"
                />


                <Input
                    disabled={isLoading}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Número de teléfono personal"
                    className="bg-white"
                />
                <Input
                    disabled={isLoading}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo personal (opcional)"
                    className="bg-white"
                />
                <Button type="submit" disabled={isLoading}>
                    Guardar
                </Button>
            </form>
        </BaseCard>
    );
}
