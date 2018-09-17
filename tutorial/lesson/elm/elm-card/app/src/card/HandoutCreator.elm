port module Main exposing (main)

import Browser
import Card.InputModel exposing (Model, encode)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Encode


port toJs : Json.Encode.Value -> Cmd msg


main : Program (Maybe String) Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


init : Maybe String -> ( Model, Cmd Msg )
init flags =
    ( Card.InputModel.initialModel, Cmd.none )


type Msg
    = NoOp
    | UpdateTitle String
    | UpdateMission String
    | UpdateShock String
    | UpdateSecret String



-- update


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        NoOp ->
            Tuple.pair model Cmd.none

        UpdateTitle s ->
            let
                newModel =
                    { model | title = s }
            in
            Tuple.pair newModel (toJs (encode newModel))

        UpdateMission s ->
            let
                newModel =
                    { model | mission = s }
            in
            Tuple.pair newModel (toJs (encode newModel))

        UpdateShock s ->
            let
                newModel =
                    { model | shock = s }
            in
            Tuple.pair newModel (toJs (encode newModel))

        UpdateSecret s ->
            let
                newModel =
                    { model | secret = s }
            in
            Tuple.pair newModel (toJs (encode newModel))



-- view


view : Model -> Html Msg
view model =
    div [ class "container inputArea" ]
        [ handoutInput model
        ]


handoutInput : Model -> Html Msg
handoutInput model =
    Html.form [ class "" ]
        [ inputs "タイトル" UpdateTitle model.title
        , inputs "使命" UpdateMission model.mission
        , inputs "ショック" UpdateShock model.shock
        , inputs "秘密" UpdateSecret model.secret
        ]


inputs l m v =
    div [ class "row" ]
        [ label [ class "col s4 m2", attribute "for" "inputTitle" ]
            [ text l
            ]
        , input [ class "col s8 m10", attribute "type" "text", id "inputTitle", class "browser-default", onInput m, value v ] []
        ]
