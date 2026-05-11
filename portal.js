const users = [
  { email: 'proyectos@fullcheck.cl', password: '@Fam7728k', role: 'admin', name: 'FullCheck Admin' },
  { email: 'cliente@fullcheck.cl', password: '@Cliente123', role: 'client', name: 'Constructora Andina SpA', clientId: 1 },
];

const state = {
  user: null,
  selectedClientId: 1,
  nextTicketNumber: 2,
  settings: { businessDays: 'Lunes a viernes', openTime: '09:00', closeTime: '18:00', responseText: 'Solicitudes ingresadas fuera de horario serán respondidas el día hábil siguiente.' },
  clients: [
    { id: 1, name: 'Constructora Andina SpA', contact: 'María González', email: 'cliente@fullcheck.cl', password: '@Cliente123', initials: 'CA', plan: 'Mantención Web' },
    { id: 2, name: 'Clínica Dental Sonríe', contact: 'Felipe Rojas', email: 'felipe@sonrie.cl', password: '@Cliente123', initials: 'CS', plan: 'Web + Soporte' },
  ],
  projects: [
    { id: 1, clientId: 1, name: 'Sitio web corporativo', status: 'En progreso', progress: 68, dueDate: '28 mayo 2026', phase: 'Desarrollo visual', nextStep: 'Validar textos de servicios', visibleClient: true },
    { id: 2, clientId: 1, name: 'Optimización SEO inicial', status: 'En revisión', progress: 82, dueDate: '10 junio 2026', phase: 'Auditoría técnica', nextStep: 'Aprobar palabras clave', visibleClient: true },
    { id: 3, clientId: 2, name: 'Portal de reservas online', status: 'Planificación', progress: 35, dueDate: '18 junio 2026', phase: 'Levantamiento', nextStep: 'Confirmar horarios', visibleClient: true },
  ],
  milestones: [
    { id: 1, projectId: 1, clientId: 1, name: 'Brief recibido', status: 'Completado', due: '06 mayo', visibleClient: true },
    { id: 2, projectId: 1, clientId: 1, name: 'Diseño inicial', status: 'Completado', due: '10 mayo', visibleClient: true },
    { id: 3, projectId: 1, clientId: 1, name: 'Desarrollo visual', status: 'En proceso', due: '16 mayo', visibleClient: true },
    { id: 4, projectId: 1, clientId: 1, name: 'Revisión cliente', status: 'Pendiente', due: '20 mayo', visibleClient: true },
  ],
  updates: [
    { id: 1, clientId: 1, projectId: 1, date: '11 mayo', title: 'Avance en diseño de home', text: 'Se completó la estructura principal y se está trabajando en las secciones internas.', author: 'FullCheck', visibleClient: true },
    { id: 2, clientId: 1, projectId: 2, date: '10 mayo', title: 'Auditoría SEO inicial', text: 'Se revisaron títulos, metadescripciones y estructura de contenidos.', author: 'FullCheck', visibleClient: true },
  ],
  pending: [
    { id: 1, clientId: 1, projectId: 1, title: 'Enviar fotografías finales de obras', owner: 'Cliente', due: '13 mayo', status: 'Pendiente', visibleClient: true },
    { id: 2, clientId: 1, projectId: 2, title: 'Aprobar palabras clave propuestas', owner: 'Cliente', due: '16 mayo', status: 'Pendiente', visibleClient: true },
  ],
  requests: [
    { id: 1, clientId: 1, projectId: 1, title: 'Cambiar texto de presentación', detail: 'Actualizar bajada principal.', status: 'Nueva', created: 'Hoy 09:40', response: '', visibleClient: true },
  ],
  tickets: [
    { id: 1, number: 'FC-TK-0001', clientId: 1, projectId: 1, title: 'Formulario no llega al correo', status: 'En revisión', priority: 'Alta', created: '10 mayo', response: 'Estamos revisando SMTP.', visibleClient: true },
  ],
  files: [
    { id: 1, clientId: 1, projectId: 1, name: 'Logo Constructora PNG', type: 'Logo', status: 'Revisado', date: '09 mayo', visibleClient: true },
  ],
  reports: [
    { id: 1, clientId: 1, projectId: 1, title: 'Reporte avance diseño home', type: 'PDF', url: 'https://example.com/reporte-avance.pdf', description: 'Resumen visual del avance de diseño.', date: '11 mayo', visibleClient: true },
    { id: 2, clientId: 1, projectId: 1, title: 'Vista HTML prototipo home', type: 'HTML', url: 'https://example.com/prototipo-home.html', description: 'Prototipo navegable para revisión.', date: '11 mayo', visibleClient: true },
  ],
  messages: [
    { id: 1, clientId: 1, from: 'FullCheck', text: 'Estamos revisando tus solicitudes.', time: 'Hoy 10:20', visibleClient: true },
  ],
  meetings: [
    { id: 1, clientId: 1, projectId: 1, title: 'Revisión avance sitio web', date: '15 mayo', time: '10:30', status: 'Confirmada', link: 'https://meet.google.com/demo', notes: 'Revisar home y servicios.', visibleClient: true },
    { id: 2, clientId: 2, projectId: 3, title: 'Definición reservas online', date: '16 mayo', time: '12:00', status: 'Solicitada', link: '', notes: '', visibleClient: true },
  ],
  valuations: [
    { id: 1, clientId: 1, projectId: 1, title: 'Sección adicional de testimonios', detail: 'Diseño y desarrollo de nueva sección.', price: 85000, status: 'Pendiente aprobación', visibleClient: true },
    { id: 2, clientId: 1, projectId: 2, title: 'Reporte SEO avanzado', detail: 'Informe extra con gráficos y recomendaciones.', price: 65000, status: 'Aprobado', visibleClient: true },
  ],
  notifications: [],
};

