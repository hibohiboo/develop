port module Main exposing (main)

import Browser
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


type alias InputModel =
    { inputStr : String
    }


type alias Model =
    { inputModel : InputModel
    , handoutListModel : HandoutList.Model
    }


initialModel : Model
initialModel =
    { inputModel = { inputStr = "" }
    , handoutListModel = HandoutList.initialModel
    }


init : Int -> ( Model, Cmd Msg )
init flags =
    ( initialModel, Cmd.none )


type Msg
    = HandoutListMsg HandoutList.Msg



-- update


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        HandoutListMsg subMsg ->
            let
                ( updatedHandoutListModel, handoutListCmd ) =
                    HandoutList.update subMsg model.inputModel.inputStr model.handoutListModel
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
        [ Html.map HandoutListMsg (HandoutList.view model.handoutListModel)
        ]
