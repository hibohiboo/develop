port module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)


port toJs : String -> Cmd msg


main : Program Int Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


init : Int -> ( Model, Cmd Msg )
init flags =
    ( initialModel, Cmd.none )


type alias Item =
    String


type alias Model =
    { inputStr : Item
    }


initialModel : Model
initialModel =
    { inputStr = ""
    }


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
            Tuple.pair { model | inputStr = s } (toJs "test")



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
        , input [ attribute "type" "text", id "inputTitle", class "browser-default", onInput UpdateInput, value model.inputStr ] []
        ]
