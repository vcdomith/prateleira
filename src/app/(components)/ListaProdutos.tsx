'use client'

import { useEffect, useMemo, useState } from "react"

export interface Produto {
    id: number
    created_at: Date
    codigo: string
    local: string
    ativo: boolean
}

export default function ListaProdutos({produtos}: {produtos: Produto[]}) {

    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 100);

        return () => clearTimeout(timer);
    }, [search]);

    const produtosDisplay = useMemo(() => produtos.filter( produto => produto.codigo.includes(debouncedSearch.toUpperCase())), [debouncedSearch, produtos])

    console.log(produtosDisplay);

    return (
        <>
        <div
            className="flex flex-col gap-2"
        >
            <label 
                htmlFor="search"
                className="m-0 dark:text-white/70 text-black/70"
            >Buscar nas prateleiras:</label>
            <input 
                type="text" 
                name="search"
                placeholder="Buscar por código"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-2px border-solid dark:border-white/50 border-gray-900 pl-2"
            />
        </div>
        <ul
            className="w-full"
        >
            <header
                className="flex gap-4 w-full justify-between mb-2 pb-0.5 border-b-1 dark:border-white/50 border-black/50"
            >
                <h2>Produto:</h2>
                <h5>Local:</h5>
            </header>
          {produtosDisplay?.map( ({codigo, local}, index) => 
            <li 
                key={codigo+local+index}
                className="flex gap-4 w-full justify-between"
            >
              <h2>{codigo}</h2>
              <h5>{local}</h5>
            </li>
          )}
        </ul>
        </>
    )

}