const app = document.querySelector('#app');
const icon = n => `<span class="nav-icon">${{ admin: '⚙', dashboard: '▦', request: '☑', ticket: '◉', upload: '⇧', logout: '↪', users: '☷', chart: '◍', calendar: '◷', bell: '🔔', log: '☰', report: '▤', money: '$', settings: '⚙', pipeline: '↝', trash: '×' }[n] || '•'}</span>`;
const activeClientId = () => state.user?.role === 'client' ? state.user.clientId : state.selectedClientId;
const getClient = () => state.clients.find(c => c.id === activeClientId()) || state.clients[0];
const visible = item => state.user?.role === 'admin' || item.visibleClient !== false;
const byClient = items => items.filter(item => item.clientId === activeClientId()).filter(visible);
const projectName = id => state.projects.find(p => p.id === id)?.name || 'Proyecto general';
const ticketNumber = () => `FC-TK-${String(state.nextTicketNumber++).padStart(4, '0')}`;
const stat = (label, value, tone, ico) => `<article class="stat-card ${tone}"><div class="stat-icon">${icon(ico)}</div><div><p>${label}</p><strong>${value}</strong></div></article>`;

function loginView(error = '') {
  app.innerHTML = `<main class="login-page"><section class="login-card"><div class="brand login-brand"><strong>full<span>checkPro</span></strong><em>Portal clientes</em></div><span class="local-badge">● clientes.fullcheck.cl</span><h1>Acceso al portal</h1><p>Ingresa con tus credenciales asignadas por FullCheck.</p>${error ? `<div class="login-error">${error}</div>` : ''}<form onsubmit="login(event)"><label>Email<input id="email" type="email" required placeholder="correo@empresa.cl"></label><label>Clave<input id="password" type="password" required placeholder="Clave"></label><button class="primary-button">Entrar</button></form></section></main>`;
}

function login(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim().toLowerCase();
  const password = document.querySelector('#password').value;
  const user = users.find(item => item.email === email && item.password === password);
  if (!user) return loginView('Credenciales incorrectas.');
  state.user = user;
  if (user.role === 'client') state.selectedClientId = user.clientId;
  notify('Sesión iniciada correctamente');
  render();
}

function logout() { state.user = null; loginView(); }
function notify(text) { state.notifications.unshift({ id: Date.now(), text, time: 'Ahora' }); }
function showNotifications() { alert(state.notifications.length ? state.notifications.slice(0, 8).map(n => `${n.time}: ${n.text}`).join('\n') : 'No hay notificaciones nuevas.'); }

