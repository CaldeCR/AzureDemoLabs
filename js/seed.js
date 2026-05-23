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
            if (!localStorage.getItem('quiz_repo_v1')) {
                const cert = Store.getCertifications().find(c => c.code === 'AZ-900');
                if (cert) { this.seedRepoQuestions(cert.id); localStorage.setItem('quiz_repo_v1', '1'); }
            }
            if (!localStorage.getItem('quiz_refs_v1')) {
                this.applyReferences();
                localStorage.setItem('quiz_refs_v1', '1');
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
        this.seedRepoQuestions(az900.id);
        localStorage.setItem('quiz_es_v1', '1');
        localStorage.setItem('quiz_repo_v1', '1');
        localStorage.setItem('quiz_refs_v1', '1');
    },

    applySpanish(certId) {
        const questions = Store.getQuestionsForCert(certId);
        const esData = [
            {
                match: 'What is cloud computing?',
                text_es: '¿Qué es la computación en la nube?',
                answers_es: ['Entrega de servicios de computación a través de internet', 'Un tipo de lenguaje de programación', 'Un servidor físico en tu oficina', 'Un tipo de cable de red'],
                explanation_es: 'La computación en la nube es la entrega de servicios de computación—incluyendo servidores, almacenamiento, bases de datos, redes, software, análisis e inteligencia—a través de internet ("la nube") para ofrecer innovación más rápida, recursos flexibles y economías de escala.',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/3-what-cloud-compute'
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
    },

    applyReferences() {
        const refMap = [
            ['What is cloud computing?', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/3-what-cloud-compute'],
            ['shared responsibility model in cloud computing', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/4-describe-shared-responsibility-model'],
            ['Which cloud model uses some datacenters', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models'],
            ['benefits of cloud computing', 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud'],
            ['quickly expand or decrease computer processing', 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud'],
            ['most control over the underlying infrastructure', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/2-describe-infrastructure-service'],
            ['Microsoft 365 is an example', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/4-describe-software-service'],
            ['What is an Azure Region?', 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/5-describe-azure-physical-infrastructure'],
            ['logical container for Azure resources', 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview'],
            ['run containerized applications without managing servers', 'https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview'],
            ['event-driven, serverless code', 'https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview'],
            ['purpose of Azure Virtual Network', 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview'],
            ['optimized for storing massive amounts of unstructured data', 'https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview'],
            ['replicates data across three availability zones', 'https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy'],
            ['What is Microsoft Entra ID', 'https://learn.microsoft.com/en-us/entra/fundamentals/whatis'],
            ['components of Multi-Factor Authentication', 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks'],
            ['factors affect the cost of Azure services', 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/2-describe-factors-affect-costs-azure'],
            ['estimate the cost of Azure products', 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/3-compare-pricing-tco-calculators'],
            ['What is Azure Policy used for?', 'https://learn.microsoft.com/en-us/azure/governance/policy/overview'],
            ['Azure resource locks used for', 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources'],
            ['command-line interface for managing Azure', 'https://learn.microsoft.com/en-us/cli/azure/what-is-azure-cli'],
            ['What is Azure Resource Manager', 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview'],
            ['personalized recommendations to improve reliability', 'https://learn.microsoft.com/en-us/azure/advisor/advisor-overview'],
            ['What does Azure Monitor do?', 'https://learn.microsoft.com/en-us/azure/azure-monitor/overview'],
            ['Azure Free account', 'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services'],
            ['Logic apps, Functions, and Service Fabric', 'https://learn.microsoft.com/en-us/azure/architecture/serverless/code'],
            ['most common uses of Hybrid Clouds', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models'],
            ['Hyper-V hosts in a data center', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/4-describe-cloud-service-types'],
            ['migrate a web application to Azure', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/3-describe-platform-service'],
            ['Public Cloud ] can decommission', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models'],
            ['Skype, Outlook, Office 365', 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/4-describe-software-service'],
            ['Pricing calculator ] can be used', 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/3-compare-pricing-tco-calculators'],
            ['manage user permissions effectively', 'https://learn.microsoft.com/en-us/azure/role-based-access-control/overview'],
            ['same resource group but be in multiple locations', 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview'],
            ['Basic Support plan', 'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services'],
            ['host production-based resources', 'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services'],
            ['tables with zero infrastructure administration', 'https://learn.microsoft.com/en-us/azure/cosmos-db/introduction'],
            ['Azure preview features', 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/preview-features'],
            ['virtual machine from a tablet', 'https://learn.microsoft.com/en-us/azure/cloud-shell/overview'],
            ['on-premises client computers to communicate to Azure', 'https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways'],
            ['concept of paired regions', 'https://learn.microsoft.com/en-us/azure/reliability/cross-region-replication-azure'],
            ['statements for Azure Subscriptions', 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources'],
            ['migrating their public web site to Azure', 'https://learn.microsoft.com/en-us/azure/app-service/overview'],
            ['basic way of protecting an Azure Virtual Network', 'https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview'],
            ['deploy an AI solution', 'https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning'],
            ['Windows 10, MacOS, and Ubuntu', 'https://learn.microsoft.com/en-us/cli/azure/what-is-azure-cli'],
            ['valid reasons for locking Azure resources', 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources'],
            ['Modern Lifecycle Policy', 'https://learn.microsoft.com/en-us/lifecycle/policies/modern'],
            ['most immediate savings', 'https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations'],
            ['eligible to use Azure Government', 'https://learn.microsoft.com/en-us/azure/azure-government/documentation-government-welcome'],
            ['cost of an unmanaged storage account', 'https://azure.microsoft.com/en-us/pricing/details/bandwidth/'],
            ['exposing administrative credentials', 'https://learn.microsoft.com/en-us/azure/key-vault/general/overview'],
            ['compliance of resources across multiple subscriptions', 'https://learn.microsoft.com/en-us/azure/governance/management-groups/overview'],
            ['group of identical Virtual Machines', 'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview'],
            ['maximum number of virtual machines', 'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview'],
            ['50 customized VMs each week', 'https://learn.microsoft.com/en-us/azure/devtest-labs/devtest-lab-overview'],
            ['limit the types of connections from web servers', 'https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview'],
            ['regarding Azure regions is correct', 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview'],
            ['reduce costs with Azure Virtual Desktop', 'https://learn.microsoft.com/en-us/azure/virtual-desktop/overview'],
            ['Monitor and control billions', 'https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub'],
            ['factors that affect cost in Azure', 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/2-describe-factors-affect-costs-azure'],
            ['Multi-Factor Authentication make a system more secure', 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks'],
            ['isolated environment for hosting Virtual Machines', 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview'],
            ['service failure notifications', 'https://learn.microsoft.com/en-us/azure/service-health/overview']
        ];
        const questions = Store.getQuestions();
        let updated = false;
        questions.forEach(q => {
            if (q.reference) return;
            const match = refMap.find(([snippet]) => q.text && q.text.includes(snippet));
            if (match) { q.reference = match[1]; updated = true; }
        });
        if (updated) Store.saveQuestions(questions);
    },

    seedRepoQuestions(certId) {
        const existing = Store.getQuestionsForCert(certId);
        const repoQuestions = [
            // ===== Describe Cloud Concepts =====
            {
                certId, topic: 'Describe Cloud Concepts', subtopic: 'Describe cloud computing',
                text: 'You are planning on setting up an Azure Free account. Which of the following is not correct when it comes to what is offered as part of the Azure Free account?',
                text_es: 'Estás planeando configurar una cuenta gratuita de Azure. ¿Cuál de las siguientes opciones NO es correcta sobre lo que se ofrece como parte de la cuenta gratuita de Azure?',
                type: 'single',
                answers: [
                    { text: '200 USD free credit to use for 30 days', text_es: '200 USD de crédito gratuito para usar por 30 días', correct: false },
                    { text: 'Free access to certain Azure products for 12 months', text_es: 'Acceso gratuito a ciertos productos de Azure por 12 meses', correct: false },
                    { text: 'Free access to all Azure products after the 12 months expiration period', text_es: 'Acceso gratuito a todos los productos de Azure después del período de expiración de 12 meses', correct: true },
                    { text: 'Access to certain products that are always free', text_es: 'Acceso a ciertos productos que son siempre gratuitos', correct: false }
                ],
                explanation: 'Azure Free account ends after 12 months, requiring pay-as-you-go billing for continued access; no indefinite free access to all products exists post-expiration.',
                explanation_es: 'La cuenta gratuita de Azure termina después de 12 meses, requiriendo facturación de pago por uso para acceso continuo; no existe acceso gratuito indefinido a todos los productos después de la expiración.',
                reference: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services'
            },
            {
                certId, topic: 'Describe Cloud Concepts', subtopic: 'Describe cloud computing',
                text: 'Logic apps, Functions, and Service Fabric are all examples of what model of computing is within Azure?',
                text_es: 'Logic Apps, Functions y Service Fabric son todos ejemplos de ¿qué modelo de computación dentro de Azure?',
                type: 'single',
                answers: [
                    { text: 'Platform as a Service (PaaS) Model', text_es: 'Modelo de Plataforma como Servicio (PaaS)', correct: false },
                    { text: 'Serverless Model', text_es: 'Modelo Serverless', correct: true },
                    { text: 'Infrastructure as a Service (IaaS) Model', text_es: 'Modelo de Infraestructura como Servicio (IaaS)', correct: false },
                    { text: 'Software as a Service (SaaS) Model', text_es: 'Modelo de Software como Servicio (SaaS)', correct: false }
                ],
                explanation: 'Azure Logic Apps, Functions, and Service Fabric are examples of serverless computing models where Azure handles infrastructure, scaling, and resource management.',
                explanation_es: 'Azure Logic Apps, Functions y Service Fabric son ejemplos de modelos de computación serverless donde Azure maneja la infraestructura, escalado y gestión de recursos.',
                reference: 'https://learn.microsoft.com/en-us/azure/architecture/serverless/code'
            },
            {
                certId, topic: 'Describe Cloud Concepts', subtopic: 'Describe the benefits of using cloud services',
                text: 'Which of the following are the most common uses of Hybrid Clouds?',
                text_es: '¿Cuáles de los siguientes son los usos más comunes de las Nubes Híbridas?',
                type: 'multi',
                answers: [
                    { text: 'Government agencies', text_es: 'Agencias gubernamentales', correct: false },
                    { text: 'Cloud migration', text_es: 'Migración a la nube', correct: true },
                    { text: 'High availability', text_es: 'Alta disponibilidad', correct: true },
                    { text: 'Virtualization', text_es: 'Virtualización', correct: false }
                ],
                explanation: 'Hybrid cloud enables gradual migration and provides disaster recovery/high availability by replicating workloads between on-premises and Azure.',
                explanation_es: 'La nube híbrida permite la migración gradual y proporciona recuperación ante desastres/alta disponibilidad replicando cargas de trabajo entre infraestructura local y Azure.',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models'
            },
            {
                certId, topic: 'Describe Cloud Concepts', subtopic: 'Describe cloud computing',
                text: 'You have 1,000 virtual machines hosted on the Hyper-V hosts in a data center. You plan to migrate all the virtual machines to an Azure pay-as-you-go subscription. Which expenditure model should you identify?',
                text_es: 'Tiene 1,000 máquinas virtuales alojadas en hosts Hyper-V en un centro de datos. Planea migrar todas las máquinas virtuales a una suscripción de Azure de pago por uso. ¿Qué modelo de gasto debe identificar?',
                type: 'single',
                answers: [
                    { text: 'Operational', text_es: 'Operacional', correct: true },
                    { text: 'Elastic', text_es: 'Elástico', correct: false },
                    { text: 'Capital', text_es: 'Capital', correct: false },
                    { text: 'Scalable', text_es: 'Escalable', correct: false }
                ],
                explanation: 'Migrating to Azure pay-as-you-go shifts costs from upfront infrastructure to ongoing usage-based expenses, classified as operational expenditure (OpEx).',
                explanation_es: 'Migrar a pago por uso de Azure cambia los costos de infraestructura inicial a gastos continuos basados en uso, clasificados como gasto operacional (OpEx).',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/4-describe-cloud-service-types'
            },
            {
                certId, topic: 'Describe Cloud Concepts', subtopic: 'Describe cloud service types',
                text: 'You plan to migrate a web application to Azure. The web application is accessed by external users. You need to recommend a cloud deployment solution to minimize the amount of administrative effort. What should you include?',
                text_es: 'Planea migrar una aplicación web a Azure. La aplicación web es accedida por usuarios externos. Necesita recomendar una solución de implementación en la nube para minimizar el esfuerzo administrativo. ¿Qué debe incluir?',
                type: 'single',
                answers: [
                    { text: 'Platform as a Service (PaaS)', text_es: 'Plataforma como Servicio (PaaS)', correct: true },
                    { text: 'Software as a Service (SaaS)', text_es: 'Software como Servicio (SaaS)', correct: false },
                    { text: 'Function as a Service (FaaS)', text_es: 'Función como Servicio (FaaS)', correct: false },
                    { text: 'Infrastructure as a Service (IaaS)', text_es: 'Infraestructura como Servicio (IaaS)', correct: false }
                ],
                explanation: 'PaaS minimizes administrative effort since Azure manages the hardware, OS, and runtime. Developers focus only on the application logic and data.',
                explanation_es: 'PaaS minimiza el esfuerzo administrativo ya que Azure gestiona el hardware, el SO y el entorno de ejecución. Los desarrolladores se enfocan solo en la lógica de la aplicación y los datos.',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/3-describe-platform-service'
            },
            // ===== Evaluate type questions =====
            {
                certId, topic: 'Describe Cloud Concepts', subtopic: 'Describe cloud computing',
                text: 'Evaluate if the term in brackets is correct: An organization that hosts its infrastructure in a [ Public Cloud ] can decommission its data center.',
                text_es: 'Evalúa si el término entre corchetes es correcto: Una organización que aloja su infraestructura en una [ Nube Pública ] puede desmantelar su centro de datos.',
                type: 'evaluate',
                bracketContext: 'An organization that hosts its infrastructure in a [ Public Cloud ] can decommission its data center.',
                bracketContext_es: 'Una organización que aloja su infraestructura en una [ Nube Pública ] puede desmantelar su centro de datos.',
                answers: [
                    { text: 'No change needed', text_es: 'No se necesita cambio', correct: true },
                    { text: 'Private Cloud', text_es: 'Nube Privada', correct: false },
                    { text: 'Hybrid Cloud', text_es: 'Nube Híbrida', correct: false }
                ],
                explanation: 'Public Cloud means infrastructure is hosted entirely by a cloud provider. The organization no longer depends on on-premises hardware and can decommission its data center.',
                explanation_es: 'Nube Pública significa que la infraestructura está alojada completamente por un proveedor de nube. La organización ya no depende del hardware local y puede desmantelar su centro de datos.',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models'
            },
            {
                certId, topic: 'Describe Cloud Concepts', subtopic: 'Describe cloud service types',
                text: 'Evaluate: Microsoft Skype, Outlook, Office 365 are examples of [ Infrastructure as a Service (IaaS) ] cloud service.',
                text_es: 'Evalúa: Microsoft Skype, Outlook, Office 365 son ejemplos de servicio en la nube de [ Infraestructura como Servicio (IaaS) ].',
                type: 'evaluate',
                bracketContext: 'Microsoft Skype, Outlook, Office 365 are examples of [ Infrastructure as a Service (IaaS) ] cloud service.',
                bracketContext_es: 'Microsoft Skype, Outlook, Office 365 son ejemplos de servicio en la nube de [ Infraestructura como Servicio (IaaS) ].',
                answers: [
                    { text: 'No change needed', text_es: 'No se necesita cambio', correct: false },
                    { text: 'Software as a Service (SaaS)', text_es: 'Software como Servicio (SaaS)', correct: true },
                    { text: 'Platform as a Service (PaaS)', text_es: 'Plataforma como Servicio (PaaS)', correct: false },
                    { text: 'Function as a Service (FaaS)', text_es: 'Función como Servicio (FaaS)', correct: false }
                ],
                explanation: 'Microsoft Skype, Outlook, and Office 365 are SaaS products. Users access ready-to-use software without managing infrastructure.',
                explanation_es: 'Microsoft Skype, Outlook y Office 365 son productos SaaS. Los usuarios acceden a software listo para usar sin gestionar infraestructura.',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/4-describe-software-service'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'Evaluate: [ Pricing calculator ] can be used to estimate cost savings when migrating to Azure.',
                text_es: 'Evalúa: La [ Calculadora de precios ] se puede usar para estimar ahorros de costos al migrar a Azure.',
                type: 'evaluate',
                bracketContext: '[ Pricing calculator ] can be used to estimate cost savings when migrating to Azure.',
                bracketContext_es: 'La [ Calculadora de precios ] se puede usar para estimar ahorros de costos al migrar a Azure.',
                answers: [
                    { text: 'No change needed', text_es: 'No se necesita cambio', correct: false },
                    { text: 'Azure Cost Management', text_es: 'Azure Cost Management', correct: false },
                    { text: 'Total Cost of Ownership Calculator (TCO)', text_es: 'Calculadora de Costo Total de Propiedad (TCO)', correct: true },
                    { text: 'Budgets', text_es: 'Presupuestos', correct: false }
                ],
                explanation: 'The TCO Calculator compares on-premises vs Azure costs including hidden costs like electricity, cooling, and IT labor.',
                explanation_es: 'La Calculadora TCO compara costos locales vs Azure incluyendo costos ocultos como electricidad, refrigeración y mano de obra de TI.',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/3-compare-pricing-tco-calculators'
            },
            // ===== Yes/No type questions =====
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'A company wants to manage user permissions effectively. You recommend using Azure Policies. Does this recommendation meet the requirement?',
                text_es: 'Una empresa quiere gestionar permisos de usuarios efectivamente. Recomiendas usar Azure Policies. ¿Esta recomendación cumple con el requisito?',
                type: 'yesno',
                answers: [
                    { text: 'Yes', text_es: 'Sí', correct: false },
                    { text: 'No', text_es: 'No', correct: true }
                ],
                explanation: 'Azure Policy is for compliance and governance, not user permissions. Azure RBAC (Role-Based Access Control) should be used for managing user permissions.',
                explanation_es: 'Azure Policy es para cumplimiento y gobernanza, no para permisos de usuarios. Azure RBAC (Control de Acceso Basado en Roles) debe usarse para gestionar permisos.',
                reference: 'https://learn.microsoft.com/en-us/azure/role-based-access-control/overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe the core architectural components of Azure',
                text: 'Can you have resources that belong to the same resource group but be in multiple locations?',
                text_es: '¿Puedes tener recursos que pertenezcan al mismo grupo de recursos pero estén en múltiples ubicaciones?',
                type: 'yesno',
                answers: [
                    { text: 'Yes', text_es: 'Sí', correct: true },
                    { text: 'No', text_es: 'No', correct: false }
                ],
                explanation: 'A resource group is a logical container not restricted to a single region. Resources within the group can be deployed to different Azure regions.',
                explanation_es: 'Un grupo de recursos es un contenedor lógico no restringido a una sola región. Los recursos dentro del grupo pueden desplegarse en diferentes regiones de Azure.',
                reference: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'Does the Azure Free Account include the Basic Support plan?',
                text_es: '¿La cuenta gratuita de Azure incluye el plan de soporte Básico?',
                type: 'yesno',
                answers: [
                    { text: 'Yes', text_es: 'Sí', correct: true },
                    { text: 'No', text_es: 'No', correct: false }
                ],
                explanation: 'The Azure Free Account includes the Basic Support plan at no additional cost, providing 24/7 billing support and community forums.',
                explanation_es: 'La cuenta gratuita de Azure incluye el plan de soporte Básico sin costo adicional, proporcionando soporte de facturación 24/7 y foros comunitarios.',
                reference: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'Does the Azure Free Account allow you to host production-based resources?',
                text_es: '¿La cuenta gratuita de Azure te permite alojar recursos basados en producción?',
                type: 'yesno',
                answers: [
                    { text: 'Yes', text_es: 'Sí', correct: true },
                    { text: 'No', text_es: 'No', correct: false }
                ],
                explanation: 'Technically yes, the Azure Free Account provides access to Azure services that can be used for production, though it is not recommended for long-term or mission-critical workloads due to limitations.',
                explanation_es: 'Técnicamente sí, la cuenta gratuita de Azure proporciona acceso a servicios que se pueden usar para producción, aunque no se recomienda para cargas de trabajo a largo plazo o de misión crítica debido a limitaciones.',
                reference: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure storage services',
                text: 'A company wants to host tables with zero infrastructure administration and low latency access. You recommend Azure App Service. Would this suit the requirement?',
                text_es: 'Una empresa quiere alojar tablas sin administración de infraestructura y acceso de baja latencia. Recomiendas Azure App Service. ¿Esto cumpliría el requisito?',
                type: 'yesno',
                answers: [
                    { text: 'Yes', text_es: 'Sí', correct: false },
                    { text: 'No', text_es: 'No', correct: true }
                ],
                explanation: 'App Service is for web applications, not data storage. Azure Table Storage or Azure Cosmos DB would be the correct choice for tables with zero admin and low latency.',
                explanation_es: 'App Service es para aplicaciones web, no almacenamiento de datos. Azure Table Storage o Azure Cosmos DB serían la elección correcta para tablas sin administración y baja latencia.',
                reference: 'https://learn.microsoft.com/en-us/azure/cosmos-db/introduction'
            },
            // ===== Statements type questions =====
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'For each statement, determine if it is true or false regarding Azure preview features.',
                text_es: 'Para cada enunciado, determina si es verdadero o falso respecto a las características de vista previa de Azure.',
                type: 'statements',
                statements: [
                    { text: 'All Azure services in private preview must be accessed by using a separate Azure portal.', text_es: 'Todos los servicios de Azure en vista previa privada deben accederse usando un portal de Azure separado.', correct: false },
                    { text: 'Azure services in public preview can be used in production environments.', text_es: 'Los servicios de Azure en vista previa pública pueden usarse en entornos de producción.', correct: true },
                    { text: 'Azure services in public preview are subject to a Service Level Agreement (SLA).', text_es: 'Los servicios de Azure en vista previa pública están sujetos a un Acuerdo de Nivel de Servicio (SLA).', correct: false }
                ],
                answers: [
                    { text: 'No, Yes, No', text_es: 'No, Sí, No', correct: true },
                    { text: 'No, No, Yes', text_es: 'No, No, Sí', correct: false },
                    { text: 'Yes, Yes, No', text_es: 'Sí, Sí, No', correct: false },
                    { text: 'Yes, No, Yes', text_es: 'Sí, No, Sí', correct: false }
                ],
                explanation: 'Private preview services are accessed through the same portal. Public preview services can be used in production but are NOT covered by SLAs.',
                explanation_es: 'Los servicios en vista previa privada se acceden a través del mismo portal. Los servicios en vista previa pública pueden usarse en producción pero NO están cubiertos por SLAs.',
                reference: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/preview-features'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure compute services',
                text: 'You need to create a new Azure virtual machine from a tablet that runs Android. Evaluate which tools can be used.',
                text_es: 'Necesitas crear una nueva máquina virtual de Azure desde una tableta Android. Evalúa qué herramientas pueden usarse.',
                type: 'statements',
                statements: [
                    { text: 'You use the PowerApps portal', text_es: 'Usas el portal de PowerApps', correct: false },
                    { text: 'Use Bash in Azure Cloud Shell', text_es: 'Usas Bash en Azure Cloud Shell', correct: true },
                    { text: 'You use the Azure Portal', text_es: 'Usas el Portal de Azure', correct: true },
                    { text: 'Use the Security & Compliance admin center', text_es: 'Usas el centro de administración de Seguridad y Cumplimiento', correct: false },
                    { text: 'Use PowerShell in Azure Cloud Shell', text_es: 'Usas PowerShell en Azure Cloud Shell', correct: true }
                ],
                answers: [
                    { text: 'No, Yes, Yes, No, Yes', text_es: 'No, Sí, Sí, No, Sí', correct: true },
                    { text: 'Yes, Yes, Yes, No, Yes', text_es: 'Sí, Sí, Sí, No, Sí', correct: false },
                    { text: 'Yes, No, No, No, Yes', text_es: 'Sí, No, No, No, Sí', correct: false }
                ],
                explanation: 'Azure Portal, Bash Cloud Shell, and PowerShell Cloud Shell are all accessible via mobile browser on Android. PowerApps portal and Security admin center cannot create VMs.',
                explanation_es: 'El Portal de Azure, Bash Cloud Shell y PowerShell Cloud Shell son accesibles a través del navegador móvil en Android. El portal de PowerApps y el centro de administración de Seguridad no pueden crear VMs.',
                reference: 'https://learn.microsoft.com/en-us/azure/cloud-shell/overview'
            },
            // ===== Standard questions from Q_Repository =====
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure networking services',
                text: 'You plan to implement a solution that enables on-premises client computers to communicate to Azure virtual machines. Which two Azure resources must be created?',
                text_es: 'Planeas implementar una solución que permita a las computadoras locales comunicarse con máquinas virtuales de Azure. ¿Qué dos recursos de Azure deben crearse?',
                type: 'multi',
                answers: [
                    { text: 'A virtual network gateway', text_es: 'Una puerta de enlace de red virtual', correct: true },
                    { text: 'A load balancer', text_es: 'Un balanceador de carga', correct: false },
                    { text: 'An application gateway', text_es: 'Una puerta de enlace de aplicación', correct: false },
                    { text: 'A virtual network', text_es: 'Una red virtual', correct: false },
                    { text: 'A gateway subnet', text_es: 'Una subred de puerta de enlace', correct: true }
                ],
                explanation: 'A Virtual Network Gateway and a Gateway Subnet are required to establish secure VPN connectivity from on-premises networks to Azure VMs.',
                explanation_es: 'Una Puerta de Enlace de Red Virtual y una Subred de Puerta de Enlace son necesarias para establecer conectividad VPN segura desde redes locales a VMs de Azure.',
                reference: 'https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe the core architectural components of Azure',
                text: 'What is the concept of paired regions?',
                text_es: '¿Cuál es el concepto de regiones emparejadas?',
                type: 'single',
                answers: [
                    { text: 'Each region has one other region in a completely separate country for backups', text_es: 'Cada región tiene otra región en un país completamente separado para respaldos', correct: false },
                    { text: 'Azure employees in those regions go on picnics together', text_es: 'Los empleados de Azure en esas regiones hacen picnics juntos', correct: false },
                    { text: 'Each region has at least one other region with high-speed connection and coordinated updates to avoid simultaneous downtime', text_es: 'Cada región tiene al menos otra región con conexión de alta velocidad y actualizaciones coordinadas para evitar tiempo de inactividad simultáneo', correct: true },
                    { text: 'Code deployed to one region is automatically deployed to the paired region as backup', text_es: 'El código desplegado en una región se despliega automáticamente en la región emparejada como respaldo', correct: false }
                ],
                explanation: 'Paired regions maintain high-speed connections within the same geography. Azure coordinates platform updates sequentially across pairs to ensure at least one remains available.',
                explanation_es: 'Las regiones emparejadas mantienen conexiones de alta velocidad dentro de la misma geografía. Azure coordina actualizaciones secuencialmente para asegurar que al menos una permanezca disponible.',
                reference: 'https://learn.microsoft.com/en-us/azure/reliability/cross-region-replication-azure'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'Select two correct statements for Azure Subscriptions.',
                text_es: 'Selecciona dos declaraciones correctas sobre las Suscripciones de Azure.',
                type: 'multi',
                answers: [
                    { text: 'A company can store resources in multiple subscriptions', text_es: 'Una empresa puede almacenar recursos en múltiples suscripciones', correct: true },
                    { text: 'VMs can be moved to a new subscription only if they are in the same resource group', text_es: 'Las VMs solo se pueden mover a una nueva suscripción si están en el mismo grupo de recursos', correct: false },
                    { text: 'Each Azure Subscription can contain multiple account admins', text_es: 'Cada suscripción de Azure puede contener múltiples administradores de cuenta', correct: true },
                    { text: 'A single account can be associated with at most 10 subscriptions', text_es: 'Una sola cuenta puede asociarse con un máximo de 10 suscripciones', correct: false },
                    { text: 'Each Azure Subscription can be managed by using a Microsoft account only', text_es: 'Cada suscripción de Azure solo puede gestionarse usando una cuenta Microsoft', correct: false }
                ],
                explanation: 'Companies organize resources across multiple subscriptions for billing, isolation, and governance. Each subscription supports multiple Owner/Contributor role assignments.',
                explanation_es: 'Las empresas organizan recursos en múltiples suscripciones para facturación, aislamiento y gobernanza. Cada suscripción soporta múltiples asignaciones de roles Owner/Contributor.',
                reference: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'A company is planning on migrating their public web site to Azure. What do they need to consider?',
                text_es: 'Una empresa está planeando migrar su sitio web público a Azure. ¿Qué necesitan considerar?',
                type: 'single',
                answers: [
                    { text: 'They would need to reduce the number of connections', text_es: 'Necesitarían reducir el número de conexiones', correct: false },
                    { text: 'They would need to deploy a Virtual Private connection', text_es: 'Necesitarían desplegar una conexión privada virtual', correct: false },
                    { text: 'They would have to consider paying a monthly cost', text_es: 'Tendrían que considerar pagar un costo mensual', correct: true },
                    { text: 'They would need to pay for user data transfer onto the site', text_es: 'Necesitarían pagar por la transferencia de datos de usuario al sitio', correct: false }
                ],
                explanation: 'Hosting a public website on Azure involves ongoing subscription costs for the chosen service (App Service, VMs, Static Web Apps).',
                explanation_es: 'Alojar un sitio web público en Azure implica costos de suscripción continuos para el servicio elegido (App Service, VMs, Static Web Apps).',
                reference: 'https://learn.microsoft.com/en-us/azure/app-service/overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure networking services',
                text: 'What is the basic way of protecting an Azure Virtual Network subnet?',
                text_es: '¿Cuál es la forma básica de proteger una subred de Azure Virtual Network?',
                type: 'single',
                answers: [
                    { text: 'Azure DDoS Standard protection', text_es: 'Protección Azure DDoS Standard', correct: false },
                    { text: 'Azure Firewall', text_es: 'Azure Firewall', correct: false },
                    { text: 'Application Gateway with WAF', text_es: 'Application Gateway con WAF', correct: false },
                    { text: 'Network Security Group', text_es: 'Grupo de Seguridad de Red', correct: true }
                ],
                explanation: 'An NSG is the fundamental security tool for an Azure VNet. It uses rules to allow or deny traffic based on source/destination IP, port, and protocol.',
                explanation_es: 'Un NSG es la herramienta de seguridad fundamental para una VNet de Azure. Usa reglas para permitir o denegar tráfico basado en IP de origen/destino, puerto y protocolo.',
                reference: 'https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure compute services',
                text: 'A company wants to deploy an AI solution. The development team wants a tool to build, test, and deploy predictive analytics solutions. Which should they use?',
                text_es: 'Una empresa quiere implementar una solución de IA. El equipo de desarrollo quiere una herramienta para construir, probar e implementar soluciones de análisis predictivo. ¿Cuál deben usar?',
                type: 'single',
                answers: [
                    { text: 'Azure Logic Apps', text_es: 'Azure Logic Apps', correct: false },
                    { text: 'Azure Machine Learning Studio', text_es: 'Azure Machine Learning Studio', correct: true },
                    { text: 'Azure Batch', text_es: 'Azure Batch', correct: false },
                    { text: 'Azure App Service', text_es: 'Azure App Service', correct: false }
                ],
                explanation: 'Azure Machine Learning Studio provides a drag-and-drop interface for building, testing, and deploying predictive analytics solutions.',
                explanation_es: 'Azure Machine Learning Studio proporciona una interfaz de arrastrar y soltar para construir, probar e implementar soluciones de análisis predictivo.',
                reference: 'https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe features and tools for managing and deploying Azure resources',
                text: 'A company has Windows 10, MacOS, and Ubuntu workstations. Which Azure management tools can be used on Windows 10?',
                text_es: 'Una empresa tiene estaciones de trabajo con Windows 10, MacOS y Ubuntu. ¿Qué herramientas de gestión de Azure se pueden usar en Windows 10?',
                type: 'single',
                answers: [
                    { text: 'Azure CLI and Azure Portal only', text_es: 'Solo Azure CLI y Portal de Azure', correct: false },
                    { text: 'Azure CLI and PowerShell only', text_es: 'Solo Azure CLI y PowerShell', correct: false },
                    { text: 'Azure Portal and PowerShell only', text_es: 'Solo Portal de Azure y PowerShell', correct: false },
                    { text: 'Azure CLI, Azure PowerShell, and Azure Portal', text_es: 'Azure CLI, Azure PowerShell y Portal de Azure', correct: true }
                ],
                explanation: 'All three Azure management tools are fully available on Windows 10. Azure CLI and PowerShell install directly, while the Portal requires only a browser.',
                explanation_es: 'Las tres herramientas de gestión de Azure están completamente disponibles en Windows 10. Azure CLI y PowerShell se instalan directamente, mientras que el Portal solo requiere un navegador.',
                reference: 'https://learn.microsoft.com/en-us/cli/azure/what-is-azure-cli'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'Which of the following are valid reasons for locking Azure resources?',
                text_es: '¿Cuáles de las siguientes son razones válidas para bloquear recursos de Azure?',
                type: 'multi',
                answers: [
                    { text: 'Prevent Starting', text_es: 'Prevenir Inicio', correct: false },
                    { text: 'Prevent Deletion', text_es: 'Prevenir Eliminación', correct: true },
                    { text: 'Prevent Stopping', text_es: 'Prevenir Detención', correct: false },
                    { text: 'Prevent Viewing', text_es: 'Prevenir Visualización', correct: false },
                    { text: 'Prevent Modification', text_es: 'Prevenir Modificación', correct: true }
                ],
                explanation: 'Azure Resource Locks have two types: CanNotDelete (prevents deletion) and ReadOnly (prevents all modifications).',
                explanation_es: 'Los Bloqueos de Recursos de Azure tienen dos tipos: CanNotDelete (previene eliminación) y ReadOnly (previene todas las modificaciones).',
                reference: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'Which statement accurately describes the Modern Lifecycle Policy for Azure services?',
                text_es: '¿Qué declaración describe con precisión la Política de Ciclo de Vida Moderno para servicios de Azure?',
                type: 'single',
                answers: [
                    { text: 'You can purchase extended support for up to five years', text_es: 'Puedes comprar soporte extendido por hasta cinco años', correct: false },
                    { text: 'Microsoft provides support for a minimum of four years', text_es: 'Microsoft proporciona soporte por un mínimo de cuatro años', correct: false },
                    { text: 'Microsoft provides mainstream support for five years', text_es: 'Microsoft proporciona soporte principal por cinco años', correct: false },
                    { text: 'Microsoft provides a minimum of 12 months notice before ending support', text_es: 'Microsoft proporciona un mínimo de 12 meses de aviso antes de terminar el soporte', correct: true }
                ],
                explanation: 'Under the Modern Lifecycle Policy, Microsoft commits to providing at least 12 months notice before retiring or ending support for a service.',
                explanation_es: 'Bajo la Política de Ciclo de Vida Moderno, Microsoft se compromete a proporcionar al menos 12 meses de aviso antes de retirar o terminar el soporte de un servicio.',
                reference: 'https://learn.microsoft.com/en-us/lifecycle/policies/modern'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'Which Azure feature is most likely to deliver the most immediate savings when reducing Azure costs?',
                text_es: '¿Qué característica de Azure es más probable que entregue los ahorros más inmediatos al reducir costos de Azure?',
                type: 'single',
                answers: [
                    { text: 'Changing storage from GRS to LRS', text_es: 'Cambiar almacenamiento de GRS a LRS', correct: false },
                    { text: 'Auto shutdown of dev/QA servers at night and weekends', text_es: 'Apagado automático de servidores dev/QA por la noche y fines de semana', correct: false },
                    { text: 'Using Azure Reserved Instances for most virtual machines', text_es: 'Usar Azure Reserved Instances para la mayoría de las máquinas virtuales', correct: true },
                    { text: 'Using Azure Policy to restrict expensive VM SKUs', text_es: 'Usar Azure Policy para restringir SKUs de VM costosos', correct: false }
                ],
                explanation: 'Azure Reserved Instances deliver up to 72% savings on VMs by applying discounts instantly upon purchase for predictable workloads.',
                explanation_es: 'Azure Reserved Instances ofrecen hasta 72% de ahorro en VMs al aplicar descuentos instantáneamente al comprarlos para cargas de trabajo predecibles.',
                reference: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'Which types of customers are eligible to use Azure Government? (Select two)',
                text_es: '¿Qué tipos de clientes son elegibles para usar Azure Government? (Selecciona dos)',
                type: 'multi',
                answers: [
                    { text: 'United States government contractor', text_es: 'Contratista del gobierno de Estados Unidos', correct: true },
                    { text: 'Canadian government contractor', text_es: 'Contratista del gobierno canadiense', correct: false },
                    { text: 'United States government entity', text_es: 'Entidad gubernamental de Estados Unidos', correct: true },
                    { text: 'European government entity', text_es: 'Entidad gubernamental europea', correct: false },
                    { text: 'European government contractor', text_es: 'Contratista del gobierno europeo', correct: false }
                ],
                explanation: 'Azure Government is exclusively for U.S. federal, state, local, tribal governments, and their contractors.',
                explanation_es: 'Azure Government es exclusivamente para gobiernos federales, estatales, locales y tribales de EE.UU., y sus contratistas.',
                reference: 'https://learn.microsoft.com/en-us/azure/azure-government/documentation-government-welcome'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'What makes estimating the cost of an unmanaged storage account difficult?',
                text_es: '¿Qué hace difícil estimar el costo de una cuenta de almacenamiento no administrada?',
                type: 'single',
                answers: [
                    { text: 'You are charged for data coming into Azure', text_es: 'Se te cobra por datos que entran a Azure', correct: false },
                    { text: 'The cost of storage changes frequently', text_es: 'El costo del almacenamiento cambia frecuentemente', correct: false },
                    { text: 'There is no way to predict the amount of data', text_es: 'No hay forma de predecir la cantidad de datos', correct: false },
                    { text: 'You are charged for data leaving Azure, and it is difficult to predict that', text_es: 'Se te cobra por datos que salen de Azure, y es difícil predecirlo', correct: true }
                ],
                explanation: 'Outbound data transfers (egress) are charged in Azure, while inbound is generally free. Predicting egress patterns makes cost estimation difficult.',
                explanation_es: 'Las transferencias de datos salientes (egress) se cobran en Azure, mientras que las entrantes son generalmente gratuitas. Predecir patrones de egress hace difícil la estimación de costos.',
                reference: 'https://azure.microsoft.com/en-us/pricing/details/bandwidth/'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure identity, access, and security',
                text: 'Your manager is concerned about exposing administrative credentials during automated server deployment. What should you recommend?',
                text_es: 'Tu gerente está preocupado por exponer credenciales administrativas durante el despliegue automatizado de servidores. ¿Qué deberías recomendar?',
                type: 'single',
                answers: [
                    { text: 'Azure Key Vault', text_es: 'Azure Key Vault', correct: true },
                    { text: 'Azure Information Protection', text_es: 'Azure Information Protection', correct: false },
                    { text: 'Azure Security Center', text_es: 'Azure Security Center', correct: false },
                    { text: 'Azure Multi-Factor Authentication (MFA)', text_es: 'Autenticación Multi-Factor de Azure (MFA)', correct: false }
                ],
                explanation: 'Azure Key Vault securely stores secrets, keys, and certificates. Automation scripts can reference credentials from Key Vault instead of hardcoding them.',
                explanation_es: 'Azure Key Vault almacena de forma segura secretos, claves y certificados. Los scripts de automatización pueden referenciar credenciales desde Key Vault en lugar de codificarlas.',
                reference: 'https://learn.microsoft.com/en-us/azure/key-vault/general/overview'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe features and tools in Azure for governance and compliance',
                text: 'A company wants to manage compliance of resources across multiple subscriptions. What can help achieve this?',
                text_es: 'Una empresa quiere gestionar el cumplimiento de recursos a través de múltiples suscripciones. ¿Qué puede ayudar a lograr esto?',
                type: 'single',
                answers: [
                    { text: 'Resource Groups', text_es: 'Grupos de Recursos', correct: false },
                    { text: 'Management Groups', text_es: 'Grupos de Administración', correct: true },
                    { text: 'Azure Policies', text_es: 'Azure Policies', correct: false },
                    { text: 'Azure App Service', text_es: 'Azure App Service', correct: false }
                ],
                explanation: 'Management Groups organize multiple Azure subscriptions and allow applying governance controls like Azure Policy and RBAC at a higher scope.',
                explanation_es: 'Los Grupos de Administración organizan múltiples suscripciones de Azure y permiten aplicar controles de gobernanza como Azure Policy y RBAC a un alcance superior.',
                reference: 'https://learn.microsoft.com/en-us/azure/governance/management-groups/overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure compute services',
                text: 'Which Azure service is best suited for hosting and managing a group of identical Virtual Machines?',
                text_es: '¿Qué servicio de Azure es el más adecuado para alojar y gestionar un grupo de Máquinas Virtuales idénticas?',
                type: 'single',
                answers: [
                    { text: 'Azure Data Lake Analytics', text_es: 'Azure Data Lake Analytics', correct: false },
                    { text: 'Azure Virtual Machine Scale Sets', text_es: 'Azure Virtual Machine Scale Sets', correct: true },
                    { text: 'Azure Virtual Network', text_es: 'Azure Virtual Network', correct: false },
                    { text: 'Azure App Service', text_es: 'Azure App Service', correct: false }
                ],
                explanation: 'Azure VM Scale Sets deploy and manage a group of identical, load-balanced VMs with automatic scaling and high availability.',
                explanation_es: 'Azure VM Scale Sets despliegan y gestionan un grupo de VMs idénticas con balanceo de carga, escalado automático y alta disponibilidad.',
                reference: 'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure compute services',
                text: 'What is the maximum number of virtual machines that can be managed under a single Virtual Machine Scale Set?',
                text_es: '¿Cuál es el número máximo de máquinas virtuales que se pueden gestionar bajo un solo Virtual Machine Scale Set?',
                type: 'single',
                answers: [
                    { text: '1', text_es: '1', correct: false },
                    { text: '1000', text_es: '1000', correct: true },
                    { text: '100', text_es: '100', correct: false },
                    { text: '10', text_es: '10', correct: false }
                ],
                explanation: 'A single Azure VM Scale Set can manage up to 1,000 VMs using marketplace or custom images from Azure Compute Gallery.',
                explanation_es: 'Un solo Azure VM Scale Set puede gestionar hasta 1,000 VMs usando imágenes del marketplace o imágenes personalizadas de Azure Compute Gallery.',
                reference: 'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure compute services',
                text: 'A team deploys and removes 50 customized VMs each week (30 Windows, 20 Linux). Which Azure service minimizes cost and administrative effort?',
                text_es: 'Un equipo despliega y elimina 50 VMs personalizadas cada semana (30 Windows, 20 Linux). ¿Qué servicio de Azure minimiza costos y esfuerzo administrativo?',
                type: 'single',
                answers: [
                    { text: 'Azure Resource Manager Template (ARM)', text_es: 'Plantilla de Azure Resource Manager (ARM)', correct: false },
                    { text: 'Azure Virtual Machine Scale Sets', text_es: 'Azure Virtual Machine Scale Sets', correct: false },
                    { text: 'Azure Reserved Virtual Machine Instances', text_es: 'Azure Reserved Virtual Machine Instances', correct: false },
                    { text: 'Azure DevTest Labs', text_es: 'Azure DevTest Labs', correct: true }
                ],
                explanation: 'Azure DevTest Labs is designed to quickly create, manage, and delete VMs with cost controls like auto-shutdown, quotas, and policies.',
                explanation_es: 'Azure DevTest Labs está diseñado para crear, gestionar y eliminar VMs rápidamente con controles de costos como apagado automático, cuotas y políticas.',
                reference: 'https://learn.microsoft.com/en-us/azure/devtest-labs/devtest-lab-overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure networking services',
                text: 'You need to limit the types of connections from web servers to database servers in Azure. What should you recommend?',
                text_es: 'Necesitas limitar los tipos de conexiones de servidores web a servidores de base de datos en Azure. ¿Qué deberías recomendar?',
                type: 'single',
                answers: [
                    { text: 'Network Security Group (NSG)', text_es: 'Grupo de Seguridad de Red (NSG)', correct: true },
                    { text: 'Azure Firewall', text_es: 'Azure Firewall', correct: false },
                    { text: 'Application Security Group (ASG)', text_es: 'Grupo de Seguridad de Aplicación (ASG)', correct: false },
                    { text: 'Azure Traffic Manager', text_es: 'Azure Traffic Manager', correct: false }
                ],
                explanation: 'NSGs define inbound and outbound traffic rules at the subnet or NIC level, restricting traffic between web servers and database servers.',
                explanation_es: 'Los NSGs definen reglas de tráfico entrante y saliente a nivel de subred o NIC, restringiendo el tráfico entre servidores web y servidores de base de datos.',
                reference: 'https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe the core architectural components of Azure',
                text: 'Which statement regarding Azure regions is correct?',
                text_es: '¿Qué declaración respecto a las regiones de Azure es correcta?',
                type: 'single',
                answers: [
                    { text: 'They are contained within availability zones', text_es: 'Están contenidas dentro de zonas de disponibilidad', correct: false },
                    { text: 'They are contained within data centers', text_es: 'Están contenidas dentro de centros de datos', correct: false },
                    { text: 'Regions contain a maximum of two availability zones', text_es: 'Las regiones contienen un máximo de dos zonas de disponibilidad', correct: false },
                    { text: 'Azure service availability can vary by region', text_es: 'La disponibilidad de servicios de Azure puede variar por región', correct: true }
                ],
                explanation: 'Azure services launch on different schedules across regions, so not all services are available everywhere simultaneously.',
                explanation_es: 'Los servicios de Azure se lanzan en diferentes calendarios entre regiones, por lo que no todos los servicios están disponibles en todas partes simultáneamente.',
                reference: 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'How can you reduce costs with Azure Virtual Desktop? (Select two)',
                text_es: '¿Cómo puedes reducir costos con Azure Virtual Desktop? (Selecciona dos)',
                type: 'multi',
                answers: [
                    { text: 'AVD is available at no additional cost with an eligible Microsoft 365 license', text_es: 'AVD está disponible sin costo adicional con una licencia elegible de Microsoft 365', correct: true },
                    { text: 'Use Azure Virtual Desktop in a single region', text_es: 'Usar Azure Virtual Desktop en una sola región', correct: false },
                    { text: 'Buy one-year or three-year Azure Reserved VM Instances', text_es: 'Comprar Azure Reserved VM Instances de uno o tres años', correct: true }
                ],
                explanation: 'Microsoft 365 licensing includes AVD access at no extra cost, while Reserved VM Instances provide 40-72% discounts on session host VMs.',
                explanation_es: 'Las licencias de Microsoft 365 incluyen acceso a AVD sin costo extra, mientras que las Reserved VM Instances proporcionan descuentos del 40-72% en VMs de host de sesión.',
                reference: 'https://learn.microsoft.com/en-us/azure/virtual-desktop/overview'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure compute services',
                text: 'A company wants to implement an IoT solution. Which service would "Monitor and control billions of IoT assets"?',
                text_es: 'Una empresa quiere implementar una solución IoT. ¿Qué servicio "Monitorearía y controlaría miles de millones de activos IoT"?',
                type: 'single',
                answers: [
                    { text: 'IoT Hub', text_es: 'IoT Hub', correct: true },
                    { text: 'IoT Central', text_es: 'IoT Central', correct: false },
                    { text: 'IoT Edge', text_es: 'IoT Edge', correct: false },
                    { text: 'Azure Time Series Insights', text_es: 'Azure Time Series Insights', correct: false }
                ],
                explanation: 'Azure IoT Hub provides reliable, secure bi-directional communication to monitor and control billions of IoT devices at scale.',
                explanation_es: 'Azure IoT Hub proporciona comunicación bidireccional confiable y segura para monitorear y controlar miles de millones de dispositivos IoT a escala.',
                reference: 'https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe cost management in Azure',
                text: 'Select three correct statements about factors that affect cost in Azure.',
                text_es: 'Selecciona tres declaraciones correctas sobre factores que afectan el costo en Azure.',
                type: 'multi',
                answers: [
                    { text: 'Copying data TO Azure over VPN incurs additional transfer costs', text_es: 'Copiar datos A Azure por VPN incurre en costos adicionales de transferencia', correct: false },
                    { text: 'Two B2B-size VMs will always generate the same cost', text_es: 'Dos VMs de tamaño B2B siempre generarán el mismo costo', correct: false },
                    { text: 'General-purpose v2 storage charges for data stored and read/write operations', text_es: 'El almacenamiento de propósito general v2 cobra por datos almacenados y operaciones de lectura/escritura', correct: true },
                    { text: 'When a VM is stopped, you continue to pay storage costs', text_es: 'Cuando una VM se detiene, continúas pagando costos de almacenamiento', correct: true },
                    { text: 'Creating additional Resource Groups incurs additional costs', text_es: 'Crear Grupos de Recursos adicionales incurre en costos adicionales', correct: false },
                    { text: 'Copying data FROM Azure to on-premises over VPN incurs additional transfer costs', text_es: 'Copiar datos DESDE Azure a infraestructura local por VPN incurre en costos adicionales de transferencia', correct: true }
                ],
                explanation: 'Azure charges for storage operations, VM disk storage even when stopped, and outbound (egress) data transfers. Inbound data is free, and Resource Groups have no cost.',
                explanation_es: 'Azure cobra por operaciones de almacenamiento, almacenamiento de disco de VM incluso cuando está detenida, y transferencias de datos salientes (egress). Los datos entrantes son gratuitos y los Grupos de Recursos no tienen costo.',
                reference: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/2-describe-factors-affect-costs-azure'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure identity, access, and security',
                text: 'How does Multi-Factor Authentication make a system more secure?',
                text_es: '¿Cómo hace la Autenticación Multi-Factor que un sistema sea más seguro?',
                type: 'single',
                answers: [
                    { text: 'It allows login without a password via browser cookie', text_es: 'Permite iniciar sesión sin contraseña mediante cookie del navegador', correct: false },
                    { text: 'It is another password making it more secure', text_es: 'Es otra contraseña que lo hace más seguro', correct: false },
                    { text: 'It does not make it more secure', text_es: 'No lo hace más seguro', correct: false },
                    { text: 'It requires access to a verified phone to log in', text_es: 'Requiere acceso a un teléfono verificado para iniciar sesión', correct: true }
                ],
                explanation: 'MFA requires a second verification factor (something you have) beyond just a password, preventing unauthorized access even if credentials are compromised.',
                explanation_es: 'MFA requiere un segundo factor de verificación (algo que tienes) más allá de una contraseña, previniendo acceso no autorizado incluso si las credenciales se comprometen.',
                reference: 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks'
            },
            {
                certId, topic: 'Describe Azure Architecture and Services', subtopic: 'Describe Azure networking services',
                text: 'Which Azure service provides an isolated environment for hosting Virtual Machines?',
                text_es: '¿Qué servicio de Azure proporciona un entorno aislado para alojar Máquinas Virtuales?',
                type: 'single',
                answers: [
                    { text: 'Azure Data Lake Analytics', text_es: 'Azure Data Lake Analytics', correct: false },
                    { text: 'Azure Virtual Machine Scale Sets', text_es: 'Azure Virtual Machine Scale Sets', correct: false },
                    { text: 'Azure Virtual Network', text_es: 'Azure Virtual Network', correct: true },
                    { text: 'Azure App Service', text_es: 'Azure App Service', correct: false }
                ],
                explanation: 'Azure Virtual Network provides network isolation for hosting VMs by creating dedicated, private network spaces.',
                explanation_es: 'Azure Virtual Network proporciona aislamiento de red para alojar VMs creando espacios de red dedicados y privados.',
                reference: 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview'
            },
            {
                certId, topic: 'Describe Azure Management and Governance', subtopic: 'Describe monitoring tools in Azure',
                text: 'Which Azure service should you use to view service failure notifications that can affect the availability of your VM?',
                text_es: '¿Qué servicio de Azure deberías usar para ver notificaciones de fallas de servicio que pueden afectar la disponibilidad de tu VM?',
                type: 'single',
                answers: [
                    { text: 'Azure Monitor', text_es: 'Azure Monitor', correct: true },
                    { text: 'Azure Advanced Threat Protection', text_es: 'Azure Advanced Threat Protection', correct: false },
                    { text: 'Azure Event Hubs', text_es: 'Azure Event Hubs', correct: false },
                    { text: 'Azure Advisor', text_es: 'Azure Advisor', correct: false }
                ],
                explanation: 'Azure Monitor provides service health alerts, metrics, and notifications for region-specific issues affecting VM availability.',
                explanation_es: 'Azure Monitor proporciona alertas de salud del servicio, métricas y notificaciones para problemas regionales que afectan la disponibilidad de VMs.',
                reference: 'https://learn.microsoft.com/en-us/azure/service-health/overview'
            }
        ];

        // Add only questions that don't already exist (match by text)
        repoQuestions.forEach(q => {
            const isDuplicate = existing.find(e => e.text === q.text);
            if (!isDuplicate) {
                Store.addQuestion(q);
            }
        });
    }
};
