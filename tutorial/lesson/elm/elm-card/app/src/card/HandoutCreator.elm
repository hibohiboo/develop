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
    | UpdateInput String



-- update


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        NoOp ->
            Tuple.pair model Cmd.none

        UpdateInput s ->
            let
                newModel =
                    { model | title = s }
            in
            Tuple.pair newModel (toJs (encode newModel))



-- view


view : Model -> Html Msg
view model =
    div []
        [ handoutInput model
        ]


handoutInput : Model -> Html Msg
handoutInput model =
    Html.form []
        [ label [ attribute "for" "inputTitle" ]
            [ text "タイトル"
            ]
        , input [ attribute "type" "text", id "inputTitle", class "browser-default", onInput UpdateInput, value model.title ] []
        ]
