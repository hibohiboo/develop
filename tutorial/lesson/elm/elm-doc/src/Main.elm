module Main exposing (Msg, init, main, update, view)

{-| This application offers transforming a model into gained or losing.

# Definition
@docs Msg

# Determine a next model.
@docs init, update

# Create view
@docs view

# Entry point
@docs main
-}

import Html exposing (Html, button, div, span, text)
import Html.Events exposing (onClick)
import Types.Model as Model exposing (Model)


{-| All of action of this Application.
-}
type Msg
    = Gain
    | Lose


{-| Initial model and effects.
-}
init : ( Model, Cmd Msg )
init =
    ( Model.initial, Cmd.none )


{-| Updating model and generating effects.
-}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Gain ->
            ( Model.gain model, Cmd.none )

        Lose ->
            ( Model.lose model, Cmd.none )


{-| Create views of this application.
-}
view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Lose ] [ text "lose" ]
        , span [] [ text <| toString model ]
        , button [ onClick Gain ] [ text "gain" ]
        ]


{-| The entry point of this application.
-}
main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }