export interface Project {
  id: number;
  title: string;
  description: string;
  images: { url: string; altText: string; caption: string; isMain?: boolean }[];
  category: string;
  technologies: string[];
  highlights: string[];
  metrics: {
    automationSavings: string;
    accuracyImprovement: string;
    integrations: number;
    workflowComplexity: string;
  };
  workflowSteps: string[];
  integrations: string[];
  sourceFile: string;
}

export interface Category {
  id: string;
  name: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Intelligent Lead Management System",
    description: "Automated lead capture from Gmail, enrichment through multiple APIs, and intelligent routing to Asana with Google Drive document management.",
    images: [{ url: "/images/projects/lead-management-1-objectives.jpg", altText: "Lead management system", caption: "Project objectives", isMain: true }],
    category: "ai_automation",
    technologies: ["Gmail", "Asana", "Google Drive", "Enrichment APIs", "n8n Workflows"],
    highlights: ["95% reduction in manual lead processing", "Automatic lead scoring", "Seamless CRM integration"],
    metrics: { automationSavings: "40 hours/week", accuracyImprovement: "95%", integrations: 6, workflowComplexity: "Advanced" },
    workflowSteps: ["Monitor Gmail for new leads", "Extract contact information", "Enrich leads with APIs", "Create Asana tasks", "Store documents in Drive"],
    integrations: ["Gmail", "Asana", "Google Drive", "Enrichment APIs", "Slack", "Webhooks"],
    sourceFile: "Asana-Gmail-Gdrive.json"
  },
  {
    id: 2,
    title: "Automated Financial Reporting",
    description: "Comprehensive financial reporting automation connecting Asana project data with Xero accounting system for real-time business insights.",
    images: [{ url: "/images/projects/financial-reporting-1-workflow.jpg", altText: "Financial reporting workflow", caption: "Complete workflow", isMain: true }],
    category: "data_sync",
    technologies: ["Asana", "Xero", "Financial APIs", "Report Generation", "Data Analytics"],
    highlights: ["Automated monthly reports", "Real-time cost tracking", "Custom KPI dashboards"],
    metrics: { automationSavings: "25 hours/month", accuracyImprovement: "98%", integrations: 4, workflowComplexity: "Intermediate" },
    workflowSteps: ["Extract project data", "Process time tracking", "Connect with Xero", "Generate reports", "Distribute to stakeholders"],
    integrations: ["Asana", "Xero", "Google Sheets", "Email Notifications"],
    sourceFile: "Asana-Xero-Report.json"
  },
  {
    id: 3,
    title: "AI Email Attachment Processing",
    description: "Intelligent email monitoring system that automatically processes attachments using AI, extracts key information, and distributes data to relevant systems.",
    images: [{ url: "/images/projects/email-attachment-1-workflow.jpg", altText: "Email attachment workflow", caption: "Processing workflow", isMain: true }],
    category: "ai_automation",
    technologies: ["Gmail", "AI Document Processing", "OCR", "Data Extraction", "Automation"],
    highlights: ["Intelligent document recognition", "Automatic data extraction", "99% accuracy"],
    metrics: { automationSavings: "30 hours/week", accuracyImprovement: "99%", integrations: 5, workflowComplexity: "Advanced" },
    workflowSteps: ["Monitor Gmail attachments", "Download and categorize", "Apply AI analysis", "Extract structured data", "Route to systems"],
    integrations: ["Gmail", "AI Vision APIs", "Google Drive", "Database", "Notifications"],
    sourceFile: "Gmail Auto Attachment.json"
  },
  {
    id: 4,
    title: "Universal Document Intelligence",
    description: "Advanced data extraction and transformation pipeline that processes multiple document formats into structured business data.",
    images: [{ url: "/images/projects/document-intelligence-1-workflow.jpg", altText: "Document intelligence", caption: "Pipeline workflow", isMain: true }],
    category: "data_transformation",
    technologies: ["Document AI", "Data Transformation", "API Integration", "Machine Learning", "ETL Pipeline"],
    highlights: ["Multi-format processing", "Intelligent structure recognition", "Scalable architecture"],
    metrics: { automationSavings: "50 hours/week", accuracyImprovement: "96%", integrations: 8, workflowComplexity: "Expert" },
    workflowSteps: ["Receive documents", "Format detection", "AI extraction", "Transform data", "Validate quality", "Distribute endpoints"],
    integrations: ["Google Drive", "Microsoft Office", "AI APIs", "Database", "CRM", "ERP", "Analytics", "Webhooks"],
    sourceFile: "Data Extraction & Transformation.json"
  },
  {
    id: 5,
    title: "AI Lead Enrichment Pipeline",
    description: "Sophisticated lead enrichment system combining multiple data sources for comprehensive prospect insights.",
    images: [{ url: "/images/projects/lead-enrichment-1-form-low.jpg", altText: "Lead enrichment", caption: "Enrichment workflow", isMain: true }],
    category: "api_integration",
    technologies: ["Lead APIs", "AI Enhancement", "Data Enrichment", "CRM Integration", "Sales Automation"],
    highlights: ["Multi-source aggregation", "AI-powered scoring", "Automated verification"],
    metrics: { automationSavings: "20 hours/week", accuracyImprovement: "92%", integrations: 5, workflowComplexity: "Intermediate" },
    workflowSteps: ["Capture leads", "Enrich with data", "Apply AI scoring", "Verify contacts", "Update CRM", "Trigger workflows"],
    integrations: ["Lead Sources", "Enrichment APIs", "CRM", "Email Verification", "Sales Automation"],
    sourceFile: "Lead enrichment.json"
  },
  {
    id: 6,
    title: "AI Email Personalization System",
    description: "Advanced AI-powered email personalization using OpenAI GPT-4 with data validation and performance analytics.",
    images: [{ url: "/images/projects/ai-email-personalization-overview.jpg", altText: "Email personalization", caption: "AI workflow", isMain: true }],
    category: "ai_automation",
    technologies: ["OpenAI GPT-4", "Gmail API", "JavaScript", "AI Personalization", "Email Marketing", "Data Validation"],
    highlights: ["GPT-4 content generation", "Context-aware personalization", "Real-time analytics", "UAE market optimization"],
    metrics: { automationSavings: "45 hours/week", accuracyImprovement: "97%", integrations: 4, workflowComplexity: "Expert" },
    workflowSteps: ["Ingest contact data", "Build context", "Generate AI content", "Parse email", "Deliver via Gmail", "Track metrics"],
    integrations: ["OpenAI GPT-4", "Gmail API", "Data Validation", "Analytics"],
    sourceFile: "AI Email Personalization System.json"
  }
];

export const categories: Category[] = [
  { id: "all", name: "All Projects" },
  { id: "ai_automation", name: "AI Automation" },
  { id: "data_sync", name: "Data Sync" },
  { id: "data_transformation", name: "Data Transformation" },
  { id: "api_integration", name: "API Integration" }
];
