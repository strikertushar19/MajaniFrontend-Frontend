'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' for App Router

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirect to the login page on client-side only
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Content */}
    </main>
  );
}
