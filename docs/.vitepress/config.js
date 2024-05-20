export default {
  lang: 'en-US',
  title: "EvoSC# Docs",
  description: "Documentation for EvoSC#.",
  base: "/",
  ignoreDeadLinks: true,
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
            { text: "Coding Guidelines", link: "/development/modules/coding-guidelines.md" },
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
            {
              text: 'Components',
              collapsed: true,
              items: [
                {
                  text: 'Containers',
                  collapsed: true,
                  items: [
                    { text: 'Container', link: '/development/modules/manialinks/components/container.md' },
                    { text: 'Widget', link: '/development/modules/manialinks/components/widget.md' },
                    { text: 'Window', link: '/development/modules/manialinks/components/window.md' },
                  ]
                },
                {
                  text: 'Controls',
                  collapsed: true,
                  items: [
                    { text: 'Alert', link: '/development/modules/manialinks/components/alert.md' },
                    { text: 'Button', link: '/development/modules/manialinks/components/button.md' },
                    { text: 'Checkbox', link: '/development/modules/manialinks/components/checkbox.md' },
                    { text: 'Chip', link: '/development/modules/manialinks/components/chip.md' },
                    { text: 'Dropdown', link: '/development/modules/manialinks/components/dropdown.md' },
                    { text: 'IconButton', link: '/development/modules/manialinks/components/iconbutton.md' },
                    { text: 'LinkButton', link: '/development/modules/manialinks/components/linkbutton.md' },
                    { text: 'Panel', link: '/development/modules/manialinks/components/panel.md' },
                    { text: 'RadioButton', link: '/development/modules/manialinks/components/radiobutton.md' },
                    { text: 'Rating', link: '/development/modules/manialinks/components/rating.md' },
                    { text: 'ScrollBar', link: '/development/modules/manialinks/components/scrollbar.md' },
                    { text: 'Separator', link: '/development/modules/manialinks/components/separator.md' },
                    { text: 'Switch', link: '/development/modules/manialinks/components/switch.md' },
                    { text: 'Tag', link: '/development/modules/manialinks/components/tag.md' },
                    { text: 'Text', link: '/development/modules/manialinks/components/text.md' },
                    { text: 'TextInput', link: '/development/modules/manialinks/components/textinput.md' },
                  ]
                },
                {
                  text: 'Drawing',
                  collapsed: true,
                  items: [
                    { text: 'Circle', link: '/development/modules/manialinks/components/circle.md' },
                    { text: 'QuarterCircle', link: '/development/modules/manialinks/components/quartercircle.md' },
                    { text: 'Rectangle', link: '/development/modules/manialinks/components/rectangle.md' },
                  ]
                }
              ]
            }
          ]
        },
        {
          text: "Themes",
          items: [
            { text: "Introduction", link: "/development/modules/themes/introduction.md" },
            { text: "Usage", link: "/development/modules/themes/usage.md" },
            { text: "Creating Themes", link: "/development/modules/themes/creating-themes.md" },
            { text: "Base Options", link: "/development/modules/themes/base-options.md" },
          ]
        },
        {
          text: "Security",
          items: [
            { text: "Permissions", link: "/development/modules/security/permissions.md" },
            { text: "Auditing", link: "/development/modules/security/auditing.md" },
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
            { text: "Localization", link: "/development/modules/advanced/localization.md" },
          ]
        },
        {
          text: "Utility",
          items: [
            { text: "EnumIdentifier", link: "/development/modules/utility/enum-identifier.md" },
            { text: "Match Settings", link: "/development/modules/utility/matchsettings.md" },
            { text: "Text Formatting", link: "/development/modules/utility/text-formatting.md" },
            { text: "Player Utilities", link: "/development/modules/utility/player-utilities.md" },
            { text: "Server Chat Message", link: "/development/modules/utility/server-chat-messages.md" },
          ]
        }
      ]
    },
    nav: [
      { text: "For Server Admins", link: "/using-evosc/" },
      { text: "For Developers", items:
      [
        { text: "Developing modules ", link: "/development/modules/"},
        { text: "Working on the core", link: "/development/core/" }
      ], 
    },
    ],
    footer: {
      message: 'Made with ❤️ by EvoSC# Devs',
      copyright: 'Copyright © 2022 Evo'
    },
    editLink: {
      pattern: 'https://github.com/EvoEsports/EvoSC-sharp-documentation/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EvoEsports/EvoSC-Sharp' },
      { icon: 'twitter', link: 'https://twitter.com/EvoTM' },
      { icon: 'facebook', link: 'https://facebook.com/EvoTrackmania'},
      { icon: 'discord', link: 'https://discord.gg/evoesports' },
      { icon: 'youtube', link: 'https://youtube.com/c/EvoTrackmania'}
    ],
  },
};
