import { useEffect, useState } from "react";

export function useDebounce (inputValue) {
    const [debounceValue, setDebounceValue] = useState(inputValue)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(inputValue);
        }, 300)

        return () => clearTimeout(timer) // cleanup
    }, [inputValue])

    return debounceValue
}