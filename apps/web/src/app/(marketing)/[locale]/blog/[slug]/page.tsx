import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { Section } from '@/components/blocks/section';

// Static blog post data (matches blog list page — replace with contentlayer when MDX pipeline is active)
const BLOG_POSTS = [
  {
    id: '1',
    slug: 'atlas-thyme-honey-tagine',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    category: 'Recipe',
    title: 'Atlas Thyme Honey Glazed Tagine',
    excerpt: 'A refined take on the classic lamb tagine, elevated with our wild thyme honey from 2,400m altitude.',
    date: '2025-12-15',
    content: `
## A Honey That Changes Everything

Our Wild Thyme honey, harvested at 2,400m in the High Atlas, is unlike any ingredient you have used before. Its bold antiseptic character and complex mineral notes transform a classic Moroccan tagine into something extraordinary.

## Ingredients (serves 4)

- 1 kg lamb shoulder, cut into 5 cm cubes
- 3 tbsp Atlas Wild Thyme honey
- 2 preserved lemons, quartered
- 100 g green olives
- 1 onion, finely sliced
- 4 garlic cloves, crushed
- 1 tsp ras el hanout
- 1 tsp ground ginger
- ½ tsp saffron threads, steeped in 50 ml warm water
- 3 tbsp argan oil
- Salt and freshly ground black pepper
- Fresh coriander, to serve

## Method

1. Heat the argan oil in a heavy-bottomed tagine or casserole over medium heat. Season the lamb generously and brown in batches until golden on all sides. Set aside.

2. In the same pan, soften the onion for 8 minutes. Add the garlic and cook for 2 more minutes.

3. Return the lamb. Add ras el hanout, ginger, and the saffron water. Pour over enough water to come halfway up the meat.

4. Cover and simmer on the lowest possible heat for 1 hour 30 minutes, until the lamb is very tender.

5. Uncover, add the preserved lemons and olives, and drizzle over the honey. Simmer uncovered for a further 20 minutes until the sauce reduces to a glossy coating.

6. Taste, adjust seasoning, and scatter with fresh coriander. Serve with khobz or couscous.

## Chef's note

The honey is added late to preserve its volatile aromatics. Never boil honey — a gentle simmer is all it needs to caramelise and bind the sauce.
    `,
  },
  {
    id: '2',
    slug: 'understanding-moroccan-honey-terroir',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    category: 'Terroir',
    title: 'Understanding Moroccan Honey Terroir',
    excerpt: 'Like wine, honey expresses its geography. Explore how altitude, flora, and season shape each batch.',
    date: '2025-11-28',
    content: `
## What Is Terroir in Honey?

The concept of terroir — the complete natural environment in which a product is produced — is well established in wine. But it applies equally to honey, and perhaps more directly: bees are the ultimate terroir machines, collecting nectar from only the plants within a 3 km radius of their hive.

## Altitude and Mineral Complexity

In the High Atlas at 2,000–2,600m, the low density of agricultural activity means bees forage exclusively on wild flora. The cool nights concentrate aromatic compounds in the nectar. The result: honeys with a mineral tension and a long, complex finish that lowland honeys simply cannot replicate.

## Flora and Flavour Signatures

| Region | Dominant Flora | Flavour Profile |
|--------|---------------|-----------------|
| High Atlas | Wild thyme, euphorbia | Bold, aromatic, resinous |
| Souss-Massa | Euphorbia, argan blossom | Dark, powerful, slow-crystallising |
| Fès-Meknès | Orange blossom, eucalyptus | Light, floral, quick-crystallising |
| Rif | Carob, cedar | Smoky, complex, long finish |

## Reading a Honey Like a Sommelier

At Dar Lemlih, we encourage our customers to approach honey the way a sommelier approaches wine: look at the colour (darker = more complex), smell the aroma before tasting, and pay attention to the finish. The best honeys have a finish that evolves for 30 seconds after swallowing.

## Seasonality Matters

A batch of thyme honey from the spring bloom (May–June) will taste noticeably different from an autumn harvest. Spring honey is lighter and more floral; autumn honey is denser with more pronounced resinous notes as the bees fortify the hive for winter.

This is why we never blend batches. Every jar is a snapshot of a place and a moment in time.
    `,
  },
  {
    id: '3',
    slug: 'morning-honey-ritual',
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    category: 'Wellness',
    title: 'Morning Honey Ritual for Energy',
    excerpt: 'Discover the Berber tradition of raw honey and warm water — a simple ritual with profound benefits.',
    date: '2025-11-10',
    content: `
## The Berber Morning Ritual

For centuries, Berber communities in the Atlas mountains have begun their day with a simple but powerful ritual: a teaspoon of raw honey dissolved in warm (not boiling) water, consumed on an empty stomach before sunrise.

## Why It Works

Raw honey contains over 200 active compounds including:

- **Enzymes**: Diastase, invertase, and glucose oxidase that support digestion
- **Antioxidants**: Flavonoids and phenolic acids that combat oxidative stress
- **Natural sugars**: Fructose and glucose for immediate, sustained energy
- **Prebiotics**: Oligosaccharides that feed beneficial gut bacteria

When taken on an empty stomach, these compounds are absorbed quickly and efficiently.

## The Ritual Step by Step

1. Heat 200 ml of water to approximately 40°C (warm to the touch, never boiling)
2. Dissolve one generous teaspoon of raw honey — we recommend our Wild Thyme or Orange Blossom
3. Add a few drops of lemon juice if desired
4. Drink slowly, mindfully, before any food or coffee
5. Wait 20–30 minutes before eating breakfast

## Choosing the Right Honey

Not all honeys are equal for this ritual. You need raw, unfiltered honey to preserve the active enzymes and antioxidants. Commercially processed honeys are heated above 40°C during processing, destroying most of the beneficial compounds.

Our honeys are cold-extracted, minimally filtered, and never heated above ambient temperature. They are exactly what this ritual was designed for.

## A Word of Caution

This ritual is not suitable for infants under 12 months. If you are diabetic, consult your doctor before incorporating honey into your daily routine.
    `,
  },
];

