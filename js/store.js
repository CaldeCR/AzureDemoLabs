/* ===== Data Store (localStorage) ===== */
const Store = {
    KEYS: {
        CERTS: 'quiz_certifications',
        QUESTIONS: 'quiz_questions',
        HISTORY: 'quiz_history',
        ACTIVE_CERT: 'quiz_active_cert',
        BOOKMARKS: 'quiz_bookmarks',
    },

    _get(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    },

    _set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // ===== Certifications =====
    getCertifications() {
        return this._get(this.KEYS.CERTS) || [];
    },

    saveCertifications(certs) {
        this._set(this.KEYS.CERTS, certs);
    },

    getCertification(id) {
        return this.getCertifications().find(c => c.id === id);
    },

    addCertification(cert) {
        const certs = this.getCertifications();
        cert.id = cert.id || this._uid();
        certs.push(cert);
        this.saveCertifications(certs);
        return cert;
    },

    updateCertification(cert) {
        const certs = this.getCertifications();
        const idx = certs.findIndex(c => c.id === cert.id);
        if (idx !== -1) {
            certs[idx] = cert;
            this.saveCertifications(certs);
        }
    },

    deleteCertification(id) {
        let certs = this.getCertifications();
        certs = certs.filter(c => c.id !== id);
        this.saveCertifications(certs);
        // Also remove questions for this cert
        let questions = this.getQuestions();
        questions = questions.filter(q => q.certId !== id);
        this.saveQuestions(questions);
    },

    // ===== Questions =====
    getQuestions() {
        return this._get(this.KEYS.QUESTIONS) || [];
    },

    saveQuestions(questions) {
        this._set(this.KEYS.QUESTIONS, questions);
    },

    getQuestionsForCert(certId) {
        return this.getQuestions().filter(q => q.certId === certId);
    },

    addQuestion(question) {
        const questions = this.getQuestions();
        question.id = question.id || this._uid();
        questions.push(question);
        this.saveQuestions(questions);
        return question;
    },

    updateQuestion(question) {
        const questions = this.getQuestions();
        const idx = questions.findIndex(q => q.id === question.id);
        if (idx !== -1) {
            questions[idx] = question;
            this.saveQuestions(questions);
        }
    },

    deleteQuestion(id) {
        let questions = this.getQuestions();
        questions = questions.filter(q => q.id !== id);
        this.saveQuestions(questions);
    },

    // ===== History =====
    getHistory() {
        return this._get(this.KEYS.HISTORY) || [];
    },

    addHistory(entry) {
        const history = this.getHistory();
        entry.id = this._uid();
        entry.date = new Date().toISOString();
        history.unshift(entry);
        this._set(this.KEYS.HISTORY, history);
    },

    // ===== Bookmarks =====
    getBookmarks() {
        return this._get(this.KEYS.BOOKMARKS) || [];
    },

    toggleBookmark(questionId) {
        let bookmarks = this.getBookmarks();
        if (bookmarks.includes(questionId)) {
            bookmarks = bookmarks.filter(b => b !== questionId);
        } else {
            bookmarks.push(questionId);
        }
        this._set(this.KEYS.BOOKMARKS, bookmarks);
        return bookmarks.includes(questionId);
    },

    isBookmarked(questionId) {
        return this.getBookmarks().includes(questionId);
    },

    // ===== Active Certification =====
    getActiveCertId() {
        return localStorage.getItem(this.KEYS.ACTIVE_CERT) || '';
    },

    setActiveCertId(id) {
        localStorage.setItem(this.KEYS.ACTIVE_CERT, id);
    },

    // ===== Utility =====
    _uid() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
    },

    // ===== Import Merge =====
    importData(data) {
        let certCount = 0, questionCount = 0;

        if (data.certifications && Array.isArray(data.certifications)) {
            const existing = this.getCertifications();
            data.certifications.forEach(cert => {
                const match = existing.find(e => e.code === cert.code);
                if (match) {
                    // Merge topics
                    cert.topics?.forEach(t => {
                        const existingTopic = match.topics?.find(et => et.name === t.name);
                        if (!existingTopic) {
                            match.topics = match.topics || [];
                            match.topics.push(t);
                        } else {
                            // Merge subtopics
                            t.subtopics?.forEach(st => {
                                if (!existingTopic.subtopics?.includes(st)) {
                                    existingTopic.subtopics = existingTopic.subtopics || [];
                                    existingTopic.subtopics.push(st);
                                }
                            });
                        }
                    });
                    this.updateCertification(match);
                } else {
                    cert.id = cert.id || this._uid();
                    existing.push(cert);
                    certCount++;
                }
            });
            this.saveCertifications(existing);
        }

        if (data.questions && Array.isArray(data.questions)) {
            const existing = this.getQuestions();
            data.questions.forEach(q => {
                // Match by text to avoid duplicates
                const dup = existing.find(e => e.text === q.text && e.certId === q.certId);
                if (!dup) {
                    q.id = q.id || this._uid();
                    existing.push(q);
                    questionCount++;
                }
            });
            this.saveQuestions(existing);
        }

        if (data.history && Array.isArray(data.history)) {
            const existing = this.getHistory();
            data.history.forEach(h => {
                if (!existing.find(e => e.id === h.id)) {
                    existing.push(h);
                }
            });
            this._set(this.KEYS.HISTORY, existing);
        }

        return { certCount, questionCount };
    },

    // ===== Export =====
    exportData(options = {}) {
        const result = {};
        const certFilter = options.certId;

        if (options.certs !== false) {
            let certs = this.getCertifications();
            if (certFilter && certFilter !== 'all') {
                certs = certs.filter(c => c.id === certFilter);
            }
            result.certifications = certs;
        }

        if (options.questions !== false) {
            let questions = this.getQuestions();
            if (certFilter && certFilter !== 'all') {
                questions = questions.filter(q => q.certId === certFilter);
            }
            result.questions = questions;
        }

        if (options.progress !== false) {
            let history = this.getHistory();
            if (certFilter && certFilter !== 'all') {
                history = history.filter(h => h.certId === certFilter);
            }
            result.history = history;
        }

        return result;
    }
};
