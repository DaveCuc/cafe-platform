import React from 'react';

const Certificate = ({ 
    studentName = "NOMBRE COMPLETO DEL ESTUDIANTE", 
    courseName = "NOMBRE DEL CURSO", 
    date = "24 DE OCTUBRE DE 2024" 
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#f3f4f6', // Fondo gris claro para previsualizar en pantalla
            minHeight: '100vh',
            alignItems: 'center',
            overflow: 'auto'
        }}>
            {/* Contenedor principal del certificado (A4 Horizontal) */}
            <div style={{
                width: '297mm',
                height: '210mm',
                minWidth: '297mm',
                minHeight: '210mm',
                backgroundColor: '#e8f5e9', // Fondo verde claro
                padding: '2cm',
                boxSizing: 'border-box',
                position: 'relative',
                margin: '0 auto',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                fontFamily: 'Arial, sans-serif'
            }}>
                {/* Marco interior */}
                <div style={{
                    border: '5px solid #1b5e20', // Marco verde oscuro
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ffffff', // Fondo interior blanco
                    position: 'relative',
                    boxSizing: 'border-box'
                }}>
                    
                    {/* Marca de agua */}
                    <img 
                        src="/Certificados/itt.png" 
                        alt="Marca de agua ITT" 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '14cm',
                            height: '14cm',
                            opacity: 0.05, // Opacidad baja
                            objectFit: 'contain',
                            zIndex: 1
                        }} 
                    />

                    {/* Logos Institucionales */}
                    <img 
                        src="/logo.png" 
                        alt="Clúster Cafetalero" 
                        style={{
                            position: 'absolute',
                            top: '2cm',
                            left: '2cm',
                            height: '2.7cm',
                            objectFit: 'contain',
                            zIndex: 2
                        }} 
                    />
                    <img 
                        src="/Certificados/itt.png" 
                        alt="ITT" 
                        style={{
                            position: 'absolute',
                            top: '2cm',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: '3cm',
                            objectFit: 'contain',
                            zIndex: 2
                        }} 
                    />
                    <img 
                        src="/Certificados/depi.png" 
                        alt="DEPI" 
                        style={{
                            position: 'absolute',
                            top: '2cm',
                            right: '2cm',
                            height: '3cm',
                            objectFit: 'contain',
                            zIndex: 2
                        }} 
                    />

                    {/* Contenido de texto centrado */}
                    <div style={{
                        position: 'absolute',
                        top: '5.5cm',
                        left: '0',
                        width: '100%',
                        height: 'calc(100% - 5.5cm)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                        padding: '0 2cm',
                        boxSizing: 'border-box',
                        textAlign: 'center'
                    }}>
                        
                        {/* Instituciones */}
                        <div style={{ marginBottom: '0.8cm' }}>
                            <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>EL INSTITUTO TECNOLÓGICO DE TEHUACÁN</div>
                            <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>Y LA DIVISIÓN DE ESTUDIOS DE POSGRADO E INVESTIGACIÓN.</div>
                        </div>

                        {/* Nombramiento */}
                        <div style={{ marginBottom: '0.8cm' }}>
                            <div style={{ fontSize: '14pt', fontWeight: 'normal', marginBottom: '0.2cm' }}>CERTIFICA A:</div>
                            <div style={{ fontSize: '30pt', fontWeight: 'bold', color: '#1b5e20' }}>{studentName}</div>
                        </div>

                        {/* Curso */}
                        <div style={{ marginBottom: '0.8cm' }}>
                            <div style={{ fontSize: '14pt', fontWeight: 'normal', marginBottom: '0.2cm' }}>QUE COMPLETO CON ÉXITO EL CURSO:</div>
                            <div style={{ fontSize: '25pt', fontWeight: 'bold', color: '#000000' }}>{courseName}</div>
                        </div>

                        {/* Frase */}
                        <div style={{ marginBottom: '0.8cm', maxWidth: '85%' }}>
                            <div style={{ fontSize: '14pt', fontWeight: 'normal', lineHeight: '1.4' }}>
                                UN CURSO EN LÍNEA OFRECIDO A TRAVÉS DE LA PLATAFORMA DEL CLÚSTER CAFETALERO DE LA SIERRA NEGRA DEL INSTITUTO TECNOLÓGICO DE TEHUACÁN.
                            </div>
                        </div>

                        {/* Fecha */}
                        <div>
                            <div style={{ fontSize: '14pt', fontWeight: 'normal', marginBottom: '0.1cm' }}>FECHA:</div>
                            <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>{date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Certificate;