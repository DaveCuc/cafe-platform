<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificado de Finalización</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background-color: #f7f9fc;
        }
        .certificate-container {
            width: 800px;
            height: 600px;
            padding: 40px;
            margin: 0 auto;
            background: white;
            border: 15px solid #111827; /* slate-900 */
            box-sizing: border-box;
            position: relative;
        }
        .header {
            font-size: 48px;
            font-weight: bold;
            color: #111827;
            margin-top: 50px;
            margin-bottom: 20px;
        }
        .subheader {
            font-size: 24px;
            color: #4b5563; /* gray-600 */
            margin-bottom: 40px;
        }
        .student-name {
            font-size: 36px;
            font-weight: bold;
            color: #2563eb; /* blue-600 */
            margin-bottom: 30px;
            border-bottom: 2px solid #e5e7eb;
            display: inline-block;
            padding-bottom: 10px;
            min-width: 400px;
        }
        .course-text {
            font-size: 20px;
            color: #4b5563;
            margin-bottom: 20px;
        }
        .course-title {
            font-size: 32px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 50px;
        }
        .footer {
            margin-top: 60px;
            display: table;
            width: 100%;
        }
        .signature-block {
            display: table-cell;
            width: 50%;
            vertical-align: bottom;
        }
        .signature-line {
            border-top: 1px solid #111827;
            width: 250px;
            margin: 0 auto;
            padding-top: 10px;
            font-weight: bold;
        }
        .date {
            font-size: 16px;
            color: #4b5563;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="header">
            Certificado de Finalización
        </div>
        <div class="subheader">
            Se otorga el presente a:
        </div>
        
        <div class="student-name">
            {{ $user->name }}
        </div>
        
        <div class="course-text">
            Por haber completado exitosamente el curso:
        </div>
        
        <div class="course-title">
            {{ $course->title }}
        </div>
        
        <div class="footer">
            <div class="signature-block">
                <div class="date">
                    Fecha de emisión: {{ $date }}
                </div>
            </div>
            <div class="signature-block">
                <div class="signature-line">
                    Instructor: {{ $course->user->name }}
                </div>
            </div>
        </div>
    </div>
</body>
</html>