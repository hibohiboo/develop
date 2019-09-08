module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Html.Events.Extra exposing (onChange)
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
    , completed : Bool
    }


type alias Model =
    { todos : List Todo
    , inputText : String
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model [] "", Cmd.batch [] )


type Msg
    = AddTodo
    | InputText String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddTodo ->
            ( { model | todos = Todo (List.length model.todos) model.inputText False :: model.todos, inputText = "" }, Cmd.none )

        InputText text ->
            ( { model | inputText = text }, Cmd.none )


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
        [ lazy addTodo model.inputText
        , lazy todoList model.todos
        ]


todoList : List Todo -> Html Msg
todoList todos =
    Keyed.node "ul" [] (List.map keyedTodo todos)


keyedTodo : Todo -> ( String, Html Msg )
keyedTodo t =
    ( String.fromInt t.id, todo t )


todo : Todo -> Html Msg
todo t =
    let
        decorationValue =
            if t.completed then
                "line-through"

            else
                "none"
    in
    li [ style "textDecoration" decorationValue ] [ text t.text ]


addTodo : String -> Html Msg
addTodo val =
    div []
        [ input [ value val, onChange InputText ] []
        , button [ onClick AddTodo ] [ text "Add Todo" ]
        ]
