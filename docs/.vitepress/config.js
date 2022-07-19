export default {
  lang: 'en-US',
  title: "EvoSC Docs",
  description: "Documentation for EvoSC#.",
  themeConfig: {
    logo: '/evo.png',
    sidebar: {
      "/devs/": [
        {
          text: "Introduction",
          items: [{ text: "Getting started", link: "/devs/getting-started.md" }],
        },
      ],
    },
    nav: [
      { text: "EvoSC# Users", link: "/users/" },
      { text: "Module Developers", link: "/modudev/" },
      { text: "EvoSC# Developers", link: "/devs/" },
    ],
    footer: {
      message: 'Made with ❤️ by EvoSC# Devs',
      copyright: 'Copyright © 2022 Evo'
    },
    editLink: {
      pattern: 'https://github.com/EvoTM/EvoSC-Sharp-Documentation/master/docs/:path',
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
