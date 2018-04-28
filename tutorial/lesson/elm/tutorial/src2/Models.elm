module Models exposing (..)

type alias Model =
    { count : Int
    , countStepInput : String
    , countStepNum : Int
    }

initModel : Model
initModel =
    { count = 0
    , countStepInput = ""
    , countStepNum = 0
    }