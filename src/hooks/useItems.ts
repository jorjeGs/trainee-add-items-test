import { type Item } from "../App";
import { useState } from "react";


export const useItems = () => {
    const [items, setItems] = useState<Item[]>([])

    const addItem = (text: string) => {
        //si todo esta bien, crear la interfaz
        const newItem: Item = {
            id: crypto.randomUUID(),
            text: text
        }

        //actualizamos el estado de los items, anteponiendo la lista anterior
        setItems((prevItems) => {
            return [...prevItems, newItem]
        })
    }

    const deleteItem = (id: string) => {
        setItems((prevItems) => {
            return prevItems.filter((currentItem) => currentItem.id != id)
        })
    }

    return {
        items,
        addItem,
        deleteItem
    }
}