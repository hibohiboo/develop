port module Card.HandoutList exposing (Model, Msg(..), initialModel, toJs, update, updateButton, view, viewList)

import Browser
import Browser.Navigation as Nav
import Card.Handout exposing (Handout, Msg, insaneHandout, update)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Url exposing (Url)
import Url.Parser as UrlParser


port toJs : String -> Cmd msg


type alias Model =
    { handoutList : List Handout
    }


initialModel : Model
initialModel =
    { handoutList =
        [ Handout 1 "item1" False
        ]
    }



-- UPDATE


type Msg
    = NoOp
    | AddNew
    | HandoutMsg Card.Handout.Msg


update : Msg -> Handout -> Model -> ( Model, Cmd Msg )
update message ho model =
    case message of
        NoOp ->
            ( model, Cmd.none )

        AddNew ->
            ( { model | handoutList = model.handoutList ++ [ ho ] }, toJs ("Add Handout" ++ ho.title) )

        HandoutMsg subMsg ->
            let
                itemIsNotDeleted m =
                    not m.del

                updatedHandoutList =
                    List.map (Card.Handout.update subMsg) model.handoutList
            in
            Tuple.pair { model | handoutList = List.filter itemIsNotDeleted updatedHandoutList } Cmd.none



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text "ハンドアウト一覧" ]
        , updateButton model.handoutList
        , div [ class "print" ]
            [ viewList model.handoutList
            ]
        ]


updateButton : List Handout -> Html Msg
updateButton models =
    div []
        [ button [ onClick AddNew ] [ text "Add" ] ]


viewList : List Handout -> Html Msg
viewList models =
    ul [] (List.map insaneHandout models) |> Html.map HandoutMsg
