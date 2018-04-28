module Update exposing (..)

import Msgs exposing(..)
import Models exposing (Model)

update : Msg -> Model -> Model
update msg model =
    case msg of
        NoOp ->
            model
        Increase num ->
            add model num

add : Model -> Int -> Model
add model num =
     if model.count + num < 0 then model else { model | count = model.count + num }