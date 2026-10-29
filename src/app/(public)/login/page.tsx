import LoginForm from "../../../components/login/login-form";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-8">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_45%)]" />

      <div className="absolute h-[min(31rem,90vw)] w-[min(31rem,90vw)] rounded-full bg-yellow-700/10 blur-3xl" />

      <LoginForm />

    </main>
  );
}