port module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Card.Handout exposing (Handout, insaneHandout)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Url exposing (Url)
import Url.Parser as UrlParser


port toJs : String -> Cmd msg


type alias Model =
    { handoutList : List Handout
    }


init : Int -> ( Model, Cmd Msg )
init flags =
    ( initialModel, Cmd.none )


initialModel : Model
initialModel =
    { handoutList =
        [ Handout 1 "item1"
        , Handout 2 "item2"
        , Handout 3 "item3"
        ]
    }



-- UPDATE


type Msg
    = NoOp
    | AddNew Handout


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        NoOp ->
            ( model, Cmd.none )

        AddNew handout ->
            ( { model | handoutList = model.handoutList ++ [ handout ] }, toJs ("Add Handout" ++ handout.title) )



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ p [] [ text "ハンドアウト一覧" ]
        , updateButton model.handoutList
        , div [ class "print" ]
            [ viewList model.handoutList
            ]
        ]


updateButton : List Handout -> Html Msg
updateButton models =
    div []
        [ button [ onClick (AddNew (Handout 4 "item4")) ] [ text "Click" ] ]


viewList : List Handout -> Html Msg
viewList models =
    handouts models


handouts : List Handout -> Html Msg
handouts models =
    ul [] (List.map insaneHandout models)


main : Program Int Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
