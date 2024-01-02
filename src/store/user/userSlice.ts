import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
    userName: string
}

// Define the initial state using that type
const initialState: UserState = {
    userName: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
          },
    },
})

// Action creators are generated for each case reducer function
export const { setUserName } = userSlice.actions

export default userSlice.reducer