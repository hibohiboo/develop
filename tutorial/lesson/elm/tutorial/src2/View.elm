module View exposing (..)

import Html exposing (Html, text, p, div, button)
import Html.Events exposing (onClick)
import Msgs exposing(..)
import Models exposing (Model)

view : Model -> Html Msg
view model =
    div []
        [ counter model
        , increaseButton
        ]

counter : Model -> Html Msg
counter model =
    p []
        [ text "count: "
        , text (toString model.count)
        ]


increaseButton : Html Msg
increaseButton =
    div []
        [ button [ onClick Increase ]
            [ text "+1" ]
        ]