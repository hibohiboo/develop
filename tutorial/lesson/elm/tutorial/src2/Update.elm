module Update exposing (..)

import Task
import String exposing (toInt)
import Msgs exposing(..)
import Models exposing (Model)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        NoOp ->
            model ! []
        Increase num ->
            add model num ! []
        UpdateCountStepInput s ->
            { model | countStepInput = s } ! [ Task.perform convertInputToMsg (Task.succeed s) ]
        UpdateCountStepNum num ->
            { model | countStepNum = num } ! []

convertInputToMsg : String -> Msg
convertInputToMsg s =
    case (toInt s) of
        Ok num ->
            UpdateCountStepNum num

        Err msg ->
            NoOp

add : Model -> Int -> Model
add model num =
     if model.count + num < 0 then model else { model | count = model.count + num }