module Subscriptions exposing(..)

import Date exposing (Date)
import Time exposing (Time)
import Msgs exposing(..)
import Models exposing (Model)

subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every Time.second (Date.fromTime >> UpdateDatetime)