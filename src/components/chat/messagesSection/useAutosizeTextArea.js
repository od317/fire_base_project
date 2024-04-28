import {useEffect} from 'react'

export const useAutosizeTextArea = (ref,value) => {
       useEffect(()=>{

        if(ref){
               ref.style.height = '0px'

               const {scrollHeight} = ref

               ref.style.height = `${scrollHeight}px`
        }

       },[ref,value])
}