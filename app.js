const state = {
  view: 'cliente',
  selectedClientId: 1,
  clients: [
    { id: 1, name: 'Constructora Andina SpA', contact: 'María González', email: 'maria@andina.cl', initials: 'CA', plan: 'Mantención Web' },
    { id: 2, name: 'Clínica Dental Sonríe', contact: 'Dr. Felipe Rojas', email: 'felipe@sonrie.cl', initials: 'CS', plan: 'Web + Soporte' },
    { id: 3, name: 'Café Patagonia', contact: 'Camila Soto', email: 'camila@cafepatagonia.cl', initials: 'CP', plan: 'Branding + Landing' },
  ],
  projects: [
    { id: 1, clientId: 1, name: 'Sitio web corporativo', status: 'En progreso', progress: 68, dueDate: '28 mayo 2026', manager: 'Equipo Web FullCheck', phase: 'Desarrollo visual', nextStep: 'Validar textos de servicios' },
    { id: 2, clientId: 1, name: 'Optimización SEO inicial', status: 'En revisión', progress: 82, dueDate: '10 junio 2026', manager: 'Marketing FullCheck', phase: 'Auditoría técnica', nextStep: 'Aprobar palabras clave' },
    { id: 3, clientId: 2, name: 'Portal de reservas online', status: 'Planificación', progress: 35, dueDate: '18 junio 2026', manager: 'Equipo Sistemas', phase: 'Levantamiento', nextStep: 'Confirmar horarios de atención' },
    { id: 4, clientId: 2, name: 'Mantención sitio actual', status: 'Activo', progress: 74, dueDate: 'Mensual', manager: 'Soporte FullCheck', phase: 'Soporte continuo', nextStep: 'Revisión mensual de formularios' },
    { id: 5, clientId: 3, name: 'Diseño de identidad visual', status: 'En progreso', progress: 55, dueDate: '03 junio 2026', manager: 'Diseño FullCheck', phase: 'Propuesta gráfica', nextStep: 'Elegir línea visual' },
    { id: 6, clientId: 3, name: 'Landing campaña invierno', status: 'Pendiente de contenido', progress: 28, dueDate: '20 junio 2026', manager: 'Equipo Web FullCheck', phase: 'Contenido', nextStep: 'Enviar fotografías del local' },
  ],
  tasks: [
    { id: 1, clientId: 1, projectId: 1, title: 'Enviar fotografías de obras terminadas', owner: 'Cliente', status: 'Pendiente', dueDate: '13 mayo', priority: 'Alta' },
    { id: 2, clientId: 1, projectId: 1, title: 'Maquetar sección de servicios', owner: 'FullCheck', status: 'En proceso', dueDate: '15 mayo', priority: 'Media' },
    { id: 3, clientId: 1, projectId: 2, title: 'Revisar títulos SEO propuestos', owner: 'Cliente', status: 'Pendiente', dueDate: '16 mayo', priority: 'Media' },
    { id: 4, clientId: 2, projectId: 3, title: 'Definir especialidades disponibles para reserva', owner: 'Cliente', status: 'Pendiente', dueDate: '14 mayo', priority: 'Alta' },
    { id: 5, clientId: 2, projectId: 4, title: 'Actualizar plugin de formulario', owner: 'FullCheck', status: 'Completada', dueDate: '09 mayo', priority: 'Baja' },
    { id: 6, clientId: 3, projectId: 5, title: 'Enviar referencias de colores y marcas', owner: 'Cliente', status: 'Pendiente', dueDate: '17 mayo', priority: 'Media' },
    { id: 7, clientId: 3, projectId: 6, title: 'Redactar textos de promoción invierno', owner: 'Cliente', status: 'Pendiente', dueDate: '18 mayo', priority: 'Alta' },
  ],
  tickets: [
    { id: 1, clientId: 1, projectId: 1, title: 'Cambiar teléfono visible en cabecera', status: 'Abierto', priority: 'Media', created: '11 mayo', lastUpdate: 'Pendiente de revisión' },
    { id: 2, clientId: 1, projectId: 1, title: 'Formulario no llega al correo comercial', status: 'En revisión', priority: 'Alta', created: '10 mayo', lastUpdate: 'Soporte revisando SMTP' },
    { id: 3, clientId: 2, projectId: 4, title: 'Agregar nuevo correo de recepción', status: 'Resuelto', priority: 'Baja', created: '08 mayo', lastUpdate: 'Correo agregado' },
    { id: 4, clientId: 3, projectId: 6, title: 'Duda sobre medidas de fotografías', status: 'Abierto', priority: 'Baja', created: '11 mayo', lastUpdate: 'Esperando respuesta FullCheck' },
  ],
  files: [
    { id: 1, clientId: 1, projectId: 1, name: 'Logo Constructora Andina PNG', type: 'Logo', date: '09 mayo' },
    { id: 2, clientId: 1, projectId: 1, name: 'Texto quienes somos', type: 'Texto', date: '10 mayo' },
    { id: 3, clientId: 2, projectId: 3, name: 'Listado de servicios dentales', type: 'Documento', date: '08 mayo' },
    { id: 4, clientId: 3, projectId: 5, name: 'Referencias visuales cafetería', type: 'Fotos', date: '11 mayo' },
  ],
  meetings: [
    { id: 1, clientId: 1, title: 'Revisión de avance web', date: '15 mayo 2026', time: '10:30', status: 'Agendada' },
    { id: 2, clientId: 2, title: 'Definición portal reservas', date: '16 mayo 2026', time: '12:00', status: 'Solicitada' },
    { id: 3, clientId: 3, title: 'Presentación línea gráfica', date: '20 mayo 2026', time: '16:00', status: 'Agendada' },
  ],
};

