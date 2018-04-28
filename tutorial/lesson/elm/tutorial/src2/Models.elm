module Models exposing (..)

type alias Model =
    { count : Int
    }

initModel : Model
initModel =
    { count = 0
    }