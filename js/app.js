/* ===== Main Application ===== */
const App = {
    currentView: 'dashboard',
    editingCertId: null,
    editingQuestionId: null,
    testState: null,
    timerInterval: null,

    init() {
        SeedData.seed();
        I18N.init();
        this.initTheme();
        this.bindNavigation();
        this.bindCertSelector();
        this.bindCertManager();
        this.bindQuestionManager();
        this.bindTestSetup();
        this.bindTestEngine();
        this.bindResultsView();
        this.bindImportExport();
        this.refreshCertSelector();
        this.showView('dashboard');
    },

    // ===== Theme =====
    initTheme() {
        const saved = localStorage.getItem('quizTheme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        this.updateThemeIcon(saved);

        document.getElementById('btnTheme').addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('quizTheme', next);
            this.updateThemeIcon(next);
        });

        document.getElementById('btnLanguage').addEventListener('click', () => {
            I18N.toggle();
            this.refreshCurrentView();
        });
    },

    updateThemeIcon(theme) {
        const icon = document.querySelector('#btnTheme i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    },

    // ===== Navigation =====
    bindNavigation() {
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showView(btn.dataset.view);
            });
        });
    },

    showView(viewId) {
        // Clean up test timer if leaving test view
        if (this.currentView === 'test' && viewId !== 'test') {
            this.stopTimer();
        }
        this.currentView = viewId;
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const target = document.getElementById('view-' + viewId);
        if (target) target.classList.add('active');

        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const navBtn = document.querySelector(`.nav-item[data-view="${viewId}"]`);
        if (navBtn) navBtn.classList.add('active');

        this.refreshCurrentView();
    },

    refreshCurrentView() {
        switch (this.currentView) {
            case 'dashboard': this.renderDashboard(); break;
            case 'certifications': this.renderCertList(); break;
            case 'questions': this.renderQuestionsList(); break;
            case 'test-setup': this.renderTestSetup(); break;
            case 'progress': this.renderProgress(); break;
            case 'import-export': this.renderImportExport(); break;
        }
    },

    // ===== Cert Selector (Navbar) =====
    bindCertSelector() {
        document.getElementById('certificationSelector').addEventListener('change', (e) => {
            Store.setActiveCertId(e.target.value);
            this.refreshCurrentView();
        });
    },

    refreshCertSelector() {
        const sel = document.getElementById('certificationSelector');
        const certs = Store.getCertifications();
        const activeId = Store.getActiveCertId();
        sel.innerHTML = `<option value="">-- ${I18N.t('certification')} --</option>`;
        certs.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.code} - ${c.name}`;
            if (c.id === activeId) opt.selected = true;
            sel.appendChild(opt);
        });
    },

    getActiveCert() {
        return Store.getCertification(Store.getActiveCertId());
    },

    // ===== Dashboard =====
    renderDashboard() {
        const certs = Store.getCertifications();
        const questions = Store.getQuestions();
        const history = Store.getHistory();
        const activeCert = this.getActiveCert();

        document.getElementById('statCertCount').textContent = certs.length;
        document.getElementById('statQuestionCount').textContent = questions.length;
        document.getElementById('statTestsTaken').textContent = history.length;

        if (history.length > 0) {
            const avg = history.reduce((sum, h) => sum + h.score, 0) / history.length;
            document.getElementById('statAvgScore').textContent = Math.round(avg) + '%';
        } else {
            document.getElementById('statAvgScore').textContent = '0%';
        }

        const infoPanel = document.getElementById('dashboardCertInfo');
        if (activeCert) {
            infoPanel.style.display = 'block';
            document.getElementById('dashCertName').textContent = `${activeCert.code} - ${activeCert.name}`;
            document.getElementById('dashCertDesc').textContent = activeCert.description || '';
            const link = document.getElementById('dashCertLink');
            if (activeCert.link) {
                link.href = activeCert.link;
                link.style.display = 'inline';
                link.textContent = I18N.t('viewOfficialDocs');
            } else {
                link.style.display = 'none';
            }

            const topicsDiv = document.getElementById('dashTopicsSummary');
            const certQuestions = Store.getQuestionsForCert(activeCert.id);
            topicsDiv.innerHTML = (activeCert.topics || []).map(topic => {
                const topicQCount = certQuestions.filter(q => q.topic === topic.name).length;
                const subtopicsHtml = (topic.subtopics || []).map(st => {
                    const stCount = certQuestions.filter(q => q.subtopic === st).length;
                    return `<span class="subtopic-badge">${this.escapeHtml(st)} (${stCount})</span>`;
                }).join('');
                return `
                    <div class="topic-summary-item">
                        <h4>${this.escapeHtml(topic.name)} — ${topicQCount} ${I18N.t('questionsInTopic')}</h4>
                        ${topic.link ? `<a href="${this.escapeHtml(topic.link)}" target="_blank" style="font-size:0.8rem;">📖 ${I18N.t('viewOfficialDocs')}</a>` : ''}
                        <div class="subtopics">${subtopicsHtml}</div>
                    </div>`;
            }).join('');
        } else {
            infoPanel.style.display = 'none';
        }
    },

    // ===== Certifications Manager =====
    bindCertManager() {
        document.getElementById('btnAddCert').addEventListener('click', () => this.openCertModal());
        document.getElementById('btnCloseCertModal').addEventListener('click', () => this.closeCertModal());
        document.getElementById('btnCancelCert').addEventListener('click', () => this.closeCertModal());
        document.getElementById('btnSaveCert').addEventListener('click', () => this.saveCertification());
        document.getElementById('btnAddTopic').addEventListener('click', () => this.addTopicEntry());
    },

    renderCertList() {
        const certs = Store.getCertifications();
        const container = document.getElementById('certList');
        if (certs.length === 0) {
            container.innerHTML = `<p class="text-muted">${I18N.t('noCertifications')}</p>`;
            return;
        }
        container.innerHTML = certs.map(c => {
            const qCount = Store.getQuestionsForCert(c.id).length;
            const tCount = (c.topics || []).length;
            return `
                <div class="cert-card">
                    <div class="cert-card-info">
                        <span class="cert-code">${this.escapeHtml(c.code)}</span>
                        <h3>${this.escapeHtml(c.name)}</h3>
                        <p>${this.escapeHtml(c.description || '')}</p>
                        <div class="cert-stats">${tCount} ${I18N.t('topicCount')} · ${qCount} ${I18N.t('questionCount')}</div>
                    </div>
                    <div class="cert-card-actions">
                        <button class="btn btn-secondary btn-sm" onclick="App.openCertModal('${c.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="App.deleteCert('${c.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>`;
        }).join('');
    },

    openCertModal(editId) {
        this.editingCertId = editId || null;
        const modal = document.getElementById('certModal');
        const title = document.getElementById('certModalTitle');

        if (editId) {
            const cert = Store.getCertification(editId);
            title.textContent = I18N.t('editCertification');
            document.getElementById('certCode').value = cert.code || '';
            document.getElementById('certName').value = cert.name || '';
            document.getElementById('certDescription').value = cert.description || '';
            document.getElementById('certLink').value = cert.link || '';
            this.renderTopicsEditor(cert.topics || []);
        } else {
            title.textContent = I18N.t('addCertification');
            document.getElementById('certCode').value = '';
            document.getElementById('certName').value = '';
            document.getElementById('certDescription').value = '';
            document.getElementById('certLink').value = '';
            this.renderTopicsEditor([]);
        }
        modal.style.display = 'flex';
    },

    closeCertModal() {
        document.getElementById('certModal').style.display = 'none';
        this.editingCertId = null;
    },

    renderTopicsEditor(topics) {
        const container = document.getElementById('topicsEditor');
        container.innerHTML = topics.map((t, i) => this.topicEntryHtml(t, i)).join('');
    },

    topicEntryHtml(topic, idx) {
        const subtopicsHtml = (topic.subtopics || []).map((st, si) => `
            <div class="subtopic-entry">
                <input type="text" class="subtopic-input" data-topic="${idx}" data-sub="${si}" value="${this.escapeHtml(st)}" placeholder="${I18N.t('subtopicName')}">
                <button class="btn btn-danger btn-sm" onclick="App.removeSubtopic(${idx}, ${si})"><i class="fas fa-times"></i></button>
            </div>`).join('');

        return `
            <div class="topic-entry" data-topic-idx="${idx}">
                <div class="topic-entry-header">
                    <input type="text" class="topic-input" data-topic="${idx}" value="${this.escapeHtml(topic.name || '')}" placeholder="${I18N.t('topicName')}">
                    <input type="url" class="topic-link-input" data-topic="${idx}" value="${this.escapeHtml(topic.link || '')}" placeholder="Link (optional)" style="max-width:200px;">
                    <button class="btn btn-danger btn-sm" onclick="App.removeTopic(${idx})"><i class="fas fa-trash"></i></button>
                </div>
                <div class="subtopic-list">${subtopicsHtml}</div>
                <button class="btn btn-secondary btn-sm" onclick="App.addSubtopicEntry(${idx})">
                    <i class="fas fa-plus"></i> ${I18N.t('addSubtopic')}
                </button>
            </div>`;
    },

    getTopicsFromEditor() {
        const topics = [];
        document.querySelectorAll('.topic-entry').forEach((el, i) => {
            const name = el.querySelector('.topic-input').value.trim();
            const link = el.querySelector('.topic-link-input')?.value.trim() || '';
            const subtopics = [];
            el.querySelectorAll('.subtopic-input').forEach(input => {
                const v = input.value.trim();
                if (v) subtopics.push(v);
            });
            if (name) topics.push({ name, link, subtopics });
        });
        return topics;
    },

    addTopicEntry() {
        const topics = this.getTopicsFromEditor();
        topics.push({ name: '', link: '', subtopics: [] });
        this.renderTopicsEditor(topics);
    },

    removeTopic(idx) {
        const topics = this.getTopicsFromEditor();
        topics.splice(idx, 1);
        this.renderTopicsEditor(topics);
    },

    addSubtopicEntry(topicIdx) {
        const topics = this.getTopicsFromEditor();
        if (topics[topicIdx]) {
            topics[topicIdx].subtopics.push('');
            this.renderTopicsEditor(topics);
        }
    },

    removeSubtopic(topicIdx, subIdx) {
        const topics = this.getTopicsFromEditor();
        if (topics[topicIdx]) {
            topics[topicIdx].subtopics.splice(subIdx, 1);
            this.renderTopicsEditor(topics);
        }
    },

    saveCertification() {
        const code = document.getElementById('certCode').value.trim();
        const name = document.getElementById('certName').value.trim();
        const description = document.getElementById('certDescription').value.trim();
        const link = document.getElementById('certLink').value.trim();
        const topics = this.getTopicsFromEditor();

        if (!code || !name) {
            this.toast(I18N.t('certCode') + ' & ' + I18N.t('certName') + ' required', 'error');
            return;
        }

        if (this.editingCertId) {
            const cert = Store.getCertification(this.editingCertId);
            cert.code = code;
            cert.name = name;
            cert.description = description;
            cert.link = link;
            cert.topics = topics;
            Store.updateCertification(cert);
        } else {
            Store.addCertification({ code, name, description, link, topics });
        }

        this.closeCertModal();
        this.refreshCertSelector();
        this.renderCertList();
        this.toast(I18N.t('save') + ' ✓', 'success');
    },

    deleteCert(id) {
        if (confirm(I18N.t('deleteCertConfirm'))) {
            Store.deleteCertification(id);
            if (Store.getActiveCertId() === id) Store.setActiveCertId('');
            this.refreshCertSelector();
            this.renderCertList();
        }
    },

    // ===== Question Manager =====
    bindQuestionManager() {
        document.getElementById('btnAddQuestion').addEventListener('click', () => this.openQuestionModal());
        document.getElementById('btnCloseQuestionModal').addEventListener('click', () => this.closeQuestionModal());
        document.getElementById('btnCancelQuestion').addEventListener('click', () => this.closeQuestionModal());
        document.getElementById('btnSaveQuestion').addEventListener('click', () => this.saveQuestion());
        document.getElementById('btnAddAnswer').addEventListener('click', () => this.addAnswerEntry());
        document.getElementById('btnAddStatement').addEventListener('click', () => this.addStatementEntry());

        document.getElementById('questionTopic').addEventListener('change', () => this.onQuestionTopicChange());
        document.getElementById('questionType').addEventListener('change', () => this.onQuestionTypeChange());

        // Filters
        document.getElementById('filterTopic').addEventListener('change', () => {
            this.updateSubtopicFilter();
            this.renderQuestionsList();
        });
        document.getElementById('filterSubtopic').addEventListener('change', () => this.renderQuestionsList());
        document.getElementById('filterSearch').addEventListener('input', () => this.renderQuestionsList());
        document.getElementById('filterBookmarked').addEventListener('change', () => this.renderQuestionsList());
    },

    renderQuestionsList() {
        const cert = this.getActiveCert();
        const container = document.getElementById('questionsList');

        if (!cert) {
            container.innerHTML = `<div class="question-item no-questions">${I18N.t('needCertFirst')}</div>`;
            return;
        }

        // Populate topic filter
        const filterTopic = document.getElementById('filterTopic');
        const currentTopicFilter = filterTopic.value;
        filterTopic.innerHTML = `<option value="">${I18N.t('allTopics')}</option>`;
        (cert.topics || []).forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.name;
            opt.textContent = t.name;
            if (t.name === currentTopicFilter) opt.selected = true;
            filterTopic.appendChild(opt);
        });

        this.updateSubtopicFilter();

        let questions = Store.getQuestionsForCert(cert.id);

        // Apply filters
        const topicFilter = filterTopic.value;
        const subtopicFilter = document.getElementById('filterSubtopic').value;
        const searchFilter = document.getElementById('filterSearch').value.toLowerCase();
        const bookmarkFilter = document.getElementById('filterBookmarked').value;

        if (topicFilter) questions = questions.filter(q => q.topic === topicFilter);
        if (subtopicFilter) questions = questions.filter(q => q.subtopic === subtopicFilter);
        if (searchFilter) questions = questions.filter(q => q.text.toLowerCase().includes(searchFilter));
        if (bookmarkFilter === 'bookmarked') questions = questions.filter(q => Store.isBookmarked(q.id));

        if (questions.length === 0) {
            container.innerHTML = `<div class="question-item no-questions">${I18N.t('noQuestions')}</div>`;
            return;
        }

        container.innerHTML = questions.map(q => {
            const bookmarked = Store.isBookmarked(q.id);
            const typeLabelMap = { single: 'singleAnswer', multi: 'multiAnswer', yesno: 'yesNoAnswer', evaluate: 'evaluateAnswer', statements: 'statementsAnswer' };
            const typeLabel = I18N.t(typeLabelMap[q.type] || 'singleAnswer');
            return `
                <div class="question-item">
                    <div class="question-item-text">
                        <div class="qi-topic">${this.escapeHtml(q.topic)} > ${this.escapeHtml(q.subtopic || '')} <span class="qi-type">${typeLabel}</span></div>
                        ${this.escapeHtml(this.lt(q, 'text'))}
                    </div>
                    <div class="question-item-actions">
                        <button class="${bookmarked ? 'bookmarked' : ''}" title="Bookmark" onclick="App.toggleBookmarkFromList('${q.id}')">
                            <i class="fa${bookmarked ? 's' : 'r'} fa-bookmark"></i>
                        </button>
                        <button title="${I18N.t('edit')}" onclick="App.openQuestionModal('${q.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button title="${I18N.t('delete')}" onclick="App.deleteQuestion('${q.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>`;
        }).join('');
    },

    updateSubtopicFilter() {
        const cert = this.getActiveCert();
        const topicFilter = document.getElementById('filterTopic').value;
        const filterSubtopic = document.getElementById('filterSubtopic');
        const currentSub = filterSubtopic.value;
        filterSubtopic.innerHTML = `<option value="">${I18N.t('allSubtopics')}</option>`;

        if (cert && topicFilter) {
            const topic = (cert.topics || []).find(t => t.name === topicFilter);
            if (topic) {
                (topic.subtopics || []).forEach(st => {
                    const opt = document.createElement('option');
                    opt.value = st;
                    opt.textContent = st;
                    if (st === currentSub) opt.selected = true;
                    filterSubtopic.appendChild(opt);
                });
            }
        }
    },

    openQuestionModal(editId) {
        const cert = this.getActiveCert();
        if (!cert) { this.toast(I18N.t('needCertFirst'), 'error'); return; }
        if (!cert.topics || cert.topics.length === 0) { this.toast(I18N.t('needTopics'), 'error'); return; }

        this.editingQuestionId = editId || null;
        const modal = document.getElementById('questionModal');
        const title = document.getElementById('questionModalTitle');

        // Populate topic dropdown
        const topicSel = document.getElementById('questionTopic');
        topicSel.innerHTML = cert.topics.map(t => `<option value="${this.escapeHtml(t.name)}">${this.escapeHtml(t.name)}</option>`).join('');

        if (editId) {
            const q = Store.getQuestions().find(x => x.id === editId);
            title.textContent = I18N.t('editQuestion');
            topicSel.value = q.topic;
            this.onQuestionTopicChange();
            document.getElementById('questionSubtopic').value = q.subtopic || '';
            document.getElementById('questionText').value = q.text || '';
            document.getElementById('questionType').value = q.type || 'single';
            document.getElementById('questionExplanation').value = q.explanation || '';
            document.getElementById('questionText_es').value = q.text_es || '';
            document.getElementById('questionExplanation_es').value = q.explanation_es || '';
            document.getElementById('questionReference').value = q.reference || '';
            this.onQuestionTypeChange();
            if (q.type === 'evaluate') {
                document.getElementById('bracketContext').value = q.bracketContext || '';
                document.getElementById('bracketContext_es').value = q.bracketContext_es || '';
            }
            if (q.type === 'statements') {
                this.renderStatementsEditor(q.statements || []);
            }
            this.renderAnswersEditor(q.answers || []);
        } else {
            title.textContent = I18N.t('addQuestion');
            this.onQuestionTopicChange();
            document.getElementById('questionText').value = '';
            document.getElementById('questionText_es').value = '';
            document.getElementById('questionType').value = 'single';
            document.getElementById('questionExplanation').value = '';
            document.getElementById('questionExplanation_es').value = '';
            document.getElementById('questionReference').value = '';
            this.onQuestionTypeChange();
            this.renderAnswersEditor([
                { text: '', correct: false },
                { text: '', correct: false },
                { text: '', correct: false },
                { text: '', correct: false }
            ]);
        }
        modal.style.display = 'flex';
    },

    closeQuestionModal() {
        document.getElementById('questionModal').style.display = 'none';
        this.editingQuestionId = null;
    },

    onQuestionTopicChange() {
        const cert = this.getActiveCert();
        const topicName = document.getElementById('questionTopic').value;
        const subtopicSel = document.getElementById('questionSubtopic');
        subtopicSel.innerHTML = '';
        if (cert) {
            const topic = (cert.topics || []).find(t => t.name === topicName);
            if (topic) {
                (topic.subtopics || []).forEach(st => {
                    const opt = document.createElement('option');
                    opt.value = st;
                    opt.textContent = st;
                    subtopicSel.appendChild(opt);
                });
            }
        }
    },

    renderAnswersEditor(answers) {
        const container = document.getElementById('answersEditor');
        const type = document.getElementById('questionType').value;

        if (type === 'yesno') {
            container.innerHTML = `
                <div class="yesno-preview">
                    <div class="yesno-btn-preview yes"><i class="fas fa-check"></i> ${I18N.t('yes')}</div>
                    <div class="yesno-btn-preview no"><i class="fas fa-times"></i> ${I18N.t('no')}</div>
                </div>
                <div class="form-group" style="margin-top:0.75rem;">
                    <label>${I18N.t('correctAnswer')}</label>
                    <select id="yesnoCorrect" class="filter-select">
                        <option value="yes" ${answers[0]?.correct ? 'selected' : ''}>${I18N.t('yes')}</option>
                        <option value="no" ${answers[1]?.correct ? 'selected' : ''}>${I18N.t('no')}</option>
                    </select>
                </div>`;
            return;
        }

        if (type === 'statements') {
            container.innerHTML = '<p class="text-muted" style="font-size:0.85rem;">Answers are auto-generated from statements above.</p>';
            return;
        }

        if (type === 'evaluate') {
            // For evaluate type, first option is always "No change needed"
            const inputType = 'radio';
            container.innerHTML = answers.map((a, i) => {
                const placeholder = i === 0 ? I18N.t('noChangeNeeded') : `Alternative ${i} (EN)`;
                const placeholderEs = i === 0 ? '' : `Alternativa ${i} (ES)`;
                return `
                <div class="answer-entry ${i === 0 ? 'no-change-entry' : ''}">
                    <input type="${inputType}" name="correctAnswer" class="answer-correct" data-idx="${i}" ${a.correct ? 'checked' : ''}>
                    <span class="answer-correct-label">${I18N.t('markCorrect')}</span>
                    <input type="text" class="answer-text" data-idx="${i}" value="${this.escapeHtml(a.text)}" placeholder="${placeholder}" ${i === 0 ? 'readonly' : ''}>
                    <input type="text" class="answer-text-es" data-idx="${i}" value="${this.escapeHtml(a.text_es || '')}" placeholder="${placeholderEs}" ${i === 0 ? 'readonly' : ''}>
                    ${i > 0 ? `<button class="btn btn-danger btn-sm" onclick="App.removeAnswer(${i})"><i class="fas fa-times"></i></button>` : ''}
                </div>`;
            }).join('');
            return;
        }

        // Standard single/multi
        const inputType = type === 'multi' ? 'checkbox' : 'radio';
        container.innerHTML = answers.map((a, i) => `
            <div class="answer-entry">
                <input type="${inputType}" name="correctAnswer" class="answer-correct" data-idx="${i}" ${a.correct ? 'checked' : ''}>
                <span class="answer-correct-label">${I18N.t('markCorrect')}</span>
                <input type="text" class="answer-text" data-idx="${i}" value="${this.escapeHtml(a.text)}" placeholder="Answer ${i + 1} (EN)">
                <input type="text" class="answer-text-es" data-idx="${i}" value="${this.escapeHtml(a.text_es || '')}" placeholder="Respuesta ${i + 1} (ES)">
                <button class="btn btn-danger btn-sm" onclick="App.removeAnswer(${i})"><i class="fas fa-times"></i></button>
            </div>`).join('');
    },

    renderAnswerMarkers() {
        const type = document.getElementById('questionType').value;
        if (type === 'yesno' || type === 'statements') return;
        const answers = this.getAnswersFromEditor();
        this.renderAnswersEditor(answers);
    },

    getAnswersFromEditor() {
        const type = document.getElementById('questionType').value;

        if (type === 'yesno') {
            const sel = document.getElementById('yesnoCorrect');
            const isYes = sel ? sel.value === 'yes' : true;
            return [
                { text: 'Yes', text_es: 'Sí', correct: isYes },
                { text: 'No', text_es: 'No', correct: !isYes }
            ];
        }

        if (type === 'statements') {
            // Generate answers from statements editor
            const statements = this.getStatementsFromEditor();
            if (statements.length === 0) return [];
            // Build the correct combination answer and alternatives
            const correctCombo = statements.map(s => s.correct ? I18N.t('yes') : I18N.t('no')).join(', ');
            const correctComboEs = statements.map(s => s.correct ? 'Sí' : 'No').join(', ');
            // Generate answer options: correct combo + some wrong combos
            const answers = [{ text: correctCombo, text_es: correctComboEs, correct: true }];
            // Generate 2-3 wrong combos by flipping bits
            const bits = statements.map(s => s.correct);
            for (let flip = 0; flip < Math.min(3, statements.length); flip++) {
                const wrong = [...bits];
                wrong[flip] = !wrong[flip];
                const wrongText = wrong.map(b => b ? I18N.t('yes') : I18N.t('no')).join(', ');
                const wrongTextEs = wrong.map(b => b ? 'Sí' : 'No').join(', ');
                if (wrongText !== correctCombo) {
                    answers.push({ text: wrongText, text_es: wrongTextEs, correct: false });
                }
            }
            return answers;
        }

        const answers = [];
        document.querySelectorAll('.answer-entry').forEach(el => {
            answers.push({
                text: el.querySelector('.answer-text').value.trim(),
                text_es: el.querySelector('.answer-text-es')?.value.trim() || '',
                correct: el.querySelector('.answer-correct').checked
            });
        });
        return answers;
    },

    onQuestionTypeChange() {
        const type = document.getElementById('questionType').value;
        const answersGroup = document.getElementById('answersEditor').parentElement;
        const addAnswerBtn = document.getElementById('btnAddAnswer');
        const bracketGroup = document.getElementById('bracketContextGroup');
        const statementsGroup = document.getElementById('statementsGroup');

        // Show/hide bracket context field
        if (bracketGroup) bracketGroup.style.display = type === 'evaluate' ? 'block' : 'none';
        // Show/hide statements editor
        if (statementsGroup) statementsGroup.style.display = type === 'statements' ? 'block' : 'none';
        // Show/hide add answer button
        if (addAnswerBtn) addAnswerBtn.style.display = (type === 'yesno' || type === 'statements') ? 'none' : 'inline-flex';

        // Reset answers for type change
        if (type === 'yesno') {
            this.renderAnswersEditor([{ text: 'Yes', text_es: 'Sí', correct: true }, { text: 'No', text_es: 'No', correct: false }]);
        } else if (type === 'evaluate') {
            const current = this.getAnswersFromEditor();
            if (!current.length || current[0]?.text !== 'No change needed') {
                this.renderAnswersEditor([
                    { text: 'No change needed', text_es: 'No se necesita cambio', correct: false },
                    { text: '', correct: false },
                    { text: '', correct: false }
                ]);
            }
        } else if (type === 'statements') {
            if (!document.querySelector('.statement-entry')) {
                this.renderStatementsEditor([{ text: '', text_es: '', correct: true }]);
            }
            this.renderAnswersEditor([]);
        } else {
            // single/multi - keep existing answers or set defaults
            const current = this.getAnswersFromEditor();
            if (current.length === 0 || (current.length === 2 && current[0].text === 'Yes')) {
                this.renderAnswersEditor([
                    { text: '', correct: false },
                    { text: '', correct: false },
                    { text: '', correct: false },
                    { text: '', correct: false }
                ]);
            } else {
                this.renderAnswersEditor(current);
            }
        }
    },

    // ===== Statements Editor (for 'statements' type) =====
    renderStatementsEditor(statements) {
        const container = document.getElementById('statementsEditor');
        if (!container) return;
        container.innerHTML = statements.map((s, i) => `
            <div class="statement-entry">
                <span class="statement-num">${i + 1}.</span>
                <input type="text" class="statement-text" data-idx="${i}" value="${this.escapeHtml(s.text)}" placeholder="${I18N.t('statementPlaceholder')} (EN)">
                <input type="text" class="statement-text-es" data-idx="${i}" value="${this.escapeHtml(s.text_es || '')}" placeholder="Enunciado (ES)">
                <select class="statement-correct" data-idx="${i}">
                    <option value="yes" ${s.correct ? 'selected' : ''}>${I18N.t('yes')}</option>
                    <option value="no" ${!s.correct ? 'selected' : ''}>${I18N.t('no')}</option>
                </select>
                <button class="btn btn-danger btn-sm" onclick="App.removeStatement(${i})"><i class="fas fa-times"></i></button>
            </div>`).join('');
    },

    getStatementsFromEditor() {
        const statements = [];
        document.querySelectorAll('.statement-entry').forEach(el => {
            statements.push({
                text: el.querySelector('.statement-text').value.trim(),
                text_es: el.querySelector('.statement-text-es')?.value.trim() || '',
                correct: el.querySelector('.statement-correct').value === 'yes'
            });
        });
        return statements;
    },

    addStatementEntry() {
        const statements = this.getStatementsFromEditor();
        statements.push({ text: '', text_es: '', correct: true });
        this.renderStatementsEditor(statements);
    },

    removeStatement(idx) {
        const statements = this.getStatementsFromEditor();
        statements.splice(idx, 1);
        this.renderStatementsEditor(statements);
    },

    addAnswerEntry() {
        const answers = this.getAnswersFromEditor();
        answers.push({ text: '', correct: false });
        this.renderAnswersEditor(answers);
    },

    removeAnswer(idx) {
        const answers = this.getAnswersFromEditor();
        answers.splice(idx, 1);
        this.renderAnswersEditor(answers);
    },

    saveQuestion() {
        const text = document.getElementById('questionText').value.trim();
        const topic = document.getElementById('questionTopic').value;
        const subtopic = document.getElementById('questionSubtopic').value;
        const type = document.getElementById('questionType').value;
        const explanation = document.getElementById('questionExplanation').value.trim();
        const answers = this.getAnswersFromEditor().filter(a => a.text);

        if (!text) { this.toast(I18N.t('questionRequired'), 'error'); return; }

        // Validation varies by type
        if (type === 'yesno') {
            // Always valid - 2 answers auto-generated
        } else if (type === 'statements') {
            const statements = this.getStatementsFromEditor().filter(s => s.text);
            if (statements.length < 2) { this.toast(I18N.t('statementsList') + ': min 2', 'error'); return; }
        } else {
            if (answers.length < 2) { this.toast(I18N.t('minTwoAnswers'), 'error'); return; }
            if (!answers.some(a => a.correct)) { this.toast(I18N.t('needCorrectAnswer'), 'error'); return; }
        }

        const cert = this.getActiveCert();
        const text_es = document.getElementById('questionText_es').value.trim();
        const explanation_es = document.getElementById('questionExplanation_es').value.trim();
        const reference = document.getElementById('questionReference').value.trim();

        const question = {
            certId: cert.id,
            topic,
            subtopic,
            text,
            text_es,
            type,
            answers,
            explanation,
            explanation_es,
            reference
        };

        // Add type-specific fields
        if (type === 'evaluate') {
            question.bracketContext = document.getElementById('bracketContext')?.value.trim() || '';
            question.bracketContext_es = document.getElementById('bracketContext_es')?.value.trim() || '';
        }
        if (type === 'statements') {
            question.statements = this.getStatementsFromEditor().filter(s => s.text);
            // Auto-generate answers from statements
            question.answers = this.getAnswersFromEditor();
        }

        if (this.editingQuestionId) {
            question.id = this.editingQuestionId;
            Store.updateQuestion(question);
        } else {
            Store.addQuestion(question);
        }

        this.closeQuestionModal();
        this.renderQuestionsList();
        this.toast(I18N.t('save') + ' ✓', 'success');
    },

    deleteQuestion(id) {
        if (confirm(I18N.t('deleteQuestionConfirm'))) {
            Store.deleteQuestion(id);
            this.renderQuestionsList();
        }
    },

    toggleBookmarkFromList(id) {
        Store.toggleBookmark(id);
        this.renderQuestionsList();
    },

    // ===== Test Setup =====
    bindTestSetup() {
        document.querySelectorAll('input[name="testMode"]').forEach(r => {
            r.addEventListener('change', () => this.onTestModeChange());
        });
        document.getElementById('testTopic').addEventListener('change', () => {
            this.updateTestSubtopics();
            this.updateAvailableCount();
        });
        document.getElementById('testSubtopic').addEventListener('change', () => this.updateAvailableCount());
        document.getElementById('testQuestionCount').addEventListener('input', (e) => {
            document.getElementById('testQuestionCountLabel').textContent = e.target.value;
        });
        document.querySelectorAll('input[name="timerMode"]').forEach(r => {
            r.addEventListener('change', () => {
                document.getElementById('customTimerGroup').style.display =
                    document.querySelector('input[name="timerMode"]:checked').value === 'custom' ? 'block' : 'none';
            });
        });
        document.getElementById('btnStartTest').addEventListener('click', () => this.startTest());
    },

    renderTestSetup() {
        const cert = this.getActiveCert();
        const topicSel = document.getElementById('testTopic');
        topicSel.innerHTML = '';
        if (cert) {
            (cert.topics || []).forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.name;
                opt.textContent = t.name;
                topicSel.appendChild(opt);
            });
        }
        this.onTestModeChange();
        this.updateAvailableCount();
    },

    onTestModeChange() {
        const mode = document.querySelector('input[name="testMode"]:checked').value;
        document.getElementById('topicSelectGroup').style.display = mode === 'general' ? 'none' : 'block';
        document.getElementById('subtopicSelectGroup').style.display = mode === 'subtopic' ? 'block' : 'none';
        if (mode === 'subtopic') this.updateTestSubtopics();
        this.updateAvailableCount();
    },

    updateTestSubtopics() {
        const cert = this.getActiveCert();
        const topicName = document.getElementById('testTopic').value;
        const subSel = document.getElementById('testSubtopic');
        subSel.innerHTML = '';
        if (cert) {
            const topic = (cert.topics || []).find(t => t.name === topicName);
            if (topic) {
                (topic.subtopics || []).forEach(st => {
                    const opt = document.createElement('option');
                    opt.value = st;
                    opt.textContent = st;
                    subSel.appendChild(opt);
                });
            }
        }
        this.updateAvailableCount();
    },

    updateAvailableCount() {
        const questions = this.getFilteredTestQuestions();
        const label = document.getElementById('availableQuestions');
        label.textContent = I18N.t('availableQuestionsLabel', questions.length);
        const slider = document.getElementById('testQuestionCount');
        slider.max = Math.max(questions.length, 5);
        if (parseInt(slider.value) > questions.length) {
            slider.value = questions.length;
            document.getElementById('testQuestionCountLabel').textContent = questions.length;
        }
    },

    getFilteredTestQuestions() {
        const cert = this.getActiveCert();
        if (!cert) return [];
        let questions = Store.getQuestionsForCert(cert.id);
        const mode = document.querySelector('input[name="testMode"]:checked').value;
        if (mode === 'topic') {
            const topic = document.getElementById('testTopic').value;
            questions = questions.filter(q => q.topic === topic);
        } else if (mode === 'subtopic') {
            const topic = document.getElementById('testTopic').value;
            const subtopic = document.getElementById('testSubtopic').value;
            questions = questions.filter(q => q.topic === topic && q.subtopic === subtopic);
        }
        return questions;
    },

    // ===== Test Engine =====
    bindTestEngine() {
        document.getElementById('btnCheckAnswer').addEventListener('click', () => this.checkAnswer());
        document.getElementById('btnPrevQuestion').addEventListener('click', () => this.prevQuestion());
        document.getElementById('btnNextQuestion').addEventListener('click', () => this.nextQuestion());
        document.getElementById('btnFinishTest').addEventListener('click', () => this.finishTest());
        document.getElementById('btnFlagQuestion').addEventListener('click', () => this.flagCurrentQuestion());
    },

    startTest() {
        const available = this.getFilteredTestQuestions();
        const count = Math.min(parseInt(document.getElementById('testQuestionCount').value), available.length);

        if (count === 0) {
            this.toast(I18N.t('noQuestionsAvailable'), 'error');
            return;
        }

        // Shuffle and pick
        const shuffled = [...available].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count).map(q => ({
            ...q,
            answers: (q.type === 'yesno' || q.type === 'statements') ? [...q.answers] : [...q.answers].sort(() => Math.random() - 0.5), // don't shuffle yesno/statements
            userAnswers: [],
            checked: false
        }));

        const mode = document.querySelector('input[name="testMode"]:checked').value;
        const timerMode = document.querySelector('input[name="timerMode"]:checked').value;
        let timerSeconds = 0;
        if (timerMode === 'exam') timerSeconds = 85 * 60;
        else if (timerMode === 'custom') timerSeconds = parseInt(document.getElementById('customTimerMinutes').value) * 60;

        this.testState = {
            questions: selected,
            currentIndex: 0,
            startTime: Date.now(),
            timerSeconds,
            timerRemaining: timerSeconds,
            mode,
            topicFilter: document.getElementById('testTopic').value,
            subtopicFilter: document.getElementById('testSubtopic').value,
            certId: Store.getActiveCertId()
        };

        if (timerSeconds > 0) this.startTimer();
        this.showView('test');
        this.renderTestQuestion();
    },

    startTimer() {
        const timerEl = document.getElementById('testTimer');
        timerEl.style.display = 'flex';
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.testState.timerRemaining--;
            this.updateTimerDisplay();

            if (this.testState.timerRemaining <= 300) {
                timerEl.className = 'test-timer warning';
            }
            if (this.testState.timerRemaining <= 60) {
                timerEl.className = 'test-timer danger';
            }
            if (this.testState.timerRemaining <= 0) {
                this.stopTimer();
                this.finishTest(true);
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    updateTimerDisplay() {
        const s = this.testState.timerRemaining;
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        document.getElementById('timerDisplay').textContent =
            `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    renderTestQuestion() {
        const state = this.testState;
        const q = state.questions[state.currentIndex];
        const total = state.questions.length;
        const current = state.currentIndex + 1;

        // Progress
        document.getElementById('testProgressText').textContent = `${current} / ${total}`;
        document.getElementById('testProgressBar').style.width = `${(current / total) * 100}%`;

        // Topic badge
        document.getElementById('testQuestionTopic').textContent = `${q.topic} > ${q.subtopic || ''}`;

        // Question text
        document.getElementById('testQuestionText').textContent = this.lt(q, 'text');

        // Hint for multi-answer
        const hint = document.getElementById('testQuestionHint');
        if (q.type === 'multi') {
            const correctCount = q.answers.filter(a => a.correct).length;
            hint.textContent = I18N.currentLang === 'es'
                ? `(Selecciona ${correctCount} respuestas)`
                : `(Select ${correctCount} answers)`;
            hint.style.display = 'block';
        } else if (q.type === 'evaluate' && q.bracketContext) {
            hint.innerHTML = `<em>${this.escapeHtml(this.lt(q, 'bracketContext'))}</em>`;
            hint.style.display = 'block';
        } else if (q.type === 'statements' && q.statements) {
            const stmtHtml = q.statements.map((s, i) =>
                `<div class="statement-line">${i + 1}. ${this.escapeHtml(this.lt(s, 'text'))}</div>`
            ).join('');
            hint.innerHTML = stmtHtml;
            hint.style.display = 'block';
        } else {
            hint.style.display = 'none';
        }

        // Answers
        const optionsContainer = document.getElementById('testAnswerOptions');

        if (q.type === 'yesno') {
            // Render big Yes/No buttons
            optionsContainer.innerHTML = q.answers.map((a, i) => {
                const isSelected = q.userAnswers.includes(i);
                const isYes = a.text === 'Yes' || a.text === 'Sí';
                let classes = `yesno-option ${isYes ? 'yes' : 'no'}`;
                if (isSelected && !q.checked) classes += ' selected';
                if (q.checked) {
                    classes += ' checked';
                    if (a.correct && isSelected) classes += ' correct';
                    else if (a.correct && !isSelected) classes += ' missed';
                    else if (!a.correct && isSelected) classes += ' incorrect';
                }
                return `
                    <div class="${classes}" data-idx="${i}" onclick="App.selectAnswer(${i})">
                        <i class="fas fa-${isYes ? 'check' : 'times'}"></i>
                        <span>${this.escapeHtml(this.lt(a, 'text'))}</span>
                    </div>`;
            }).join('');
        } else if (q.type === 'statements') {
            // Render combo answers with statement context
            optionsContainer.innerHTML = q.answers.map((a, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = q.userAnswers.includes(i);
                let classes = 'answer-option statements-option';
                if (isSelected && !q.checked) classes += ' selected';
                if (q.checked) {
                    classes += ' checked';
                    if (a.correct && isSelected) classes += ' correct';
                    else if (a.correct && !isSelected) classes += ' missed';
                    else if (!a.correct && isSelected) classes += ' incorrect';
                }
                // Format: show each statement number with its yes/no value
                const vals = a.text.split(', ');
                const comboHtml = (q.statements || []).map((s, si) =>
                    `<span class="stmt-val">${si + 1}=${vals[si] || '?'}</span>`
                ).join(' ');
                return `
                    <div class="${classes}" data-idx="${i}" onclick="App.selectAnswer(${i})">
                        <span class="answer-marker">${letter}</span>
                        <span class="stmt-combo">${comboHtml}</span>
                    </div>`;
            }).join('');
        } else {
            // Standard single/multi/evaluate rendering
            optionsContainer.innerHTML = q.answers.map((a, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = q.userAnswers.includes(i);
                let classes = `answer-option ${q.type === 'multi' ? 'multi' : ''}`;
                if (isSelected && !q.checked) classes += ' selected';

                if (q.checked) {
                    classes += ' checked';
                    if (a.correct && isSelected) classes += ' correct';
                    else if (a.correct && !isSelected) classes += ' missed';
                    else if (!a.correct && isSelected) classes += ' incorrect';
                }

                return `
                    <div class="${classes}" data-idx="${i}" onclick="App.selectAnswer(${i})">
                        <span class="answer-marker">${letter}</span>
                        <span>${this.escapeHtml(this.lt(a, 'text'))}</span>
                    </div>`;
            }).join('');
        }

        // Explanation
        const explDiv = document.getElementById('testExplanation');
        if (q.checked && q.explanation) {
            document.getElementById('testExplanationText').textContent = this.lt(q, 'explanation');
            explDiv.style.display = 'block';
        } else {
            explDiv.style.display = 'none';
        }

        // Reference link
        const refLink = document.getElementById('testReferenceLink');
        if (q.checked && q.reference) {
            refLink.href = q.reference;
            document.getElementById('testReferenceLinkUrl').textContent = q.reference;
            refLink.style.display = 'inline-flex';
        } else {
            refLink.style.display = 'none';
        }

        // Buttons
        document.getElementById('btnCheckAnswer').style.display = q.checked ? 'none' : 'inline-flex';
        document.getElementById('btnPrevQuestion').style.display = state.currentIndex > 0 ? 'inline-flex' : 'none';

        const isLast = state.currentIndex === total - 1;
        document.getElementById('btnNextQuestion').style.display = isLast ? 'none' : 'inline-flex';
        document.getElementById('btnFinishTest').style.display = isLast ? 'inline-flex' : 'none';

        // Bookmark icon
        const bookmarked = Store.isBookmarked(q.id);
        document.querySelector('#btnFlagQuestion i').className = bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
    },

    selectAnswer(idx) {
        const q = this.testState.questions[this.testState.currentIndex];
        if (q.checked) return;

        if (q.type === 'multi') {
            const pos = q.userAnswers.indexOf(idx);
            if (pos === -1) q.userAnswers.push(idx);
            else q.userAnswers.splice(pos, 1);
        } else {
            q.userAnswers = [idx];
        }
        this.renderTestQuestion();
    },

    checkAnswer() {
        const q = this.testState.questions[this.testState.currentIndex];
        q.checked = true;
        this.renderTestQuestion();
    },

    prevQuestion() {
        if (this.testState.currentIndex > 0) {
            this.testState.currentIndex--;
            this.renderTestQuestion();
        }
    },

    nextQuestion() {
        if (this.testState.currentIndex < this.testState.questions.length - 1) {
            this.testState.currentIndex++;
            this.renderTestQuestion();
        }
    },

    flagCurrentQuestion() {
        const q = this.testState.questions[this.testState.currentIndex];
        Store.toggleBookmark(q.id);
        this.renderTestQuestion();
    },

    finishTest(timeUp = false) {
        const state = this.testState;
        if (!timeUp) {
            const unanswered = state.questions.filter(q => q.userAnswers.length === 0).length;
            if (unanswered > 0 && !confirm(I18N.t('finishTestConfirm', unanswered))) return;
        }

        this.stopTimer();

        // Calculate results
        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;
        const topicScores = {};

        state.questions.forEach(q => {
            const correctIndices = q.answers.map((a, i) => a.correct ? i : -1).filter(i => i !== -1);
            const isCorrect = q.userAnswers.length > 0 &&
                q.userAnswers.length === correctIndices.length &&
                q.userAnswers.every(i => correctIndices.includes(i));

            if (q.userAnswers.length === 0) {
                unanswered++;
                q.result = 'unanswered';
            } else if (isCorrect) {
                correct++;
                q.result = 'correct';
            } else {
                incorrect++;
                q.result = 'incorrect';
            }

            // Track per topic
            if (!topicScores[q.topic]) topicScores[q.topic] = { correct: 0, total: 0 };
            topicScores[q.topic].total++;
            if (q.result === 'correct') topicScores[q.topic].correct++;
        });

        const score = Math.round((correct / state.questions.length) * 100);
        const elapsed = Math.round((Date.now() - state.startTime) / 1000);

        // Save history
        const modeLabel = state.mode === 'general' ? I18N.t('general') :
            state.mode === 'subtopic' ? state.subtopicFilter : state.topicFilter;

        Store.addHistory({
            certId: state.certId,
            certCode: Store.getCertification(state.certId)?.code || '',
            mode: modeLabel,
            score,
            correct,
            incorrect,
            unanswered,
            total: state.questions.length,
            elapsed,
            topicScores
        });

        // Show results
        this.renderResults(score, correct, incorrect, unanswered, elapsed, topicScores, state.questions);
        this.showView('results');
    },

    // ===== Results =====
    bindResultsView() {
        document.getElementById('btnRetakeTest').addEventListener('click', () => this.showView('test-setup'));
        document.getElementById('btnBackToDashboard').addEventListener('click', () => this.showView('dashboard'));
    },

    renderResults(score, correct, incorrect, unanswered, elapsed, topicScores, questions) {
        // Score circle
        const circumference = 2 * Math.PI * 54; // r=54
        const offset = circumference - (score / 100) * circumference;
        const circle = document.getElementById('scoreCircle');
        circle.style.strokeDashoffset = offset;
        circle.className = `score-fill ${score >= 70 ? 'pass' : 'fail'}`;

        document.getElementById('resultScore').textContent = score + '%';
        document.getElementById('resultPassFail').textContent = score >= 70 ? I18N.t('passed') : I18N.t('failed');
        document.getElementById('resultCorrect').textContent = correct;
        document.getElementById('resultIncorrect').textContent = incorrect;
        document.getElementById('resultUnanswered').textContent = unanswered;

        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        document.getElementById('resultTime').textContent = `${mins}m ${secs}s`;

        // Topic breakdown
        const breakdownDiv = document.getElementById('topicBreakdown');
        breakdownDiv.innerHTML = Object.entries(topicScores).map(([topic, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            const color = pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--danger)';
            return `
                <div class="topic-breakdown-item">
                    <span class="tb-name">${this.escapeHtml(topic)}</span>
                    <div class="tb-bar"><div class="tb-bar-fill" style="width:${pct}%; background:${color};"></div></div>
                    <span class="tb-score" style="color:${color};">${data.correct}/${data.total} (${pct}%)</span>
                </div>`;
        }).join('');

        // Question review
        const reviewDiv = document.getElementById('questionReview');
        reviewDiv.innerHTML = questions.map((q, i) => {
            const correctAnswers = q.answers.filter(a => a.correct).map(a => this.lt(a, 'text')).join(', ');
            const userAnswers = q.userAnswers.map(idx => this.lt(q.answers[idx] || {}, 'text')).join(', ') || I18N.t('notAnswered');
            const cls = q.result === 'correct' ? 'review-correct' :
                         q.result === 'incorrect' ? 'review-incorrect' : 'review-unanswered';

            return `
                <div class="review-item ${cls}">
                    <div class="review-q">${i + 1}. ${this.escapeHtml(this.lt(q, 'text'))}</div>
                    <div class="review-your-answer">${I18N.t('yourAnswer')} ${this.escapeHtml(userAnswers)}</div>
                    <div class="review-correct-answer">${I18N.t('correctAnswer')} ${this.escapeHtml(correctAnswers)}</div>
                    ${this.lt(q, 'explanation') ? `<div class="review-explanation">${this.escapeHtml(this.lt(q, 'explanation'))}</div>` : ''}
                </div>`;
        }).join('');
    },

    // ===== Progress =====
    renderProgress() {
        const cert = this.getActiveCert();
        const container = document.getElementById('progressContent');
        let history = Store.getHistory();

        if (cert) {
            history = history.filter(h => h.certId === cert.id);
        }

        if (history.length === 0) {
            container.innerHTML = `<p class="text-muted">${I18N.t('noHistory')}</p>`;
            return;
        }

        // Topic performance aggregation
        const topicAgg = {};
        history.forEach(h => {
            if (h.topicScores) {
                Object.entries(h.topicScores).forEach(([topic, data]) => {
                    if (!topicAgg[topic]) topicAgg[topic] = { correct: 0, total: 0, attempts: 0 };
                    topicAgg[topic].correct += data.correct;
                    topicAgg[topic].total += data.total;
                    topicAgg[topic].attempts++;
                });
            }
        });

        let topicPerfHtml = '';
        if (Object.keys(topicAgg).length > 0) {
            topicPerfHtml = `<h3>${I18N.t('topicPerformance')}</h3><div class="topic-breakdown" style="margin-bottom:2rem;">` +
                Object.entries(topicAgg).map(([topic, data]) => {
                    const pct = Math.round((data.correct / data.total) * 100);
                    const color = pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--danger)';
                    return `
                        <div class="topic-breakdown-item">
                            <span class="tb-name">${this.escapeHtml(topic)}</span>
                            <div class="tb-bar"><div class="tb-bar-fill" style="width:${pct}%; background:${color};"></div></div>
                            <span class="tb-score" style="color:${color};">${pct}% (${data.attempts} ${I18N.t('attempts')})</span>
                        </div>`;
                }).join('') + '</div>';
        }

        const historyRows = history.slice(0, 50).map(h => {
            const d = new Date(h.date);
            const dateStr = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const scoreColor = h.score >= 70 ? 'var(--success)' : 'var(--danger)';
            return `<tr>
                <td>${dateStr}</td>
                <td>${this.escapeHtml(h.certCode || '')}</td>
                <td>${this.escapeHtml(h.mode || '')}</td>
                <td style="color:${scoreColor}; font-weight:700;">${h.score}%</td>
                <td>${h.correct}/${h.total}</td>
            </tr>`;
        }).join('');

        container.innerHTML = `
            ${topicPerfHtml}
            <div class="progress-history">
                <h3>${I18N.t('testHistory')}</h3>
                <table class="history-table">
                    <thead><tr>
                        <th>${I18N.t('date')}</th>
                        <th>${I18N.t('certification')}</th>
                        <th>${I18N.t('scope')}</th>
                        <th>${I18N.t('score')}</th>
                        <th>${I18N.t('questions')}</th>
                    </tr></thead>
                    <tbody>${historyRows}</tbody>
                </table>
            </div>`;
    },

    // ===== Import / Export =====
    bindImportExport() {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');

        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            if (e.dataTransfer.files.length) this.handleImportFile(e.dataTransfer.files[0]);
        });
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) this.handleImportFile(e.target.files[0]);
        });

        document.getElementById('btnConfirmImport').addEventListener('click', () => this.confirmImport());
        document.getElementById('btnExportJSON').addEventListener('click', () => this.exportJSON());
        document.getElementById('btnDownloadTemplate').addEventListener('click', () => this.downloadTemplate());
    },

    renderImportExport() {
        const sel = document.getElementById('exportCertFilter');
        const certs = Store.getCertifications();
        sel.innerHTML = `<option value="all">${I18N.t('allCertifications')}</option>`;
        certs.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.code} - ${c.name}`;
            sel.appendChild(opt);
        });
    },

    pendingImportData: null,

    handleImportFile(file) {
        const ext = file.name.split('.').pop().toLowerCase();

        if (ext === 'json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.previewImport(data);
                } catch {
                    this.toast(I18N.t('importError'), 'error');
                }
            };
            reader.readAsText(file);
        } else if (ext === 'xlsx' || ext === 'xls') {
            this.toast('Excel import: Please convert to JSON using the template format. Excel parsing requires a library (SheetJS) — add it for full Excel support.', 'info');
        }
    },

    previewImport(data) {
        this.pendingImportData = data;
        const preview = document.getElementById('importPreview');
        const certCount = data.certifications ? data.certifications.length : 0;
        const qCount = data.questions ? data.questions.length : 0;
        preview.innerHTML = `
            <p><strong>${I18N.t('importPreviewCerts', certCount)}</strong></p>
            <p><strong>${I18N.t('importPreviewQuestions', qCount)}</strong></p>
            ${data.certifications ? data.certifications.map(c => `<p>• ${this.escapeHtml(c.code)} - ${this.escapeHtml(c.name)}</p>`).join('') : ''}
        `;
        preview.style.display = 'block';
        document.getElementById('btnConfirmImport').style.display = 'inline-flex';
    },

    confirmImport() {
        if (!this.pendingImportData) return;
        const result = Store.importData(this.pendingImportData);
        this.pendingImportData = null;
        document.getElementById('importPreview').style.display = 'none';
        document.getElementById('btnConfirmImport').style.display = 'none';
        document.getElementById('fileInput').value = '';
        this.refreshCertSelector();
        this.toast(I18N.t('importSuccess'), 'success');
    },

    exportJSON() {
        const options = {
            certs: document.getElementById('exportCerts').checked,
            questions: document.getElementById('exportQuestions').checked,
            progress: document.getElementById('exportProgress').checked,
            certId: document.getElementById('exportCertFilter').value
        };
        const data = Store.exportData(options);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quiz-export-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.toast(I18N.t('exportSuccess'), 'success');
    },

    downloadTemplate() {
        const cert = this.getActiveCert();
        const template = {
            certifications: [
                {
                    code: cert?.code || 'CERT-CODE',
                    name: cert?.name || 'Certification Name',
                    description: 'Description here',
                    link: 'https://learn.microsoft.com/...',
                    topics: cert?.topics || [
                        {
                            name: 'Topic 1',
                            link: '',
                            subtopics: ['Subtopic 1.1', 'Subtopic 1.2']
                        }
                    ]
                }
            ],
            questions: [
                {
                    certId: cert?.id || 'certification-id',
                    topic: cert?.topics?.[0]?.name || 'Topic 1',
                    subtopic: cert?.topics?.[0]?.subtopics?.[0] || 'Subtopic 1.1',
                    text: 'What is the correct answer?',
                    text_es: '¿Cuál es la respuesta correcta?',
                    type: 'single',
                    answers: [
                        { text: 'Answer A', text_es: 'Respuesta A', correct: true },
                        { text: 'Answer B', text_es: 'Respuesta B', correct: false },
                        { text: 'Answer C', text_es: 'Respuesta C', correct: false },
                        { text: 'Answer D', text_es: 'Respuesta D', correct: false }
                    ],
                    explanation: 'Explanation of why Answer A is correct.',
                    explanation_es: 'Explicación de por qué la Respuesta A es correcta.'
                },
                {
                    certId: cert?.id || 'certification-id',
                    topic: cert?.topics?.[0]?.name || 'Topic 1',
                    subtopic: cert?.topics?.[0]?.subtopics?.[0] || 'Subtopic 1.1',
                    text: 'Select all that apply:',
                    text_es: 'Selecciona todas las que apliquen:',
                    type: 'multi',
                    answers: [
                        { text: 'Correct option 1', text_es: 'Opción correcta 1', correct: true },
                        { text: 'Correct option 2', text_es: 'Opción correcta 2', correct: true },
                        { text: 'Wrong option', text_es: 'Opción incorrecta', correct: false }
                    ],
                    explanation: 'Both option 1 and 2 are correct because...',
                    explanation_es: 'Ambas opciones 1 y 2 son correctas porque...'
                }
            ]
        };

        const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quiz-template.json';
        a.click();
        URL.revokeObjectURL(url);
    },

    // ===== Utility =====
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    lt(obj, field) {
        if (I18N.currentLang !== 'en') {
            const v = obj[field + '_' + I18N.currentLang];
            if (v) return v;
        }
        return obj[field] || '';
    },

    toast(message, type = 'info') {
        const el = document.getElementById('toast');
        el.textContent = message;
        el.className = `toast ${type}`;
        el.style.display = 'block';
        clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => { el.style.display = 'none'; }, 3000);
    }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
