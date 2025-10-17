"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-red-500 font-semibold">Error: {error.message}</p>
    </div>
  );
}
