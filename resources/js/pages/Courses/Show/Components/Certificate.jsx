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
                backgroundColor: '#f4f8f4',
                padding: '1.5cm',
                boxSizing: 'border-box',
                position: 'relative',
                margin: '0 auto',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)', 
                fontFamily: 'Helvetica, Arial, sans-serif'
            }}>
                {/* Marco interior */}
                <div style={{
                    border: '12px solid #0B5139', // Verde Oscuro Institucional
                    outline: '3px solid #A57F2C', // Filete Dorado/Mostaza
                    outlineOffset: '-18px',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ffffff',
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
                            opacity: 0.04,
                            objectFit: 'contain',
                            zIndex: 1
                        }} 
                    />

                    {/* Logos Institucionales */}
                    <img 
                        src="/Certificados/cafe.png" 
                        alt="Clúster Cafetalero" 
                        style={{
                            position: 'absolute',
                            top: '1.2cm',
                            left: '1.8cm',
                            height: '2.4cm',
                            objectFit: 'contain',
                            zIndex: 2
                        }} 
                    />
                    <img 
                        src="/Certificados/itt.png" 
                        alt="ITT" 
                        style={{
                            position: 'absolute',
                            top: '1.2cm',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: '2.5cm',
                            objectFit: 'contain',
                            zIndex: 2
                        }} 
                    />
                    <img 
                        src="/Certificados/depi.png" 
                        alt="DEPI" 
                        style={{
                            position: 'absolute',
                            top: '1.2cm',
                            right: '1.8cm',
                            height: '2.4cm',
                            objectFit: 'contain',
                            zIndex: 2
                        }} 
                    />

                    {/* Contenido de texto centrado */}
                    <div style={{
                        position: 'absolute',
                        top: '4.4cm',
                        left: '0',
                        width: '100%',
                        height: 'calc(100% - 4.4cm)',
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
                            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#262626', letterSpacing: '1px' }}>EL INSTITUTO TECNOLÓGICO DE TEHUACÁN</div>
                            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#262626', letterSpacing: '1px' }}>Y LA DIVISIÓN DE ESTUDIOS DE POSGRADO E INVESTIGACIÓN.</div>
                        </div>

                        {/* Nombramiento */}
                        <div style={{ marginBottom: '0.7cm' }}>
                            <div style={{ fontSize: '11pt', fontWeight: 'normal', color: '#555555', marginBottom: '0.2cm', letterSpacing: '1px' }}>OTORGA EL PRESENTE RECONOCIMIENTO A:</div>
                            <div style={{ fontSize: '28pt', fontWeight: 'bold', color: '#0B5139', letterSpacing: '1px' }}>{studentName}</div>
                        </div>

                        {/* Curso */}
                        <div style={{ marginBottom: '0.7cm' }}>
                            <div style={{ fontSize: '11pt', fontWeight: 'normal', color: '#555555', marginBottom: '0.2cm', letterSpacing: '1px' }}>POR HABER CONCLUIDO SATISFACTORIAMENTE EL CURSO:</div>
                            <div style={{ fontSize: '22pt', fontWeight: 'bold', color: '#4A0E17', letterSpacing: '1px' }}>{courseName}</div>
                        </div>

                        {/* Frase */}
                        <div style={{ marginBottom: '0.8cm', maxWidth: '85%' }}>
                            <div style={{ fontSize: '10pt', fontWeight: 'normal', lineHeight: '1.4', color: '#333333' }}>
                                PROGRAMA DE CAPACITACIÓN OFRECIDO A TRAVÉS DE LA PLATAFORMA DEL CLÚSTER CAFETALERO DE LA SIERRA NEGRA DEL INSTITUTO TECNOLÓGICO DE TEHUACÁN.
                            </div>
                        </div>

                        {/* Fecha */}
                        <div>
                            <div style={{ fontSize: '11pt', fontWeight: 'normal', color: '#555555', marginBottom: '0.1cm' }}>FECHA DE EMISIÓN:</div>
                            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#0B5139' }}>{date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Certificate;