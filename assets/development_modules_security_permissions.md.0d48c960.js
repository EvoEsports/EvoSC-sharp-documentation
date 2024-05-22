import{_ as s,o as n,c as a,S as e}from"./chunks/framework.f15d8f8c.js";const u=JSON.parse('{"title":"Permissions","description":"","frontmatter":{},"headers":[],"relativePath":"development/modules/security/permissions.md","filePath":"development/modules/security/permissions.md"}'),o={name:"development/modules/security/permissions.md"},l=e(`<h1 id="permissions" tabindex="-1">Permissions <a class="header-anchor" href="#permissions" aria-label="Permalink to &quot;Permissions&quot;">​</a></h1><p>EvoSC# provides access control with user groups and permissions. A player can be part of multiple groups and each group contains a set of permissions assigned to that group.</p><p>Every player has a <em>display group</em> which is shown in-game. While the display group is shown, the player will still inherit permissions from all other groups they are part of.</p><p>The access controll system in EvoSC# can be used with any player interaction that occurs with the controller. Actions such as <a href="/development/modules/manialinks/permissions.html">Manialink Actions</a> and <a href="/development/modules/controllers/chat-commands.html">Chat Commands</a> provides automatic checks for permissions before execution. These are explained in their respective pages.</p><p>On this page, we will introduce the general concepts and how the access control system works in EvoSC#.</p><h2 id="defining-permissions-in-modules" tabindex="-1">Defining Permissions in Modules <a class="header-anchor" href="#defining-permissions-in-modules" aria-label="Permalink to &quot;Defining Permissions in Modules&quot;">​</a></h2><p>Modules provides an easy way to define permissions that can be used within the module. This is done by annotating an enum with the <code>[PermissionGroup]</code> attribute. EvoSC# will look for this attribute, and build up permission names within the enum. The <a href="/development/modules/utility/enum-identifier.html">EnumIdentifier</a> system can be used to create custom names.</p><p>Example:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">PermissionGroup</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">enum</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AdminPermissions</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Description</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Can kick players.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">KickPlayer</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Description</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Can ban and blacklist players.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">BanPlayer</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Description</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Can mute players from the chat.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">MutePlayer</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>By providing a description to the permissions, it helps explaining exactly what is the permission allows and can be shown in the UI in-game for a better UX.</p><p>These permissions will now be automatically installed in the database when the module loads, and can be assigned to groups and used everywhere!</p><h2 id="check-a-player-s-permission" tabindex="-1">Check a Player&#39;s Permission <a class="header-anchor" href="#check-a-player-s-permission" aria-label="Permalink to &quot;Check a Player&#39;s Permission&quot;">​</a></h2><p>The <code>IPermissionManager</code> service exposes various methods for managing groups and permissions. But most importantly, it provides a way to check if a player has a permission.</p><p>For this, you can call the <code>HasPermissionAsync</code> method. For example:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">await</span><span style="color:#A6ACCD;"> permissionManager</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">HasPermissionAsync</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">thePlayer</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> AdminPermissions</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">KickPlayer</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// has permission to kick a player</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,15),p=[l];function i(r,t,c,m,d,y){return n(),a("div",null,p)}const D=s(o,[["render",i]]);export{u as __pageData,D as default};