function shell(content) {
  const admin = state.user.role === 'admin';
  app.innerHTML = `<div class="app-shell"><aside class="sidebar"><div class="brand"><strong>full<span>checkPro</span></strong><em>${admin ? 'Panel admin' : 'Portal cliente'}</em></div><div class="local-badge">● clientes.fullcheck.cl</div><nav><small>PRINCIPAL</small>${admin ? `<button class="active">${icon('admin')} Administrador</button><button onclick="openClientModal()">${icon('users')} Crear cliente</button><button onclick="openUpdateModal()">${icon('log')} Publicar avance</button><button onclick="openAdminMeetingModal()">${icon('calendar')} Programar reunión</button><button onclick="openReportModal()">${icon('report')} Crear entregable</button><button onclick="openValuationModal()">${icon('money')} Valorizar extra</button><button onclick="openSettingsModal()">${icon('settings')} Configuración</button>` : `<button class="active">${icon('dashboard')} Mi portal</button><button onclick="openRequest('Solicitud')">${icon('request')} Nueva solicitud</button><button onclick="openRequest('Archivo')">${icon('upload')} Subir archivo</button><button onclick="openRequest('Ticket')">${icon('ticket')} Abrir ticket</button><button onclick="openMeetingModal()">${icon('calendar')} Solicitar reunión</button>`}</nav><button class="sidebar-footer" onclick="logout()">${icon('logout')} Cerrar sesión</button></aside><div class="main-area"><header class="topbar"><input class="search-input" placeholder="Buscar en todo..."><div class="topbar-actions"><span class="time-pill">${admin ? 'Administrador' : 'Cliente'}</span><button class="alert-button" onclick="showNotifications()">🔔 ${state.notifications.length}</button>${admin ? '' : `<button class="primary-button" onclick="openRequest('Solicitud')">+ Nueva solicitud</button>`}</div></header>${content}</div></div>`;
}

function adminControls(collection, id) {
  const item = state[collection].find(x => x.id === id);
  if (!item) return '';
  return `<div class="admin-controls"><button class="ghost-button" onclick="toggleVisibility('${collection}',${id})">${item.visibleClient === false ? 'Publicar' : 'Ocultar'}</button><button class="danger-button" onclick="deleteItem('${collection}',${id})">Eliminar</button></div>`;
}

function projectCard(project, admin = false) {
  return `<article class="project-card"><div class="card-header"><div><span class="eyebrow">${project.phase}</span><h3>${project.name}</h3></div><span class="pill">${project.status}</span></div><div class="progress-wrap"><div class="progress-info"><span>Estado de avance</span><strong>${project.progress}%</strong></div><div class="progress-bar"><span style="width:${project.progress}%"></span></div></div><div class="project-meta"><span>◷ Entrega: ${project.dueDate}</span><span>→ Próximo paso: ${project.nextStep}</span></div>${admin ? `<div class="admin-project-actions"><input type="number" min="0" max="100" value="${project.progress}" onchange="setProgress(${project.id},this.value)"><input value="${project.phase}" onchange="setPhase(${project.id},this.value)"></div>${adminControls('projects', project.id)}` : ''}</article>`;
}

function list(items, type, admin = false) {
  const collection = { request: 'requests', ticket: 'tickets', pending: 'pending', file: 'files', report: 'reports' }[type];
  return `<div class="item-list">${items.map(item => `<div class="list-item"><div><strong>${item.number ? item.number + ' · ' : ''}${item.title || item.name}</strong><span>${item.projectId ? projectName(item.projectId) + ' · ' : ''}${item.created || item.date || item.due || ''} ${item.detail || item.description || ''}</span>${item.url ? `<a class="report-link" href="${item.url}" target="_blank">Abrir ${item.type}</a>` : ''}${item.response ? `<p class="ticket-response">Respuesta: ${item.response}</p>` : ''}</div><div class="item-actions"><span class="pill soft">${item.status || item.type || 'Recibido'}</span>${admin && type === 'request' ? `<button class="ghost-button" onclick="manageRequest(${item.id})">Gestionar</button>` : ''}${admin && type === 'ticket' ? `<button class="ghost-button" onclick="answerTicket(${item.id})">Responder</button>` : ''}${admin && collection ? adminControls(collection, item.id) : ''}</div></div>`).join('') || '<p class="empty-state">Sin registros.</p>'}</div>`;
}

