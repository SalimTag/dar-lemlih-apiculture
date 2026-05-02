'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Package, Users, ShoppingBag, TrendingUp, Plus, Pencil, Trash2 } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/blocks/section';

type DashboardStats = {
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  totalProducts: number;
};

type Product = {
  id: number;
  slug: string;
  nameFr: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  images: string[];
  categoryName?: string;
};

type AdminOrder = {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
};

type PagedResponse<T> = { content: T[]; totalElements: number };

export default function AdminDashboardPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace(`/${locale}/login`);
      } else {
        setAuthorized(true);
        loadDashboard();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.allSettled([
        api.get<DashboardStats>('/api/admin/dashboard'),
        api.get<PagedResponse<Product>>('/api/admin/products?size=50'),
        api.get<PagedResponse<AdminOrder>>('/api/admin/orders?size=50'),
      ]);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (productsRes.status === 'fulfilled') setProducts(productsRes.value.content ?? []);
      if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value.content ?? []);
    } catch {
      // Silently degrade — admin may not be fully configured yet
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm(t('confirmDelete'))) return;
    try {
      await api.delete(`/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(t('productDeleted'));
    } catch {
      toast.error(t('deleteFailed'));
    }
  };

  const updateOrderStatus = async (orderNumber: string, status: string) => {
    try {
      await api.put(`/api/admin/orders/${orderNumber}/status`, { status });
      setOrders((prev) =>
        prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o)),
      );
      toast.success(t('statusUpdated'));
    } catch {
      toast.error(t('updateFailed'));
    }
  };

  if (!authorized) return null;

  return (
    <Section>
      <div className="mb-8 text-center">
        <h1 className="font-display text-hero text-charcoal-900 dark:text-amber-50">{t('title')}</h1>
      </div>

      {/* Tab nav */}
      <div className="mb-8 flex justify-center gap-2">
        {(['dashboard', 'products', 'orders'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-amber-500 text-white shadow-card'
                : 'bg-white/60 text-charcoal-600 hover:bg-amber-50 dark:bg-charcoal-800/60 dark:text-charcoal-300'
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-amber-300 border-t-amber-600" />
        </div>
      ) : (
        <>
          {/* Dashboard tab */}
          {activeTab === 'dashboard' && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ShoppingBag, label: t('totalOrders'), value: stats?.totalOrders ?? '—' },
                { icon: Package, label: t('pendingOrders'), value: stats?.pendingOrders ?? '—' },
                { icon: Users, label: t('totalCustomers'), value: stats?.totalCustomers ?? '—' },
                { icon: TrendingUp, label: t('totalProducts'), value: stats?.totalProducts ?? '—' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3 rounded-3xl border border-white/15 bg-white/60 p-6 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50"
                >
                  <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  <p className="text-sm text-charcoal-500 dark:text-charcoal-400">{label}</p>
                  <p className="font-display text-3xl font-bold text-charcoal-900 dark:text-amber-50">{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Products tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" className="rounded-full" onClick={() => toast.info(t('createProductComingSoon'))}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('addProduct')}
                </Button>
              </div>
              {products.length === 0 ? (
                <p className="py-12 text-center text-charcoal-500 dark:text-charcoal-400">{t('noProducts')}</p>
              ) : (
                <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/60 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-sand-200/60 dark:border-charcoal-700/60">
                        <th className="px-4 py-3 text-left font-medium text-charcoal-600 dark:text-charcoal-300">{t('product')}</th>
                        <th className="px-4 py-3 text-right font-medium text-charcoal-600 dark:text-charcoal-300">{t('price')}</th>
                        <th className="px-4 py-3 text-right font-medium text-charcoal-600 dark:text-charcoal-300">{t('stock')}</th>
                        <th className="px-4 py-3 text-center font-medium text-charcoal-600 dark:text-charcoal-300">{t('status')}</th>
                        <th className="px-4 py-3 text-right font-medium text-charcoal-600 dark:text-charcoal-300">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-b border-sand-100/60 dark:border-charcoal-800/60 last:border-0">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {p.images?.[0] && (
                                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                                  <Image src={p.images[0]} alt={p.nameFr} fill className="object-cover" sizes="40px" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-charcoal-900 dark:text-amber-50">{p.nameFr}</p>
                                {p.categoryName && (
                                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{p.categoryName}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-charcoal-900 dark:text-amber-50">
                            {p.price} MAD
                          </td>
                          <td className="px-4 py-3 text-right text-charcoal-900 dark:text-amber-50">
                            {p.stockQuantity}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Badge variant={p.isActive ? 'default' : 'glass'}>
                              {p.isActive ? t('active') : t('inactive')}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"
                                onClick={() => toast.info(t('editComingSoon'))}>
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon"
                                className="h-8 w-8 rounded-full text-red-500 hover:text-red-600"
                                onClick={() => deleteProduct(p.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Orders tab */}
          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <p className="py-12 text-center text-charcoal-500 dark:text-charcoal-400">{t('noOrders')}</p>
              ) : (
                <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/60 shadow-glass backdrop-blur-sm dark:border-white/8 dark:bg-charcoal-900/50">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-sand-200/60 dark:border-charcoal-700/60">
                        <th className="px-4 py-3 text-left font-medium text-charcoal-600 dark:text-charcoal-300">{t('orderNumber')}</th>
                        <th className="px-4 py-3 text-right font-medium text-charcoal-600 dark:text-charcoal-300">{t('total')}</th>
                        <th className="px-4 py-3 text-center font-medium text-charcoal-600 dark:text-charcoal-300">{t('orderStatus')}</th>
                        <th className="px-4 py-3 text-right font-medium text-charcoal-600 dark:text-charcoal-300">{t('date')}</th>
                        <th className="px-4 py-3 text-right font-medium text-charcoal-600 dark:text-charcoal-300">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-sand-100/60 dark:border-charcoal-800/60 last:border-0">
                          <td className="px-4 py-3 font-mono text-charcoal-900 dark:text-amber-50">{o.orderNumber}</td>
                          <td className="px-4 py-3 text-right text-charcoal-900 dark:text-amber-50">
                            {o.total} {o.currency}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Badge variant="glass">{o.status}</Badge>
                          </td>
                          <td className="px-4 py-3 text-right text-charcoal-500 dark:text-charcoal-400">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-1">
                              {['CONFIRMED', 'SHIPPED', 'DELIVERED'].map((status) => (
                                <button
                                  key={status}
                                  className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-700 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300"
                                  onClick={() => updateOrderStatus(o.orderNumber, status)}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Section>
  );
}
