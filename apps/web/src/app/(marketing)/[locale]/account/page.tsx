'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { User, Package, LogOut } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { clearApiToken } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/blocks/section';

export default function AccountPage() {
  const t = useTranslations('account');
  const tAuth = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace(`/${locale}/login`);
      } else {
        setEmail(data.user.email ?? null);
        setLoading(false);
      }
    });
  }, [locale, router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearApiToken();
    toast.success(tAuth('logout'));
    router.replace(`/${locale}`);
  };

  if (loading) {
    return (
      <Section>
        <div className="flex justify-center py-24">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-amber-300 border-t-amber-600" />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <User className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-semibold text-charcoal-900 dark:text-amber-50">
            {t('title')}
          </h1>
          <p className="mt-2 text-charcoal-600 dark:text-charcoal-300">{email}</p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/${locale}/orders`}
            className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/60 px-5 py-4 shadow-glass backdrop-blur-sm transition-colors hover:bg-amber-50/60 dark:border-white/8 dark:bg-charcoal-900/50 dark:hover:bg-charcoal-800/50"
          >
            <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-medium text-charcoal-900 dark:text-amber-50">{t('myOrders')}</p>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{t('myOrdersDescription')}</p>
            </div>
          </Link>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="mt-8 w-full rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/20"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {tAuth('logout')}
        </Button>
      </div>
    </Section>
  );
}
