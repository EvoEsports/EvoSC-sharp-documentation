import{_ as s,o as n,c as a,S as l}from"./chunks/framework.f15d8f8c.js";const A=JSON.parse('{"title":"Manialink Controllers","description":"","frontmatter":{},"headers":[],"relativePath":"development/modules/manialinks/controllers.md","filePath":"development/modules/manialinks/controllers.md"}'),e={name:"development/modules/manialinks/controllers.md"},p=l(`<h1 id="manialink-controllers" tabindex="-1">Manialink Controllers <a class="header-anchor" href="#manialink-controllers" aria-label="Permalink to &quot;Manialink Controllers&quot;">​</a></h1><p>Manialink controllers allows you to define routes and callbacks for those routes. They also provides easy ways to respond, display or hide manialinks. Ideally, you want to use these controllers for most of the interactions between the user, UI and EvoSC.</p><p>To get started, create a controller and inherit the <code>ManialinkController</code> type:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExampleManialinkController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="responding-to-actions" tabindex="-1">Responding to actions <a class="header-anchor" href="#responding-to-actions" aria-label="Permalink to &quot;Responding to actions&quot;">​</a></h2><p>In it&#39;s most simple form, create a new method within the controller and annotate it with the <code>ManialinkRoute</code> attribute:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExampleManialinkController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyActionAsync</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello from controller!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>EvoSC has automatic route building capabilities so that you don&#39;t need to explicitly define routes for actions. If nothing is explicitly defined, EvoSC will use the class name of the controller (and imitting the <code>Controller</code> postfix) as the root route component. It will then use the method name as the sub component in the route (omitting the <code>Async</code> prefix).</p><p>So in the example above, the route for the <code>MyActionAsync</code> will be <code>ExampleManialink/MyAction</code>.</p><h3 id="explicitly-defining-routes" tabindex="-1">Explicitly defining routes <a class="header-anchor" href="#explicitly-defining-routes" aria-label="Permalink to &quot;Explicitly defining routes&quot;">​</a></h3><p>To define routes, you will need to annotate either the class or the method with the <code>ManialinkRoute</code> attribute.</p><p>For example to create a custom route to a controller:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">ManialinkRoute</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Route</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MyActions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExampleManialinkController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyActionAsync</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello from controller!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>The resulting route for this will now be <code>MyActions/MyAction</code></p><p>Extending this, you can do the same for the method:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">ManialinkRoute</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Route</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MyActions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExampleManialinkController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">ManialinkRoute</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Route</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">PrintConsole</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyActionAsync</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello from controller!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>This will result in the route: <code>MyActions/PrintConsole</code></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>By default, all methods becomes subroutes of the controller&#39;s route like <code>MyController/Method1</code>, <code>MyController/Method2</code> etc.</p><p>However, if you prefix a route with <code>/</code> the route will become a root route instead. So for example defining the route <code>Method1/AnAction</code> becomes <code>MyController/Method1/AnAction</code>. But if you define the route as <code>/Method1/AnAction</code> the route becomes <code>Method1/AnAction</code>.</p></div><h2 id="route-parameters" tabindex="-1">Route Parameters <a class="header-anchor" href="#route-parameters" aria-label="Permalink to &quot;Route Parameters&quot;">​</a></h2><p>IF we want to get the value of the parameters in routes, we can define these as parameters to the action method.</p><p>For example:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyActionsController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">ManialinkRoute</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Route</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello/{name}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">SayHelloAsync</span><span style="color:#89DDFF;">(string</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">$&quot;</span><span style="color:#C3E88D;">Hello </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Here we want to get the value of the <code>{name}</code> parameter. It should be a string so we add a corresponding parameter to the method.</p><p>The parameters in the method defines the type of the route parameter. It is therefore important to make sure the type is correct when calling a route.</p><p>EvoSC performs basic validation on the parameters like type checking and checks if the parameter is present.</p><h2 id="form-entry-models" tabindex="-1">Form Entry Models <a class="header-anchor" href="#form-entry-models" aria-label="Permalink to &quot;Form Entry Models&quot;">​</a></h2><p>Let&#39;s take a closer look at a previous example. Let&#39;s say we have the following Manialink that takes a user input and a way to submit this data:</p><div class="language-xml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">frame</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">entry</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Nickname</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">action</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Nicknames/SetNickname</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">text</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Submit!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">frame</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>In this case we have a single entry named <code>Nickname</code> that allows a user to write down their nickname and submit it to the controller.</p><p>But how do we obtain this value? This is where Form Entry Models comes in!</p><p>Let&#39;s illustrate this with an example. First we create a model class that corresponds to the data we want. We need to make sure that it is annotated with the <code>[EntryModel]</code> attribute. This tells EvoSC that we want to use this type as an entry model:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">EntryModel</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SetNicknameInput</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Nickname</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>We can now use this model within the action method and EvoSC will create an instance of this model and fill out the values for us:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyActionsController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IServerClient</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">_server</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyActionsController</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IServerClient</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">server</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        _server </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> server</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">SetNicknameAsync</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">SetNicknameInput</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">userInput</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> _server</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">SuccessMessageAsync</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">$&quot;</span><span style="color:#C3E88D;">Nickname set to </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">userInput</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Nickname</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Player</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>EvoSC also provides a framework for validating these models. More info about this in <a href="./form-validation.html">Form Validation</a>.</p><h2 id="displaying-manialinks" tabindex="-1">Displaying Manialinks <a class="header-anchor" href="#displaying-manialinks" aria-label="Permalink to &quot;Displaying Manialinks&quot;">​</a></h2><p>The <code>ManialinkController</code> class exposes helper methods for displaying manialinks within a controller with the <code>ShowAsync</code> methods.</p><p>For example this code sends the manialink <code>MyModule.MyManialink</code> to all users:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight has-focused-lines"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExampleManialinkController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyActionAsync</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ShowAsync</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MyModule.MyManialink</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>You can also send this to a specific player. For example, to send a Manialink to the player that triggered the action:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight has-focused-lines"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExampleManialinkController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyActionAsync</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ShowAsync</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Player</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MyModule.MyManialink</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>These methods also accepts property data to manialink components.</p><h2 id="hiding-manialinks" tabindex="-1">Hiding Manialinks <a class="header-anchor" href="#hiding-manialinks" aria-label="Permalink to &quot;Hiding Manialinks&quot;">​</a></h2><p>Hiding manialinks has similar methods with the <code>HideAsync</code> methods.</p><p>For example:</p><div class="language-csharp line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight has-focused-lines"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Controller</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExampleManialinkController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ManialinkController</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyActionAsync</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">HideAsync</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Player</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MyModule.MyManialink</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,46),o=[p];function t(r,c,i,y,F,D){return n(),a("div",null,o)}const u=s(e,[["render",t]]);export{A as __pageData,u as default};