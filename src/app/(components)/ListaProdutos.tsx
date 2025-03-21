'use client'

import { LayoutGroup, motion } from "motion/react"
import { KeyboardEvent, useEffect, useMemo, useState } from "react"

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
    const [length, setLength] = useState(20)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 200);

        return () => clearTimeout(timer);
    }, [search]);

    const produtosDisplay = useMemo(() => produtos.filter( produto => produto.codigo.includes(debouncedSearch.toUpperCase())), [debouncedSearch, produtos])

    console.log(produtosDisplay);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Escape') {
            setSearch('');
        }
        
    }

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
                onKeyDown={ e => handleKeyDown(e) }
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-solid dark:border-white/50 border-black/40 pl-2 rounded-sm"
            />
        </div>
        <motion.ul
            className="w-full"
            layout
            layoutRoot
        >
            <header
                className="flex gap-4 w-full justify-between mb-2 pb-0.5 border-b-1 dark:border-white/50 border-black/50 overflow-hidden"
            >
                <h2>Produto:</h2>
                <h5>Local:</h5>
            </header>

        <LayoutGroup>
            {produtosDisplay?.map( ({codigo, local}, index) => 
                (index < length)&&                    
                <motion.li 
                    key={codigo+local+index}
                    className="flex gap-4 w-full justify-between"

                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
        
                    layout='position'
                    layoutScroll
                >
                    <h2>{codigo}</h2>
                    <h5>{local}</h5>
                </motion.li>
                
            )}
        </LayoutGroup>
            {
                (produtosDisplay.length > 10)&&
                <button
                    onClick={() => setLength(prev => prev + 10)}
                    className="h-full bg-none border-2 border-black/40 dark:border-white/50 rounded-sm px-8 w-full mt-4"
                >
                    Carregar Mais
                </button>
            }
        </motion.ul>
        </>
    )

}