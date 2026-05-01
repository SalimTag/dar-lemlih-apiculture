'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact.form');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call — in production this hits the Spring Boot API
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(t('success'));
    setSending(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="name"
          placeholder={t('name')}
          required
          aria-label={t('name')}
        />
        <Input
          name="email"
          type="email"
          placeholder={t('email')}
          required
          aria-label={t('email')}
        />
      </div>
      <Input
        name="subject"
        placeholder={t('subject')}
        required
        aria-label={t('subject')}
      />
      <div className="relative">
        <textarea
          name="message"
          placeholder={t('message')}
          required
          aria-label={t('message')}
          rows={5}
          className="w-full resize-none rounded-2xl border-0 bg-white/80 px-4 py-3.5 text-sm text-charcoal-900 shadow-inner placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:bg-charcoal-900/60 dark:text-amber-50 dark:placeholder:text-charcoal-500 dark:focus:ring-amber-600/40"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full sm:w-auto"
        disabled={sending}
      >
        {sending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {t('submit')}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            {t('submit')}
          </span>
        )}
      </Button>
    </form>
  );
}
