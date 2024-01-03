
//? =======Redux======

export type ActionSlicePayload = {
    userName: string,
    score: number
}

// can be undefined so we can store the score and the name
// at deferent screens locations
export type UserState = {
    userName: string,
    data: number[]
}


//========

export interface ScoreData{ 
    data: UserState[]
}


//====Custom ScrollView Type======
export type CustomScrollViewProps = {
    gameData: UserState[] | undefined
}