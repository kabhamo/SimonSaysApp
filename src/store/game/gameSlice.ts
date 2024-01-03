import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface GameState {
    isGameOver: boolean
}

// Define the initial state using that type
const initialState: GameState = {
    isGameOver: false
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
    reducers: {
        setGameOverState: (state, action: PayloadAction<boolean>) => {
            state.isGameOver = action.payload;
          },
    },
})

// Action creators are generated for each case reducer function
export const { setGameOverState } = gameSlice.actions

export default gameSlice.reducer