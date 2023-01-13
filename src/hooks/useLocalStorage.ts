import { useState } from "react"

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
    const [value, setValue] = useState<T>
}

export default useLocalStorage