const app = document.querySelector('#app');

function icon(name) {
  const icons = { dashboard: '▦', admin: '⚙', request: '☑', ticket: '◉', folder: '▣', upload: '⇧', calendar: '◷', support: '◌', users: '☷', logout: '↪', check: '✓', task: '▤', chart: '◍' };
  return `<span class="nav-icon">${icons[name] || '•'}</span>`;
}

function getClient() {
  return state.clients.find(client => client.id === state.selectedClientId) || state.clients[0];
}

function byClient(collection) {
  return collection.filter(item => item.clientId === state.selectedClientId);
}

function projectName(projectId) {
  return state.projects.find(project => project.id === projectId)?.name || 'Proyecto general';
}

function statCard(label, value, tone, iconName) {
  return `<article class="stat-card ${tone}"><div class="stat-icon">${icon(iconName)}</div><div><p>${label}</p><strong>${value}</strong></div></article>`;
}

function clientSelector() {
  return `<label class="client-selector">Espacio del cliente<select onchange="selectClient(Number(this.value))">${state.clients.map(client => `<option value="${client.id}" ${client.id === state.selectedClientId ? 'selected' : ''}>${client.name}</option>`).join('')}</select></label>`;
}

function projectCard(project) {
  return `<article class="project-card"><div class="card-header"><div><span class="eyebrow">${project.phase}</span><h3>${project.name}</h3></div><span class="pill">${project.status}</span></div><div class="progress-wrap"><div class="progress-info"><span>Estado de avance</span><strong>${project.progress}%</strong></div><div class="progress-bar"><span style="width:${project.progress}%"></span></div></div><div class="project-meta"><span>◷ Entrega: ${project.dueDate}</span><span>✓ Responsable: ${project.manager}</span><span>→ Próximo paso: ${project.nextStep}</span></div></article>`;
}

function progressTimeline(projects) {
  return `<div class="timeline">${projects.map(project => `<div class="timeline-item"><div class="timeline-dot"></div><div><strong>${project.name}</strong><span>${project.phase} · ${project.progress}% completado</span><div class="mini-progress"><span style="width:${project.progress}%"></span></div></div></div>`).join('')}</div>`;
}

function taskList(tasks) {
  return `<div class="item-list">${tasks.map(task => `<div class="list-item task-item"><div><strong>${task.title}</strong><span>${projectName(task.projectId)} · Responsable: ${task.owner} · Vence: ${task.dueDate}</span></div><div class="item-actions"><span class="priority ${task.priority.toLowerCase()}">${task.priority}</span><span class="pill soft">${task.status}</span></div></div>`).join('') || '<p class="empty-state">No hay tareas para este cliente.</p>'}</div>`;
}

function ticketList(tickets) {
  return `<div class="item-list">${tickets.map(ticket => `<div class="list-item"><div><strong>${ticket.title}</strong><span>${projectName(ticket.projectId)} · Creado: ${ticket.created} · ${ticket.lastUpdate}</span></div><div class="item-actions"><span class="priority ${ticket.priority.toLowerCase()}">${ticket.priority}</span><span class="pill soft">${ticket.status}</span></div></div>`).join('') || '<p class="empty-state">No hay tickets para este cliente.</p>'}</div>`;
}


