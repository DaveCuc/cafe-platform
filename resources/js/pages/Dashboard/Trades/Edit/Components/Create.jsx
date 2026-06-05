import React from 'react';
import { useForm } from '@inertiajs/react';
import MapSelector from '@/Components/MapSelector';

export default function CreateBusiness() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        latitude: '',
        longitude: ''
    });

    const handleLocationSelect = (locationData) => {
        setData(data => ({
            ...data,
            address: locationData.address,
            latitude: locationData.lat,
            longitude: locationData.lng
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('business.store')); 
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Añadir Nueva Ubicación</h2>
            
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                    <MapSelector onLocationSelect={handleLocationSelect} />
                    
                    {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                    {errors.latitude && <div className="text-red-500 text-sm mt-1">Debes seleccionar una ubicación en el mapa.</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
}
