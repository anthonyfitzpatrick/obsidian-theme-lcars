#!/bin/zsh
# Regenerates the documentation screenshots from the demo vault (docs/Helm Console Demo).
# See docs/SCREENSHOTS.md for the one-off setup. Needs a running Obsidian with the CLI
# enabled and the demo vault open in its own window. It only changes the demo vault.
#
# usage: scripts/screenshots.sh <dark|light> <output-folder>
M=$1; O=$2; V="Helm Console Demo"
ev(){ (obsidian vault="$V" eval code="$1" > /tmp/hc-ev.out 2>&1 &); sleep ${2:-4}; cat /tmp/hc-ev.out; }
cdp(){ (obsidian vault="$V" dev:cdp method="$1" params="$2" > /dev/null 2>&1 &); sleep ${3:-1}; }
shot(){ (obsidian vault="$V" dev:screenshot path="$O/$1" > /dev/null 2>&1 &); sleep 7; }
cdp Emulation.setDeviceMetricsOverride '{"width":1600,"height":1000,"deviceScaleFactor":1,"mobile":false}' 2
# Obsidian's own menus (native macOS menus aren't part of the page) and in-window Settings.
ev 'app.vault.setConfig("nativeMenus",false);app.vault.setConfig("settingsPopoutWindow",false);"config"' 3
ev 'app.customCss.setTheme("");setTimeout(()=>app.customCss.setTheme("Helm Console"),400);"reloaded"' 3
if [ "$M" = dark ]; then ev 'app.changeTheme("obsidian");"dark"' 3; else ev 'app.changeTheme("moonstone");"light"' 3; fi
# 1 overview
ev '(async()=>{document.activeElement?.blur();document.querySelectorAll(".has-focus").forEach(e=>e.classList.remove("has-focus"));const l=app.workspace.getLeavesOfType("markdown").find(x=>x.view.file?.basename==="Welcome");app.workspace.setActiveLeaf(l,{focus:true});await l.setViewState({type:"markdown",state:{file:"Welcome.md",mode:"source",source:false}});const ed=l.view.editor;const n=ed.getValue().split("\n").findIndex(s=>s.startsWith("This vault"));ed.setCursor({line:n,ch:0});setTimeout(()=>ed.scrollTo(0,0),200);return n})()' 5
shot "01-overview-$M.png"
# 2 content in reading view
ev '(async()=>{const l=app.workspace.activeLeaf;await l.setViewState({type:"markdown",state:{file:"Welcome.md",mode:"preview"}});const n=l.view.data.split("\n").findIndex(s=>s.startsWith("## Callouts"));setTimeout(()=>l.view.previewMode.applyScroll(n),300);return n})()' 6
shot "02-content-$M.png"
ev '(async()=>{const l=app.workspace.activeLeaf;await l.setViewState({type:"markdown",state:{file:"Welcome.md",mode:"source",source:false}});setTimeout(()=>l.view.editor.scrollTo(0,0),200);return "back"})()' 4
# 3 command palette with a query
ev '(()=>{app.commands.executeCommandById("command-palette:open");setTimeout(()=>{const i=document.querySelector(".prompt-input");i.value="toggle";i.dispatchEvent(new Event("input",{bubbles:true}))},300);return "palette"})()' 4
shot "03-palette-$M.png"
ev 'document.querySelector(".prompt-input")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));"closed"' 3
# 4 settings, forced into the main window
ev '(()=>{const s=app.setting;app.vault.setConfig("settingsPopoutWindow",false);s.open();s.openTabById("appearance");document.body.appendChild(s.containerEl);return document.body.contains(s.containerEl)})()' 4
shot "04-settings-$M.png"
ev 'app.setting.close();"closed"' 3
# 5 the file explorer's own context menu, a highlighted row, and a notice
ev '(()=>{new Notice("Sync complete: 12 notes updated.",20000);const fe=app.workspace.getLeavesOfType("file-explorer")[0].view;const t=document.querySelector(".nav-file-title[data-path=\"Projects/Survey Station.md\"]");const r=t.getBoundingClientRect();fe.openFileContextMenu(new MouseEvent("contextmenu",{clientX:r.left+70,clientY:r.top+r.height/2}),t);setTimeout(()=>{const it=[...document.querySelectorAll(".menu .menu-item")];const m=it.find(e=>/Rename/i.test(e.textContent))||it[2];m?.classList.add("selected")},300);return document.querySelectorAll(".menu").length})()' 4
sleep 2; shot "05-menu-notice-$M.png"
ev 'document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));document.querySelectorAll(".menu").forEach(m=>m.remove());document.querySelectorAll(".notice").forEach(n=>n.remove());document.querySelectorAll(".has-focus").forEach(e=>e.classList.remove("has-focus"));document.activeElement?.blur();"cleaned"' 3
