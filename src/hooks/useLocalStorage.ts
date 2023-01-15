import { useEffect, useState } from "react"

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
    const [value, setValue] = useState<T>(() => {
        //check to see if data exists in local storage
        const jsonVal = localStorage.getItem(key)
        if (jsonVal === null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)();
                //if function is passed, execute the function (returns T so typescript isnt confused)
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonVal);
        }
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        //update local storage when value or key changes
    }, [value, key])
    return [value, setValue] as [T, typeof setValue];
}

export default useLocalStorage;