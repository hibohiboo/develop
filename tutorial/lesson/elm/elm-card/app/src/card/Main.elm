module Main exposing (main)

import Browser
import Card.Handout exposing (Handout, new)
import Card.HandoutCreator as HandoutCreator
import Card.HandoutList as HandoutList
import Html exposing (..)
import Html.Attributes exposing (..)


main : Program Int Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }



-- model


type alias Model =
    { handoutCreator : HandoutCreator.Model
    , handoutListModel : HandoutList.Model
    }


initialModel : Model
initialModel =
    { handoutCreator = HandoutCreator.initialModel
    , handoutListModel = HandoutList.initialModel
    }


init : Int -> ( Model, Cmd Msg )
init flags =
    ( initialModel, Cmd.none )


type Msg
    = HandoutCreatorMsg HandoutCreator.Msg
    | HandoutListMsg HandoutList.Msg



-- update


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        HandoutCreatorMsg subMsg ->
            let
                ( updatedCreator, handoutCreatorCmd ) =
                    HandoutCreator.update subMsg model.handoutCreator
            in
            ( { model | handoutCreator = updatedCreator }, Cmd.map HandoutCreatorMsg handoutCreatorCmd )

        HandoutListMsg subMsg ->
            let
                ( updatedHandoutListModel, handoutListCmd ) =
                    HandoutList.update subMsg (new 0 model.handoutCreator.inputStr) model.handoutListModel
            in
            ( { model | handoutListModel = updatedHandoutListModel }, Cmd.map HandoutListMsg handoutListCmd )



-- subscription


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- view


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ Html.map HandoutCreatorMsg (HandoutCreator.view model.handoutCreator)
        , Html.map HandoutListMsg (HandoutList.view model.handoutListModel)
        ]
