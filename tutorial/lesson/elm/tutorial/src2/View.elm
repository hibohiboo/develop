module View exposing (..)

import Html exposing (Html, text, p)
import Msgs exposing(Msg)
import Models exposing (Model)

view : Model -> Html Msg
view model =
    p []
        [ text "count: "
        , text (toString model.count)
        ]