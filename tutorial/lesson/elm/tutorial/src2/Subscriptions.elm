module Subscriptions exposing(..)

import Msgs exposing(..)
import Models exposing (Model)

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none