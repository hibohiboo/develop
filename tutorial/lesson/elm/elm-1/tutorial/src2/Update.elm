module Update exposing (..)

import Task
import Date exposing (Date)
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
            updateCountStep s model ! []
        UpdateDatetime dt ->
            { model | datetime = Just dt } ! []


updateCountStep : String -> Model -> Model
updateCountStep s model =
    case (toInt s) of
        Ok num ->
            { model | countStepInput = s, countStepNum = num }

        Err _ ->
            { model | countStepInput = s }

add : Model -> Int -> Model
add model num =
     if model.count + num < 0 then model else { model | count = model.count + num }


