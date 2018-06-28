module Models exposing (..)

import Task
import Date exposing (Date)
import Msgs exposing(..)

type alias Model =
    { count : Int
    , countStepInput : String
    , countStepNum : Int
    , datetime : Maybe Date
    }

initModel : (Model, Cmd Msg)
initModel =
    { count = 0
    , countStepInput = ""
    , countStepNum = 0
    , datetime = Nothing
    }
    ! [ getCurrentDate ]

getCurrentDate : Cmd Msg
getCurrentDate =
    let
        handleResult result =
            case result of
                Ok dt ->
                    UpdateDatetime dt

                Err _ ->
                    NoOp
    in
        Task.attempt handleResult Date.now