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
        <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-2px border-solid dark:border-white border-gray-900"
        />
        <ul>
          {produtosDisplay?.map( ({codigo, local}, index) => 
            <li 
                key={codigo+local+index}
                className="flex gap-4"
            >
              <h2>{codigo}</h2>
              <h5>{local}</h5>
            </li>
          )}
        </ul>
        </>
    )

}