module View exposing (..)

import Html exposing (Html, text, p, div, button, form, input)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (value)
import Html.Attributes exposing (value, type_)
import String exposing (toInt)
import Msgs exposing(..)
import Models exposing (Model)

view : Model -> Html Msg
view model =
    div []
        [ counter model
        , increaseButton model
        , stepInput model
        , text ("countStepInput = " ++ model.countStepInput)
        ]

counter : Model -> Html Msg
counter model =
    p []
        [ text "count: "
        , text (toString model.count)
        ]


increaseButton : Model -> Html Msg
increaseButton model =
    div []
        [ button [ onClick (Increase 1) ] [ text "+1" ]
        , button [ onClick (Increase model.countStepNum) ] [ text ("Add " ++ (toString model.countStepNum)) ]
        ]

stepInput : Model -> Html Msg
stepInput model =
    form []
        [ input [ onInput UpdateCountStepInput, value model.countStepInput ] []
        , input [ type_ "button", onClick (convertInputToMsg model.countStepInput), value "Update"] []
        ]

convertInputToMsg : String -> Msg
convertInputToMsg s =
    case (toInt s) of
        Ok num ->
            UpdateCountStepNum num

        Err msg ->
            NoOp