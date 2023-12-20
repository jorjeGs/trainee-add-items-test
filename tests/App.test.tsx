//react es necesario para hacer referencia a un componente de react
import React from 'react'
//estos elementos permiten construir pruebas basado en aplicaciones vite
import { describe, test, expect } from 'vitest'
//el paquete permite renderizar y manipular componentes de react
import { render, screen } from '@testing-library/react'
//herramienta para simular los eventos de usuario
import userEvent from '@testing-library/user-event'
//componente que deseamos testear
import App from '../src/App'

describe('<App />', () => {
    //EXAMPLE TEST
    // test('should work', () => {
    //     //comprobar la renderizacion del componente
    //     render(<App />)
    //     //ver lo que hay en pantalla del nav
    //     screen.debug()
    //     //se espera ver en pantalla
    //     expect(
    //         //un elemento con el siguiente texto (titulo de la pag)
    //         screen.getByText('Test Trainee & JR')
    //     ).toBeDefined() //que este definido
    // })

    //E2E TEST
    test('should add items and remove them', async () => {
        const user = userEvent.setup()

        render(<App />)

        //buscar el input
        const input = screen.getByRole('textbox')
        expect(input).toBeDefined()

        //buscar el form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        //apartir de otro elemento, podemos buscar otro con query selector
        const button = form.querySelector('button')
        expect(button).toBeDefined()

        //asincrono ya que el usuario no escribe inmediatamente
        await user.type(input, 'silene')
        //el boton podria ser nulo, es por eso que podemos agregar ! para omitir estos casos, solo por ser justamente testing
        await user.click(button!)

        //asegurar que el elemento se ha agregado
        const list = screen.getByRole('list')
        expect(list).toBeDefined()
        //verificar que en la lista vacia se agrego un elemento
        expect(list.childNodes.length).toBe(1)

        //asegurar que el elemento se puede borrar
        const item = screen.getByText('silene')
        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)

        //verificar que no haya elementos en la lista
        const noResults = screen.getByText('No hay elementos en la lista...')
        expect(noResults).toBeDefined()

        //un vez realizada la funcionalidad completa, es posible ahora refactorizar todo el codigo
    })
}) 