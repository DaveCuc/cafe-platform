import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Pencil, Plus, Trash } from "lucide-react";
import axios from "axios";

// Generic Field Editor Component to reduce duplication for simple string/date inputs
const GenericForm = ({ initialData, eventId, field, label, type = "text", placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  let formInitialValue = initialData[field] || "";
  if (type === "date" && formInitialValue) {
    formInitialValue = formInitialValue.substring(0, 10);
  }

  const { data, setData, patch, processing } = useForm({
    [field]: formInitialValue,
  });

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    patch(`/teacher/events/${eventId}`, {
      preserveScroll: true,
      onSuccess: () => {
        toggleEdit();
      },
    });
  };

  let displayValue = initialData[field] || "No especificado";
  if (type === "date" && initialData[field]) {
    const dateStr = initialData[field].substring(0, 10);
    displayValue = new Date(dateStr + 'T12:00:00').toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        {label}
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar</>}
        </Button>
      </div>

      {!isEditing && (
        <p className={`text-sm mt-2 break-all ${!initialData[field] && "text-brand-ink italic"}`}>
          {displayValue}
        </p>
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4 mt-4">
          <Input
            type={type}
            disabled={processing}
            value={data[field]}
            onChange={(e) => setData(field, e.target.value)}
            placeholder={placeholder}
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={processing} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export const TitleForm = (props) => <GenericForm {...props} field="title" label="Título del Evento" placeholder="Ej. Gira Universitaria..." />;
export const ShortDescriptionForm = (props) => <GenericForm {...props} field="short_description" label="Ubicación Resumida (Para Portada)" placeholder="Ej. Tampico, Madero y Altamira" />;
export const DateForm = (props) => <GenericForm {...props} field="event_date" label="Fecha del Evento" type="date" />;
export const TimeForm = (props) => <GenericForm {...props} field="event_time" label="Horarios del Evento" type="text" placeholder="Ej. 9:00 a.m. – 6:00 p.m. (GMT-6)" />;
export const LocationForm = (props) => <GenericForm {...props} field="location" label="Ubicación Completa" placeholder="Ej. Multiple Venues - University Roadshow" />;
export const RsvpForm = (props) => <GenericForm {...props} field="rsvp_link" label="Link de RSVP (Google Forms, etc.)" type="url" placeholder="https://forms.gle/..." />;

export const DescriptionForm = ({ initialData, eventId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, patch, processing } = useForm({
    description: initialData.description || "",
  });

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    patch(`/teacher/events/${eventId}`, {
      preserveScroll: true,
      onSuccess: () => toggleEdit(),
    });
  };

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        Descripción Completa
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar</>}
        </Button>
      </div>
      {!isEditing && (
        <p className={`text-sm mt-2 whitespace-pre-wrap ${!initialData.description && "text-brand-ink italic"}`}>
          {initialData.description || "No especificado"}
        </p>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4 mt-4">
          <textarea
            disabled={processing}
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className="flex min-h-[150px] w-full rounded-none border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Descripción detallada del evento..."
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={processing} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export const TopicsForm = ({ initialData, eventId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [topicInput, setTopicInput] = useState("");
  const { data, setData, patch, processing } = useForm({
    topics: initialData.topics || [],
  });

  const toggleEdit = () => setIsEditing((c) => !c);

  const addTopic = () => {
    if (!topicInput.trim()) return;
    setData("topics", [...data.topics, topicInput.trim()]);
    setTopicInput("");
  };

  const removeTopic = (index) => {
    setData("topics", data.topics.filter((_, i) => i !== index));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    patch(`/teacher/events/${eventId}`, {
      preserveScroll: true,
      onSuccess: () => toggleEdit(),
    });
  };

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        Temas a Tratar
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar</>}
        </Button>
      </div>

      {!isEditing && (
        <div className="flex flex-wrap gap-2 mt-4">
          {!initialData.topics || initialData.topics.length === 0 ? (
            <p className="text-sm text-brand-ink italic">No hay temas agregados.</p>
          ) : (
            initialData.topics.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-brand text-white text-xs rounded-none font-bold tracking-wide uppercase">
                {t}
              </span>
            ))
          )}
        </div>
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4 mt-4">
          <div className="flex items-center gap-2">
            <Input 
              value={topicInput} 
              onChange={e => setTopicInput(e.target.value)} 
              placeholder="Ej. IA Generativa"
              onKeyDown={e => {
                  if (e.key === "Enter") {
                      e.preventDefault();
                      addTopic();
                  }
              }}
            />
            <Button type="button" onClick={addTopic} variant="outline"><Plus className="w-4 h-4" /></Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {data.topics.map((t, i) => (
              <div key={i} className="flex items-center gap-1 bg-brand-pale border px-2 py-1 rounded-none text-xs">
                <span>{t}</span>
                <button type="button" onClick={() => removeTopic(i)} className="text-red-500 hover:text-red-700 ml-1">
                  <Trash className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-x-2 mt-4">
            <Button disabled={processing} type="submit">Guardar Temas</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export const PeopleForm = ({ initialData, eventId, field, label }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const { data, setData, patch, processing } = useForm({
    [field]: initialData[field] || [],
  });

  const [newPerson, setNewPerson] = useState({ name: "", title: "", photo_url: "" });
  const [uploading, setUploading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const handlePhotoUpload = async (e) => {
    if (!e.target.files[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await axios.post(`/teacher/events/${eventId}/person-image`, formData);
      setNewPerson({ ...newPerson, photo_url: res.data.url });
    } catch (error) {
      console.error(error);
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const addPerson = () => {
    if (!newPerson.name) return;
    setData(field, [...data[field], newPerson]);
    setNewPerson({ name: "", title: "", photo_url: "" });
  };

  const removePerson = (index) => {
    setData(field, data[field].filter((_, i) => i !== index));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    patch(`/teacher/events/${eventId}`, {
      preserveScroll: true,
      onSuccess: () => toggleEdit(),
    });
  };

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2 mb-4">
        {label}
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar</>}
        </Button>
      </div>

      {!isEditing && (
        <div className="flex flex-col gap-4">
          {!initialData[field] || initialData[field].length === 0 ? (
            <p className="text-sm text-brand-ink italic">No hay registros.</p>
          ) : (
            initialData[field].map((p, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-2 rounded shadow-sm border border-brand-soft">
                <div className="w-10 h-10 rounded-none bg-brand-pale overflow-hidden shrink-0 border">
                  {p.photo_url && <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-brand-ink">{p.title}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
          
          <div className="p-4 bg-white border border-brand-soft rounded-none space-y-3">
             <h4 className="text-sm font-semibold mb-2">Agregar Nuevo</h4>
             <Input 
                placeholder="Nombre" 
                value={newPerson.name} 
                onChange={e => setNewPerson({...newPerson, name: e.target.value})} 
             />
             <Input 
                placeholder="Título/Puesto" 
                value={newPerson.title} 
                onChange={e => setNewPerson({...newPerson, title: e.target.value})} 
             />
             <div className="flex items-center gap-2">
                 <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                    className="text-xs w-full"
                    disabled={uploading}
                 />
             </div>
             {newPerson.photo_url && <img src={newPerson.photo_url} className="w-10 h-10 rounded-none object-cover" />}
             
             <Button type="button" size="sm" onClick={addPerson} disabled={!newPerson.name || uploading}>
                Agregar a la lista
             </Button>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {data[field].map((p, i) => (
              <div key={i} className="flex justify-between items-center bg-brand-pale border p-2 rounded text-sm">
                <div className="flex items-center gap-2">
                   {p.photo_url && <img src={p.photo_url} className="w-6 h-6 rounded-none object-cover" />}
                   <span>{p.name} ({p.title})</span>
                </div>
                <button type="button" onClick={() => removePerson(i)} className="text-red-500 hover:text-red-700">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-x-2 mt-4">
            <Button disabled={processing} type="submit">Guardar Cambios</Button>
          </div>
        </form>
      )}
    </div>
  );
};
