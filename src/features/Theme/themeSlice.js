import { createSlice } from "@reduxjs/toolkit"

const initialState = {
      value:false
}

export const darkThemeSlice = createSlice({
       initialState,
       name:'theme',
       reducers:{
                changeTheme:(state)=>{
                        console.log('changing')
                        state.value = false
                }
       }
})


export const  {changeTheme} = darkThemeSlice.actions
export const selectTheme = (state) => state.theme.value

export default darkThemeSlice.reducer