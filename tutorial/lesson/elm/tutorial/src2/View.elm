module View exposing (..)

import Html exposing (Html, text, p, div, button, form, input)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (value)
import Msgs exposing(..)
import Models exposing (Model)

view : Model -> Html Msg
view model =
    div []
        [ counter model
        , increaseButton
        , stepInput model
        , text ("countStepInput = " ++ model.countStepInput)
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
        [ button [ onClick (Increase 1) ] [ text "+1" ]
        , button [ onClick (Increase 5) ] [ text "+5" ]
        , button [ onClick (Increase -1) ] [ text "-1" ]
        ]

stepInput : Model -> Html Msg
stepInput model =
    form []
        [ input [ onInput UpdateCountStepInput, value model.countStepInput ] []
        ]