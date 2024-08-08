import Image from 'next/image';

export function Header() {
  return (
    <header className="flex justify-between p-4  shadow-sm">
      <h1 className="text-3xl text-gray-950 flex gap-4 items-center">
        <Image
          src="/logo_32x32.png"
          alt="Your AI trip planner"
          width={48}
          height={48}
        />
        <span
          className="drop-shadow-xl font-bold"
        >
          Your AI trip planner
        </span>
      </h1>
    </header>
  );
}
