import { Header } from '@/components/header';
import { Main } from '@/components/Main';

export default async function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Main />
    </div>
  );
}