function timeline() {
  return `<div class="timeline">${byClient(state.milestones).map(m => `<div class="timeline-item"><div class="timeline-dot"></div><div><strong>${m.name}</strong><span>${projectName(m.projectId)} · ${m.status} · ${m.due}</span></div></div>`).join('')}</div>`;
}

function updatesList(admin = false) {
  return `<div class="item-list">${byClient(state.updates).map(u => `<div class="list-item"><div><strong>${u.date} · ${u.title}</strong><span>${projectName(u.projectId)} · ${u.author}</span><p class="ticket-response">${u.text}</p></div><div class="item-actions"><span class="pill soft">Publicado</span>${admin ? adminControls('updates', u.id) : ''}</div></div>`).join('') || '<p class="empty-state">Aún no hay actualizaciones.</p>'}</div>`;
}

function meetingsList(admin = false) {
  return `<div class="calendar-list">${byClient(state.meetings).map(m => `<div class="calendar-event"><strong>${m.date} · ${m.time}</strong><span>${m.title} · ${m.status}</span>${m.link ? `<a href="${m.link}" target="_blank">Enlace reunión</a>` : ''}${m.notes ? `<span>Minuta: ${m.notes}</span>` : ''}${admin ? `<div class="item-actions"><button class="ghost-button" onclick="editMeeting(${m.id})">Gestionar</button>${adminControls('meetings', m.id)}</div>` : ''}</div>`).join('') || '<p class="empty-state">Sin reuniones registradas.</p>'}</div>`;
}

function messages() {
  return `<div class="support-chat">${byClient(state.messages).map(m => `<div class="chat-message ${m.from === 'Cliente' ? 'client' : 'support'}"><strong>${m.from}</strong><p>${m.text}</p><span>${m.time}</span></div>`).join('')}<form class="chat-compose" onsubmit="sendMessage(event)"><input id="msg" placeholder="Escribe un mensaje..."><button class="primary-button">Enviar</button></form></div>`;
}

function pipelineView(admin = false) {
  const stages = ['Planificación', 'Levantamiento', 'Diseño', 'Desarrollo', 'Revisión', 'Entrega'];
  const projects = byClient(state.projects);
  return `<div class="pipeline-board">${stages.map(stage => `<div class="pipeline-column"><strong>${stage}</strong>${projects.filter(project => project.phase.toLowerCase().includes(stage.toLowerCase()) || project.status.toLowerCase().includes(stage.toLowerCase())).map(project => `<article class="pipeline-card"><span>${project.name}</span><small>${project.progress}% · ${project.status}</small>${admin ? `<button class="ghost-button" onclick="setPhase(${project.id}, '${stage}')">Mover aquí</button>` : ''}</article>`).join('') || '<small>Sin proyectos</small>'}</div>`).join('')}</div>`;
}

function valuationsList(admin = false) {
  return `<div class="item-list">${byClient(state.valuations).map(item => `<div class="list-item"><div><strong>${item.title}</strong><span>${projectName(item.projectId)} · ${item.detail}</span><p class="ticket-response">Valor: $${item.price.toLocaleString('es-CL')}</p></div><div class="item-actions"><span class="pill soft">${item.status}</span>${admin ? `<button class="ghost-button" onclick="manageValuation(${item.id})">Gestionar</button>${adminControls('valuations', item.id)}` : ''}</div></div>`).join('') || '<p class="empty-state">Sin valorizaciones registradas.</p>'}</div>`;
}

function settingsSummary() {
  return `<div class="settings-summary"><strong>Horario de atención</strong><span>${state.settings.businessDays}</span><span>${state.settings.openTime} a ${state.settings.closeTime}</span><span>${state.settings.responseText}</span></div>`;
}

