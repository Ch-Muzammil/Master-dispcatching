import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "@/data/blog";
import { CtaSection } from "../home/cta-section";
import { ArticleBody } from "./article-body";
import { ArticleMeta } from "./article-meta";
import { PostCard } from "./post-card";

export function ArticlePageContent({ post, related }: { post: Post; related: Post[] }) {
  return (
    <>
      <article>
        <header className="border-b bg-paper">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:py-20">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="size-4" aria-hidden /> Back to insights
            </Link>
            <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6"><ArticleMeta post={post} /></div>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{post.authorInitials}</span>
              <span className="font-semibold">{post.author}</span>
              <span className="text-muted-foreground">· {post.authorRole}</span>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
          <Image src={post.cover} alt={post.coverAlt} width={1600} height={1008} className="aspect-[16/9] w-full rounded-2xl object-cover" priority />
        </div>
        <div className="mx-auto grid max-w-5xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:pb-20">
          <ArticleBody blocks={post.body} />
          <aside className="self-start rounded-xl border bg-paper p-5 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Need help?</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Talk with a dispatcher about your lanes and equipment.</p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">Contact us <ArrowRight className="size-4" aria-hidden /></Link>
          </aside>
        </div>
      </article>
      <section className="border-t bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">More from the desk</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">{related.map((item) => <PostCard key={item.slug} post={item} />)}</div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
