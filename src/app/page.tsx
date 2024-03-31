"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, type HTMLAttributes } from "react";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [nim, setNim] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <main className="z-10 flex items-center justify-center px-[7.5vw]">
      <Toaster richColors />
      <div className="flex h-full w-1/2 items-center justify-center">
        <form
          className="flex h-[70vh] w-[30vw] flex-col items-center justify-center gap-8 rounded-[3rem] bg-white px-14 py-12"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const res = await signIn("credentials", {
              nim: nim,
              callbackUrl: "/vote",
              redirect: false,
            });

            if (res?.error) {
              toast.error(res.error, {
                duration: 2000,
                position: "top-right",
              });
            }

            if (res?.ok) {
              toast.success("Berhasil masuk!", {
                duration: 2000,
                position: "top-right",
              });
              void router.push("/vote");
            }

            setLoading(false);
            setNim("");
          }}
        >
          <Image
            src="/logo-hmm.png"
            alt="logo"
            width={200}
            height={200}
            className="mb-4"
          />
          <Input
            placeholder="NIM"
            value={nim}
            name='nim'
            type="number"
            onChange={(e) => {
              setNim(e.currentTarget.value);
            }}
          />
          <button disabled={loading} className="flex w-full justify-center rounded-md bg-navy py-2.5 text-white disabled:cursor-not-allowed">
            {loading ? "LOADING..." : "VOTE"}
          </button>
        </form>
      </div>
      <div className="relative flex h-full w-1/2 items-center justify-center">
        <Image
          src="/logo-yellboys.png"
          alt="logo"
          width={300}
          height={300}
          className="absolute left-1/2 -translate-x-1/2"
        />
        <div className="flex h-full gap-4">
          <div className="h-full w-9 bg-white"></div>
          <div className="h-full w-9 bg-white"></div>
          <div className="h-full w-9 bg-white"></div>
        </div>
      </div>
    </main>
  );
}

const Input = ({
  placeholder,
  value,
  type = "text",
  name,
  ...props
}: {
  placeholder: string;
  value: string;
    type?: string;
    name: string;
} & HTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      className="w-full rounded-md border border-navy/80 px-4 py-2 shadow-md placeholder:text-navy/50"
      placeholder={placeholder}
      {...props}
    />
  );
};