function adminView() {
  const c = getClient();
  const projects = byClient(state.projects);
  shell(`<main class="content-grid"><section class="hero-card admin"><div><span class="eyebrow">Panel administrador</span><h1>Gestión FullCheck</h1><p>Controla avances, reuniones, tickets, solicitudes, entregables y visibilidad del cliente.</p></div><label class="client-selector">Cliente<select onchange="state.selectedClientId=Number(this.value);render()">${state.clients.map(c => `<option value="${c.id}" ${c.id === state.selectedClientId ? 'selected' : ''}>${c.name}</option>`).join('')}</select></label></section><section class="stats-grid">${stat('Solicitudes nuevas', state.requests.filter(r => r.status === 'Nueva').length, 'purple', 'request')}${stat('Tickets abiertos', state.tickets.filter(t => t.status !== 'Resuelto').length, 'orange', 'ticket')}${stat('Reuniones pendientes', state.meetings.filter(m => m.status === 'Solicitada').length, 'blue', 'calendar')}${stat('Entregables', byClient(state.reports).length, 'green', 'report')}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Clientes</span><h2>Datos demo coherentes</h2></div></div><div class="client-grid">${state.clients.map(client => `<article class="client-summary"><div class="client-card"><div class="avatar">${client.initials}</div><div><h3>${client.name}</h3><p>${client.email} · ${client.plan}</p></div></div><div class="admin-controls"><button class="ghost-button" onclick="state.selectedClientId=${client.id};render()">Seleccionar</button><button class="danger-button" onclick="deleteClient(${client.id})">Eliminar cliente y datos</button></div></article>`).join('')}</div></section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Configuración</span><h2>Horario y reglas</h2></div><button class="ghost-button" onclick="openSettingsModal()">Editar</button></div>${settingsSummary()}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Pipeline</span><h2>Estado general de proyectos</h2></div></div>${pipelineView(true)}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Actualizar avances</span><h2>Proyectos de ${c.name}</h2></div><button class="primary-button" onclick="openUpdateModal()">Publicar avance</button></div><div class="projects-list">${projects.map(p => projectCard(p, true)).join('')}</div></section><section class="panel"><div class="section-title"><div><span class="eyebrow">Bitácora</span><h2>Avances publicados</h2></div></div>${updatesList(true)}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Reuniones</span><h2>Calendario y minutas</h2></div><button class="ghost-button" onclick="openAdminMeetingModal()">Programar</button></div>${meetingsList(true)}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Solicitudes</span><h2>Solicitudes recibidas</h2></div></div>${list(byClient(state.requests), 'request', true)}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Pendientes</span><h2>Pendientes del cliente</h2></div></div>${list(byClient(state.pending), 'pending', true)}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Entregables</span><h2>Links HTML, PDF y gráficos</h2></div><button class="ghost-button" onclick="openReportModal()">Crear entregable</button></div>${list(byClient(state.reports), 'report', true)}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Valorizaciones</span><h2>Solicitudes extras con precio</h2></div><button class="ghost-button" onclick="openValuationModal()">Valorizar extra</button></div>${valuationsList(true)}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Soporte</span><h2>Responder tickets</h2></div></div>${list(byClient(state.tickets), 'ticket', true)}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Mensajería</span><h2>Mensajes con ${c.name}</h2></div></div>${messages()}</section></main>`);
}

