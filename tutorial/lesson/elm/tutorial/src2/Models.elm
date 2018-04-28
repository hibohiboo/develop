module Models exposing (..)

import Msgs exposing(..)

type alias Model =
    { count : Int
    , countStepInput : String
    , countStepNum : Int
    }

initModel : (Model, Cmd Msg)
initModel =
    { count = 0
    , countStepInput = ""
    , countStepNum = 0
    } ! []