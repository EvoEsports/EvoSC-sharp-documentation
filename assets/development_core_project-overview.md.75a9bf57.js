import{_ as e,c as t,o as r,a as o}from"./app.f97c8964.js";const d="/assets/reference_graph.3dd2427e.png",v=JSON.parse('{"title":"Overview of the Project","description":"","frontmatter":{},"headers":[{"level":2,"title":"Project Structure","slug":"project-structure","link":"#project-structure","children":[{"level":3,"title":"Main Source Code","slug":"main-source-code","link":"#main-source-code","children":[]},{"level":3,"title":"Tests","slug":"tests","link":"#tests","children":[]}]}],"relativePath":"development/core/project-overview.md"}'),c={name:"development/core/project-overview.md"},a=o('<h1 id="overview-of-the-project" tabindex="-1">Overview of the Project <a class="header-anchor" href="#overview-of-the-project" aria-hidden="true">#</a></h1><h2 id="project-structure" tabindex="-1">Project Structure <a class="header-anchor" href="#project-structure" aria-hidden="true">#</a></h2><p>The project is separated into two main parts. The source code and the tests.</p><h3 id="main-source-code" tabindex="-1">Main Source Code <a class="header-anchor" href="#main-source-code" aria-hidden="true">#</a></h3><p>The source code in <code>src</code> are structured into multiple projects that provides a set of functionalities. Each of the projects have a set of rules on which other projects can reference them.</p><table><thead><tr><th>Project</th><th>Description</th><th>Referenceability</th></tr></thead><tbody><tr><td><code>EvoSC.Common</code></td><td>Core functionality and common code.</td><td>All other projects can reference this, but it cannot reference any other project.</td></tr><tr><td><code>EvoSC.CLI</code></td><td>Provides code for the commandline interface.</td><td>Only <code>EvoSC</code> can reference this project.</td></tr><tr><td><code>EvoSC.Modules</code></td><td>Main code that provides the module framework for the project.</td><td>Can only be referenced by modules and <code>EvoSC</code>.</td></tr><tr><td><code>EvoSC.Commands</code></td><td>Main code that provides chat command parsing and handling.</td><td>Can be referenced by modules, <code>EvoSC.Modules</code> and <code>EvoSC</code></td></tr><tr><td><code>EvoSC.EvoSC</code></td><td>This is the EvoSC application itself as a console project.</td><td>Cannot be referenced by any projects.</td></tr></tbody></table><h4 id="reference-graph" tabindex="-1">Reference Graph <a class="header-anchor" href="#reference-graph" aria-hidden="true">#</a></h4><p>The graph visualizes how projects can be referenced from eachother: <img src="'+d+'" alt="Reference Graph"></p><h4 id="internal-modules" tabindex="-1">Internal Modules <a class="header-anchor" href="#internal-modules" aria-hidden="true">#</a></h4><p>There is an additional directory under <code>src</code> that isnt exactly a project directory in itself called <code>Modules</code>. But it contains multiple projects that form all the internal and core modules of EvoSC. These modules are referenced within the assembly of the main application itself and ship with it.</p><h3 id="tests" tabindex="-1">Tests <a class="header-anchor" href="#tests" aria-hidden="true">#</a></h3><p>Each of the sub projects in EvoSC has corresponding test projects under the <code>tests</code> directory found in the root of the project. The tests provides unit and integration tests for the general functionality of the code.</p>',12),n=[a];function s(i,h,l,p,u,f){return r(),t("div",null,n)}const j=e(c,[["render",s]]);export{v as __pageData,j as default};
