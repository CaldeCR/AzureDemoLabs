/* ===== AZ-900 Seed Data ===== */
const SeedData = {
    shouldSeed() {
        return Store.getCertifications().length === 0;
    },

    seed() {
        if (!this.shouldSeed()) {
            if (!localStorage.getItem('quiz_es_v1')) {
                const cert = Store.getCertifications().find(c => c.code === 'AZ-900');
                if (cert) { this.applySpanish(cert.id); localStorage.setItem('quiz_es_v1', '1'); }
            }
            return;
        }

        const az900 = {
            id: 'az900',
            code: 'AZ-900',
            name: 'Azure Fundamentals',
            description: 'Microsoft Azure Fundamentals certification validates foundational knowledge of cloud concepts, Azure services, Azure workloads, security and privacy in Azure, as well as Azure pricing and support.',
            link: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification',
            topics: [
                {
                    name: 'Describe Cloud Concepts',
                    link: 'https://learn.microsoft.com/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
                    subtopics: [
                        'Describe cloud computing',
                        'Describe the benefits of using cloud services',
                        'Describe cloud service types'
                    ]
                },
                {
                    name: 'Describe Azure Architecture and Services',
                    link: 'https://learn.microsoft.com/training/paths/azure-fundamentals-describe-azure-architecture-services/',
                    subtopics: [
                        'Describe the core architectural components of Azure',
                        'Describe Azure compute services',
                        'Describe Azure networking services',
                        'Describe Azure storage services',
                        'Describe Azure identity, access, and security'
                    ]
                },
                {
                    name: 'Describe Azure Management and Governance',
                    link: 'https://learn.microsoft.com/training/paths/describe-azure-management-governance/',
                    subtopics: [
                        'Describe cost management in Azure',
                        'Describe features and tools in Azure for governance and compliance',
                        'Describe features and tools for managing and deploying Azure resources',
                        'Describe monitoring tools in Azure'
                    ]
                }
            ]
        };

        Store.addCertification(az900);
        Store.setActiveCertId(az900.id);

        // Seed some sample questions to demonstrate the app
        const sampleQuestions = [
            // Topic 1: Describe Cloud Concepts
            {
                certId: az900.id,
                topic: 'Describe Cloud Concepts',
                subtopic: 'Describe cloud computing',
                text: 'What is cloud computing?',
                type: 'single',
                answers: [
                    { text: 'Delivery of computing services over the internet', correct: true },
                    { text: 'A type of programming language', correct: false },
                    { text: 'A physical server in your office', correct: false },
                    { text: 'A type of network cable', correct: false }
                ],
                explanation: 'Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.'
            },
            {
                certId: az900.id,
                topic: 'Describe Cloud Concepts',
                subtopic: 'Describe cloud computing',
                text: 'Which of the following describes the shared responsibility model in cloud computing?',
                type: 'single',
                answers: [
                    { text: 'The cloud provider is responsible for everything', correct: false },
                    { text: 'The customer is responsible for everything', correct: false },
                    { text: 'Responsibilities are shared between the cloud provider and the customer', correct: true },
                    { text: 'Neither the customer nor the provider has responsibility', correct: false }
                ],
                explanation: 'In the shared responsibility model, responsibilities are divided between the cloud provider and the customer. The cloud provider is always responsible for the physical infrastructure, while the customer is always responsible for their data and identities. Other responsibilities shift depending on the service model (IaaS, PaaS, SaaS).'
            },
            {
                certId: az900.id,
                topic: 'Describe Cloud Concepts',
                subtopic: 'Describe cloud computing',
                text: 'Which cloud model uses some datacenters focused on providing cloud services to anyone that wants them, and some data centers that are directly connected to one organization?',
                type: 'single',
                answers: [
                    { text: 'Public cloud', correct: false },
                    { text: 'Hybrid cloud', correct: true },
                    { text: 'Private cloud', correct: false },
                    { text: 'Multi-cloud', correct: false }
                ],
                explanation: 'A hybrid cloud is a computing environment that combines a public cloud and a private cloud by allowing data and applications to be shared between them.'
            },
            {
                certId: az900.id,
                topic: 'Describe Cloud Concepts',
                subtopic: 'Describe the benefits of using cloud services',
                text: 'Which of the following are benefits of cloud computing? (Select all that apply)',
                type: 'multi',
                answers: [
                    { text: 'High availability', correct: true },
                    { text: 'Scalability', correct: true },
                    { text: 'Unlimited free storage', correct: false },
                    { text: 'Geo-distribution', correct: true }
                ],
                explanation: 'Cloud computing offers many benefits including high availability, scalability, geo-distribution, disaster recovery, and cost efficiency. However, cloud services are not free—you pay for what you use.'
            },
            {
                certId: az900.id,
                topic: 'Describe Cloud Concepts',
                subtopic: 'Describe the benefits of using cloud services',
                text: 'What is the ability to quickly expand or decrease computer processing, memory, and storage resources to meet changing demands called?',
                type: 'single',
                answers: [
                    { text: 'Agility', correct: false },
                    { text: 'Elasticity', correct: true },
                    { text: 'Scalability', correct: false },
                    { text: 'High availability', correct: false }
                ],
                explanation: 'Elasticity is the ability to quickly expand or decrease computer processing, memory, and storage resources to meet changing demands without worrying about capacity planning.'
            },
            {
                certId: az900.id,
                topic: 'Describe Cloud Concepts',
                subtopic: 'Describe cloud service types',
                text: 'Which cloud service type provides the most control over the underlying infrastructure?',
                type: 'single',
                answers: [
                    { text: 'Infrastructure as a Service (IaaS)', correct: true },
                    { text: 'Platform as a Service (PaaS)', correct: false },
                    { text: 'Software as a Service (SaaS)', correct: false },
                    { text: 'Function as a Service (FaaS)', correct: false }
                ],
                explanation: 'IaaS gives you the most control and responsibility over the cloud environment. The cloud provider manages the physical infrastructure, but you manage the operating system, network configuration, and applications.'
            },
            {
                certId: az900.id,
                topic: 'Describe Cloud Concepts',
                subtopic: 'Describe cloud service types',
                text: 'Microsoft 365 is an example of which cloud service type?',
                type: 'single',
                answers: [
                    { text: 'IaaS', correct: false },
                    { text: 'PaaS', correct: false },
                    { text: 'SaaS', correct: true },
                    { text: 'Hybrid', correct: false }
                ],
                explanation: 'Microsoft 365 (Office 365) is a SaaS product. Users access the fully functional software through a web browser or client applications without managing any infrastructure.'
            },

            // Topic 2: Describe Azure Architecture and Services
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe the core architectural components of Azure',
                text: 'What is an Azure Region?',
                type: 'single',
                answers: [
                    { text: 'A single datacenter', correct: false },
                    { text: 'A geographical area containing one or more datacenters networked together with a low-latency network', correct: true },
                    { text: 'A virtual network', correct: false },
                    { text: 'A resource group', correct: false }
                ],
                explanation: 'An Azure region is a geographical area on the planet that contains at least one, but potentially multiple datacenters that are nearby and networked together with a low-latency network.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe the core architectural components of Azure',
                text: 'Which of the following is a logical container for Azure resources?',
                type: 'single',
                answers: [
                    { text: 'Azure Region', correct: false },
                    { text: 'Availability Zone', correct: false },
                    { text: 'Resource Group', correct: true },
                    { text: 'Azure Datacenter', correct: false }
                ],
                explanation: 'A resource group is a logical container that holds related resources for an Azure solution. You can use resource groups to manage and organize resources by lifecycle, permissions, or any other organizational criteria.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe Azure compute services',
                text: 'Which Azure service allows you to run containerized applications without managing servers?',
                type: 'single',
                answers: [
                    { text: 'Azure Virtual Machines', correct: false },
                    { text: 'Azure Container Instances', correct: true },
                    { text: 'Azure Blob Storage', correct: false },
                    { text: 'Azure SQL Database', correct: false }
                ],
                explanation: 'Azure Container Instances (ACI) is the fastest and simplest way to run a container in Azure without having to manage any virtual machines and without having to adopt a higher-level service.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe Azure compute services',
                text: 'Which Azure compute option is best suited for running event-driven, serverless code?',
                type: 'single',
                answers: [
                    { text: 'Azure Virtual Machines', correct: false },
                    { text: 'Azure App Service', correct: false },
                    { text: 'Azure Functions', correct: true },
                    { text: 'Azure Kubernetes Service', correct: false }
                ],
                explanation: 'Azure Functions is a serverless compute service that lets you run event-triggered code without having to explicitly provision or manage infrastructure. You only pay for the compute time you consume.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe Azure networking services',
                text: 'What is the purpose of Azure Virtual Network (VNet)?',
                type: 'single',
                answers: [
                    { text: 'To store data in the cloud', correct: false },
                    { text: 'To enable Azure resources to communicate securely with each other, the internet, and on-premises networks', correct: true },
                    { text: 'To run virtual machines', correct: false },
                    { text: 'To manage user identities', correct: false }
                ],
                explanation: 'Azure Virtual Network enables Azure resources, such as VMs, web apps, and databases, to communicate with each other, with users on the internet, and with on-premises client computers.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe Azure storage services',
                text: 'Which Azure Storage service is optimized for storing massive amounts of unstructured data?',
                type: 'single',
                answers: [
                    { text: 'Azure Files', correct: false },
                    { text: 'Azure Blob Storage', correct: true },
                    { text: 'Azure Table Storage', correct: false },
                    { text: 'Azure Queue Storage', correct: false }
                ],
                explanation: 'Azure Blob Storage is optimized for storing massive amounts of unstructured data, such as text or binary data. It is ideal for serving images or documents, storing files for distributed access, streaming video and audio, and storing data for backup and disaster recovery.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe Azure storage services',
                text: 'Which Azure Storage redundancy option replicates data across three availability zones in the primary region?',
                type: 'single',
                answers: [
                    { text: 'Locally Redundant Storage (LRS)', correct: false },
                    { text: 'Zone-Redundant Storage (ZRS)', correct: true },
                    { text: 'Geo-Redundant Storage (GRS)', correct: false },
                    { text: 'Read-Access Geo-Redundant Storage (RA-GRS)', correct: false }
                ],
                explanation: 'Zone-redundant storage (ZRS) replicates your Azure Storage data synchronously across three Azure availability zones in the primary region, providing high availability and protection against datacenter failures.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe Azure identity, access, and security',
                text: 'What is Microsoft Entra ID (formerly Azure Active Directory)?',
                type: 'single',
                answers: [
                    { text: 'A relational database service', correct: false },
                    { text: 'A cloud-based identity and access management service', correct: true },
                    { text: 'A virtual machine service', correct: false },
                    { text: 'A content delivery network', correct: false }
                ],
                explanation: 'Microsoft Entra ID is a cloud-based identity and access management service. It helps your employees sign in and access resources in external resources like Microsoft 365, the Azure portal, and thousands of other SaaS applications.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Architecture and Services',
                subtopic: 'Describe Azure identity, access, and security',
                text: 'Which of the following are components of Multi-Factor Authentication (MFA)? (Select all that apply)',
                type: 'multi',
                answers: [
                    { text: 'Something you know (password)', correct: true },
                    { text: 'Something you have (phone)', correct: true },
                    { text: 'Something you are (fingerprint)', correct: true },
                    { text: 'Something you want (desire)', correct: false }
                ],
                explanation: 'Multi-factor authentication uses two or more of: something you know (password/PIN), something you have (phone/token), and something you are (biometric like fingerprint or facial recognition).'
            },

            // Topic 3: Describe Azure Management and Governance
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe cost management in Azure',
                text: 'Which factors affect the cost of Azure services? (Select all that apply)',
                type: 'multi',
                answers: [
                    { text: 'Resource type', correct: true },
                    { text: 'Region', correct: true },
                    { text: 'The color of the Azure portal theme', correct: false },
                    { text: 'Consumption (usage)', correct: true }
                ],
                explanation: 'Azure costs are affected by resource type, region, consumption, subscription type, Azure Marketplace offerings, and the specific configuration of each resource.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe cost management in Azure',
                text: 'Which tool helps you estimate the cost of Azure products and services?',
                type: 'single',
                answers: [
                    { text: 'Azure Advisor', correct: false },
                    { text: 'Azure Pricing Calculator', correct: true },
                    { text: 'Azure Monitor', correct: false },
                    { text: 'Azure Service Health', correct: false }
                ],
                explanation: 'The Azure Pricing Calculator is a tool that helps you estimate the cost of Azure products. You can select Azure services and modify properties and options to estimate a cost for your scenario.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'What is Azure Policy used for?',
                type: 'single',
                answers: [
                    { text: 'Creating virtual machines', correct: false },
                    { text: 'Enforcing organizational standards and assessing compliance at scale', correct: true },
                    { text: 'Storing data', correct: false },
                    { text: 'Managing user identities', correct: false }
                ],
                explanation: 'Azure Policy helps enforce organizational standards and assess compliance at scale. It evaluates resources in Azure by comparing properties of those resources to business rules (policy definitions).'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'What are Azure resource locks used for?',
                type: 'single',
                answers: [
                    { text: 'Encrypting data at rest', correct: false },
                    { text: 'Preventing accidental deletion or modification of resources', correct: true },
                    { text: 'Limiting network access', correct: false },
                    { text: 'Managing costs', correct: false }
                ],
                explanation: 'Resource locks prevent other users in your organization from accidentally deleting or modifying critical resources. The lock level can be set to CanNotDelete or ReadOnly.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe features and tools for managing and deploying Azure resources',
                text: 'Which tool provides a command-line interface for managing Azure resources on any platform?',
                type: 'single',
                answers: [
                    { text: 'Azure Portal', correct: false },
                    { text: 'Azure CLI', correct: true },
                    { text: 'Azure Advisor', correct: false },
                    { text: 'Azure Monitor', correct: false }
                ],
                explanation: 'Azure CLI is a cross-platform command-line tool that can be installed on Windows, macOS, and Linux. It provides commands to manage Azure resources from the terminal.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe features and tools for managing and deploying Azure resources',
                text: 'What is Azure Resource Manager (ARM)?',
                type: 'single',
                answers: [
                    { text: 'A monitoring service', correct: false },
                    { text: 'The deployment and management service for Azure', correct: true },
                    { text: 'A storage service', correct: false },
                    { text: 'A networking service', correct: false }
                ],
                explanation: 'Azure Resource Manager is the deployment and management service for Azure. It provides a management layer that enables you to create, update, and delete resources in your Azure account. All management tools (portal, CLI, PowerShell, SDKs) go through ARM.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe monitoring tools in Azure',
                text: 'Which Azure service provides personalized recommendations to improve reliability, security, performance, and cost?',
                type: 'single',
                answers: [
                    { text: 'Azure Monitor', correct: false },
                    { text: 'Azure Advisor', correct: true },
                    { text: 'Azure Policy', correct: false },
                    { text: 'Azure Service Health', correct: false }
                ],
                explanation: 'Azure Advisor is a personalized cloud consultant that helps you follow best practices to optimize your Azure deployments. It analyzes your resource configuration and usage and recommends solutions for reliability, security, performance, operational excellence, and cost.'
            },
            {
                certId: az900.id,
                topic: 'Describe Azure Management and Governance',
                subtopic: 'Describe monitoring tools in Azure',
                text: 'What does Azure Monitor do?',
                type: 'single',
                answers: [
                    { text: 'Manages user access to Azure resources', correct: false },
                    { text: 'Collects, analyzes, and acts on telemetry from cloud and on-premises environments', correct: true },
                    { text: 'Creates virtual networks', correct: false },
                    { text: 'Deploys ARM templates', correct: false }
                ],
                explanation: 'Azure Monitor is a comprehensive solution for collecting, analyzing, and acting on telemetry from your cloud and on-premises environments. It helps you maximize performance and availability of your applications and proactively identify problems.'
            }
        ];

        sampleQuestions.forEach(q => Store.addQuestion(q));
        this.applySpanish(az900.id);
        localStorage.setItem('quiz_es_v1', '1');
    },

    applySpanish(certId) {
        const questions = Store.getQuestionsForCert(certId);
        const esData = [
            {
                match: 'What is cloud computing?',
                text_es: '¿Qué es la computación en la nube?',
                answers_es: ['Entrega de servicios de computación a través de internet', 'Un tipo de lenguaje de programación', 'Un servidor físico en tu oficina', 'Un tipo de cable de red'],
                explanation_es: 'La computación en la nube es la entrega de servicios de computación—incluyendo servidores, almacenamiento, bases de datos, redes, software, análisis e inteligencia—a través de internet ("la nube") para ofrecer innovación más rápida, recursos flexibles y economías de escala.'
            },
            {
                match: 'Which of the following describes the shared responsibility model in cloud computing?',
                text_es: '¿Cuál de las siguientes opciones describe el modelo de responsabilidad compartida en la computación en la nube?',
                answers_es: ['El proveedor de la nube es responsable de todo', 'El cliente es responsable de todo', 'Las responsabilidades se comparten entre el proveedor de la nube y el cliente', 'Ni el cliente ni el proveedor tiene responsabilidad'],
                explanation_es: 'En el modelo de responsabilidad compartida, las responsabilidades se dividen entre el proveedor de la nube y el cliente. El proveedor siempre es responsable de la infraestructura física, mientras que el cliente siempre es responsable de sus datos e identidades.'
            },
            {
                match: 'Which cloud model uses some datacenters focused on providing cloud services to anyone that wants them, and some data centers that are directly connected to one organization?',
                text_es: '¿Qué modelo de nube utiliza algunos centros de datos enfocados en proporcionar servicios en la nube a cualquiera, y otros conectados directamente a una organización?',
                answers_es: ['Nube pública', 'Nube híbrida', 'Nube privada', 'Multi-nube'],
                explanation_es: 'Una nube híbrida es un entorno de computación que combina una nube pública y una nube privada, permitiendo que los datos y aplicaciones se compartan entre ellas.'
            },
            {
                match: 'Which of the following are benefits of cloud computing? (Select all that apply)',
                text_es: '¿Cuáles de los siguientes son beneficios de la computación en la nube? (Selecciona todas las que apliquen)',
                answers_es: ['Alta disponibilidad', 'Escalabilidad', 'Almacenamiento gratuito ilimitado', 'Distribución geográfica'],
                explanation_es: 'La computación en la nube ofrece muchos beneficios incluyendo alta disponibilidad, escalabilidad, distribución geográfica y eficiencia de costos. Sin embargo, los servicios en la nube no son gratuitos.'
            },
            {
                match: 'What is the ability to quickly expand or decrease computer processing, memory, and storage resources to meet changing demands called?',
                text_es: '¿Cómo se llama la capacidad de expandir o reducir rápidamente los recursos de procesamiento, memoria y almacenamiento para satisfacer demandas cambiantes?',
                answers_es: ['Agilidad', 'Elasticidad', 'Escalabilidad', 'Alta disponibilidad'],
                explanation_es: 'La elasticidad es la capacidad de expandir o reducir rápidamente los recursos de procesamiento, memoria y almacenamiento para satisfacer demandas cambiantes sin preocuparse por la planificación de capacidad.'
            },
            {
                match: 'Which cloud service type provides the most control over the underlying infrastructure?',
                text_es: '¿Qué tipo de servicio en la nube proporciona el mayor control sobre la infraestructura subyacente?',
                answers_es: ['Infraestructura como Servicio (IaaS)', 'Plataforma como Servicio (PaaS)', 'Software como Servicio (SaaS)', 'Función como Servicio (FaaS)'],
                explanation_es: 'IaaS proporciona el mayor control y responsabilidad sobre el entorno en la nube. El proveedor gestiona la infraestructura física, pero tú gestionas el sistema operativo, la configuración de red y las aplicaciones.'
            },
            {
                match: 'Microsoft 365 is an example of which cloud service type?',
                text_es: '¿Microsoft 365 es un ejemplo de qué tipo de servicio en la nube?',
                answers_es: ['IaaS', 'PaaS', 'SaaS', 'Híbrido'],
                explanation_es: 'Microsoft 365 es un producto SaaS. Los usuarios acceden al software completamente funcional a través de un navegador web o aplicaciones cliente sin gestionar ninguna infraestructura.'
            },
            {
                match: 'What is an Azure Region?',
                text_es: '¿Qué es una Región de Azure?',
                answers_es: ['Un solo centro de datos', 'Un área geográfica que contiene uno o más centros de datos conectados con una red de baja latencia', 'Una red virtual', 'Un grupo de recursos'],
                explanation_es: 'Una región de Azure es un área geográfica del planeta que contiene al menos uno, pero potencialmente múltiples centros de datos cercanos y conectados entre sí con una red de baja latencia.'
            },
            {
                match: 'Which of the following is a logical container for Azure resources?',
                text_es: '¿Cuál de los siguientes es un contenedor lógico para recursos de Azure?',
                answers_es: ['Región de Azure', 'Zona de Disponibilidad', 'Grupo de Recursos', 'Centro de Datos de Azure'],
                explanation_es: 'Un grupo de recursos es un contenedor lógico que agrupa recursos relacionados para una solución de Azure. Puedes usarlos para gestionar y organizar recursos por ciclo de vida, permisos o cualquier otro criterio.'
            },
            {
                match: 'Which Azure service allows you to run containerized applications without managing servers?',
                text_es: '¿Qué servicio de Azure te permite ejecutar aplicaciones en contenedores sin gestionar servidores?',
                answers_es: ['Azure Virtual Machines', 'Azure Container Instances', 'Azure Blob Storage', 'Azure SQL Database'],
                explanation_es: 'Azure Container Instances (ACI) es la forma más rápida y sencilla de ejecutar un contenedor en Azure sin tener que gestionar máquinas virtuales ni adoptar un servicio de nivel superior.'
            },
            {
                match: 'Which Azure compute option is best suited for running event-driven, serverless code?',
                text_es: '¿Qué opción de cómputo de Azure es la más adecuada para ejecutar código serverless basado en eventos?',
                answers_es: ['Azure Virtual Machines', 'Azure App Service', 'Azure Functions', 'Azure Kubernetes Service'],
                explanation_es: 'Azure Functions es un servicio de cómputo serverless que te permite ejecutar código activado por eventos sin aprovisionar ni gestionar infraestructura. Solo pagas por el tiempo de cómputo que consumes.'
            },
            {
                match: 'What is the purpose of Azure Virtual Network (VNet)?',
                text_es: '¿Cuál es el propósito de Azure Virtual Network (VNet)?',
                answers_es: ['Almacenar datos en la nube', 'Permitir que los recursos de Azure se comuniquen de forma segura entre sí, con internet y con redes locales', 'Ejecutar máquinas virtuales', 'Gestionar identidades de usuarios'],
                explanation_es: 'Azure Virtual Network permite que los recursos de Azure, como máquinas virtuales, aplicaciones web y bases de datos, se comuniquen entre sí, con usuarios en internet y con equipos cliente locales.'
            },
            {
                match: 'Which Azure Storage service is optimized for storing massive amounts of unstructured data?',
                text_es: '¿Qué servicio de Azure Storage está optimizado para almacenar cantidades masivas de datos no estructurados?',
                answers_es: ['Azure Files', 'Azure Blob Storage', 'Azure Table Storage', 'Azure Queue Storage'],
                explanation_es: 'Azure Blob Storage está optimizado para almacenar cantidades masivas de datos no estructurados. Es ideal para servir imágenes, almacenar archivos, transmitir video y audio, y almacenar datos de respaldo.'
            },
            {
                match: 'Which Azure Storage redundancy option replicates data across three availability zones in the primary region?',
                text_es: '¿Qué opción de redundancia de Azure Storage replica los datos en tres zonas de disponibilidad en la región principal?',
                answers_es: ['Almacenamiento con Redundancia Local (LRS)', 'Almacenamiento con Redundancia de Zona (ZRS)', 'Almacenamiento con Redundancia Geográfica (GRS)', 'Almacenamiento con Redundancia Geográfica con Acceso de Lectura (RA-GRS)'],
                explanation_es: 'El almacenamiento con redundancia de zona (ZRS) replica tus datos de forma sincrónica en tres zonas de disponibilidad en la región principal, proporcionando alta disponibilidad y protección contra fallos.'
            },
            {
                match: 'What is Microsoft Entra ID (formerly Azure Active Directory)?',
                text_es: '¿Qué es Microsoft Entra ID (anteriormente Azure Active Directory)?',
                answers_es: ['Un servicio de base de datos relacional', 'Un servicio de gestión de identidad y acceso basado en la nube', 'Un servicio de máquinas virtuales', 'Una red de entrega de contenido'],
                explanation_es: 'Microsoft Entra ID es un servicio de gestión de identidad y acceso basado en la nube. Ayuda a tus empleados a iniciar sesión y acceder a recursos como Microsoft 365, el portal de Azure y miles de aplicaciones SaaS.'
            },
            {
                match: 'Which of the following are components of Multi-Factor Authentication (MFA)? (Select all that apply)',
                text_es: '¿Cuáles son componentes de la Autenticación Multifactor (MFA)? (Selecciona todas las que apliquen)',
                answers_es: ['Algo que sabes (contraseña)', 'Algo que tienes (teléfono)', 'Algo que eres (huella digital)', 'Algo que quieres (deseo)'],
                explanation_es: 'La autenticación multifactor utiliza dos o más de: algo que sabes (contraseña/PIN), algo que tienes (teléfono/token) y algo que eres (biométrico como huella digital o reconocimiento facial).'
            },
            {
                match: 'Which factors affect the cost of Azure services? (Select all that apply)',
                text_es: '¿Qué factores afectan el costo de los servicios de Azure? (Selecciona todas las que apliquen)',
                answers_es: ['Tipo de recurso', 'Región', 'El color del tema del portal de Azure', 'Consumo (uso)'],
                explanation_es: 'Los costos de Azure se ven afectados por el tipo de recurso, la región, el consumo, el tipo de suscripción, las ofertas de Azure Marketplace y la configuración específica de cada recurso.'
            },
            {
                match: 'Which tool helps you estimate the cost of Azure products and services?',
                text_es: '¿Qué herramienta te ayuda a estimar el costo de los productos y servicios de Azure?',
                answers_es: ['Azure Advisor', 'Calculadora de Precios de Azure', 'Azure Monitor', 'Azure Service Health'],
                explanation_es: 'La Calculadora de Precios de Azure es una herramienta que te ayuda a estimar el costo de los productos de Azure. Puedes seleccionar servicios y modificar propiedades para estimar un costo para tu escenario.'
            },
            {
                match: 'What is Azure Policy used for?',
                text_es: '¿Para qué se usa Azure Policy?',
                answers_es: ['Crear máquinas virtuales', 'Aplicar estándares organizacionales y evaluar el cumplimiento a escala', 'Almacenar datos', 'Gestionar identidades de usuarios'],
                explanation_es: 'Azure Policy ayuda a aplicar estándares organizacionales y evaluar el cumplimiento a escala. Evalúa los recursos en Azure comparando sus propiedades con reglas de negocio (definiciones de políticas).'
            },
            {
                match: 'What are Azure resource locks used for?',
                text_es: '¿Para qué se usan los bloqueos de recursos de Azure?',
                answers_es: ['Cifrar datos en reposo', 'Prevenir la eliminación o modificación accidental de recursos', 'Limitar el acceso a la red', 'Gestionar costos'],
                explanation_es: 'Los bloqueos de recursos previenen que otros usuarios en tu organización eliminen o modifiquen accidentalmente recursos críticos. El nivel puede establecerse como CanNotDelete o ReadOnly.'
            },
            {
                match: 'Which tool provides a command-line interface for managing Azure resources on any platform?',
                text_es: '¿Qué herramienta proporciona una interfaz de línea de comandos para gestionar recursos de Azure en cualquier plataforma?',
                answers_es: ['Azure Portal', 'Azure CLI', 'Azure Advisor', 'Azure Monitor'],
                explanation_es: 'Azure CLI es una herramienta de línea de comandos multiplataforma que puede instalarse en Windows, macOS y Linux. Proporciona comandos para gestionar recursos de Azure desde la terminal.'
            },
            {
                match: 'What is Azure Resource Manager (ARM)?',
                text_es: '¿Qué es Azure Resource Manager (ARM)?',
                answers_es: ['Un servicio de monitoreo', 'El servicio de implementación y gestión para Azure', 'Un servicio de almacenamiento', 'Un servicio de redes'],
                explanation_es: 'Azure Resource Manager es el servicio de implementación y gestión para Azure. Proporciona una capa de gestión que te permite crear, actualizar y eliminar recursos. Todas las herramientas de gestión pasan por ARM.'
            },
            {
                match: 'Which Azure service provides personalized recommendations to improve reliability, security, performance, and cost?',
                text_es: '¿Qué servicio de Azure proporciona recomendaciones personalizadas para mejorar la confiabilidad, seguridad, rendimiento y costos?',
                answers_es: ['Azure Monitor', 'Azure Advisor', 'Azure Policy', 'Azure Service Health'],
                explanation_es: 'Azure Advisor es un consultor en la nube personalizado que te ayuda a seguir las mejores prácticas para optimizar tus implementaciones de Azure. Analiza la configuración y el uso de tus recursos y recomienda soluciones.'
            },
            {
                match: 'What does Azure Monitor do?',
                text_es: '¿Qué hace Azure Monitor?',
                answers_es: ['Gestiona el acceso de usuarios a recursos de Azure', 'Recopila, analiza y actúa sobre telemetría de entornos en la nube y locales', 'Crea redes virtuales', 'Implementa plantillas ARM'],
                explanation_es: 'Azure Monitor es una solución integral para recopilar, analizar y actuar sobre telemetría de tus entornos en la nube y locales. Te ayuda a maximizar el rendimiento y la disponibilidad de tus aplicaciones.'
            }
        ];
        esData.forEach(es => {
            const q = questions.find(x => x.text === es.match);
            if (q) {
                q.text_es = es.text_es;
                q.explanation_es = es.explanation_es;
                if (es.answers_es) {
                    q.answers.forEach((a, i) => {
                        if (es.answers_es[i] !== undefined) a.text_es = es.answers_es[i];
                    });
                }
                Store.updateQuestion(q);
            }
        });
    }
};
