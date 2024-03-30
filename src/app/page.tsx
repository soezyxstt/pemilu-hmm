"use client";

import Image from "next/image";
import { useState, type HTMLAttributes } from "react";

export default function Home() {
  const [uname, setUname] = useState("");
  const [nim, setNim] = useState("");

  return (
    <main className="z-10 flex items-center justify-center px-[7.5vw]">
      <div className="flex h-full w-1/2 items-center justify-center">
        <div className="flex h-[70vh] w-[30vw] flex-col items-center justify-center gap-8 rounded-[3rem] bg-white px-14 py-12">
          <Image
            src="/logo-hmm.png"
            alt="logo"
            width={200}
            height={200}
            className="mb-4"
          />
          <Input
            placeholder="NAMA LENGKAP"
            value={uname}
            onChange={(e) => {
              setUname(e.currentTarget.value.toUpperCase());
            }}
          />
          <Input placeholder="NIM" value={nim} type='number' onChange={(e) => {
            setNim(e.currentTarget.value);
          }} />
          <button className="flex w-full justify-center rounded-md bg-navy py-2.5 text-white">
            VOTE
          </button>
        </div>
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
  ...props
}: {
  placeholder: string;
    value: string;
  type?: string;
} & HTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type={type}
      value={value}
      className="w-full rounded-md border border-navy/80 px-4 py-2 shadow-md placeholder:text-navy/50"
      placeholder={placeholder}
      {...props}
    />
  );
};
