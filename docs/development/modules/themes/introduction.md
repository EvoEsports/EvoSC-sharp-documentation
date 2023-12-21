# Themes

Theming is a concept that provides consistent style and colors throughout the UI. One can switch between different themes to get a different look and feel of the UI. EvoSC# implements a framework for creating themes and overriding default theme options.

Every module can implement their own default theme for their Manialinks, or override other default themes. This allows us to create a module that is purely made to be a theme.

## Types of theme implementations

There are two things a theme can implement, theme options and component replacements.

### Theme Options
Theme options are arbitrary values that can be assigned to a key. These values can be used throughout anywhere in the module, and are always available in Manialinks as global variables.

### Component Replacements
It is also possible to replace an entire component from a theme. This is a very powerful system that can be used to not only change the look of a component, but also the behavior.

One should, however, be careful with how one replaces a component as it may break the other parts of the UI.
