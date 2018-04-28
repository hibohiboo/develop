module Subscriptions exposing(..)

import Date exposing (Date)
import Time exposing (Time)
import Msgs exposing(..)
import Models exposing (Model)

subscriptions : Model -> Sub Msg
subscriptions model =
    let
        updateCurrentDate t = 
            Date.fromTime t |> UpdateDatetime
    in
        Time.every Time.second updateCurrentDate