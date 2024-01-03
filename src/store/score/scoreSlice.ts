import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ScoreState {
    score: number
}

// Define the initial state using that type
const initialState: ScoreState = {
    score: -1
}

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
    reducers: {
        setScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload
          },
    },
})

// Action creators are generated for each case reducer function
export const { setScore } = scoreSlice.actions

export default scoreSlice.reducer