function supportMessages() {
  const messages = {
    1: [
      { from: 'FullCheck', text: 'María, estamos revisando el formulario y te avisamos durante la tarde.', time: 'Hoy 10:20' },
      { from: 'Cliente', text: 'Perfecto, también enviaremos nuevas fotos de proyectos.', time: 'Hoy 10:45' },
    ],
    2: [
      { from: 'FullCheck', text: 'Quedamos atentos a los horarios definitivos para configurar reservas.', time: 'Ayer 16:10' },
      { from: 'Cliente', text: 'Los enviaremos mañana en la mañana.', time: 'Ayer 17:02' },
    ],
    3: [
      { from: 'FullCheck', text: 'Ya cargamos las primeras referencias visuales para revisión.', time: 'Hoy 09:15' },
      { from: 'Cliente', text: 'Nos gusta la segunda línea gráfica.', time: 'Hoy 11:05' },
    ],
  };
  return `<div class="support-chat">${(messages[state.selectedClientId] || []).map(message => `<div class="chat-message ${message.from === 'Cliente' ? 'client' : 'support'}"><strong>${message.from}</strong><p>${message.text}</p><span>${message.time}</span></div>`).join('')}<div class="chat-compose"><input placeholder="Escribe un mensaje para soporte..." /><button class="primary-button" onclick="openModal('Ticket')">Enviar</button></div></div>`;
}
function clienteView() {
  const client = getClient();
  const projects = byClient(state.projects);
  const tasks = byClient(state.tasks);
  const tickets = byClient(state.tickets);
  const files = byClient(state.files);
  const meetings = byClient(state.meetings);
  const averageProgress = Math.round(projects.reduce((total, project) => total + project.progress, 0) / projects.length);
  return `<main class="content-grid"><section class="hero-card"><div><span class="eyebrow">Portal privado</span><h1>${client.name}</h1><p>Espacio ordenado para revisar proyectos, avances, tareas pendientes, tickets, archivos enviados y reuniones.</p></div>${clientSelector()}</section><section class="stats-grid">${statCard('Proyectos activos', projects.length, 'blue', 'folder')}${statCard('Avance promedio', `${averageProgress}%`, 'green', 'chart')}${statCard('Tareas pendientes', tasks.filter(task => task.status !== 'Completada').length, 'purple', 'task')}${statCard('Tickets abiertos', tickets.filter(ticket => ticket.status !== 'Resuelto' && ticket.status !== 'Cerrado').length, 'orange', 'ticket')}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Estado de avance</span><h2>Proyectos de ${client.name}</h2></div><button class="primary-button" onclick="openModal('Solicitud')">Crear solicitud</button></div><div class="projects-list">${projects.map(projectCard).join('')}</div></section><section class="panel"><div class="section-title"><div><span class="eyebrow">Seguimiento</span><h2>Avance por etapa</h2></div></div>${progressTimeline(projects)}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Pendientes</span><h2>Tareas del cliente</h2></div></div>${taskList(tasks)}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Soporte</span><h2>Tickets del cliente</h2></div><button class="ghost-button" onclick="openModal('Ticket')">Abrir ticket</button></div>${ticketList(tickets)}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Mensajería</span><h2>Soporte FullCheck</h2></div></div>${supportMessages()}</section><section class="panel"><div class="section-title"><div><span class="eyebrow">Archivos</span><h2>Información recibida</h2></div></div><div class="item-list">${files.map(file => `<div class="list-item"><div><strong>${file.name}</strong><span>${projectName(file.projectId)} · ${file.type} · ${file.date}</span></div><span class="pill soft">Recibido</span></div>`).join('') || '<p class="empty-state">Sin archivos registrados.</p>'}</div></section><section class="panel"><div class="section-title"><div><span class="eyebrow">Agenda</span><h2>Reuniones</h2></div></div><div class="item-list">${meetings.map(meeting => `<div class="list-item"><div><strong>${meeting.title}</strong><span>${meeting.date} · ${meeting.time}</span></div><span class="pill soft">${meeting.status}</span></div>`).join('') || '<p class="empty-state">Sin reuniones agendadas.</p>'}</div></section></main>`;
}

function clientAdminCard(client) {
  const projects = state.projects.filter(project => project.clientId === client.id);
  const tasks = state.tasks.filter(task => task.clientId === client.id && task.status !== 'Completada');
  const tickets = state.tickets.filter(ticket => ticket.clientId === client.id && ticket.status !== 'Resuelto');
  const average = Math.round(projects.reduce((total, project) => total + project.progress, 0) / projects.length);
  return `<article class="client-summary" onclick="selectClient(${client.id})"><div class="client-card"><div class="avatar">${client.initials}</div><div><h3>${client.name}</h3><p>${client.contact} · ${client.plan}</p></div></div><div class="summary-metrics"><span>${projects.length} proyectos</span><span>${average}% avance</span><span>${tasks.length} tareas</span><span>${tickets.length} tickets</span></div><div class="mini-progress"><span style="width:${average}%"></span></div></article>`;
}

