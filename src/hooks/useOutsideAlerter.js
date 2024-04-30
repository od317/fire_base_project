import { useEffect } from "react"

const useOutsideAlerter = (ref, handler = null) => {
    if (handler)
        useEffect(() => {
            const handleClickOutSide = (e) => {
                if (ref.current && !ref.current.contains(e.target))
                    handler(false)
                else
                    handler(true)
            }
            window.addEventListener('mousedown', handleClickOutSide)

            return () => {
                window.removeEventListener('mousedown', handleClickOutSide)
            }

        }, [ref])
}

export default useOutsideAlerter