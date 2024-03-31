"use client";

import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { toast, Toaster } from "sonner";
import { bungee, quicksand, rubikMonoOne } from "~/styles/font";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Vote({
  searchParams: { prince, senator, page },
}: {
  searchParams: { [key: string]: string };
}) {
  const princes = [
    { name: "Faris Ahmad Nashif", foto: "/faris.png", nickName: "Faris" },
    { name: "William Nathan", foto: "/wilnat.png", nickName: "Wilnat" },
  ];
  const senators = [
    { name: "Nika Avivatus S", foto: "/nika.png", nickName: "Nika" },
    { name: "M Dihya Dailamy", foto: "/dihya.png", nickName: "Dihya" },
  ];
  const router = useRouter();
  const timeOut: ReturnType<typeof setTimeout>[] = [];
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const votePrince = api.vote.votePrince.useMutation({
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
        position: "top-right",
      });
    },
  });
  const voteSenator = api.vote.voteSenator.useMutation({
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
        position: "top-right",
      });
    },
  });

  if (!data) {
    void router.push("/");
    return null;
  }

  return (
    <main className="z-10 flex items-center justify-center py-14">
      <Toaster richColors />
      <div className="h-full *:flex *:flex-col *:items-center *:gap-14 *:text-white">
        {(page === "1" || page === undefined) && (
          <div>
            <Title className="text-3xl [text-shadow:1px_2px_#061b3b]">
              Pemilihan Prince 2024
            </Title>
            <div className="flex gap-20">
              {princes.map((p, index) => (
                <div className="flex flex-col gap-6" key={p.name}>
                  <Card name={p.name} nomor={index + 1} foto={p.foto} />
                  <LinkButton
                    content={`Pilih ${p.nickName}`}
                    href={`/vote?prince=${index + 1}&page=2`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {page === "2" && (
          <div>
            <Title className="text-3xl [text-shadow:1px_2px_#061b3b]">
              Pemilihan Senator 2024
            </Title>
            <div className="flex gap-20">
              {senators.map((s, index) => (
                <div className="flex flex-col gap-6" key={s.name}>
                  <Card name={s.name} nomor={index + 1} foto={s.foto} />
                  <LinkButton
                    content={`Pilih ${s.nickName}`}
                    href={`/vote?prince=${prince}&senator=${index + 1}&page=3`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {page === "3" && (
          <div className="">
            <Title className="text-3xl [text-shadow:1px_2px_#061b3b]">
              Apakah Anda yakin dengan pilihan Anda?
            </Title>
            <form
              className="flex flex-col items-center gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                votePrince.mutate({ prince: prince! });
                voteSenator.mutate({ senator: senator! });
                setLoading(false);

                if (votePrince.isError && voteSenator.isError) {
                  toast.error("Gagal memilih!", {
                    duration: 2000,
                    position: "top-right",
                  });
                  return;
                }

                if (votePrince.isSuccess && voteSenator.isSuccess) {

                  void router.push("/vote?page=4");

                  const rTO = setTimeout(() => {
                    void signOut();
                  }, 3000);
                  timeOut.push(rTO);
                }
              }}
            >
              <div className="flex gap-20">
                <Card
                  name={princes[parseInt(prince!) - 1]?.name ?? ""}
                  nomor={parseInt(prince!)}
                  foto={princes[parseInt(prince!) - 1]?.foto ?? ""}
                />
                <Card
                  name={senators[parseInt(senator!) - 1]?.name ?? ""}
                  nomor={parseInt(senator!)}
                  foto={senators[parseInt(senator!) - 1]?.foto ?? ""}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={` w-full ${quicksand.className} rounded bg-blue-800 py-2 text-center font-semibold transition-colors hover:bg-blue-900 ${loading ? "cursor-not-allowed" : ""} disabled:opacity-80`}
              >
                {loading ? "LOADING..." : "YAKIN!"}
              </button>
            </form>
          </div>
        )}
        {page === "4" && (
          <div className="py-32">
            <Title className="text-3xl [text-shadow:1px_2px_#061b3b]">
              {" "}
              Terima kasih telah memilih!
            </Title>
            <Title className="flex h-[20vh] items-center justify-center text-center text-2xl text-navy [text-shadow:1px_1px_#FFFFFF]">
              Demikian suara Anda telah tercatat.
              <br />
              Yellboys!
            </Title>
            <button
              className={` w-72 ${quicksand.className} rounded bg-blue-800 py-2 text-center font-semibold transition-colors hover:bg-blue-900`}
              onClick={() => {
                void router.push("/");
                timeOut[0] && clearTimeout(timeOut[0]);
              }}
            >
              Kembali ke Halaman Utama
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

const LinkButton = ({
  content,
  href,
  className,
}: {
  content: string;
  className?: string;
} & LinkProps) => {
  return (
    <Link
      href={href}
      className={`${quicksand.className} rounded bg-blue-800 py-2 text-center font-semibold transition-colors hover:bg-blue-900 ${className}`}
    >
      {content.toUpperCase()}
    </Link>
  );
};

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`${rubikMonoOne.className} ${className}`}>{children}</h1>
  );
};

const Card = ({
  name,
  nomor,
  foto,
}: {
  name: string;
  nomor: number;
  foto: string;
}) => {
  return (
    <div className="flex h-[55vh] w-[20vw] flex-col-reverse items-center justify-between gap-4 rounded-xl border-2 border-blue-600 bg-blue-100 pt-10 text-navy">
      <Image
        src={foto}
        alt="foto"
        width={300}
        height={500}
        className="h-3/4 w-auto"
      />
      <div className="flex flex-col items-center gap-6">
        <h1 className={`${bungee.className} text-xl font-bold`}>
          {name.toUpperCase()}
        </h1>
        <Title>{nomor.toString().padStart(2, "0")}</Title>
      </div>
    </div>
  );
};
