port module Main exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (id, class)
import Html.Events exposing (onClick)
import Json.Decode as Decode exposing (Value)


port log : Model -> Cmd msg


type alias Model =
    Int


init : Value -> ( Model, Cmd Msg )
init val =
    ( 0, Cmd.batch [ log 0 ] )


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( model + 1, Cmd.batch [ log model ] )

        Decrement ->
            ( model - 1, Cmd.batch [ log model ] )


view model =
    div [ id "plus-minus", class "red bold"]
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Value Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
