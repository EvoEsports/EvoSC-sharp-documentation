export default {
  lang: 'en-US',
  title: "EvoSC# Docs",
  description: "Documentation for EvoSC#.",
  base: "/",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/evo.png',
    sidebar: {
      "/development/core/": [
        {
          text: "Introduction",
          items: [
            { text: "About EvoSC#", link: "/development/core/index.md" },
            { text: "Getting started", link: "/development/core/getting-started.md" },
            { text: "Overview", link: "/development/core/project-overview.md" },
            { text: "Internal Modules", link: "/development/core/internal-modules.md" }
          ],
        },
      ],
      "/development/modules/": [
        {
          text: "Introduction",
          items: [
            { text: "Introduction", link: "/development/modules/index.md" },
            { text: "The Module Class", link: "/development/modules/module-class.md" },
            { text: "Settings", link: "/development/modules/settings.md" },
          ],
        },
        {
          text: "Controllers",
          items: [
            { text: "Introduction", link: "/development/modules/controllers/introduction.md" },
            { text: "Events", link: "/development/modules/controllers/events.md" },
            { text: "Chat Commands", link: "/development/modules/controllers/chat-commands.md" },
            { text: "Manialink Actions", link: "/development/modules/controllers/manialink-actions.md" },
          ]
        },
        {
          text: "Manialinks",
          items: [
            { text: "Introduction", link: "/development/modules/manialinks/introduction.md" },
            { text: "Templates", link: "/development/modules/manialinks/templates.md" },
            { text: "ManiaScript", link: "/development/modules/manialinks/maniascript.md" },
            { text: "Actions", link: "/development/modules/manialinks/actions.md" },
            { text: "Manialink Controllers", link: "/development/modules/manialinks/controllers.md" },
            { text: "Form Validation", link: "/development/modules/manialinks/form-validation.md" },
            { text: "Permissions", link: "/development/modules/manialinks/permissions.md" },
          ]
        },
        {
          text: "Security",
          items: [
            { text: "Permissions", link: "/development/modules/access-control/permissions.md" },
            { text: "Auditing", link: "/development/modules/advanced/auditing.md" },
          ]
        },
        {
          text: "Action Pipelines",
          items: [
            { text: "Introduction", link: "/development/modules/action-pipelines/introduction.md" },
            { text: "Action Middleware", link: "/development/modules/action-pipelines/middlewares.md" },
            { text: "Chat Router", link: "/development/modules/action-pipelines/chat-router.md" }
          ]
        },
        {
          text: "Advanced",
          items: [
            { text: "Services", link: "/development/modules/advanced/services.md" },
            { text: "Migrations", link: "/development/modules/advanced/migrations.md" },
          ]
        },
        {
          text: "Utility",
          items: [
            { text: "EnumIdentifier", link: "/development/modules/utility/enum-identifier.md" },
            { text: "Match Settings", link: "/development/modules/advanced/matchsettings.md" },
            { text: "Text Formatting", link: "/development/modules/advanced/text-formatting.md" },
            { text: "Player Utilities", link: "/development/modules/advanced/player-utilities.md" },
            { text: "Server Chat Message", link: "/development/modules/advanced/server-chat-message.md" },
          ]
        }
      ],
      "/api/Core/": [
        {
          text: "EvoSC.Core", items: [
            {text: "Commands", link: "/api/Core/Commands/"},
            {text: "Configuration", link: "/api/Core/Configuration/"},
            {text: "Events", link: "/api/Core/Events/"},
            {text: "Exceptions", link: "/api/Core/Exceptions/"},
            {text: "Helpers", link: "/api/Core/Helpers/"},
            {text: "Plugins", link: "/api/Core/Plugins/"},
            {text: "Services", link: "/api/Core/Services/"},
          ]
        }
      ],
      "/api/Domain/": [
        {
          text: "EvoSC.Domain", items: [
            {text: "Groups", link: "/api/Domain/Groups/"},
            {text: "Maps", link: "/api/Domain/Maps/"},
            {text: "Players", link: "/api/Domain/Players/"},
          ]
        }
      ],
      "/api/Interfaces/": [
        {
          text: "EvoSC.Interfaces", items: [
            {text: "Commands", link: "/api/Interfaces/Commands/"},
            {text: "Messages", link: "/api/Interfaces/Messages/"},
            {text: "Players", link: "/api/Interfaces/Players/"},
            {text: "UI", link: "/api/Interfaces/UI/"},
          ]
        }
      ],
      "/api/Modules/": [
        {
          text: "EvoSC.Modules", items: [
            {text: "Info", link: "/api/Modules/Info/"},
          ]
        }
      ],
      "/api/": [
        {
          text: "Namespaces",
          items: [
            {text: "EvoSC.Core", link: "/api/Core/"},
            {text: "EvoSC.Domain", link: "/api/Domain/"},
            {text: "EvoSC.Interfaces", link: "/api/Interfaces/"},
            {text: "EvoSC.Modules", link: "/api/Modules/"},
          ]
        }
      ],

    },
    nav: [
      { text: "For Server Admins", link: "/using-evosc/" },
      { text: "For Developers", items:
      [
        { text: "Code Documentation", link: "/api/" },
        { text: "Working on the core", link: "/development/core/" },
        { text: "Developing modules ", link: "/development/modules/"}
      ], 
    },
    ],
    footer: {
      message: 'Made with ❤️ by EvoSC# Devs',
      copyright: 'Copyright © 2022 Evo'
    },
    editLink: {
      pattern: 'https://github.com/EvoTM/EvoSC-sharp-documentation/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EvoTM/EvoSC-Sharp' },
      { icon: 'twitter', link: 'https://twitter.com/EvoTM' },
      { icon: 'facebook', link: 'https://facebook.com/EvoTrackmania'},
      { icon: 'discord', link: 'https://discord.gg/evotm' },
      { icon: 'youtube', link: 'https://youtube.com/c/EvoTrackmania'}
    ],
  },
};
