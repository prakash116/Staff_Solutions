import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";
import { getSeo } from "@/lib/data";

export default function NotFound() {
  const seo = getSeo().pages.notFound;
  return (
    <PageContainer className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-display text-7xl font-semibold text-primary-text/70">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{seo?.title ?? "Page not found"}</h1>
      <p className="mt-3 max-w-md text-muted">{seo?.description ?? "The page you are looking for does not exist."}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" icon={<ArrowLeft size={16} />} iconPosition="start">
          Back to home
        </Button>
        <Button href="/staff-categories" variant="secondary">
          Browse staff categories
        </Button>
      </div>
    </PageContainer>
  );
}
