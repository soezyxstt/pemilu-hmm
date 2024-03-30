import Image from "next/image";
import Link from "next/link";
import { bungee, leagueSpartan, quicksand, rubikMonoOne } from "~/styles/font";

export default function Vote({
  searchParams: { prince, senator, page },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const princes = [
    { name: "Faris Ahmad Nashif", foto: "/faris.png", nickName: "Faris" },
    { name: "William Nathan", foto: "/wilnat.png", nickName: "Wilnat" },
  ];
  const senators = [
    { name: "Nika Avivatus S", foto: "/nika.png", nickName: "Nika" },
    { name: "M Dihya Dailamy", foto: "/dihya.png", nickName: "Dihya" },
  ];
  return (
    <main className="z-10 flex items-center justify-center py-14">
      <div className="h-full *:flex *:flex-col *:items-center *:gap-14 *:text-white">
        {(page === "1" || page === undefined) && (
          <div>
            <Title className="text-3xl [text-shadow:1px_2px_#061b3b]">
              Pemilihan Prince 2024
            </Title>
            <div className="flex gap-20">
              {princes.map((p, index) => (
                <div className="flex flex-col gap-6">
                  <Card name={p.name} nomor={index + 1} foto={p.foto} />
                  <LinkButton
                    content={`Pilih ${p.nickName}`}
                    link={`/vote?prince=${index + 1}&page=2`}
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
                <div className="flex flex-col gap-6">
                  <Card name={s.name} nomor={index + 1} foto={s.foto} />
                  <LinkButton
                    content={`Pilih ${s.nickName}`}
                    link={`/vote?prince=${prince}&senator=${index + 1}&page=3`}
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
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-20">
                <Card
                  name={princes[parseInt(prince as string) - 1]?.name ?? ""}
                  nomor={parseInt(prince as string)}
                  foto={princes[parseInt(prince as string) - 1]?.foto ?? ""}
                />
                <Card
                  name={senators[parseInt(senator as string) - 1]?.name ?? ""}
                  nomor={parseInt(senator as string)}
                  foto={senators[parseInt(senator as string) - 1]?.foto ?? ""}
                />
              </div>
              <LinkButton
                content="Submit"
                link={`/vote?prince=${prince}&senator=${senator}&page=4`}
                className="w-full"
              />
            </div>
          </div>
        )}
        {page === "4" && (
          <div className="py-32">
            <Title className="text-3xl [text-shadow:1px_2px_#061b3b]">
              {" "}
              Terima kasih telah memilih!
            </Title>
            <Title className='text-center flex justify-center h-[20vh] items-center text-navy text-2xl [text-shadow:1px_1px_#FFFFFF]'>
              Demikian suara Anda telah tercatat.
              <br />
              Yellboys!
            </Title>
            <LinkButton
              content="Kembali ke halaman utama"
              link="/vote"
              className="w-72"
            />
          </div>
        )}
      </div>
    </main>
  );
}

const LinkButton = ({
  content,
  link,
  className,
}: {
  content: string;
  link: string;
  className?: string;
}) => {
  return (
    <Link
      href={link}
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