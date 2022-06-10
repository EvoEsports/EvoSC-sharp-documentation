export default {
  title: "EvoSC# Docs",
  description: "Documentation for EvoSC#.",
  themeConfig: {
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
      { text: "Module Developpers", link: "/modudev/" },
      { text: "EvoSC# Developpers", link: "/devs/" },
    ],
  },
};
