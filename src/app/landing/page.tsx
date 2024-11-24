import { CheckCircle, FileDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoSignin from "./_components/demo-signin";
import Header from "./_components/header";
import Link from "next/link";

async function LandingPage() {
  return (
    <>
      <Header />
      <section className="container min-h-screen pt-36 lg:pt-48">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
                Ask, Analyze, Act
              </h1>
              <div className="mx-auto mb-12 max-w-3xl text-balance">
                <p className="md:text-lg">
                  Create powerful surveys that drive results. Collect feedback,
                  uncover trends, and make data-driven decisions with ease.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <DemoSignin />
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href="https://github.com/Narek-Pogosian/Insights"
                    target="_blank"
                  >
                    Star on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-12 pt-6 md:pb-24 lg:pb-32">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Key Features
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded border bg-background-card p-8">
            <CheckCircle className="mb-2 size-10" />
            <h3 className="text-xl font-bold">Easy Survey Creation</h3>
            <p className="text-center text-foreground-muted">
              Intuitive interface to create surveys in minutes
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded border bg-background-card p-8">
            <Share2 className="mb-2 size-10" />
            <h3 className="text-xl font-bold">Simple Sharing</h3>
            <p className="text-center text-foreground-muted">
              Share surveys via link or embed on your website
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded border bg-background-card p-8">
            <FileDown className="mb-2 size-10" />
            <h3 className="text-xl font-bold">CSV Export</h3>
            <p className="text-center text-foreground-muted">
              Download survey responses as CSV for easy analysis
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
            How It Works
          </h2>
          <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center gap-2 rounded border bg-background-card p-8">
              <h3 className="text-xl font-bold">Create Your Survey</h3>
              <p className="text-center text-foreground-muted">
                Design your survey using our easy-to-use builder
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded border bg-background-card p-8">
              <h3 className="text-xl font-bold">Share with Your Audience</h3>
              <p className="text-center text-foreground-muted">
                Distribute your survey via a link or embed it on your site
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded border bg-background-card p-8">
              <h3 className="text-xl font-bold">Analyze Results</h3>
              <p className="text-center text-foreground-muted">
                View responses in real-time and export as CSV for deeper
                analysis
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl">
                Start Gathering Insights Today
              </h2>
              <p className="mx-auto max-w-[600px] text-balance text-foreground-muted md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who are making data-driven decisions
                with Insights.
              </p>
            </div>
            <DemoSignin />
          </div>
        </div>
      </section>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center gap-2 sm:flex-row">
          <p className="text-xs text-foreground-muted">
            © 2024 Insights. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
