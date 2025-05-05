import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Receipt,
  Users,
  PieChart,
  Calculator,
  CreditCard,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Split Expenses - Easily Manage and Split Group Expenses</title>
        <meta
          name="description"
          content="Split Expenses is a simple, intuitive app for tracking, managing, and splitting expenses with friends, roommates, and groups."
        />
      </Head>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Receipt className="h-6 w-6" />
            <span>Split Expenses</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="https://www.amirsorayaei.com/split-expenses">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Split Expenses Effortlessly
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The simplest way to track, manage, and split expenses with
                    friends, roommates, and groups.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="https://www.amirsorayaei.com/split-expenses">
                      Try It Now
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full max-w-[500px] overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src="/images/hero.webp"
                      width={500}
                      height={300}
                      alt="Split Expenses Dashboard"
                      className="object-cover rounded-lg shadow-lg"
                      priority // Add this to prioritize loading this image
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 flex items-end p-6">
                      <div className="space-y-2 text-white">
                        <h3 className="font-bold">Manage All Your Expenses</h3>
                        <p className="text-sm opacity-90">
                          Create groups, add expenses, and split costs fairly
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simplify Group Expenses
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Split Expenses makes it easy to manage shared costs and keep
                  track of who owes what.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-3 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Create Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Organize expenses by creating groups for roommates, trips,
                    events, or projects.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-3 mb-4">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Split Fairly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Split expenses equally or customize amounts for each person
                    based on usage.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-3 mb-4">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Track Balances</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    See who owes what at a glance with clear balance summaries
                    and visualizations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Split Expenses makes managing shared costs simple in just a
                  few steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground mb-4">
                    1
                  </div>
                  <CardTitle>Create a Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Start by creating a new expense group and adding all the
                    members involved.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground mb-4">
                    2
                  </div>
                  <CardTitle>Add Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Record expenses as they happen, specifying who paid and how
                    it should be split.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground mb-4">
                    3
                  </div>
                  <CardTitle>Settle Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    View the balance summary and settle debts with minimal
                    transactions between members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Benefits
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  No more awkward money conversations
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Split Expenses takes the stress out of shared finances by
                  providing a clear, transparent system for tracking and
                  settling debts.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="https://www.amirsorayaei.com/split-expenses">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <ul className="grid gap-4">
                      <li className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-1">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">Save Time</h3>
                          <p className="text-muted-foreground">
                            Quickly add expenses and let the app handle all the
                            calculations automatically.
                          </p>
                        </div>
                      </li>
                      <Separator className="my-2" />
                      <li className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-1">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">Maintain Friendships</h3>
                          <p className="text-muted-foreground">
                            Keep relationships healthy by removing the friction
                            of money discussions.
                          </p>
                        </div>
                      </li>
                      <Separator className="my-2" />
                      <li className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-1">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">Minimize Transactions</h3>
                          <p className="text-muted-foreground">
                            Our smart algorithm suggests the fewest possible
                            payments to settle all debts.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about Split Expenses.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Is Split Expenses free to use?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, Split Expenses is currently free to use with all
                    features available to all users.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can I use Split Expenses on mobile?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, Split Expenses is fully responsive and works great on
                    mobile devices, tablets, and desktops.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How do I invite friends to my expense group?
                  </AccordionTrigger>
                  <AccordionContent>
                    After creating a group, you can add members by entering
                    their email addresses or sharing a unique invitation link.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Can I export my expense data?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you can export your expense data in CSV format for
                    record-keeping or further analysis.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Split Expenses?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start managing your shared expenses today and say goodbye to
                  financial awkwardness.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="https://www.amirsorayaei.com/split-expenses">
                    Get Started Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Stay Updated
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Subscribe to our newsletter
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the latest updates, new features, and tips for managing
                  your expenses.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <form className="flex w-full max-w-sm flex-col gap-2">
                  <Input type="email" placeholder="Enter your email" />
                  <Button type="submit">Subscribe</Button>
                  <p className="text-xs text-muted-foreground">
                    By subscribing, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Receipt className="h-5 w-5" />
            <span>Split Expenses</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Split Expenses. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
