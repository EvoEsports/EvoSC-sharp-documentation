import{_ as e,c as a,o as t,a as r}from"./app.f97c8964.js";const b=JSON.parse('{"title":"Player Class","description":"","frontmatter":{},"headers":[{"level":2,"title":"Constructors","slug":"constructors","link":"#constructors","children":[]},{"level":2,"title":"Properties","slug":"properties","link":"#properties","children":[]},{"level":2,"title":"Methods","slug":"methods","link":"#methods","children":[]}],"relativePath":"api/Domain/Players/Player/index.md"}'),s={name:"api/Domain/Players/Player/index.md"},o=r(`<h1 id="player-class" tabindex="-1">Player Class <a class="header-anchor" href="#player-class" aria-hidden="true">#</a></h1><p><strong>Namespace:</strong> <a href="./../">EvoSC.Domain.Players</a><br><strong>Assembly:</strong> EvoSC#<br><strong>Assembly Version:</strong> 1.0.0</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Player</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DatabasePlayer</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IServerPlayer</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IPlayer</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>Inheritance:</strong> object → <a href="./../DatabasePlayer/">DatabasePlayer</a> → Player</p><p><strong>Implements:</strong> <a href="./../../../Interfaces/Players/IServerPlayer/">IServerPlayer</a>,<a href="./../../../Interfaces/Players/IPlayer/">IPlayer</a></p><h2 id="constructors" tabindex="-1">Constructors <a class="header-anchor" href="#constructors" aria-hidden="true">#</a></h2><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><a href="./constructors/">Player(GbxRemoteClient, DatabasePlayer, PlayerInfo, PlayerDetailedInfo)</a></td><td></td></tr></tbody></table><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><a href="./properties/DetailedInfo.html">DetailedInfo</a></td><td></td></tr><tr><td><a href="./properties/Info.html">Info</a></td><td></td></tr><tr><td><a href="./properties/Name.html">Name</a></td><td></td></tr></tbody></table><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h2><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><a href="./methods/Create.html">Create(GbxRemoteClient, DatabaseContext, DatabasePlayer)</a></td><td></td></tr><tr><td><a href="./methods/Update.html#updateplayerinfo-playerdetailedinfo">Update(PlayerInfo, PlayerDetailedInfo)</a></td><td></td></tr><tr><td><a href="./methods/Update.html#updatesplayerinfo">Update(SPlayerInfo)</a></td><td></td></tr></tbody></table><hr><p><em>Documentation generated by <a href="https://github.com/ap0llo/mddocs" target="_blank" rel="noreferrer">MdDocs</a></em></p>`,13),l=[o];function n(d,p,i,c,h,y){return t(),a("div",null,l)}const f=e(s,[["render",n]]);export{b as __pageData,f as default};
