'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { supabaseBrowser } from '@/lib/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(8)
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

const resetSchema = z.object({
  email: z.string().email()
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;
type ResetValues = z.infer<typeof resetSchema>;

type AuthTabsProps = {
  onAuthenticated?: () => void;
};

function AuthTabs({ onAuthenticated }: AuthTabsProps) {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo') ?? `/${locale}/account`;

  const [tab, setTab] = useState<'login' | 'register' | 'reset'>('login');
  const [isPending, startTransition] = useTransition();

  const supabase = supabaseBrowser();

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  });

  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '' }
  });

  const handleAuthSuccess = () => {
    onAuthenticated?.();
    router.replace(redirectTo);
  };

  const handleLogin = loginForm.handleSubmit(values => {
    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(t('success'));
      loginForm.reset();
      handleAuthSuccess();
    });
  });

  const handleRegister = registerForm.handleSubmit(values => {
    startTransition(async () => {
      const { email, password } = values;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/${locale}/auth/callback` }
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(t('success'));
      registerForm.reset();
      setTab('login');
    });
  });

  const handleReset = resetForm.handleSubmit(values => {
    startTransition(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/${locale}/auth/callback`
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success('Check your inbox to continue.');
      resetForm.reset();
      setTab('login');
    });
  });

  return (
    <Tabs value={tab} onValueChange={value => setTab(value as typeof tab)} className="space-y-6">
      <TabsList className="w-full">
        <TabsTrigger value="login">{t('tabs.login')}</TabsTrigger>
        <TabsTrigger value="register">{t('tabs.register')}</TabsTrigger>
        <TabsTrigger value="reset">{t('tabs.reset')}</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="border-0 bg-transparent p-0 shadow-none">
        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder={t('email')}
            {...loginForm.register('email')}
            aria-invalid={!!loginForm.formState.errors.email}
          />
          <Input
            type="password"
            placeholder={t('password')}
            {...loginForm.register('password')}
            aria-invalid={!!loginForm.formState.errors.password}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '...' : t('submit')}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register" className="border-0 bg-transparent p-0 shadow-none">
        <form className="space-y-4" onSubmit={handleRegister}>
          <Input
            type="email"
            placeholder={t('email')}
            {...registerForm.register('email')}
            aria-invalid={!!registerForm.formState.errors.email}
          />
          <Input
            type="password"
            placeholder={t('password')}
            {...registerForm.register('password')}
            aria-invalid={!!registerForm.formState.errors.password}
          />
          <Input
            type="password"
            placeholder={t('confirmPassword')}
            {...registerForm.register('confirmPassword')}
            aria-invalid={!!registerForm.formState.errors.confirmPassword}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '...' : t('tabs.register')}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="reset" className="border-0 bg-transparent p-0 shadow-none">
        <form className="space-y-4" onSubmit={handleReset}>
          <Input
            type="email"
            placeholder={t('email')}
            {...resetForm.register('email')}
            aria-invalid={!!resetForm.formState.errors.email}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '...' : t('tabs.reset')}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}

export function AuthDialog() {
  const t = useTranslations('auth');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          {t('tabs.login')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('submit')}</DialogDescription>
        </DialogHeader>
        <AuthTabs onAuthenticated={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function AuthPanel() {
  const t = useTranslations('auth');

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-white/20 bg-white/80 p-10 shadow-glass backdrop-blur dark:border-white/10 dark:bg-charcoal-900/60">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900 dark:text-amber-50">
          {t('title')}
        </h1>
        <p className="text-sm text-charcoal-600 dark:text-charcoal-300">{t('submit')}</p>
      </div>
      <AuthTabs />
    </div>
  );
}
