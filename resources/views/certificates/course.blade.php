<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Certificado de Finalización</title>
    <style>
        @page {
            margin: 0px;
            size: 297mm 210mm; /* A4 landscape */
        }

        html,
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0px;
            padding: 0px;
            width: 297mm;
            height: 210mm;
            background-color: #f4f8f4;
            box-sizing: border-box;
            overflow: hidden;
        }

        .inner-container {
            position: absolute;
            top: 1.5cm;
            bottom: 1.5cm;
            left: 1.5cm;
            right: 1.5cm;
            border: 12px solid #0B5139; /* Verde Oscuro Institucional */
            outline: 3px solid #A57F2C; /* Filete Dorado/Mostaza */
            outline-offset: -18px;
            background-color: #ffffff;
            box-sizing: border-box;
        }

        /* Marca de agua */
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -7.8cm;
            margin-left: -6.3cm;
            width: 12cm;
            height: 12cm;
            opacity: 0.04;
            z-index: -1;
        }

        .logo-cafe {
            position: absolute;
            top: 1.2cm;
            left: 1.8cm;
            height: 2.4cm;
        }

        .logo-depi {
            position: absolute;
            top: 1.2cm;
            right: 1.8cm;
            height: 2.4cm;
        }

        .logo-itt {
            position: absolute;
            top: 1.2cm;
            left: 50%;
            margin-left: -1.5cm;
            height: 2.5cm;
        }

        .text-container {
            position: absolute;
            top: 4.4cm;
            left: 0;
            width: 100%;
            text-align: center;
        }

        .institutions {
            margin-bottom: 0.8cm;
        }

        .institutions div {
            font-size: 11pt;
            font-weight: bold;
            color: #262626;
            letter-spacing: 1px;
        }

        .nombramiento {
            margin-bottom: 0.7cm;
        }

        .nombramiento-label {
            font-size: 11pt;
            font-weight: normal;
            color: #555555;
            margin-bottom: 0.2cm;
            letter-spacing: 1px;
        }

        .student-name {
            font-size: 28pt;
            font-weight: bold;
            color: #0B5139; /* Verde Oscuro */
            letter-spacing: 1px;
        }

        .course-section {
            margin-bottom: 0.7cm;
        }

        .course-label {
            font-size: 11pt;
            font-weight: normal;
            color: #555555;
            margin-bottom: 0.2cm;
            letter-spacing: 1px;
        }

        .course-title {
            font-size: 22pt;
            font-weight: bold;
            color: #4A0E17; /* Guinda Elegante */
            letter-spacing: 1px;
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
            color: #333333;
        }

        .date-section {
            margin-bottom: 0;
        }

        .date-label {
            font-size: 11pt;
            font-weight: normal;
            color: #555555;
            margin-bottom: 0.1cm;
        }

        .date-value {
            font-size: 11pt;
            font-weight: bold;
            color: #0B5139;
        }
    </style>
</head>

<body>
    <div class="inner-container">
        <!-- Marca de agua -->
        <img src="{{ public_path('Certificados/itt.png') }}" class="watermark">

        <!-- Logos Institucionales -->
        <img src="{{ public_path('Certificados/cafe.png') }}" class="logo-cafe">
        <img src="{{ public_path('Certificados/itt.png') }}" class="logo-itt">
        <img src="{{ public_path('Certificados/depi.png') }}" class="logo-depi">

        <!-- Contenido de Texto -->
        <div class="text-container">
            <div class="institutions">
                <div>EL INSTITUTO TECNOLÓGICO DE TEHUACÁN</div>
                <div>Y LA DIVISIÓN DE ESTUDIOS DE POSGRADO E INVESTIGACIÓN.</div>
            </div>

            <div class="nombramiento">
                <div class="nombramiento-label">OTORGA EL PRESENTE RECONOCIMIENTO A:</div>
                <div class="student-name">{{ mb_strtoupper($user->name, 'UTF-8') }}</div>
            </div>

            <div class="course-section">
                <div class="course-label">POR HABER CONCLUIDO SATISFACTORIAMENTE EL CURSO:</div>
                <div class="course-title">{{ mb_strtoupper($course->title, 'UTF-8') }}</div>
            </div>

            <div class="frase">
                <div>PROGRAMA DE CAPACITACIÓN OFRECIDO A TRAVÉS DE LA PLATAFORMA DEL CLÚSTER CAFETALERO DE LA SIERRA NEGRA DEL INSTITUTO TECNOLÓGICO DE TEHUACÁN.</div>
            </div>

            <div class="date-section">
                <div class="date-label">FECHA DE EMISIÓN:</div>
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