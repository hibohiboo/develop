module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as D exposing (Value)
import Task


main : Program Value Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    { id : Int
    , text : String
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model 0 "", addNewTodo )


addNewTodo : Cmd Msg
addNewTodo =
    Task.perform AddTodo (Task.succeed "Hello World!")


type Msg
    = AddTodo String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddTodo text ->
            ( Model 0 text, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch []


view : Model -> Html Msg
view model =
    let
        _ =
            Debug.log "model" model
    in
    div []
        [ text "Hello World"
        ]
