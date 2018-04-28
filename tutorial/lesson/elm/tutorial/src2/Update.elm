module Update exposing (..)

import Msgs exposing(..)
import Models exposing (Model)

update : Msg -> Model -> Model
update msg model =
    case msg of
        NoOp ->
            model