type Props = { params: { slug: string; locale: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  return {
    title: post?.title ?? 'Article',
    description: post?.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <>
      <Section>
        <Link
          href={`/${params.locale}/blog`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-charcoal-500 transition-colors hover:text-charcoal-900 dark:text-charcoal-400 dark:hover:text-amber-100"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToBlog')}
        </Link>

        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <span className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              {post.category}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-charcoal-900 sm:text-5xl dark:text-amber-50">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-charcoal-600 dark:text-charcoal-300">{post.excerpt}</p>
            <time className="mt-3 block text-sm text-charcoal-400 dark:text-charcoal-500">
              {new Date(post.date).toLocaleDateString(
                params.locale === 'ar' ? 'ar-MA' : params.locale === 'fr' ? 'fr-FR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' },
              )}
            </time>
          </div>

          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl shadow-glass">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-charcoal-900 prose-p:text-charcoal-600 prose-a:text-amber-600 prose-strong:text-charcoal-900 prose-li:text-charcoal-600 prose-table:text-sm dark:prose-headings:text-amber-50 dark:prose-p:text-charcoal-300 dark:prose-a:text-amber-400 dark:prose-strong:text-amber-100 dark:prose-li:text-charcoal-300"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </div>
      </Section>
    </>
  );
}

// Lightweight markdown → HTML conversion for demo (replaces MDX pipeline for static content)
function markdownToHtml(md: string): string {
  return md
    .trim()
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\| (.+?) \|/g, (m) =>
      '<td class="border px-3 py-2">' + m.replace(/\| /g, '').replace(/ \|/g, '') + '</td>',
    )
    .replace(/^---$/gm, '<hr/>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|o|l|t|h])/gm, '')
    .replace(/(<p>\s*<\/p>)/g, '');
}
