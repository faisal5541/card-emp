import React, { useState, useEffect } from 'react';
import { TEMPLATES, DEFAULT_TEMPLATE, getTemplateById } from './config/templates';
import { CardTemplate, ToastMessage, ToastType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { Home } from './pages/Home';
import { TemplatesPage } from './pages/TemplatesPage';
import { CardEditor } from './components/CardEditor';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'templates' | 'editor'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(DEFAULT_TEMPLATE);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [debugMode, setDebugMode] = useState<boolean>(false);

  // Initialize from URL parameters on first load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateParam = params.get('template');
    const debugParam = params.get('debug') === 'true';
    const pageParam = params.get('page');

    if (templateParam) {
      const matched = getTemplateById(templateParam);
      setSelectedTemplate(matched);
      setCurrentTab('editor');
    } else if (pageParam === 'editor') {
      setCurrentTab('editor');
    } else if (pageParam === 'templates') {
      setCurrentTab('templates');
    }

    if (debugParam) {
      setDebugMode(true);
      setCurrentTab('editor');
    }
  }, []);

  // Update URL seamlessly without reload
  const updateUrl = (tab: 'home' | 'templates' | 'editor', tplId?: string) => {
    const params = new URLSearchParams(window.location.search);
    if (tab === 'home') {
      params.delete('page');
      params.delete('template');
    } else if (tab === 'templates') {
      params.set('page', 'templates');
    } else if (tab === 'editor') {
      params.set('page', 'editor');
      if (tplId) {
        params.set('template', tplId);
      }
    }

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleNavigate = (tab: 'home' | 'templates' | 'editor') => {
    setCurrentTab(tab);
    updateUrl(tab, tab === 'editor' ? selectedTemplate.id : undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplate = (template: CardTemplate) => {
    setSelectedTemplate(template);
    updateUrl(currentTab, template.id);
  };

  // Toast System
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastMessage = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-800">
      
      {/* Official Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            templates={TEMPLATES}
            onStart={() => handleNavigate('templates')}
            onSelectTemplate={(tpl) => {
              handleSelectTemplate(tpl);
              handleNavigate('editor');
            }}
          />
        )}

        {currentTab === 'templates' && (
          <TemplatesPage
            templates={TEMPLATES}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
            onProceedToEditor={() => handleNavigate('editor')}
          />
        )}

        {currentTab === 'editor' && (
          <CardEditor
            templates={TEMPLATES}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
            onNavigateToTemplates={() => handleNavigate('templates')}
            onShowToast={showToast}
            initialDebug={debugMode}
          />
        )}
      </main>

      {/* Official Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />

    </div>
  );
};
