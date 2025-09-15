"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("flow", "signIn");

      await signIn("password", formData);
      router.replace("/");
    } catch (err: any) {
      setError(err?.message ?? "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Sign in to your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={submitting}
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button className="w-full" type="submit" disabled={submitting}>
                  {submitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              <Separator />
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Don't have an account?</span>
                <Button variant="link" asChild>
                  <Link href="/register">Create one</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
