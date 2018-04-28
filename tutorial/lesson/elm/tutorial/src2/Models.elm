module Models exposing (..)

type alias Model =
    { count : Int
    , countStepInput : String
    }

initModel : Model
initModel =
    { count = 0
    , countStepInput = ""
    }