<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Certificado de Finalización</title>
    <style>
        @page {
            margin: 0px;
            /* Elimina márgenes de página predeterminados */
            size: 297mm 210mm;
            /* A4 landscape estricto */
        }

        html,
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0px;
            padding: 0px;
            width: 297mm;
            height: 210mm;
            background-color: #f6ffef;
            box-sizing: border-box;
            overflow: hidden;
            /* CRÍTICO: Evita saltos de página ocultando cualquier desbordamiento milimétrico */
        }

        /* Eliminamos .outer-container y posicionamos directamente el marco interior */
        .inner-container {
            position: absolute;
            top: 2cm;
            bottom: 2cm;
            left: 2cm;
            right: 2cm;
            border: 20px solid #00743c;
            background-color: #ffffff;
            box-sizing: border-box;
        }

        /* La marca de agua usa márgenes negativos para un centrado más compatible con DomPDF */
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -7.8cm;
            margin-left: -6.3cm;

            width: 12cm;
            height: 12cm;
            opacity: 0.05;
            z-index: -1;
        }

        .logo-reserva {
            position: absolute;
            top: 1cm;
            left: 2cm;
            height: 2.2cm;
        }

        .logo-depi {
            position: absolute;
            top: 1cm;
            right: 2cm;
            height: 2.5cm;
        }

        .logo-itt {
            position: absolute;
            top: 1cm;
            left: 50%;
            margin-left: -1.5cm;
            height: 2.5cm;
        }

        .text-container {
            position: absolute;
            top: 4.5cm;
            left: 0;
            width: 100%;
            text-align: center;
        }

        .institutions {
            margin-bottom: 0.8cm;
        }

        .institutions div {
            font-size: 12pt;
            font-weight: bold;
        }

        .nombramiento {
            margin-bottom: 0.8cm;
        }

        .nombramiento-label {
            font-size: 12pt;
            font-weight: normal;
            margin-bottom: 0.2cm;
        }

        .student-name {
            font-size: 30pt;
            font-weight: bold;
            color: #00743c;
        }

        .course-section {
            margin-bottom: 0.8cm;
        }

        .course-label {
            font-size: 12pt;
            font-weight: normal;
            margin-bottom: 0.2cm;
        }

        .course-title {
            font-size: 20pt;
            font-weight: bold;
            color: #000000;
        }

        .frase {
            margin-bottom: 0.8cm;
            margin-left: auto;
            margin-right: auto;
            width: 85%;
        }

        .frase div {
            font-size: 10pt;
            font-weight: normal;
            line-height: 1.4;
        }

        .date-section {
            margin-bottom: 0;
        }

        .date-label {
            font-size: 12pt;
            font-weight: normal;
            margin-bottom: 0.1cm;
        }

        .date-value {
            font-size: 12pt;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="inner-container">
        <!-- Marca de agua -->
        <img src="{{ public_path('Certificados/itt.png') }}" class="watermark">

        <!-- Logos Institucionales -->
        <img src="{{ public_path('Certificados/reserva.png') }}" class="logo-reserva">
        <img src="{{ public_path('Certificados/itt.png') }}" class="logo-itt">
        <img src="{{ public_path('Certificados/depi.png') }}" class="logo-depi">

        <!-- Contenido de Texto -->
        <div class="text-container">
            <div class="institutions">
                <div>EL INSTITUTO TECNOLÓGICO DE TEHUACÁN</div>
                <div>Y LA DIVISIÓN DE ESTUDIOS DE POSGRADO E INVESTIGACIÓN.</div>
            </div>

            <div class="nombramiento">
                <div class="nombramiento-label">CERTIFICA A:</div>
                <div class="student-name">{{ mb_strtoupper($user->name, 'UTF-8') }}</div>
            </div>

            <div class="course-section">
                <div class="course-label">QUE COMPLETO CON ÉXITO EL CURSO:</div>
                <div class="course-title">{{ mb_strtoupper($course->title, 'UTF-8') }}</div>
            </div>

            <div class="frase">
                <div>UN CURSO EN LÍNEA OFRECIDO A TRAVÉS DE LA PLATAFORMA DE LA RED DE CAFICULTORES DE LA RESERVA DE LA BIOSFERA DEL
                    INSTITUTO TECNOLÓGICO DE TEHUACÁN.</div>
            </div>

            <div class="date-section">
                <div class="date-label">FECHA:</div>
                <div class="date-value">
                    @php
                        $carbonDate = \Carbon\Carbon::createFromFormat('d/m/Y', $date)->locale('es');
                        $dia = $carbonDate->day;
                        $mes = mb_strtoupper($carbonDate->translatedFormat('F'), 'UTF-8');
                        $ano = $carbonDate->year;
                        $formattedDate = "$dia DE $mes DE $ano";
                    @endphp
                    {{ $formattedDate }}
                </div>
            </div>
        </div>
    </div>
</body>

</html>