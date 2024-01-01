import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ScoreState {
    scoreArray: number[]
}

// Define the initial state using that type
const initialState: ScoreState = {
    scoreArray: []
}

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
    reducers: {
        setScoreArray: (state, action: PayloadAction<number>) => {
            state.scoreArray.push(action.payload)
          },
    },
})

// Action creators are generated for each case reducer function
export const { setScoreArray } = scoreSlice.actions

export default scoreSlice.reducer