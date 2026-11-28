import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'oneCRM',
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#08258C' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap' }]
  ],

  locales: {
    root: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      description: 'oneCRM - AI-First Business Platform. Làm chủ dữ liệu - Tinh gọn vận hành - Bứt phá tăng trưởng.',
      themeConfig: {
        nav: [
      { text: 'Trang chủ', link: '/' },
      {
        text: 'Tính năng',
        items: [
          { text: 'Trợ lý AI & MCP Server', link: '/site/features/ai' },
          { text: 'Tự động hóa No-Code', link: '/site/features/workflow-automation' },
          { text: 'Quản lý Lead & Phễu Deals', link: '/site/features/sales-pipeline' },
          { text: 'Hóa đơn & Thanh toán', link: '/site/features/invoicing' },
          { text: 'Dự án & Tasks', link: '/site/features/project-management' },
          { text: 'Help Desk & Cổng khách hàng', link: '/site/features/client-portal' },
          { text: 'Tất cả tính năng...', link: '/site/self-hosted-crm' }
        ]
      },
      {
        text: 'Ứng dụng theo ngành',
        items: [
          { text: 'Marketing & Web Agencies', link: '/site/for/agencies' },
          { text: 'Solopreneurs (Kinh doanh solo)', link: '/site/for/solopreneurs' },
          { text: 'Freelancers & Chuyên gia', link: '/site/for/freelancers' },
          { text: 'Dịch vụ tư vấn (Consultants)', link: '/site/for/consultants' },
          { text: 'Dịch vụ IT & Bảo trì (MSPs)', link: '/site/for/it-service-companies' },
          { text: 'Lập trình viên (Developers)', link: '/site/for/developers' }
        ]
      },
      { text: 'Bảng giá', link: '/site/pricing' },
      { text: 'Tài liệu hướng dẫn', link: '/docs/introduction' },
      { text: 'Changelog', link: '/site/changelog' }
    ],
        sidebar: {
      '/docs/': [
      {
            "text": "Getting started",
            "collapsed": false,
            "items": [
                  {
                        "text": "Introduction",
                        "link": "/docs/introduction"
                  },
                  {
                        "text": "Requirements",
                        "link": "/docs/requirements"
                  },
                  {
                        "text": "Installation",
                        "link": "/docs/installation"
                  },
                  {
                        "text": "Docker installation",
                        "link": "/docs/docker"
                  },
                  {
                        "text": "Cron job",
                        "link": "/docs/cron"
                  },
                  {
                        "text": "License & installations",
                        "link": "/docs/license"
                  },
                  {
                        "text": "Initial setup",
                        "link": "/docs/setup"
                  },
                  {
                        "text": "Updates & patches",
                        "link": "/docs/update"
                  },
                  {
                        "text": "Move to a new server or domain",
                        "link": "/docs/transfer"
                  },
                  {
                        "text": "Move from Classic",
                        "link": "/docs/move-from-classic"
                  },
                  {
                        "text": "Troubleshooting",
                        "link": "/docs/troubleshooting"
                  }
            ]
      },
      {
            "text": "Configuration",
            "collapsed": false,
            "items": [
                  {
                        "text": "AI",
                        "link": "/docs/ai"
                  },
                  {
                        "text": "Mail templates",
                        "link": "/docs/mail-templates"
                  },
                  {
                        "text": "Localization",
                        "link": "/docs/localization"
                  },
                  {
                        "text": "Queues",
                        "link": "/docs/queues"
                  },
                  {
                        "text": "File storage",
                        "link": "/docs/file-storage"
                  }
            ]
      },
      {
            "text": "Customers & sales",
            "collapsed": true,
            "items": [
                  {
                        "text": "Contacts and companies",
                        "link": "/docs/usage/contacts"
                  },
                  {
                        "text": "Leads",
                        "link": "/docs/usage/leads"
                  },
                  {
                        "text": "Deals",
                        "link": "/docs/usage/deals"
                  },
                  {
                        "text": "Documents",
                        "link": "/docs/usage/documents"
                  },
                  {
                        "text": "Web forms",
                        "link": "/docs/usage/web-forms"
                  }
            ]
      },
      {
            "text": "Billing",
            "collapsed": true,
            "items": [
                  {
                        "text": "Invoices",
                        "link": "/docs/usage/invoices"
                  },
                  {
                        "text": "Expenses",
                        "link": "/docs/usage/expenses"
                  },
                  {
                        "text": "E-invoicing: Setup & formats",
                        "link": "/docs/usage/e-invoicing"
                  },
                  {
                        "text": "E-invoicing: Sending (Peppol & FACe)",
                        "link": "/docs/usage/sending-e-invoices"
                  },
                  {
                        "text": "E-invoicing: VeriFactu (Spain)",
                        "link": "/docs/usage/verifactu"
                  }
            ]
      },
      {
            "text": "Projects & support",
            "collapsed": true,
            "items": [
                  {
                        "text": "Projects",
                        "link": "/docs/usage/projects"
                  },
                  {
                        "text": "Tasks",
                        "link": "/docs/usage/tasks"
                  },
                  {
                        "text": "Tickets",
                        "link": "/docs/usage/tickets"
                  },
                  {
                        "text": "Inbox",
                        "link": "/docs/usage/inbox"
                  },
                  {
                        "text": "Knowledge base",
                        "link": "/docs/usage/knowledge-base"
                  }
            ]
      },
      {
            "text": "Automation & data",
            "collapsed": true,
            "items": [
                  {
                        "text": "Reports & dashboards",
                        "link": "/docs/usage/reports"
                  },
                  {
                        "text": "Automations",
                        "link": "/docs/usage/automations"
                  },
                  {
                        "text": "Webhooks",
                        "link": "/docs/usage/webhooks"
                  },
                  {
                        "text": "Privacy & GDPR",
                        "link": "/docs/privacy/gdpr-compliance"
                  }
            ]
      },
      {
            "text": "Integrations",
            "collapsed": true,
            "items": [
                  {
                        "text": "Payment gateways",
                        "link": "/docs/payment-gateways"
                  },
                  {
                        "text": "REST API",
                        "link": "/docs/api"
                  },
                  {
                        "text": "Claude & ChatGPT (MCP)",
                        "link": "/docs/integrations/mcp"
                  },
                  {
                        "text": "Google",
                        "link": "/docs/integrations/google"
                  },
                  {
                        "text": "Meta",
                        "link": "/docs/integrations/meta"
                  },
                  {
                        "text": "Microsoft",
                        "link": "/docs/integrations/microsoft"
                  },
                  {
                        "text": "Pusher",
                        "link": "/docs/integrations/pusher"
                  },
                  {
                        "text": "reCaptcha",
                        "link": "/docs/integrations/recaptcha"
                  },
                  {
                        "text": "Zapier",
                        "link": "/docs/integrations/zapier"
                  }
            ]
      },
      {
            "text": "Modules (Developer Docs)",
            "collapsed": true,
            "items": [
                  {
                        "text": "Getting started",
                        "link": "/docs/modules/getting-started"
                  },
                  {
                        "text": "Module definition",
                        "link": "/docs/modules/module-definition"
                  },
                  {
                        "text": "Routes",
                        "link": "/docs/modules/routes"
                  },
                  {
                        "text": "Authorization",
                        "link": "/docs/modules/authorization"
                  },
                  {
                        "text": "Files and uploads",
                        "link": "/docs/modules/files-and-uploads"
                  },
                  {
                        "text": "Translations",
                        "link": "/docs/modules/translations"
                  },
                  {
                        "text": "Public assets",
                        "link": "/docs/modules/public-assets"
                  },
                  {
                        "text": "Pages",
                        "link": "/docs/modules/pages"
                  },
                  {
                        "text": "Resources",
                        "link": "/docs/modules/resources"
                  },
                  {
                        "text": "Tables, boards and lists",
                        "link": "/docs/modules/tables"
                  },
                  {
                        "text": "Forms",
                        "link": "/docs/modules/forms"
                  },
                  {
                        "text": "Livewire components",
                        "link": "/docs/modules/livewire-components"
                  },
                  {
                        "text": "Admin integration",
                        "link": "/docs/modules/admin-integration"
                  },
                  {
                        "text": "Customer portal",
                        "link": "/docs/modules/customer-portal"
                  },
                  {
                        "text": "Extending other modules",
                        "link": "/docs/modules/extending-other-modules"
                  },
                  {
                        "text": "Notifications and mail",
                        "link": "/docs/modules/notifications-and-mail"
                  },
                  {
                        "text": "Automations (Module)",
                        "link": "/docs/modules/automations"
                  },
                  {
                        "text": "AI features (Module)",
                        "link": "/docs/modules/ai-features"
                  },
                  {
                        "text": "Payment gateways (Module)",
                        "link": "/docs/modules/payment-gateways"
                  },
                  {
                        "text": "Testing",
                        "link": "/docs/modules/testing"
                  },
                  {
                        "text": "Deleting a module",
                        "link": "/docs/modules/module-teardown"
                  },
                  {
                        "text": "Packaging and release",
                        "link": "/docs/modules/packaging-and-validation"
                  },
                  {
                        "text": "Updates and licensing",
                        "link": "/docs/modules/updates-and-licensing"
                  },
                  {
                        "text": "Upgrading your module",
                        "link": "/docs/modules/upgrading-your-module"
                  }
            ]
      }
],
      '/site/': [
      {
            "text": "Giới thiệu & Sản phẩm",
            "items": [
                  {
                        "text": "Tổng quan một trang",
                        "link": "/site/index"
                  },
                  {
                        "text": "Self-Hosted CRM",
                        "link": "/site/self-hosted-crm"
                  },
                  {
                        "text": "Custom CRM",
                        "link": "/site/custom-crm"
                  },
                  {
                        "text": "Bảng giá (Pricing)",
                        "link": "/site/pricing"
                  },
                  {
                        "text": "So sánh các phiên bản",
                        "link": "/site/compare"
                  },
                  {
                        "text": "Lộ trình cập nhật (Changelog)",
                        "link": "/site/changelog"
                  },
                  {
                        "text": "Chuyển đổi từ Classic",
                        "link": "/site/migrate"
                  }
            ]
      },
      {
            "text": "Tính năng chính (Features)",
            "collapsed": false,
            "items": [
                  {
                        "text": "Trợ lý AI (AI Assistant)",
                        "link": "/site/features/ai"
                  },
                  {
                        "text": "MCP Server (Claude / ChatGPT)",
                        "link": "/site/features/mcp"
                  },
                  {
                        "text": "Tự động hóa (Workflow Automation)",
                        "link": "/site/features/workflow-automation"
                  },
                  {
                        "text": "Quản lý Lead (Leads)",
                        "link": "/site/features/lead-management"
                  },
                  {
                        "text": "Phễu bán hàng (Deals & Pipeline)",
                        "link": "/site/features/sales-pipeline"
                  },
                  {
                        "text": "Hộp thư Email tích hợp",
                        "link": "/site/features/email-inbox"
                  },
                  {
                        "text": "Báo giá & Hợp đồng (Quotes)",
                        "link": "/site/features/quotes"
                  },
                  {
                        "text": "Hóa đơn & Thanh toán (Invoicing)",
                        "link": "/site/features/invoicing"
                  },
                  {
                        "text": "Hóa đơn điện tử (E-Invoicing)",
                        "link": "/site/features/e-invoicing"
                  },
                  {
                        "text": "Quản lý dự án (Projects)",
                        "link": "/site/features/project-management"
                  },
                  {
                        "text": "Công việc & Phân công (Tasks)",
                        "link": "/site/features/task-management"
                  },
                  {
                        "text": "Hỗ trợ khách hàng (Help Desk)",
                        "link": "/site/features/help-desk"
                  },
                  {
                        "text": "Cổng khách hàng (Client Portal)",
                        "link": "/site/features/client-portal"
                  },
                  {
                        "text": "Kho tri thức (Knowledge Base)",
                        "link": "/site/features/knowledge-base"
                  },
                  {
                        "text": "Email Marketing & Doanh thu",
                        "link": "/site/features/email-marketing"
                  }
            ]
      },
      {
            "text": "Kịch bản ứng dụng (Use Cases)",
            "collapsed": false,
            "items": [
                  {
                        "text": "Dành cho Agency",
                        "link": "/site/for/agencies"
                  },
                  {
                        "text": "Dành cho Freelancers",
                        "link": "/site/for/freelancers"
                  },
                  {
                        "text": "Dành cho Solopreneurs (Kinh doanh 1 người)",
                        "link": "/site/for/solopreneurs"
                  },
                  {
                        "text": "Dịch vụ chuyên nghiệp (Professional Services)",
                        "link": "/site/for/professional-services"
                  },
                  {
                        "text": "Chuyên gia tư vấn (Consultants)",
                        "link": "/site/for/consultants"
                  },
                  {
                        "text": "Công ty Dịch vụ IT & Bảo trì (MSPs)",
                        "link": "/site/for/it-service-companies"
                  },
                  {
                        "text": "Dành cho Lập trình viên (Developers)",
                        "link": "/site/for/developers"
                  }
            ]
      },
      {
            "text": "So sánh với đối thủ (vs)",
            "collapsed": true,
            "items": [
                  {
                        "text": "oneCRM vs Bitrix24",
                        "link": "/site/vs/bitrix24"
                  },
                  {
                        "text": "oneCRM vs Zoho CRM",
                        "link": "/site/vs/zoho"
                  },
                  {
                        "text": "oneCRM vs HubSpot",
                        "link": "/site/vs/hubspot"
                  },
                  {
                        "text": "oneCRM vs Pipedrive",
                        "link": "/site/vs/pipedrive"
                  },
                  {
                        "text": "oneCRM vs Invoice Ninja",
                        "link": "/site/vs/invoice-ninja"
                  },
                  {
                        "text": "oneCRM vs Dolibarr",
                        "link": "/site/vs/dolibarr"
                  },
                  {
                        "text": "oneCRM vs EspoCRM",
                        "link": "/site/vs/espocrm"
                  },
                  {
                        "text": "oneCRM vs SuiteCRM",
                        "link": "/site/vs/suitecrm"
                  }
            ]
      },
      {
            "text": "Modules mở rộng chính thức",
            "collapsed": true,
            "items": [
                  {
                        "text": "Classic Migrator",
                        "link": "/site/modules/classic-migrator"
                  },
                  {
                        "text": "Proposals Builder",
                        "link": "/site/modules/proposals"
                  },
                  {
                        "text": "Marketing Automation",
                        "link": "/site/modules/marketing"
                  },
                  {
                        "text": "Announcements",
                        "link": "/site/modules/announcements"
                  }
            ]
      }
]
    },
        docFooter: {
          prev: 'Trang trước',
          next: 'Trang tiếp'
        },
        outline: {
          label: 'Nội dung trang',
          level: [2, 3]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'oneCRM - AI-First Business Platform. Own your data - Streamline operations - Accelerate growth.',
      themeConfig: {
        nav: [
      { text: 'Home', link: '/en/' },
      {
        text: 'Features',
        items: [
          { text: 'AI Assistant & MCP Server', link: '/en/site/features/ai' },
          { text: 'No-Code Automation', link: '/en/site/features/workflow-automation' },
          { text: 'Lead & Deals Pipeline', link: '/en/site/features/sales-pipeline' },
          { text: 'Invoicing & Payments', link: '/en/site/features/invoicing' },
          { text: 'Projects & Tasks', link: '/en/site/features/project-management' },
          { text: 'Help Desk & Client Portal', link: '/en/site/features/client-portal' },
          { text: 'All Features...', link: '/en/site/self-hosted-crm' }
        ]
      },
      {
        text: 'Use Cases',
        items: [
          { text: 'Marketing & Web Agencies', link: '/en/site/for/agencies' },
          { text: 'Solopreneurs', link: '/en/site/for/solopreneurs' },
          { text: 'Freelancers & Contractors', link: '/en/site/for/freelancers' },
          { text: 'Consultants & Advisory', link: '/en/site/for/consultants' },
          { text: 'IT Services & MSPs', link: '/en/site/for/it-service-companies' },
          { text: 'Software Developers', link: '/en/site/for/developers' }
        ]
      },
      { text: 'Pricing', link: '/en/site/pricing' },
      { text: 'Documentation', link: '/en/docs/introduction' },
      { text: 'Changelog', link: '/en/site/changelog' }
    ],
        sidebar: {
      '/en/docs/': [
      {
            "text": "Getting started",
            "collapsed": false,
            "items": [
                  {
                        "text": "Introduction",
                        "link": "/en/docs/introduction"
                  },
                  {
                        "text": "Requirements",
                        "link": "/en/docs/requirements"
                  },
                  {
                        "text": "Installation",
                        "link": "/en/docs/installation"
                  },
                  {
                        "text": "Docker installation",
                        "link": "/en/docs/docker"
                  },
                  {
                        "text": "Cron job",
                        "link": "/en/docs/cron"
                  },
                  {
                        "text": "License & installations",
                        "link": "/en/docs/license"
                  },
                  {
                        "text": "Initial setup",
                        "link": "/en/docs/setup"
                  },
                  {
                        "text": "Updates & patches",
                        "link": "/en/docs/update"
                  },
                  {
                        "text": "Move to a new server or domain",
                        "link": "/en/docs/transfer"
                  },
                  {
                        "text": "Move from Classic",
                        "link": "/en/docs/move-from-classic"
                  },
                  {
                        "text": "Troubleshooting",
                        "link": "/en/docs/troubleshooting"
                  }
            ]
      },
      {
            "text": "Configuration",
            "collapsed": false,
            "items": [
                  {
                        "text": "AI",
                        "link": "/en/docs/ai"
                  },
                  {
                        "text": "Mail templates",
                        "link": "/en/docs/mail-templates"
                  },
                  {
                        "text": "Localization",
                        "link": "/en/docs/localization"
                  },
                  {
                        "text": "Queues",
                        "link": "/en/docs/queues"
                  },
                  {
                        "text": "File storage",
                        "link": "/en/docs/file-storage"
                  }
            ]
      },
      {
            "text": "Customers & sales",
            "collapsed": true,
            "items": [
                  {
                        "text": "Contacts and companies",
                        "link": "/en/docs/usage/contacts"
                  },
                  {
                        "text": "Leads",
                        "link": "/en/docs/usage/leads"
                  },
                  {
                        "text": "Deals",
                        "link": "/en/docs/usage/deals"
                  },
                  {
                        "text": "Documents",
                        "link": "/en/docs/usage/documents"
                  },
                  {
                        "text": "Web forms",
                        "link": "/en/docs/usage/web-forms"
                  }
            ]
      },
      {
            "text": "Billing",
            "collapsed": true,
            "items": [
                  {
                        "text": "Invoices",
                        "link": "/en/docs/usage/invoices"
                  },
                  {
                        "text": "Expenses",
                        "link": "/en/docs/usage/expenses"
                  },
                  {
                        "text": "E-invoicing: Setup & formats",
                        "link": "/en/docs/usage/e-invoicing"
                  },
                  {
                        "text": "E-invoicing: Sending (Peppol & FACe)",
                        "link": "/en/docs/usage/sending-e-invoices"
                  },
                  {
                        "text": "E-invoicing: VeriFactu (Spain)",
                        "link": "/en/docs/usage/verifactu"
                  }
            ]
      },
      {
            "text": "Projects & support",
            "collapsed": true,
            "items": [
                  {
                        "text": "Projects",
                        "link": "/en/docs/usage/projects"
                  },
                  {
                        "text": "Tasks",
                        "link": "/en/docs/usage/tasks"
                  },
                  {
                        "text": "Tickets",
                        "link": "/en/docs/usage/tickets"
                  },
                  {
                        "text": "Inbox",
                        "link": "/en/docs/usage/inbox"
                  },
                  {
                        "text": "Knowledge base",
                        "link": "/en/docs/usage/knowledge-base"
                  }
            ]
      },
      {
            "text": "Automation & data",
            "collapsed": true,
            "items": [
                  {
                        "text": "Reports & dashboards",
                        "link": "/en/docs/usage/reports"
                  },
                  {
                        "text": "Automations",
                        "link": "/en/docs/usage/automations"
                  },
                  {
                        "text": "Webhooks",
                        "link": "/en/docs/usage/webhooks"
                  },
                  {
                        "text": "Privacy & GDPR",
                        "link": "/en/docs/privacy/gdpr-compliance"
                  }
            ]
      },
      {
            "text": "Integrations",
            "collapsed": true,
            "items": [
                  {
                        "text": "Payment gateways",
                        "link": "/en/docs/payment-gateways"
                  },
                  {
                        "text": "REST API",
                        "link": "/en/docs/api"
                  },
                  {
                        "text": "Claude & ChatGPT (MCP)",
                        "link": "/en/docs/integrations/mcp"
                  },
                  {
                        "text": "Google",
                        "link": "/en/docs/integrations/google"
                  },
                  {
                        "text": "Meta",
                        "link": "/en/docs/integrations/meta"
                  },
                  {
                        "text": "Microsoft",
                        "link": "/en/docs/integrations/microsoft"
                  },
                  {
                        "text": "Pusher",
                        "link": "/en/docs/integrations/pusher"
                  },
                  {
                        "text": "reCaptcha",
                        "link": "/en/docs/integrations/recaptcha"
                  },
                  {
                        "text": "Zapier",
                        "link": "/en/docs/integrations/zapier"
                  }
            ]
      },
      {
            "text": "Modules (Developer Docs)",
            "collapsed": true,
            "items": [
                  {
                        "text": "Getting started",
                        "link": "/en/docs/modules/getting-started"
                  },
                  {
                        "text": "Module definition",
                        "link": "/en/docs/modules/module-definition"
                  },
                  {
                        "text": "Routes",
                        "link": "/en/docs/modules/routes"
                  },
                  {
                        "text": "Authorization",
                        "link": "/en/docs/modules/authorization"
                  },
                  {
                        "text": "Files and uploads",
                        "link": "/en/docs/modules/files-and-uploads"
                  },
                  {
                        "text": "Translations",
                        "link": "/en/docs/modules/translations"
                  },
                  {
                        "text": "Public assets",
                        "link": "/en/docs/modules/public-assets"
                  },
                  {
                        "text": "Pages",
                        "link": "/en/docs/modules/pages"
                  },
                  {
                        "text": "Resources",
                        "link": "/en/docs/modules/resources"
                  },
                  {
                        "text": "Tables, boards and lists",
                        "link": "/en/docs/modules/tables"
                  },
                  {
                        "text": "Forms",
                        "link": "/en/docs/modules/forms"
                  },
                  {
                        "text": "Livewire components",
                        "link": "/en/docs/modules/livewire-components"
                  },
                  {
                        "text": "Admin integration",
                        "link": "/en/docs/modules/admin-integration"
                  },
                  {
                        "text": "Customer portal",
                        "link": "/en/docs/modules/customer-portal"
                  },
                  {
                        "text": "Extending other modules",
                        "link": "/en/docs/modules/extending-other-modules"
                  },
                  {
                        "text": "Notifications and mail",
                        "link": "/en/docs/modules/notifications-and-mail"
                  },
                  {
                        "text": "Automations (Module)",
                        "link": "/en/docs/modules/automations"
                  },
                  {
                        "text": "AI features (Module)",
                        "link": "/en/docs/modules/ai-features"
                  },
                  {
                        "text": "Payment gateways (Module)",
                        "link": "/en/docs/modules/payment-gateways"
                  },
                  {
                        "text": "Testing",
                        "link": "/en/docs/modules/testing"
                  },
                  {
                        "text": "Deleting a module",
                        "link": "/en/docs/modules/module-teardown"
                  },
                  {
                        "text": "Packaging and release",
                        "link": "/en/docs/modules/packaging-and-validation"
                  },
                  {
                        "text": "Updates and licensing",
                        "link": "/en/docs/modules/updates-and-licensing"
                  },
                  {
                        "text": "Upgrading your module",
                        "link": "/en/docs/modules/upgrading-your-module"
                  }
            ]
      }
],
      '/en/site/': [
      {
            "text": "Overview & Product",
            "items": [
                  {
                        "text": "One-Page Overview",
                        "link": "/en/site/index"
                  },
                  {
                        "text": "Self-Hosted CRM",
                        "link": "/en/site/self-hosted-crm"
                  },
                  {
                        "text": "Custom CRM",
                        "link": "/en/site/custom-crm"
                  },
                  {
                        "text": "Pricing",
                        "link": "/en/site/pricing"
                  },
                  {
                        "text": "Compare Editions",
                        "link": "/en/site/compare"
                  },
                  {
                        "text": "Changelog",
                        "link": "/en/site/changelog"
                  },
                  {
                        "text": "Migrate from Classic",
                        "link": "/en/site/migrate"
                  }
            ]
      },
      {
            "text": "Key Features",
            "collapsed": false,
            "items": [
                  {
                        "text": "AI Assistant",
                        "link": "/en/site/features/ai"
                  },
                  {
                        "text": "MCP Server (Claude / ChatGPT)",
                        "link": "/en/site/features/mcp"
                  },
                  {
                        "text": "Workflow Automation",
                        "link": "/en/site/features/workflow-automation"
                  },
                  {
                        "text": "Lead Management",
                        "link": "/en/site/features/lead-management"
                  },
                  {
                        "text": "Sales Pipeline & Deals",
                        "link": "/en/site/features/sales-pipeline"
                  },
                  {
                        "text": "Integrated Email Inbox",
                        "link": "/en/site/features/email-inbox"
                  },
                  {
                        "text": "Quotes & Contracts",
                        "link": "/en/site/features/quotes"
                  },
                  {
                        "text": "Invoicing & Payments",
                        "link": "/en/site/features/invoicing"
                  },
                  {
                        "text": "E-Invoicing (Peppol, Factur-X)",
                        "link": "/en/site/features/e-invoicing"
                  },
                  {
                        "text": "Project Management",
                        "link": "/en/site/features/project-management"
                  },
                  {
                        "text": "Tasks & Timesheets",
                        "link": "/en/site/features/task-management"
                  },
                  {
                        "text": "Help Desk & Tickets",
                        "link": "/en/site/features/help-desk"
                  },
                  {
                        "text": "Client Portal",
                        "link": "/en/site/features/client-portal"
                  },
                  {
                        "text": "Knowledge Base",
                        "link": "/en/site/features/knowledge-base"
                  },
                  {
                        "text": "Email Marketing",
                        "link": "/en/site/features/email-marketing"
                  }
            ]
      },
      {
            "text": "Industry Use Cases",
            "collapsed": false,
            "items": [
                  {
                        "text": "Marketing & Web Agencies",
                        "link": "/en/site/for/agencies"
                  },
                  {
                        "text": "Freelancers & Contractors",
                        "link": "/en/site/for/freelancers"
                  },
                  {
                        "text": "Solopreneurs",
                        "link": "/en/site/for/solopreneurs"
                  },
                  {
                        "text": "Professional Services",
                        "link": "/en/site/for/professional-services"
                  },
                  {
                        "text": "Consultants",
                        "link": "/en/site/for/consultants"
                  },
                  {
                        "text": "IT Services & MSPs",
                        "link": "/en/site/for/it-service-companies"
                  },
                  {
                        "text": "Developers",
                        "link": "/en/site/for/developers"
                  }
            ]
      },
      {
            "text": "Competitor Comparisons (vs)",
            "collapsed": true,
            "items": [
                  {
                        "text": "oneCRM vs Bitrix24",
                        "link": "/en/site/vs/bitrix24"
                  },
                  {
                        "text": "oneCRM vs Zoho CRM",
                        "link": "/en/site/vs/zoho"
                  },
                  {
                        "text": "oneCRM vs HubSpot",
                        "link": "/en/site/vs/hubspot"
                  },
                  {
                        "text": "oneCRM vs Pipedrive",
                        "link": "/en/site/vs/pipedrive"
                  },
                  {
                        "text": "oneCRM vs Invoice Ninja",
                        "link": "/en/site/vs/invoice-ninja"
                  },
                  {
                        "text": "oneCRM vs Dolibarr",
                        "link": "/en/site/vs/dolibarr"
                  },
                  {
                        "text": "oneCRM vs EspoCRM",
                        "link": "/en/site/vs/espocrm"
                  },
                  {
                        "text": "oneCRM vs SuiteCRM",
                        "link": "/en/site/vs/suitecrm"
                  }
            ]
      },
      {
            "text": "Official Modules",
            "collapsed": true,
            "items": [
                  {
                        "text": "Classic Migrator",
                        "link": "/en/site/modules/classic-migrator"
                  },
                  {
                        "text": "Proposals Builder",
                        "link": "/en/site/modules/proposals"
                  },
                  {
                        "text": "Marketing Automation",
                        "link": "/en/site/modules/marketing"
                  },
                  {
                        "text": "Announcements",
                        "link": "/en/site/modules/announcements"
                  }
            ]
      }
]
    },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        outline: {
          label: 'On this page',
          level: [2, 3]
        }
      }
    }
  },

  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      alt: 'oneCRM'
    },
    siteTitle: false,

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Tìm kiếm',
                buttonAriaLabel: 'Tìm kiếm'
              },
              modal: {
                noResultsText: 'Không tìm thấy kết quả cho',
                resetButtonTitle: 'Xóa tìm kiếm',
                footer: {
                  selectText: 'chọn',
                  navigateText: 'chuyển',
                  closeText: 'đóng'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results for',
                resetButtonTitle: 'Reset search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: 'Giải pháp CRM Tinh gọn Tự lưu trữ - Sở hữu toàn quyền, không phụ phí định kỳ.',
      copyright: 'Bản quyền © 2026 oneCRM. Vận hành bởi beONE / beFAMILY.'
    }
  }
})
