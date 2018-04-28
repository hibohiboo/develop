module Main exposing (..)

import Html exposing (Html)
import Msgs exposing(Msg)
import Models exposing (Model, initModel)
import Update exposing (update)
import View exposing (view)

main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model = initModel
        , update = update
        , view = view
        }