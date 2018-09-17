module Card.HandoutList exposing (Model, Msg(..), initialModel, update, updateButton, view, viewList)

import Browser
import Browser.Navigation as Nav
import Card.Handout exposing (Handout, Msg, insaneHandout, new, update)
import Card.InputModel
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias Model =
    { handoutList : List Handout
    , nextId : Int
    }


initialModel : Model
initialModel =
    { handoutList = []
    , nextId = 2
    }



-- UPDATE


type Msg
    = NoOp
    | AddNew
    | HandoutMsg Card.Handout.Msg


update : Msg -> Card.InputModel.Model -> Model -> ( Model, Cmd Msg )
update message im model =
    case message of
        NoOp ->
            ( model, Cmd.none )

        AddNew ->
            let
                newHO =
                    Card.Handout.new model.nextId im.title im.mission im.shock im.secret
            in
            Tuple.pair { model | handoutList = model.handoutList ++ [ newHO ], nextId = model.nextId + 1 } Cmd.none

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
        [ updateButton model.handoutList
        , p [] [ text "ハンドアウト一覧" ]
        , div [ class "print" ]
            [ viewList model.handoutList
            ]
        ]


updateButton : List Handout -> Html Msg
updateButton models =
    div [ class "printHide" ]
        [ button [ onClick AddNew ] [ text "Add" ] ]


viewList : List Handout -> Html Msg
viewList models =
    ul [] (List.map insaneHandout models) |> Html.map HandoutMsg
