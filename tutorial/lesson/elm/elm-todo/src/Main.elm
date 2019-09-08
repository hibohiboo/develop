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


toggleTodoCompleted : Int -> List Todo -> List Todo
toggleTodoCompleted id list =
    List.map
        (\t ->
            if t.id /= id then
                t

            else
                { t | completed = not t.completed }
        )
        list


type alias Model =
    { todos : List Todo
    , inputText : String
    , filter : Filter
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model [] "" SHOW_ACTIVIE, Cmd.batch [] )


type Filter
    = SHOW_ALL
    | SHOW_COMPLETED
    | SHOW_ACTIVIE


type Msg
    = AddTodo
    | InputText String
    | ToggleTodo Int
    | SetVisibilityFilter Filter


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddTodo ->
            ( { model | todos = Todo (List.length model.todos) model.inputText False :: model.todos, inputText = "" }, Cmd.none )

        InputText text ->
            ( { model | inputText = text }, Cmd.none )

        ToggleTodo id ->
            ( { model | todos = toggleTodoCompleted id model.todos }, Cmd.none )

        SetVisibilityFilter filter ->
            ( { model | filter = filter }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch []


view : Model -> Html Msg
view model =
    let
        -- _ =
        --     Debug.log "model" model
        todos =
            case model.filter of
                SHOW_ALL ->
                    model.todos

                SHOW_COMPLETED ->
                    List.filter (\t -> t.completed) model.todos

                SHOW_ACTIVIE ->
                    List.filter (\t -> not t.completed) model.todos
    in
    div []
        [ lazy addTodo model.inputText
        , lazy todoList todos
        , footer model.filter
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
    li [ style "textDecoration" decorationValue, onClick (ToggleTodo t.id) ] [ text t.text ]


addTodo : String -> Html Msg
addTodo val =
    div []
        [ input [ value val, onChange InputText ] []
        , button [ onClick AddTodo ] [ text "Add Todo" ]
        ]


footer : Filter -> Html Msg
footer filter =
    p []
        [ text "Show: "
        , link "ALL" (SetVisibilityFilter SHOW_ALL) (filter == SHOW_ALL)
        , text ","
        , link "Active" (SetVisibilityFilter SHOW_ACTIVIE) (filter == SHOW_ACTIVIE)
        , text ","
        , link "Completed" (SetVisibilityFilter SHOW_COMPLETED) (filter == SHOW_COMPLETED)
        ]


link : String -> Msg -> Bool -> Html Msg
link val msg isActive =
    if isActive then
        span [] [ text val ]

    else
        a [ href "#", onClick msg ] [ text val ]
