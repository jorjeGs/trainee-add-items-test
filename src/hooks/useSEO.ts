import { useEffect } from "react";
//variables de entrada
export function useSEO (
    {title, description}: 
    {title: string, description: string}
) {
    //esto me suena como al "constructor"
    useEffect(() => {
        document.title = title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", description);

    },[title, description])
}