import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'vi-VN',
  title: 'oneCRM',
  description: 'Hệ thống CRM Tinh gọn Tự lưu trữ (Self-Hosted) với Toàn quyền Mã nguồn',
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }]
  ],

  themeConfig: {
    logo: {
      text: 'oneCRM'
    },
    siteTitle: 'oneCRM',

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

    search: {
      provider: 'local',
      options: {
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
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: 'Giải pháp CRM Tinh gọn Tự lưu trữ - Sở hữu toàn quyền, không phụ phí định kỳ.',
      copyright: 'Bản quyền © 2026 oneCRM. Vận hành bởi beONE / beFAMILY.'
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
})
