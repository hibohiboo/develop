module Main exposing (..)

import Html exposing (Html)
import Msgs exposing(Msg)
import Models exposing (Model, initModel)
import Update exposing (update)
import View exposing (view)
import Subscriptions exposing (..)

main : Program Never Model Msg
main =
    Html.program
        { init = initModel
        , update = update
        , view = view
        , subscriptions = subscriptions
        }