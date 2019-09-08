module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Keyed as Keyed
import Html.Lazy exposing (lazy)
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


type alias Todo =
    { id : Int
    , text : String
    }


type alias Model =
    { todos : List Todo
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model [], Cmd.batch [ addNewTodo, addNewTodo2 ] )


addNewTodo : Cmd Msg
addNewTodo =
    Task.perform AddTodo (Task.succeed "Hello World!")


addNewTodo2 : Cmd Msg
addNewTodo2 =
    Task.perform AddTodo (Task.succeed "Hello Elm!")


type Msg
    = AddTodo String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddTodo text ->
            ( { model | todos = Todo (List.length model.todos) text :: model.todos }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch []


view : Model -> Html Msg
view model =
    -- let
    --     _ =
    --         Debug.log "model" model
    -- in
    div []
        [ lazy todoList model.todos
        ]


todoList : List Todo -> Html Msg
todoList todos =
    Keyed.node "ul" [] (List.map keyedTodo todos)


keyedTodo : Todo -> ( String, Html Msg )
keyedTodo t =
    ( String.fromInt t.id, todo t )


todo : Todo -> Html Msg
todo t =
    li [] [ text t.text ]
