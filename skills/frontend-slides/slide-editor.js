/* ===========================================================
   Slide Editor — runtime
   Drag, resize, font-size, undo/redo, localStorage autosave.
   All UI content is hard-coded (no user input). Persistence uses
   DocumentFragment cloning, not innerHTML, for stored snapshots.
   =========================================================== */
(function() {
  // ---- toolbar (built via DOM methods, never innerHTML) ----
  function buildToolbar() {
    const tb = document.createElement('div');
    tb.className = 'editor-toolbar';
    function btn(id, label, title) {
      const b = document.createElement('button');
      b.id = id; b.textContent = label;
      if (title) b.title = title;
      return b;
    }
    function span(cls, text) {
      const s = document.createElement('span');
      if (cls) s.className = cls;
      if (text != null) s.textContent = text;
      return s;
    }
    tb.appendChild(btn('toggle-drag', 'Drag mode: OFF'));
    const u = btn('undo-btn', '↶ Undo'); u.disabled = true; tb.appendChild(u);
    const r = btn('redo-btn', '↷ Redo'); r.disabled = true; tb.appendChild(r);
    const fg = document.createElement('span');
    fg.className = 'font-group'; fg.id = 'font-group'; fg.style.display = 'none';
    fg.appendChild(span('font-label', 'Font'));
    fg.appendChild(btn('font-down', '−', 'Shrink (-)'));
    const fi = document.createElement('input');
    fi.id = 'font-input'; fi.className = 'font-input';
    fi.type = 'number'; fi.min = '6'; fi.max = '400'; fi.step = '1';
    fg.appendChild(fi);
    fg.appendChild(btn('font-up', '+', 'Grow (+)'));
    fg.appendChild(span('font-unit', 'px'));
    tb.appendChild(fg);
    tb.appendChild(btn('save-local-btn', '📌 Save', 'Save to browser (no download)'));
    tb.appendChild(btn('save-btn', '💾 Download', 'Download HTML file'));
    tb.appendChild(btn('clear-local-btn', '🗑', 'Clear saved state in browser'));
    const st = span('autosave-status', 'auto-save: on'); st.id = 'autosave-status';
    tb.appendChild(st);
    tb.appendChild(span('hint', 'Click element · Alt+click = parent · drag · arrows · Ctrl+Z'));
    return tb;
  }

  if (!document.querySelector('.editor-toolbar')) {
    document.body.insertBefore(buildToolbar(), document.body.firstChild);
  }

  const toggleBtn = document.getElementById('toggle-drag');
  const undoBtn = document.getElementById('undo-btn');
  const redoBtn = document.getElementById('redo-btn');
  const saveBtn = document.getElementById('save-btn');
  const fontGroup = document.getElementById('font-group');
  const fontInput = document.getElementById('font-input');
  const fontUp = document.getElementById('font-up');
  const fontDown = document.getElementById('font-down');
  const saveLocalBtn = document.getElementById('save-local-btn');
  const clearLocalBtn = document.getElementById('clear-local-btn');
  const autosaveStatus = document.getElementById('autosave-status');

  let dragMode = false, selected = null, dragging = null, resizing = null;
  let startX, startY, startLeft, startTop, startW, startH;
  let preChangeStyle = null;
  let handle;

  const undoStack = [], redoStack = [];
  const MAX_HISTORY = 200;

  function snapshotChildren(el) {
    const frag = document.createDocumentFragment();
    el.childNodes.forEach(n => frag.appendChild(n.cloneNode(true)));
    return frag;
  }
  function restoreChildren(el, frag) {
    while (el.firstChild) el.removeChild(el.firstChild);
    frag.cloneNode(true).childNodes.forEach(n => el.appendChild(n));
  }
  function recordChange(el, prop, before, after) {
    if (prop === 'style' && before === after) return;
    undoStack.push({ el, prop, before, after });
    if (undoStack.length > MAX_HISTORY) undoStack.shift();
    redoStack.length = 0;
    refreshUndoButtons();
  }
  function applyChange(change, direction) {
    if (change.group) { change.group.forEach(c => applyChange(c, direction)); return; }
    const value = direction === 'undo' ? change.before : change.after;
    if (change.prop === 'style') change.el.style.cssText = value;
    else if (change.prop === 'text') restoreChildren(change.el, value);
  }
  function undo() {
    if (!undoStack.length) return;
    const c = undoStack.pop();
    applyChange(c, 'undo'); redoStack.push(c); refreshUndoButtons();
    if (selected) { repositionHandle(); showFontControlForSelection(); }
  }
  function redo() {
    if (!redoStack.length) return;
    const c = redoStack.pop();
    applyChange(c, 'redo'); undoStack.push(c); refreshUndoButtons();
    if (selected) { repositionHandle(); showFontControlForSelection(); }
  }
  function refreshUndoButtons() {
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
  }
  undoBtn.addEventListener('click', undo);
  redoBtn.addEventListener('click', redo);

  function showFontControlForSelection() {
    if (!selected) { fontGroup.style.display = 'none'; return; }
    fontInput.value = Math.round(parseFloat(getComputedStyle(selected).fontSize));
    fontGroup.style.display = 'inline-flex';
  }
  function setFontSize(newSizePx) {
    if (!selected) return;
    const size = Math.max(6, Math.min(400, newSizePx));
    const oldSize = parseFloat(getComputedStyle(selected).fontSize);
    const ratio = size / oldSize;
    const elements = [selected, ...selected.querySelectorAll('*')];
    const beforeMap = new Map();
    elements.forEach(el => beforeMap.set(el, el.style.cssText));
    elements.forEach(el => {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (!isNaN(fs)) {
        el.style.fontSize = (el === selected ? size : Math.round(fs * ratio)) + 'px';
      }
    });
    const changes = [];
    elements.forEach(el => {
      const after = el.style.cssText;
      const before = beforeMap.get(el);
      if (after !== before) changes.push({ el, prop: 'style', before, after });
    });
    if (changes.length === 1) recordChange(changes[0].el, 'style', changes[0].before, changes[0].after);
    else if (changes.length > 1) {
      undoStack.push({ group: changes });
      if (undoStack.length > MAX_HISTORY) undoStack.shift();
      redoStack.length = 0;
      refreshUndoButtons();
    }
    fontInput.value = size;
  }
  fontInput.addEventListener('change', () => {
    const n = parseInt(fontInput.value, 10);
    if (!isNaN(n)) setFontSize(n);
  });
  fontInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') return;
    e.stopPropagation();
  });
  fontUp.addEventListener('click', () => {
    if (!selected) return;
    setFontSize(parseFloat(getComputedStyle(selected).fontSize) + 2);
  });
  fontDown.addEventListener('click', () => {
    if (!selected) return;
    setFontSize(parseFloat(getComputedStyle(selected).fontSize) - 2);
  });

  const textSnapshots = new WeakMap();
  document.addEventListener('focusin', (e) => {
    if (e.target.isContentEditable) textSnapshots.set(e.target, snapshotChildren(e.target));
  });
  document.addEventListener('focusout', (e) => {
    if (e.target.isContentEditable && textSnapshots.has(e.target)) {
      const before = textSnapshots.get(e.target);
      const after = snapshotChildren(e.target);
      const tmp = document.createElement('div');
      tmp.appendChild(before.cloneNode(true));
      if (e.target.textContent !== tmp.textContent) recordChange(e.target, 'text', before, after);
      textSnapshots.delete(e.target);
    }
  });

  function clearSelection() {
    if (selected) { selected.classList.remove('drag-selected'); selected = null; }
    if (handle) { handle.remove(); handle = null; }
    showFontControlForSelection();
  }
  function selectElement(el) {
    clearSelection();
    selected = el;
    el.classList.add('drag-selected');
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    handle = document.createElement('div');
    handle.className = 'drag-handle br';
    el.appendChild(handle);
    repositionHandle();
    showFontControlForSelection();
  }
  function repositionHandle() {
    if (!handle || !selected) return;
    handle.style.right = '-8px';
    handle.style.bottom = '-8px';
  }
  function setContentEditableForDragMode(enable) {
    document.querySelectorAll('[contenteditable]').forEach(el => {
      if (enable) {
        if (el.getAttribute('contenteditable') === 'true') {
          el.dataset._ce = 'true';
          el.setAttribute('contenteditable', 'false');
        }
      } else if (el.dataset._ce === 'true') {
        el.setAttribute('contenteditable', 'true');
        delete el.dataset._ce;
      }
    });
  }
  toggleBtn.addEventListener('click', () => {
    dragMode = !dragMode;
    document.body.classList.toggle('drag-mode', dragMode);
    toggleBtn.textContent = 'Drag mode: ' + (dragMode ? 'ON' : 'OFF');
    toggleBtn.classList.toggle('active', dragMode);
    setContentEditableForDragMode(dragMode);
    if (!dragMode) clearSelection();
  });
  function findDraggable(el) {
    if (!el) return null;
    if (el.closest('.editor-toolbar')) return null;
    if (el.classList && el.classList.contains('drag-handle')) return null;
    if (el === document.body || el === document.documentElement) return null;
    if (!el.closest('.slide')) return null;
    if (el.classList && el.classList.contains('slide')) return null;
    return el;
  }
  document.addEventListener('mousedown', (e) => {
    if (!dragMode) return;
    if (e.target.closest('.editor-toolbar')) return;
    if (e.target.classList && e.target.classList.contains('drag-handle')) {
      e.preventDefault();
      resizing = selected;
      preChangeStyle = resizing.style.cssText;
      const rect = resizing.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      startW = rect.width; startH = rect.height;
      return;
    }
    let target = findDraggable(e.target);
    if (!target) { clearSelection(); return; }
    if (e.altKey || e.shiftKey) {
      const parent = target.parentElement;
      if (parent && parent.closest('.slide') && !parent.classList.contains('slide')) target = parent;
    }
    e.preventDefault();
    selectElement(target);
    dragging = target;
    preChangeStyle = target.style.cssText;
    startX = e.clientX; startY = e.clientY;
    const cs = getComputedStyle(target);
    startLeft = parseFloat(cs.left) || 0;
    startTop  = parseFloat(cs.top)  || 0;
  });
  document.addEventListener('mousemove', (e) => {
    if (resizing) {
      resizing.style.width  = Math.max(20, startW + (e.clientX - startX)) + 'px';
      resizing.style.height = Math.max(10, startH + (e.clientY - startY)) + 'px';
      repositionHandle();
    } else if (dragging) {
      dragging.style.left = (startLeft + (e.clientX - startX)) + 'px';
      dragging.style.top  = (startTop  + (e.clientY - startY)) + 'px';
    }
  });
  document.addEventListener('mouseup', () => {
    if (dragging || resizing) {
      const el = dragging || resizing;
      if (preChangeStyle !== null && el.style.cssText !== preChangeStyle) {
        recordChange(el, 'style', preChangeStyle, el.style.cssText);
      }
      preChangeStyle = null;
    }
    dragging = null;
    resizing = null;
  });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault(); if (e.shiftKey) redo(); else undo(); return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault(); redo(); return;
    }
    if (e.key === 'Escape') { clearSelection(); return; }
    if (!selected) return;
    if (document.activeElement && document.activeElement.isContentEditable && document.activeElement !== selected) return;
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const before = selected.style.cssText;
      const step = e.shiftKey ? 10 : 1;
      const cs = getComputedStyle(selected);
      let l = parseFloat(cs.left) || 0, t = parseFloat(cs.top) || 0;
      if (e.key === 'ArrowLeft')  l -= step;
      if (e.key === 'ArrowRight') l += step;
      if (e.key === 'ArrowUp')    t -= step;
      if (e.key === 'ArrowDown')  t += step;
      selected.style.left = l + 'px';
      selected.style.top  = t + 'px';
      recordChange(selected, 'style', before, selected.style.cssText);
    }
    if (e.key === '+' || e.key === '=') {
      setFontSize(parseFloat(getComputedStyle(selected).fontSize) + 2);
    }
    if (e.key === '-' || e.key === '_') {
      setFontSize(parseFloat(getComputedStyle(selected).fontSize) - 2);
    }
  });

  // ===== persistence =====
  const STORAGE_KEY = window.SLIDE_EDITOR_KEY || ('slide-editor:' + location.pathname);
  let lastSavedSnapshot = null;

  function captureSnapshot() {
    const doc = document.documentElement.cloneNode(true);
    doc.querySelectorAll('.editor-toolbar, .drag-handle').forEach(el => el.remove());
    doc.querySelectorAll('.drag-selected').forEach(el => el.classList.remove('drag-selected'));
    return '<!DOCTYPE html>\n' + doc.outerHTML;
  }
  function saveToLocal(silent) {
    try {
      const snap = captureSnapshot();
      if (snap === lastSavedSnapshot) return false;
      localStorage.setItem(STORAGE_KEY, snap);
      localStorage.setItem(STORAGE_KEY + ':ts', new Date().toISOString());
      lastSavedSnapshot = snap;
      if (!silent) flashStatus('saved ✓', 'saved');
      return true;
    } catch (err) { flashStatus('save failed', ''); return false; }
  }
  function flashStatus(text, cls) {
    autosaveStatus.textContent = text;
    autosaveStatus.className = 'autosave-status ' + (cls || '');
    setTimeout(() => {
      const ts = localStorage.getItem(STORAGE_KEY + ':ts');
      if (ts) {
        const d = new Date(ts);
        autosaveStatus.textContent = 'saved ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
        autosaveStatus.className = 'autosave-status saved';
      } else {
        autosaveStatus.textContent = 'auto-save: on';
        autosaveStatus.className = 'autosave-status';
      }
    }, 2000);
  }
  // Restore prior session if one exists. Uses DOMParser then DOM cloning
  // (not innerHTML) to bring nodes back into the live document.
  (function restoreFromLocal() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const ts = localStorage.getItem(STORAGE_KEY + ':ts');
      if (!saved) return;
      const when = ts ? new Date(ts).toLocaleString() : 'unknown time';
      if (!confirm('Found a saved version of this deck (from ' + when + ').\n\nOK to restore, Cancel to start fresh.')) return;
      const parsed = new DOMParser().parseFromString(saved, 'text/html');
      const newNodes = Array.from(parsed.body.children).filter(n =>
        !n.classList.contains('editor-toolbar') && !n.classList.contains('drag-handle')
      );
      Array.from(document.body.children).forEach(el => {
        if (!el.classList.contains('editor-toolbar') && el.tagName !== 'SCRIPT') el.remove();
      });
      const toolbar = document.querySelector('.editor-toolbar');
      newNodes.forEach(n => document.body.insertBefore(document.importNode(n, true), toolbar.nextSibling));
      lastSavedSnapshot = saved;
      setTimeout(() => flashStatus('restored ✓', 'saved'), 100);
    } catch (err) { console.warn('Restore failed:', err); }
  })();
  (function showInitialStatus() {
    const ts = localStorage.getItem(STORAGE_KEY + ':ts');
    if (ts) {
      const d = new Date(ts);
      autosaveStatus.textContent = 'saved ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
      autosaveStatus.className = 'autosave-status saved';
    }
  })();
  setInterval(() => saveToLocal(true), 15000);
  window.addEventListener('beforeunload', () => saveToLocal(true));
  window.addEventListener('blur', () => saveToLocal(true));

  saveLocalBtn.addEventListener('click', () => {
    autosaveStatus.textContent = 'saving…';
    autosaveStatus.className = 'autosave-status saving';
    setTimeout(() => saveToLocal(false), 50);
  });
  clearLocalBtn.addEventListener('click', () => {
    if (!confirm('Clear the saved version from browser storage?')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY + ':ts');
    lastSavedSnapshot = null;
    autosaveStatus.textContent = 'cleared';
    autosaveStatus.className = 'autosave-status';
    setTimeout(() => { autosaveStatus.textContent = 'auto-save: on'; }, 2000);
  });
  saveBtn.addEventListener('click', () => {
    const html = captureSnapshot();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const name = (document.title || 'deck').replace(/[^a-z0-9_-]/gi, '_').slice(0, 40);
    a.href = url;
    a.download = name + '_' + ts + '.html';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
})();