function adminView() {
  return `<main class="content-grid"><section class="hero-card admin"><div><span class="eyebrow">Panel administrador</span><h1>Gestión de clientes FullCheck</h1><p>Controla avances por cliente, tareas pendientes, tickets abiertos y archivos recibidos.</p></div>${clientSelector()}</section><section class="stats-grid">${statCard('Clientes', state.clients.length, 'blue', 'users')}${statCard('Proyectos', state.projects.length, 'green', 'folder')}${statCard('Tareas pendientes', state.tasks.filter(task => task.status !== 'Completada').length, 'purple', 'task')}${statCard('Tickets abiertos', state.tickets.filter(ticket => ticket.status !== 'Resuelto').length, 'orange', 'ticket')}</section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Resumen general</span><h2>Estado por cliente</h2></div></div><div class="client-grid">${state.clients.map(client => clientAdminCard(client)).join('')}</div></section><section class="panel wide"><div class="section-title"><div><span class="eyebrow">Bandeja operativa</span><h2>Tareas y tickets del cliente seleccionado</h2></div></div>${taskList(byClient(state.tasks))}${ticketList(byClient(state.tickets))}</section></main>`;
}

function layout() {
  app.innerHTML = `<div class="app-shell"><aside class="sidebar"><div class="brand"><div><strong>full<span>checkPro</span></strong><em>Portal clientes</em></div></div><div class="local-badge">● clientes.fullcheck.cl</div><nav><small>PRINCIPAL</small><button class="${state.view === 'cliente' ? 'active' : ''}" onclick="setView('cliente')">${icon('dashboard')} Portal cliente</button><button class="${state.view === 'admin' ? 'active' : ''}" onclick="setView('admin')">${icon('admin')} Administrador</button><button onclick="openModal('Solicitud')">${icon('request')} Nueva solicitud</button><button onclick="openModal('Ticket')">${icon('ticket')} Nuevo ticket</button></nav><div class="sidebar-footer">${icon('logout')} Cerrar sesión</div></aside><div class="main-area"><header class="topbar"><input class="search-input" placeholder="Buscar en todo..." /><div class="topbar-actions"><span class="time-pill">Lun 13:29:55</span><button class="alert-button">🔔</button><button class="primary-button" onclick="openModal('Solicitud')">+ Nueva solicitud</button></div></header>${state.view === 'cliente' ? clienteView() : adminView()}</div></div>`;
}

function setView(view) { state.view = view; layout(); }
function selectClient(clientId) { state.selectedClientId = clientId; layout(); }

function openModal(type) {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `<form class="modal" onsubmit="saveRequest(event)"><div class="section-title"><div><span class="eyebrow">Nuevo registro</span><h2>Crear ${type.toLowerCase()}</h2></div><button type="button" class="ghost-button" onclick="closeModal()">Cerrar</button></div><label>Tipo<select id="modal-type"><option ${type === 'Solicitud' ? 'selected' : ''}>Solicitud</option><option ${type === 'Ticket' ? 'selected' : ''}>Ticket</option><option ${type === 'Archivo' ? 'selected' : ''}>Archivo</option><option ${type === 'Reunión' ? 'selected' : ''}>Reunión</option></select></label><label>Proyecto<select id="modal-project">${byClient(state.projects).map(project => `<option value="${project.id}">${project.name}</option>`).join('')}</select></label><label>Título<input id="modal-title" placeholder="Ej: Cambiar foto principal" /></label><label>Detalle<textarea id="modal-description" placeholder="Describe lo que necesitas enviar o solicitar"></textarea></label><label>Adjunto<input type="file" /></label><button class="primary-button" type="submit">Guardar</button></form>`;
  document.body.appendChild(modal);
}

function closeModal() { document.querySelector('.modal-backdrop')?.remove(); }

function saveRequest(event) {
  event.preventDefault();
  const type = document.querySelector('#modal-type').value;
  const projectId = Number(document.querySelector('#modal-project').value);
  const title = document.querySelector('#modal-title').value || `Nueva ${type.toLowerCase()}`;
  if (type === 'Ticket') state.tickets.unshift({ id: Date.now(), clientId: state.selectedClientId, projectId, title, status: 'Abierto', priority: 'Media', created: 'Hoy', lastUpdate: 'Creado por cliente' });
  else if (type === 'Archivo') state.files.unshift({ id: Date.now(), clientId: state.selectedClientId, projectId, name: title, type: 'Adjunto', date: 'Hoy' });
  else if (type === 'Reunión') state.meetings.unshift({ id: Date.now(), clientId: state.selectedClientId, title, date: 'Por confirmar', time: '--:--', status: 'Solicitada' });
  else state.tasks.unshift({ id: Date.now(), clientId: state.selectedClientId, projectId, title, owner: 'FullCheck', status: 'Pendiente', dueDate: 'Por definir', priority: 'Media' });
  closeModal();
  layout();
}

layout();