function clientView() {
  const c = getClient();
  const projects = byClient(state.projects);
  const avg = projects.length ? Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length) : 0;
  shell(`<main class="content-grid"><section class="hero-card"><div><span class="eyebrow">Portal cliente</span><h1>${c.name}</h1><p>Revisa avances, bitácoras, entregables, reuniones, solicitudes y tickets.</p></div><button class="primary-button" onclick="openRequest('Solicitud')">Nueva solicitud</button></section><section class="attention-box wide"><strong>Horario de atención</strong><span>${state.settings.responseText} Horario: ${state.settings.businessDays}, ${state.settings.openTime} a ${state.settings.closeTime}.</span></section><section class="stats-grid">${stat('Proyectos', projects.length, 'blue', 'chart')}${stat('Avance promedio', avg + '%', 'green', 'chart')}${stat('Entregables', byClient(state.reports).length, 'purple', 'report')}${stat('Tickets abiertos', byClient(state.tickets).filter(t => t.status !== 'Resuelto').length, 'orange', 'ticket')}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Informado por FullCheck</span><h2>Estado de avance</h2></div></div><div class="projects-list">${projects.map(p => projectCard(p)).join('')}</div></section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Pipeline</span><h2>Estado general del proyecto</h2></div></div>${pipelineView()}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Timeline</span><h2>Etapas del proyecto</h2></div></div>${timeline()}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Bitácora</span><h2>Últimas actualizaciones</h2></div></div>${updatesList()}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Pendientes</span><h2>Acciones requeridas</h2></div></div>${list(byClient(state.pending), 'pending')}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Reuniones</span><h2>Agenda</h2></div><button class="ghost-button" onclick="openMeetingModal()">Solicitar</button></div>${meetingsList()}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Entregables</span><h2>Reportes, HTML, PDF y gráficos</h2></div></div>${list(byClient(state.reports), 'report')}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Valorizaciones</span><h2>Solicitudes extras y precios</h2></div></div>${valuationsList()}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Solicitudes</span><h2>Mis solicitudes</h2></div><button class="ghost-button" onclick="openRequest('Solicitud')">Crear</button></div>${list(byClient(state.requests), 'request')}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Archivos</span><h2>Subir información</h2></div><button class="ghost-button" onclick="openRequest('Archivo')">Subir</button></div>${list(byClient(state.files), 'file')}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Soporte</span><h2>Tickets</h2></div><button class="ghost-button" onclick="openRequest('Ticket')">Abrir ticket</button></div>${list(byClient(state.tickets), 'ticket')}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Mensajería</span><h2>Soporte FullCheck</h2></div></div>${messages()}</section></main>`);
}

