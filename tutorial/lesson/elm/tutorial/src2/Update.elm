module Update exposing (..)

import Msgs exposing(..)
import Models exposing (Model)

update : Msg -> Model -> Model
update msg model =
    case msg of
        NoOp ->
            model
        Increase num ->
            { model | count = model.count + num }
        Decrease ->
            decrease model

decrease : Model -> Model
decrease model =
     if model.count == 0 then model else { model | count = model.count - 1 }