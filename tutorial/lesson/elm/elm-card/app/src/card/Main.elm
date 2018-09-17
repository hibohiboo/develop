module Main exposing (main)

import Browser
import Card.Handout exposing (Handout)
import Card.HandoutList as HandoutList
import Html exposing (..)


main : Program Int AppModel Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }



-- model


type alias AppModel =
    { handoutListModel : HandoutList.Model
    }


initialModel : AppModel
initialModel =
    { handoutListModel = HandoutList.initialModel
    }


init : Int -> ( AppModel, Cmd Msg )
init flags =
    ( initialModel, Cmd.none )


type Msg
    = HandoutListMsg HandoutList.Msg



-- update


update : Msg -> AppModel -> ( AppModel, Cmd Msg )
update message model =
    case message of
        HandoutListMsg subMsg ->
            let
                ( updatedHandoutListModel, handoutListCmd ) =
                    HandoutList.update subMsg (Handout 0 "dummy") model.handoutListModel
            in
            ( { model | handoutListModel = updatedHandoutListModel }, Cmd.map HandoutListMsg handoutListCmd )



-- subscription


subscriptions : AppModel -> Sub Msg
subscriptions model =
    Sub.none



-- view


view : AppModel -> Html Msg
view model =
    Html.div []
        [ Html.map HandoutListMsg (HandoutList.view model.handoutListModel)
        ]
