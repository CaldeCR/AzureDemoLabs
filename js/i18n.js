/* ===== Internationalization Module ===== */
const I18N = {
    currentLang: 'en',

    translations: {
        en: {
            // Navbar
            appTitle: 'AzureDemoLabs',

            // Navigation
            navDashboard: 'Dashboard',
            navCertifications: 'Certifications',
            navQuestions: 'Question Bank',
            navStartTest: 'Start Test',
            navProgress: 'Progress',
            navImportExport: 'Import / Export',

            // Dashboard
            dashTitle: 'Dashboard',
            statCertifications: 'Certifications',
            statQuestions: 'Total Questions',
            statTests: 'Tests Taken',
            statAvgScore: 'Avg. Score',
            viewOfficialDocs: 'View Official Documentation',
            noCertSelected: 'Select a certification from the top bar to get started.',
            questionsInTopic: 'questions',

            // Certifications
            certTitle: 'Certifications Manager',
            addCertification: 'Add Certification',
            editCertification: 'Edit Certification',
            certCode: 'Code',
            certName: 'Name',
            certDescription: 'Description',
            certLink: 'Official Documentation Link',
            certTopics: 'Topics',
            addTopic: 'Add Topic',
            addSubtopic: 'Add Subtopic',
            topicName: 'Topic name',
            subtopicName: 'Subtopic name',
            deleteCertConfirm: 'Are you sure you want to delete this certification and all its questions?',
            noCertifications: 'No certifications yet. Add one to get started!',
            topicCount: 'topics',
            questionCount: 'questions',

            // Questions
            questionsTitle: 'Question Bank',
            addQuestion: 'Add Question',
            editQuestion: 'Edit Question',
            allTopics: 'All Topics',
            allSubtopics: 'All Subtopics',
            allQuestions: 'All Questions',
            bookmarkedOnly: 'Bookmarked Only',
            searchQuestions: 'Search questions...',
            topic: 'Topic',
            subtopic: 'Subtopic',
            questionText: 'Question',
            questionType: 'Type',
            singleAnswer: 'Single Answer',
            multiAnswer: 'Multiple Answers',
            yesNoAnswer: 'Yes / No',
            evaluateAnswer: 'Evaluate (Bracket Replace)',
            statementsAnswer: 'Statement Evaluation',
            bracketContext: 'Statement with [bracketed term]',
            bracketContextPlaceholder: 'Enter statement with the term in [brackets]...',
            noChangeNeeded: 'No change needed',
            statementsList: 'Statements',
            addStatement: 'Add Statement',
            statementPlaceholder: 'Enter statement...',
            statementCorrectValue: 'Correct: Yes/No',
            yes: 'Yes',
            no: 'No',
            answers: 'Answers',
            addAnswer: 'Add Answer',
            explanation: 'Explanation',
            explanationPlaceholder: 'Explain why the correct answer is right...',
            correct: 'Correct',
            markCorrect: 'Correct',
            noQuestions: 'No questions found. Add some or import a file!',
            deleteQuestionConfirm: 'Are you sure you want to delete this question?',
            needCertFirst: 'Please select a certification first.',
            needTopics: 'Please add topics to the certification first.',
            minTwoAnswers: 'A question needs at least 2 answers.',
            needCorrectAnswer: 'Please mark at least one correct answer.',
            questionRequired: 'Please enter a question text.',

            // Test Setup
            testSetupTitle: 'Configure Your Test',
            testMode: 'Test Mode',
            byTopic: 'By Topic',
            bySubtopic: 'By Subtopic',
            generalTest: 'General (All Topics)',
            selectTopic: 'Select Topic',
            selectSubtopic: 'Select Subtopic',
            numberOfQuestions: 'Number of Questions',
            timer: 'Timer',
            noTimer: 'No Timer',
            customTimer: 'Custom Timer',
            examSimulation: 'Exam Simulation (85 min)',
            timerMinutes: 'Minutes',
            startTest: 'Start Test',
            availableQuestionsLabel: 'Available: {0} questions',
            noQuestionsAvailable: 'No questions available for this selection.',

            // Test
            checkAnswer: 'Check Answer',
            previous: 'Previous',
            next: 'Next',
            finishTest: 'Finish Test',
            finishTestConfirm: 'Are you sure you want to finish? You have {0} unanswered questions.',

            // Results
            testResults: 'Test Results',
            incorrect: 'Incorrect',
            unanswered: 'Unanswered',
            timeTaken: 'Time Taken',
            passed: 'PASSED',
            failed: 'FAILED',
            topicBreakdown: 'Score by Topic',
            questionReview: 'Question Review',
            retakeTest: 'Retake Test',
            backToDashboard: 'Back to Dashboard',
            yourAnswer: 'Your answer:',
            correctAnswer: 'Correct answer:',
            notAnswered: '(Not answered)',

            // Progress
            progressTitle: 'Progress Tracker',
            testHistory: 'Test History',
            date: 'Date',
            certification: 'Certification',
            scope: 'Scope',
            score: 'Score',
            questions: 'Questions',
            noHistory: 'No test history yet. Take a test to see your progress!',
            topicPerformance: 'Topic Performance',
            attempts: 'attempts',
            avgScore: 'avg',

            // Import/Export
            importExportTitle: 'Import / Export',
            importData: 'Import Data',
            importDesc: 'Upload a JSON or Excel (.xlsx) file with questions and/or certification structure.',
            dropFileHere: 'Drop file here or click to browse',
            confirmImport: 'Confirm Import',
            exportData: 'Export Data',
            exportDesc: 'Download your data as a JSON file.',
            exportCertStructure: 'Certification Structure',
            exportQuestions: 'Questions',
            exportProgress: 'Progress Data',
            allCertifications: 'All Certifications',
            exportJSON: 'Export JSON',
            templateTitle: 'Download Template',
            templateDesc: 'Download a template to bulk-add questions.',
            downloadTemplate: 'Download JSON Template',
            importPreviewCerts: 'Certifications to import: {0}',
            importPreviewQuestions: 'Questions to import: {0}',
            importSuccess: 'Import completed successfully!',
            importError: 'Error reading file. Please check the format.',
            exportSuccess: 'Export downloaded successfully!',

            // Common
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            general: 'General',
        },

        es: {
            // Navbar
            appTitle: 'AzureDemoLabs',

            // Navigation
            navDashboard: 'Inicio',
            navCertifications: 'Certificaciones',
            navQuestions: 'Banco de Preguntas',
            navStartTest: 'Iniciar Examen',
            navProgress: 'Progreso',
            navImportExport: 'Importar / Exportar',

            // Dashboard
            dashTitle: 'Inicio',
            statCertifications: 'Certificaciones',
            statQuestions: 'Total Preguntas',
            statTests: 'Exámenes Realizados',
            statAvgScore: 'Puntuación Prom.',
            viewOfficialDocs: 'Ver Documentación Oficial',
            noCertSelected: 'Selecciona una certificación en la barra superior para comenzar.',
            questionsInTopic: 'preguntas',

            // Certifications
            certTitle: 'Gestor de Certificaciones',
            addCertification: 'Agregar Certificación',
            editCertification: 'Editar Certificación',
            certCode: 'Código',
            certName: 'Nombre',
            certDescription: 'Descripción',
            certLink: 'Enlace a Documentación Oficial',
            certTopics: 'Temas',
            addTopic: 'Agregar Tema',
            addSubtopic: 'Agregar Subtema',
            topicName: 'Nombre del tema',
            subtopicName: 'Nombre del subtema',
            deleteCertConfirm: '¿Estás seguro de que deseas eliminar esta certificación y todas sus preguntas?',
            noCertifications: '¡No hay certificaciones aún. ¡Agrega una para comenzar!',
            topicCount: 'temas',
            questionCount: 'preguntas',

            // Questions
            questionsTitle: 'Banco de Preguntas',
            addQuestion: 'Agregar Pregunta',
            editQuestion: 'Editar Pregunta',
            allTopics: 'Todos los Temas',
            allSubtopics: 'Todos los Subtemas',
            allQuestions: 'Todas las Preguntas',
            bookmarkedOnly: 'Solo Marcadas',
            searchQuestions: 'Buscar preguntas...',
            topic: 'Tema',
            subtopic: 'Subtema',
            questionText: 'Pregunta',
            questionType: 'Tipo',
            singleAnswer: 'Respuesta Única',
            multiAnswer: 'Respuestas Múltiples',
            yesNoAnswer: 'Sí / No',
            evaluateAnswer: 'Evaluar (Reemplazo de Corchete)',
            statementsAnswer: 'Evaluación de Enunciados',
            bracketContext: 'Enunciado con [término entre corchetes]',
            bracketContextPlaceholder: 'Ingresa el enunciado con el término entre [corchetes]...',
            noChangeNeeded: 'No se necesita cambio',
            statementsList: 'Enunciados',
            addStatement: 'Agregar Enunciado',
            statementPlaceholder: 'Ingresa el enunciado...',
            statementCorrectValue: 'Correcto: Sí/No',
            yes: 'Sí',
            no: 'No',
            answers: 'Respuestas',
            addAnswer: 'Agregar Respuesta',
            explanation: 'Explicación',
            explanationPlaceholder: 'Explica por qué la respuesta correcta es la correcta...',
            correct: 'Correctas',
            markCorrect: 'Correcta',
            noQuestions: '¡No se encontraron preguntas. ¡Agrega algunas o importa un archivo!',
            deleteQuestionConfirm: '¿Estás seguro de que deseas eliminar esta pregunta?',
            needCertFirst: 'Por favor selecciona una certificación primero.',
            needTopics: 'Por favor agrega temas a la certificación primero.',
            minTwoAnswers: 'Una pregunta necesita al menos 2 respuestas.',
            needCorrectAnswer: 'Por favor marca al menos una respuesta correcta.',
            questionRequired: 'Por favor ingresa el texto de la pregunta.',

            // Test Setup
            testSetupTitle: 'Configura tu Examen',
            testMode: 'Modo de Examen',
            byTopic: 'Por Tema',
            bySubtopic: 'Por Subtema',
            generalTest: 'General (Todos los Temas)',
            selectTopic: 'Seleccionar Tema',
            selectSubtopic: 'Seleccionar Subtema',
            numberOfQuestions: 'Número de Preguntas',
            timer: 'Temporizador',
            noTimer: 'Sin Temporizador',
            customTimer: 'Temporizador Personalizado',
            examSimulation: 'Simulación de Examen (85 min)',
            timerMinutes: 'Minutos',
            startTest: 'Iniciar Examen',
            availableQuestionsLabel: 'Disponibles: {0} preguntas',
            noQuestionsAvailable: 'No hay preguntas disponibles para esta selección.',

            // Test
            checkAnswer: 'Verificar Respuesta',
            previous: 'Anterior',
            next: 'Siguiente',
            finishTest: 'Finalizar Examen',
            finishTestConfirm: '¿Estás seguro de que deseas terminar? Tienes {0} preguntas sin responder.',

            // Results
            testResults: 'Resultados del Examen',
            incorrect: 'Incorrectas',
            unanswered: 'Sin Responder',
            timeTaken: 'Tiempo Empleado',
            passed: 'APROBADO',
            failed: 'REPROBADO',
            topicBreakdown: 'Puntuación por Tema',
            questionReview: 'Revisión de Preguntas',
            retakeTest: 'Repetir Examen',
            backToDashboard: 'Volver al Inicio',
            yourAnswer: 'Tu respuesta:',
            correctAnswer: 'Respuesta correcta:',
            notAnswered: '(Sin responder)',

            // Progress
            progressTitle: 'Seguimiento de Progreso',
            testHistory: 'Historial de Exámenes',
            date: 'Fecha',
            certification: 'Certificación',
            scope: 'Alcance',
            score: 'Puntuación',
            questions: 'Preguntas',
            noHistory: '¡No hay historial de exámenes aún. ¡Realiza un examen para ver tu progreso!',
            topicPerformance: 'Rendimiento por Tema',
            attempts: 'intentos',
            avgScore: 'prom',

            // Import/Export
            importExportTitle: 'Importar / Exportar',
            importData: 'Importar Datos',
            importDesc: 'Sube un archivo JSON o Excel (.xlsx) con preguntas y/o estructura de certificación.',
            dropFileHere: 'Arrastra un archivo aquí o haz clic para buscar',
            confirmImport: 'Confirmar Importación',
            exportData: 'Exportar Datos',
            exportDesc: 'Descarga tus datos como un archivo JSON.',
            exportCertStructure: 'Estructura de Certificación',
            exportQuestions: 'Preguntas',
            exportProgress: 'Datos de Progreso',
            allCertifications: 'Todas las Certificaciones',
            exportJSON: 'Exportar JSON',
            templateTitle: 'Descargar Plantilla',
            templateDesc: 'Descarga una plantilla para agregar preguntas masivamente.',
            downloadTemplate: 'Descargar Plantilla JSON',
            importPreviewCerts: 'Certificaciones a importar: {0}',
            importPreviewQuestions: 'Preguntas a importar: {0}',
            importSuccess: '¡Importación completada exitosamente!',
            importError: 'Error al leer el archivo. Por favor verifica el formato.',
            exportSuccess: '¡Exportación descargada exitosamente!',

            // Common
            save: 'Guardar',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            edit: 'Editar',
            general: 'General',
        }
    },

    init() {
        const saved = localStorage.getItem('quizLang');
        if (saved && this.translations[saved]) {
            this.currentLang = saved;
        }
        this.apply();
    },

    toggle() {
        this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
        localStorage.setItem('quizLang', this.currentLang);
        this.apply();
    },

    t(key, ...args) {
        let text = this.translations[this.currentLang]?.[key]
            || this.translations['en']?.[key]
            || key;
        args.forEach((arg, i) => {
            text = text.replace(`{${i}}`, arg);
        });
        return text;
    },

    apply() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        const langLabel = document.getElementById('langLabel');
        if (langLabel) langLabel.textContent = this.currentLang.toUpperCase();
    }
};
