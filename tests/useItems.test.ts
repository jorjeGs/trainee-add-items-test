import { test, describe, expect } from 'vitest'
import { renderHook, act } from "@testing-library/react"
import { useItems } from "../src/hooks/useItems"


describe('useItems hook', () => {
    test('should add and remove items', () => {
        //obtenemos el resultado de la renderizacion del hook
        const {result} = renderHook(() => useItems())
        expect(result.current.items.length).toBe(0)
        //act asegura que las instrucciones se terminan de ejecutar ya que esto ocurre asincrono
        //TRICKY: en si el metodo addItem es sincrono, sin embargo, el proceso de renderizado de react se comporta asincrono, es por eso que 
        //esto no funcionaria con un await y que el metodo act nos ayuda
        act(() => {
            //agregamos 2 items
            result.current.addItem('silene')
            result.current.addItem('jorge')
        })
        //despues que termina lo de arriba, deberiamos tener 2 elementos en el estado
        expect(result.current.items.length).toBe(2)

        //eliminando elementos
        act(() => {
            //eliminando el primer elemento del arreglo enviando su id
            result.current.deleteItem(result.current.items[0].id)
        })

        expect(result.current.items.length).toBe(1)
    })
})