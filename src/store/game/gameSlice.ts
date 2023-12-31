import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface GameState {
    gameName: string
}

// Define the initial state using that type
const initialState: GameState = {
    gameName: "testing"
}

export const gameSlice = createSlice({
  name: 'userCredential',
  initialState,
    reducers: {},
    extraReducers(builder) {},
    
})