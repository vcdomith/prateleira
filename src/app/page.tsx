import { createClient } from "../../utils/client";
import ListaProdutos, { Produto } from "./(components)/ListaProdutos";

export default async function Home() {

  const supabase = createClient()
  const { data, error } = await supabase
    .from('prateleiras')
    .select("*")

  // console.log(data);

  if (error) {
    console.error(error)
  }

  return (
    <div className="flex flex-col content-center items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ListaProdutos produtos={data as Produto[]} />
      </main>
    </div>
  );
}