function render() { if (!state.user) return loginView(); state.user.role === 'admin' ? adminView() : clientView(); }
function closeModal() { document.querySelector('.modal-backdrop')?.remove(); }
function deleteItem(collection, id) { if (!confirm('¿Eliminar este registro?')) return; state[collection] = state[collection].filter(item => item.id !== id); notify('Registro eliminado.'); render(); }
function deleteClient(id) {
  if (!confirm('¿Eliminar este cliente y todos sus datos asociados?')) return;
  ['projects', 'milestones', 'updates', 'pending', 'requests', 'tickets', 'files', 'reports', 'messages', 'meetings', 'valuations'].forEach(collection => {
    state[collection] = state[collection].filter(item => item.clientId !== id);
  });
  state.clients = state.clients.filter(client => client.id !== id);
  for (let index = users.length - 1; index >= 0; index -= 1) {
    if (users[index].clientId === id) users.splice(index, 1);
  }
  state.selectedClientId = state.clients[0]?.id || 0;
  notify('Cliente y datos asociados eliminados.');
  render();
}
function toggleVisibility(collection, id) { const item = state[collection].find(x => x.id === id); if (!item) return; item.visibleClient = item.visibleClient === false; notify(item.visibleClient ? 'Registro publicado al cliente.' : 'Registro oculto al cliente.'); render(); }
function openClientModal() { document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveClient(event)"><div class="section-title"><div><span class="eyebrow">Admin</span><h2>Crear cliente</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Empresa<input id="cname" required></label><label>Contacto<input id="ccontact" required></label><label>Email acceso<input id="cemail" type="email" required></label><label>Clave acceso<input id="cpass" required></label><button class="primary-button">Guardar cliente</button></form></div>`); }
function saveClient(e) { e.preventDefault(); const id = Date.now(); const name = document.querySelector('#cname').value; const email = document.querySelector('#cemail').value; const password = document.querySelector('#cpass').value; state.clients.push({ id, name, contact: document.querySelector('#ccontact').value, email, password, initials: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(), plan: 'Nuevo cliente' }); users.push({ email, password, role: 'client', name, clientId: id }); state.selectedClientId = id; notify('Cliente creado y acceso asignado.'); closeModal(); render(); }
function openRequest(type) { document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveRequest(event)"><div class="section-title"><div><span class="eyebrow">Cliente</span><h2>${type === 'Archivo' ? 'Subir archivo' : type === 'Ticket' ? 'Abrir ticket' : 'Nueva solicitud'}</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><input id="rtype" type="hidden" value="${type}"><label>Proyecto<select id="rproject">${byClient(state.projects).map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select></label><label>Título<input id="rtitle" required></label><label>Detalle<textarea id="rdetail"></textarea></label>${type === 'Archivo' ? '<label>Archivo<input type="file"></label>' : ''}<button class="primary-button">Guardar</button></form></div>`); }
function saveRequest(e) { e.preventDefault(); const type = document.querySelector('#rtype').value; const item = { id: Date.now(), clientId: activeClientId(), projectId: Number(document.querySelector('#rproject').value), title: document.querySelector('#rtitle').value, detail: document.querySelector('#rdetail').value, status: 'Nueva', created: 'Hoy', visibleClient: true }; if (type === 'Ticket') state.tickets.unshift({ ...item, number: ticketNumber(), priority: 'Media', response: '' }); else if (type === 'Archivo') state.files.unshift({ id: item.id, clientId: item.clientId, projectId: item.projectId, name: item.title, type: 'Adjunto', status: 'Recibido', date: 'Hoy', visibleClient: true }); else state.requests.unshift(item); notify(`${type} recibido desde cliente.`); closeModal(); render(); }
function manageRequest(id) { const r = state.requests.find(x => x.id === id); document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveRequestAdmin(event,${id})"><div class="section-title"><div><span class="eyebrow">Solicitud</span><h2>Gestionar solicitud</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Estado<select id="rstatus"><option>Nueva</option><option>En revisión</option><option>En ejecución</option><option>Esperando cliente</option><option>Completada</option><option>Cerrada</option><option>Rechazada</option></select></label><label>Respuesta<textarea id="rresponse">${r.response || ''}</textarea></label><button class="primary-button">Guardar</button></form></div>`); }
function saveRequestAdmin(e, id) { e.preventDefault(); const r = state.requests.find(x => x.id === id); r.status = document.querySelector('#rstatus').value; r.response = document.querySelector('#rresponse').value; notify('Solicitud actualizada.'); closeModal(); render(); }
function openUpdateModal() { document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveUpdate(event)"><div class="section-title"><div><span class="eyebrow">Bitácora</span><h2>Publicar avance</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Proyecto<select id="uproject">${byClient(state.projects).map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select></label><label>Título<input id="utitle" required></label><label>Detalle<textarea id="utext" required></textarea></label><button class="primary-button">Publicar</button></form></div>`); }
function saveUpdate(e) { e.preventDefault(); state.updates.unshift({ id: Date.now(), clientId: activeClientId(), projectId: Number(document.querySelector('#uproject').value), date: 'Hoy', title: document.querySelector('#utitle').value, text: document.querySelector('#utext').value, author: 'FullCheck', visibleClient: true }); notify('Nuevo avance publicado.'); closeModal(); render(); }
function openReportModal() { document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveReport(event)"><div class="section-title"><div><span class="eyebrow">Entregable</span><h2>Crear reporte/link</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Proyecto<select id="reproject">${byClient(state.projects).map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select></label><label>Título<input id="retitle" required></label><label>Tipo<select id="retype"><option>PDF</option><option>HTML</option><option>Gráfico</option><option>Figma</option><option>Documento</option></select></label><label>Link<input id="reurl" required placeholder="https://..."></label><label>Descripción<textarea id="redesc"></textarea></label><button class="primary-button">Publicar entregable</button></form></div>`); }
function saveReport(e) { e.preventDefault(); state.reports.unshift({ id: Date.now(), clientId: activeClientId(), projectId: Number(document.querySelector('#reproject').value), title: document.querySelector('#retitle').value, type: document.querySelector('#retype').value, url: document.querySelector('#reurl').value, description: document.querySelector('#redesc').value, date: 'Hoy', visibleClient: true }); notify('Entregable publicado.'); closeModal(); render(); }
function openMeetingModal() { document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveMeeting(event)"><div class="section-title"><div><span class="eyebrow">Reunión</span><h2>Solicitar reunión</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Motivo<input id="mtitle" required></label><label>Fecha propuesta<input id="mdate" required placeholder="Ej: 20 mayo"></label><label>Hora propuesta<input id="mtime" required placeholder="Ej: 15:00"></label><button class="primary-button">Enviar solicitud</button></form></div>`); }
function openAdminMeetingModal() { document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveAdminMeeting(event)"><div class="section-title"><div><span class="eyebrow">Admin</span><h2>Programar reunión</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Proyecto<select id="amproject">${byClient(state.projects).map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select></label><label>Título<input id="amtitle" required></label><label>Fecha<input id="amdate" required></label><label>Hora<input id="amtime" required></label><label>Link<input id="amlink" placeholder="https://meet..."></label><label>Minuta<textarea id="amnotes"></textarea></label><button class="primary-button">Programar</button></form></div>`); }
function saveMeeting(e) { e.preventDefault(); state.meetings.unshift({ id: Date.now(), clientId: activeClientId(), projectId: byClient(state.projects)[0]?.id, title: document.querySelector('#mtitle').value, date: document.querySelector('#mdate').value, time: document.querySelector('#mtime').value, status: 'Solicitada', link: '', notes: '', visibleClient: true }); notify('Solicitud de reunión recibida.'); closeModal(); render(); }
function saveAdminMeeting(e) { e.preventDefault(); state.meetings.unshift({ id: Date.now(), clientId: activeClientId(), projectId: Number(document.querySelector('#amproject').value), title: document.querySelector('#amtitle').value, date: document.querySelector('#amdate').value, time: document.querySelector('#amtime').value, status: 'Confirmada', link: document.querySelector('#amlink').value, notes: document.querySelector('#amnotes').value, visibleClient: true }); notify('Reunión programada por admin.'); closeModal(); render(); }
function editMeeting(id) { const m = state.meetings.find(x => x.id === id); document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveMeetingAdmin(event,${id})"><div class="section-title"><div><span class="eyebrow">Reunión</span><h2>Gestionar reunión</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Estado<select id="mstatus"><option>Solicitada</option><option>Confirmada</option><option>Reagendada</option><option>Realizada</option><option>Cancelada</option></select></label><label>Enlace<input id="mlink" value="${m.link}"></label><label>Minuta<textarea id="mnotes">${m.notes}</textarea></label><button class="primary-button">Guardar</button></form></div>`); }
function saveMeetingAdmin(e, id) { e.preventDefault(); const m = state.meetings.find(x => x.id === id); m.status = document.querySelector('#mstatus').value; m.link = document.querySelector('#mlink').value; m.notes = document.querySelector('#mnotes').value; notify('Reunión actualizada.'); closeModal(); render(); }
function answerTicket(id) { const t = state.tickets.find(x => x.id === id); document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><form class="modal compact-modal" onsubmit="saveAnswer(event,${id})"><div class="section-title"><div><span class="eyebrow">Soporte</span><h2>Responder ${t.number}</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Estado<select id="tstatus"><option>Abierto</option><option>En revisión</option><option>Esperando cliente</option><option>Resuelto</option><option>Cerrado</option></select></label><label>Prioridad<select id="tpriority"><option>Baja</option><option>Media</option><option>Alta</option><option>Urgente</option></select></label><label>Respuesta<textarea id="tresponse">${t.response || ''}</textarea></label><button class="primary-button">Responder</button></form></div>`); }
function saveAnswer(e, id) { e.preventDefault(); const t = state.tickets.find(x => x.id === id); t.status = document.querySelector('#tstatus').value; t.priority = document.querySelector('#tpriority').value; t.response = document.querySelector('#tresponse').value; notify('Ticket respondido por FullCheck.'); closeModal(); render(); }
function setProgress(id, value) { const p = state.projects.find(x => x.id === id); p.progress = Math.max(0, Math.min(100, Number(value))); notify('Avance de proyecto actualizado.'); render(); }
function setPhase(id, value) { state.projects.find(x => x.id === id).phase = value; notify('Etapa de proyecto actualizada.'); render(); }
function sendMessage(e) { e.preventDefault(); const text = document.querySelector('#msg').value.trim(); if (!text) return; state.messages.push({ id: Date.now(), clientId: activeClientId(), from: state.user.role === 'admin' ? 'FullCheck' : 'Cliente', text, time: 'Ahora', visibleClient: true }); notify('Nuevo mensaje recibido.'); render(); }

render();



