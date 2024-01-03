import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ActionSlicePayload, CustomScrollViewProps, ScoreData, UserState } from '../../utils/types';

// Define the initial state using that type
const initialState: ScoreData = {
    data: [
        {
            userName: '',
            data:[]
        }
    ]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<ActionSlicePayload>) => {
            //check if the user has been added to the data structure
            let isUserCreated = state.data.some(({ userName }) => userName === action.payload.userName)
            if (isUserCreated) {
                //update and push the new score for the user
                state.data.map(({ userName, data }) => {
                    if (userName === action.payload.userName) {
                        data.push(action.payload.score)
                        data.sort();
                        data.reverse();
                    }
                })
            } else {
                // Create a new user with this payload
                const newUser: UserState = {
                    userName: action.payload.userName,
                    data: [action.payload.score]
                }
                state.data.push(newUser)
            }
        },
        updateUserData: (state, action: PayloadAction<UserState[] | undefined>) => { 
            if (action.payload) { 
                state.data = action.payload
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserData, updateUserData } = userSlice.actions

export default userSlice.reducer